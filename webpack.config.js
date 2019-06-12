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
      { from: 'node_modules/govuk-frontend/all.js', to: 'javascript/all.js'},
      { from: 'node_modules/govuk-frontend/assets', to: 'assets'}
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        KEYCLOAK_AUTH_URL: JSON.stringify(process.env.KEYCLOAK_AUTH_URL),
        KEYCLOAK_CLIENT_ID: JSON.stringify(process.env.KEYCLOAK_CLIENT_ID),
        KEYCLOAK_REALM: JSON.stringify(process.env.KEYCLOAK_REALM)
      }
    }),
  ],
  resolve: {
    alias: {
      // Components
      Banner: path.resolve(__dirname, 'src/components/Banner.jsx'),
      ChangeRequestSubmission: path.resolve(__dirname, 'src/components/ChangeRequestSubmission.jsx'),
      Entities: path.resolve(__dirname, 'src/components/Entities.jsx'),
      Entity: path.resolve(__dirname, 'src/components/Entity.jsx'),
      EntityFieldUpdate: path.resolve(__dirname, 'src/components/EntityFieldUpdate.jsx'),
      Footer: path.resolve(__dirname, 'src/components/Footer.jsx'),
      Header: path.resolve(__dirname, 'src/components/Header.jsx'),
      Item: path.resolve(__dirname, 'src/components/Item.jsx'),
      Items: path.resolve(__dirname, 'src/components/Items.jsx'),
      ItemDeleted: path.resolve(__dirname, 'src/components/ItemDeleted.jsx'),
      ItemFieldUpdate: path.resolve(__dirname, 'src/components/ItemFieldUpdate.jsx'),
      ItemNew: path.resolve(__dirname, 'src/components/ItemNew.jsx'),
      Main: path.resolve(__dirname, 'src/components/Main.jsx'),
      Nav: path.resolve(__dirname, 'src/components/Nav.jsx'),
      Search: path.resolve(__dirname, 'src/components/Search.jsx')
    },
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
