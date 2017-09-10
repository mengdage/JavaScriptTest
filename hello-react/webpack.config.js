const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginconfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

console.log(path.resolve(__dirname,'dist'));
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('__dirname','dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$|\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },

  plugins: [HtmlWebpackPluginconfig]
}
