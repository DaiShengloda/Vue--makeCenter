var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function plugin (dir) {
  return path.join(__dirname, '../src/assets/', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor1: ['bootstrap'],
    // vendor2: [
    //   'datatables.net','datatables.net-bs','datatables.net-select','datatables.net-buttons',
    //   'datatables.net-buttons-bs','datatables.net-fixedheader',
    //   'datatables.net-responsive', 'datatables.net-keytable',
    //   'datatables.net-responsive-bs','datatables.net-scroller',
    // ],
    vendor2: [
      'datatables.net','datatables.net-bs','datatables.net-select',
      'datatables.net-fixedheader','datatables.net-scroller',
    ],
    vendor3: ['icheck','bootstrap-colorpicker','bootstrap-daterangepicker','bootstrap-select'],
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    "jquery": "jQuery"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
