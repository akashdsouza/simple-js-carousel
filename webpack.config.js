const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
  let { production = false } = env;
  return {
    mode: 'production',
    entry: './simple-js-carousel.js',
    output: {
      filename: production ? 'simple-js-carousel.min.js' : 'simple-js-carousel.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'SJCarousel',
    },
    devServer: {
      contentBase: path.resolve(__dirname, '.'),
      publicPath: '/dist/'
    },
    module: {
      rules: [
        { 
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      ]
    },
    optimization: {
      minimize: production,
      minimizer: [new TerserPlugin({
        terserOptions: {
          ie8: false
        }
      })],
    },
  }
}