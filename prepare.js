const isCi = process.env.CI !== undefined
if (!isCi) {
  const husky = require('husky')
  husky.install()
}
