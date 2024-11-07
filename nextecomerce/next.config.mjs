/** @type {import('next').NextConfig} */
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const config = require("./config");
const nextConfig = {
  env: {
    DB_URI: "mongodb://localhost:27017/nextEcomerce",
    API: "http://localhost:3000/api",
    NEXTAUTH_SECRET: "",
  },
};

export default nextConfig;
