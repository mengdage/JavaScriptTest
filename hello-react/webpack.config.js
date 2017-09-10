const path = require('path');
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
  }
}
