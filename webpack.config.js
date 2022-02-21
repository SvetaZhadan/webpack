const path = require('path'),
  glob = require('glob'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  webpack = require('webpack');

let mode = 'development',
  target = 'web';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

let plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './app/assets',
        to: './assets',
        noErrorOnMissing: true,
      },
    ],
  }),
];
MultiplePages(glob.sync('./app/pug/*.pug'));

function MultiplePages(paths) {
  for (const html of paths) {
    let split = html.split('/'),
      outName = split[split.length - 1];
    outName = outName.split('.')[0];
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, html),
        filename: `pages/${outName}.html`,
        hash: true,
        minify: false,
      })
    );
  }
}

module.exports = {
  entry: {
    index: path.resolve(__dirname, './app/imports.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    open: '/pages',
    watchFiles: ['app/pug/**/*'],
  },
  mode: mode,
  target: target,
  devtool: 'source-map',
  plugins: plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      //Gif
      new ImageMinimizerPlugin({
        test: /\.gif$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['gifsicle', { interlaced: true, optimizationLevel: 3 }]],
          },
        },
      }),
      // Jpeg
      new ImageMinimizerPlugin({
        test: /\.(jpg|jpeg)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['mozjpeg', { progressive: true, quality: 70 }]],
          },
        },
      }),
      // Png
      new ImageMinimizerPlugin({
        test: /\.png$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['pngquant', { quality: [0.6, 0.8] }]],
          },
        },
      }),
      // Webp
      new ImageMinimizerPlugin({
        test: /\.webp$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['webp', { quality: 75 }]],
          },
        },
      }),
      // Svg
      new ImageMinimizerPlugin({
        test: /\.svg$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          sortDefsChildren: false,
                          mergePaths: false,
                          moveGroupAttrsToElems: false,
                          moveElemsAttrsToGroup: false,
                          cleanupNumericValues: false,
                          removeNonInheritableGroupAttrs: false,
                          convertTransform: false,
                          cleanupEnableBackground: false,
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
      // Минификация JS
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  module: {
    rules: [
      // Pug
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      // CSS
      {
        test: /\.(sass|scss|css)$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
