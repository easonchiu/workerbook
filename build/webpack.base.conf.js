const path = require('path')
const config = require('./conf')
const APP_CONFIG = require('../appConfig')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  mode: process.env.NODE_ENV,

  entry: {
    app: resolve('src/main.js'),
  },

  module: {
    rules: [{
      test: /\.js[x]?$/,
      loader: 'happypack/loader?id=jsx',
      include: [resolve('src')],
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        publicPath: config[process.env.PACKAGE].cssAssetsPath,
      },
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        publicPath: config[process.env.PACKAGE].cssAssetsPath,
      },
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }],
  },

  plugins: [

    // 多线程打包
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          exclude: ['/node_modules/'],
        }
      ],
    }),

    // 提取html模板
    new HtmlWebpackPlugin({
      template: 'src/template.html',
      filename: 'index.html',
      inject: 'body', // 所有javascript资源将被注入至body底部
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 压缩成一行
        removeAttributeQuotes: false // 删除引号
      },
      chunksSortMode: 'dependency' // 按照不同文件的依赖关系来排序
    }),

    // 提取公共样式
    new MiniCssExtractPlugin({
      // chunkFilename: "css/[name].[hash:7].css",
      filename: 'css/[name].[hash:7].css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.mass'],
    alias: {
      'src': resolve('src'),
      '@': resolve('src'),
      'auto': resolve('src/auto'),
      '$assets': resolve('src/assets'),
      '$components': resolve('src/components'),
      '$containers': resolve('src/containers'),
      '$redux': resolve('src/redux'),
      '$views': resolve('src/views'),
    },
  },
}

module.exports = webpackConfig
