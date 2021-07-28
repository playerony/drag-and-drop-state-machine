const webpackMerge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modeConfiguration = (env) => require(`./build-config/webpack.${env.mode}`)(env);

module.exports = ({ mode } = { mode: 'production' }) =>
  webpackMerge(
    {
      mode,
      output: {
        filename: 'bundle.js',
      },
      plugins: [new HtmlWebpackPlugin()],
    },
    modeConfiguration({ mode }),
  );
