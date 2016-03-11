import { config } from './package';
import path from 'path';
import webpack from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const isDevelopment = !NODE_ENV || NODE_ENV === 'development';
const filename = isProduction ? '[chunkhash].js' : '[name].js';

const entry = {
  admin: './client/admin.js',
  consumer: './client/consumer.js',
  // admin_lib: ['immutable'],
  base: ['react', 'react-router', 'react-dom'],
};


const output = {
  path: path.join.apply(path, [__dirname].concat(config.path['webpack-build'])),
  filename,
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['base'],
    children: false,
    filename,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    __DEV__: isDevelopment,
    __PROD__: isProduction,
  }),
  new StatsWriterPlugin(),
];


const webpackConfig = {
  entry,
  output,
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style!css'] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  plugins,
};

if (isProduction) {
  webpackConfig.output.publicPath = config.publicPath;
  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: { warnings: false },
  }));
}

export default webpackConfig;
