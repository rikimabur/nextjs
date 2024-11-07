import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import type { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any, request: Request) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        // If the user has no password (i.e., they signed up via a social network), throw an error
        if (!user?.password) {
          throw new Error("Please login via the method you used to signup");
        }
        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const { email, name, image } = user;
      dbConnect();
      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        await User.create({
          email,
          name,
          image,
        });
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      userByEmail.resetCode = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
