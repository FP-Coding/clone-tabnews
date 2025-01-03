const dotenv = require("dotenv");
const nextJest = require("next/jest")

dotenv.config({
  path: ".env.development"
})

const createjestConfig = nextJest({
  dir: "./",
})

const jestConfig = createjestConfig({
  moduleDirectories: ['node_modules', "<rootDir>"],
  testTimeout: 60000,
})

module.exports = jestConfig;