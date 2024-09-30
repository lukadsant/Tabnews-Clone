const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });
const { default: next } = require("next");
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
