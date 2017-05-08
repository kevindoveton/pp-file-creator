const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./config/helpers')
const minify = process.env.NODE_ENV === 'production';
const production = process.env.NODE_ENV === 'production';


const GLOBALS = {
  // __SMS_BOT_BASE_URL__: `'${smsBotBaseUrl}'`
};

module.exports = {
  devtool: 'source-map',
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, './src/js/main.js'),
  ],
  cache: true,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    ...(production ? [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })] : []),
    ...(minify ? [
      new webpack.optimize.UglifyJsPlugin(),
    ] : []),
    new CopyWebpackPlugin([{ 
      from: './src/html'
    }])
  ],
  module: {
    loaders: [
      { 
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|html|htm)$/, 
        loader: "file" 
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'postcss', 'sass?outputStyle=compressed']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  },
  devServer: {
    hot: true,
    outputPath: path.join(__dirname, '/dist'),
    host: "0.0.0.0",
    port: 3000,
    historyApiFallback: false,
    setup: function (app) {
      app.use(function pushStateHook(req, res, next) {
        var ext = path.extname(req.url);
          if ((ext === '' || ext === '.html') && req.url !== '/') {
            res.setHeader("Content-Type", "text/html");
            fs.createReadStream(helpers.root('dist/index.html')).pipe(res);
          } else {
            next();
          }
      });
    }
  }
};
