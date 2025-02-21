const dotenv = require("dotenv");
const path = require("path");

const envFile = path.resolve(
  __dirname,
  `../.env.${process.env.NODE_ENV || "local"}`
);

dotenv.config({ path: envFile });

console.log("Loaded env file:", envFile);
