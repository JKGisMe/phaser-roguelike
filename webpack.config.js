module.exports = {
  devtool: 'source-map', 
  entry: './src/rl.js',
  output: {
     path: './dist',
     filename: 'output.js'
  },
  module: {
   loaders: [{
     test: /\.js$/,
     exclude: /node_modules/,
     loader: 'babel-loader'
   }]
  }
};
