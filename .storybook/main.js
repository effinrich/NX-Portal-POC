module.exports = {
  stories: [],
  addons: [
    'storybook-formik/register',
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
    checkOptions: {}
  },
  core: {
    builder: 'webpack5'
  }
}
