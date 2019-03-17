const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // in the `entry` property there is no need to 
  // specify `filename.js` at the end, its smart enough to figure out
  entry: ['./src/client', './src/client/sass/main.scss'],
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
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/css/[name].css"
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/client/assets/javascript', to: 'javascript'},
      { from: 'node_modules/govuk-frontend/all.js', to: 'javascript/all.js'},
      { from: 'node_modules/govuk-frontend/assets', to: 'assets'}
    ])
  ],
  resolve: {
    alias: {
      Banner: path.resolve(__dirname, 'src/client/components/Banner.jsx'),
      Footer: path.resolve(__dirname, 'src/client/components/Footer.jsx'),
      Header: path.resolve(__dirname, 'src/client/components/Header.jsx'),
      Home: path.resolve(__dirname, 'src/client/components/Home.jsx'),
      Main: path.resolve(__dirname, 'src/client/components/Main.jsx'),
      Nav: path.resolve(__dirname, 'src/client/components/Nav.jsx')
    },
    extensions: ['.js', '.jsx']
  },
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
