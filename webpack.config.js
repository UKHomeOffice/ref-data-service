const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // in the `entry` property there is no need to
  // specify `filename.js` at the end, its smart enough to figure out
  entry: ['./src/', './src/sass/main.scss'],
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
      { from: 'src/assets/javascript', to: 'javascript'},
      { from: 'src/assets/images', to: 'assets/images'},
      { from: 'src/assets/fonts', to: 'assets/fonts'},
      { from: 'node_modules/govuk-frontend/all.js', to: 'javascript/all.js'},
      { from: 'node_modules/govuk-frontend/assets', to: 'assets'}
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        KEYCLOAK_AUTH_URL: JSON.stringify(process.env.KEYCLOAK_AUTH_URL),
        KEYCLOAK_CLIENT_ID: JSON.stringify(process.env.KEYCLOAK_CLIENT_ID),
        KEYCLOAK_REALM: JSON.stringify(process.env.KEYCLOAK_REALM),
        READ_ONLY_MODE: JSON.stringify(process.env.READ_ONLY_MODE)
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: { fs: 'empty' },
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
