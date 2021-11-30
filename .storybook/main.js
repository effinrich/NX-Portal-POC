module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/testing-react',
    // '@storybook/addon-storysource',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  features: {
    modernInlineRender: true,
    interactionsDebugger: true
  },
  logLevel: 'debug',
  webpackFinal: config => {
    // add monorepo root as a valid directory to import modules from
    config.resolve.plugins.forEach(p => {
      if (Array.isArray(p.appSrcs)) {
        p.appSrcs.push(path.join(__dirname, '..', '..', '..'))
      }
    })
    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  core: {
    builder: 'webpack5'
  }
}
