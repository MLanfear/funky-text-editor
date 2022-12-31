const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.


module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        title: 'Webpack Plugin'
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        name:'Just Another Text Editor',
        short_name:'JATE',
        description:'Online and offline text editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96,128,192,256,384,512],
            destination: path.join('assets','icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            destination: path.join('assets','icons'),
            purpose: 'maskable'
          }
        ]
      })
    ],

    module: {
      rules: [ //Rules for how these filetypes get added
        {
          test: /\.(png|svg|jpeg|jpg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: 'defaults'}]
              ]
            }
          }
        }
      ],
    },
  };
};