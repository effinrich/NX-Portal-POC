const rootMain = require('../../../../.storybook/main')
const path = require('path')

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  typescript: {
    reactDocgen: false
  },
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType })
    }

    // add your own webpack tweaks if needed
    // Fix Framer Motion v5 issue
    // https://github.com/framer/motion/issues/1307#issuecomment-966827629
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/
    })
    // return config

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react')
        }
      }
    }
  }
}
