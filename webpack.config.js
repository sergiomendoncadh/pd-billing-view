//Overrides for the default webpack config
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [new Dotenv()]
};
