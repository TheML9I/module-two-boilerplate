var path = require('path')
var webpack = require('webpack')
var HtmlWebackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');

var root = __dirname
var appPath = path.join(root, 'src')
var distPath = path.join(root, 'dist')

var env = process.env.NODE_ENV
var debug = env !== 'production'
var minify = !debug

var plugins = [
  new HtmlWebackPlugin({
    filename: 'index.html',
    template: path.join(appPath, 'index.html'),
    minify: false
  }),
  new CleanWebpackPlugin(['dist'], {
    root: root,
    verbose: true,
  })
]

if(minify){
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
    entry: {// configurationocal
      bundle: './src/main.js'
    },
    output: {
      path: distPath,
      filename: '[hash]_[name].js'
    },
    devtool: "inline-source-map",
    debug: debug,
    devServer: {
      host: 'localhost',
      port: 8080
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel', 'eslint'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          loader: 'file',
          query:{
            name: '[path][name].[ext]?[hash]'
          }
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file'
        }
      ]
    },
    plugins: plugins
};
