var path = require('path')
var webpack = require('webpack')
var HtmlWebackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');

var root = __dirname
var appPath = path.join(root, 'src')

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
      path: './src/../dist',
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
          loaders: ['babel', 'eslint']
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          loader: 'file',
          query:{
            name: '[path][name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: plugins
};
