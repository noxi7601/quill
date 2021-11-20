var path = require('path');
var pkg = require('../package.json');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var bannerPack = new webpack.BannerPlugin({
  banner:
    'Quill Editor v' + pkg.version + '\n' +
    'https://quilljs.com/\n' +
    'Copyright (c) 2014, Jason Chen\n' +
    'Copyright (c) 2013, salesforce.com',
  entryOnly: true
});
var constantPack = new webpack.DefinePlugin({
  QUILL_VERSION: JSON.stringify(pkg.version)
});

var source = [
  'quill.js',
  'core.js',
  'blots',
  'core',
  'formats',
  'modules',
  'test',
  'themes',
  'ui'
].map(function(file) {
  return path.resolve(__dirname, '..', file);
});


module.exports = function(env) {
  let config = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
      'quill.js': ['./quill.js'],
      'quill.core.js': ['./core.js'],
      'quill.core': './assets/core.styl',
      'quill.bubble': './assets/bubble.styl',
      'quill.snow': './assets/snow.styl',
      'unit.js': './test/unit.js'
    },
    output: {
      filename: '[name]',
      library: 'Quill',
      libraryExport: 'default',
      libraryTarget: 'umd',
      sourceMapFilename: '[name].map',
      path: path.resolve(__dirname, '../dist/')
    },
    resolve: {
      alias: {
        'parchment': path.resolve(__dirname, '../node_modules/parchment/src/parchment')
      },
      extensions: ['.js', '.styl', '.ts']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: false,
              target: 'es5',
              module: 'commonjs'
            },
            transpileOnly: true
          }
        }]
      }, {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, '../assets')
        ],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
        ]
      }, {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, '../assets/icons')
        ],
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.js$/,
        include: source,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      }],
      noParse: [
        /\/node_modules\/clone\/clone\.js$/,
        /\/node_modules\/eventemitter3\/index\.js$/,
        /\/node_modules\/extend\/index\.js$/
      ]
    },
    optimization: {
      minimize: false
    },
    plugins: [
      bannerPack,
      constantPack,
      new MiniCssExtractPlugin()
    ]
  };

  return config;
};
