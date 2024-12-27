const nextJest = require("next/jest")

const createjestConfig = nextJest({
  dir: "./",
})

const jestConfig = createjestConfig({
  moduleDirectories: ['node_modules', "<rootDir>"],
  setupFiles: ["<rootDir>/jest.setup.js"]
})

module.exports = jestConfig;