const path = require('path');

module.exports = {
  // in the `entry` property there is no need to 
  // specify `filename.js` at the end, its smart enough to figure out
  entry: './src/client',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      // only allow `.js` or `.jsx` to be compiled
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      Main: path.resolve(__dirname, 'src/client/components/Main.jsx')
    },
    extensions: ['.js', '.jsx']
  },
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
  }
}
