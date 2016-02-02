import { config } from './package';
import path from 'path';
import webpack from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const { NODE_ENV, APP_NAME } = process.env;
const production = NODE_ENV === 'production';
const development = !NODE_ENV || NODE_ENV === 'development';
const filename = APP_NAME ? `${APP_NAME}.dev.js` : '[name]_[chunkhash].js';

const entries = {
  admin: './client/admin.js',
  consumer: './client/consumer.js',
  admin_lib: ['immutable'],
  base: ['react'],
};
const entry = APP_NAME ? entries[APP_NAME] : entries;
const output = {
  path: path.join.apply(
    path,
    [__dirname].concat(config.path['webpack-build'])
  ),
  filename,
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    __DEV__: development,
  }),
];

if (!APP_NAME) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['share', 'admin_lib', 'base'],
    // (choose the chunks, or omit for all chunks)
    children: false,
    // (select all children of chosen chunks)
    filename,
    // minChunks: 3,
    // (3 children must share the module before it's moved)
  }));
  plugins.push(new StatsWriterPlugin());
}

if (production) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: { warnings: false },
  }));
}


const webpackSettings = {
  entry,
  output,
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins,
};

if (development) {
  webpackSettings.devtool = 'eval';
}

export default webpackSettings;
