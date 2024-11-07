"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function TopNav() {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">
        Next Ecomerce
      </Link>
      {status === "authenticated" ? (
        <>
          <Link
            href={`/dashboard/${
              data?.user?.role === "admin" ? "admin" : "user"
            }`}
            className="nav-link"
          >
            {data?.user?.name} ({data?.user?.role})
          </Link>
          <a
            className="nav-link pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </>
      ) : status === "loading" ? (
        <a className="nav-link text-danger">Loading</a>
      ) : (
        <>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/register" className="nav-link">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
