const DB_URI =
  process.env.NODE_ENV === "production"
    ? ""
    : "mongodb://localhost:27017/nextEcomerce";
module.exports = {
  DB_URI,
};
const API =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";
module.exports = {
  API,
};

const NEXTAUTH_SECRET = "KZqk9BnBU1jFCpeFB/jh1cKapEj6wwtHEYrCf2Fdftw=";
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
};
