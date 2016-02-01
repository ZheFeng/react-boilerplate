import fs from 'fs';
import path from 'path';
import qiniu from 'qiniu';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import webpack from 'webpack';
import buildConfig from './webpackConfigs/production';
import async from 'async';

function clean() {
  return del.sync('build');
}

function webpackBuild(callback) {
  if (process.env.NODE_ENV === 'production') {
    buildConfig.plugins = buildConfig.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }
  buildConfig.output.publicPath = cdnPath;
  webpack(buildConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    webpackStats(stats);
    callback();
  });
}

gulp.task('webpackBuild', webpackBuild);
gulp.task('createDist', ['webpackBuild'], lib);
gulp.task('clean', clean);
gulp.task('createBootHtml', createBootHtml);
gulp.task('build', ['clean', 'createDist'], createBootHtml);
gulp.task('deploy', ['build'], uploadQiniu);
