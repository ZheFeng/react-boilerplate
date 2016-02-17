import path from 'path';
import { config } from '../package';

const buildPath = path.join(
  ...[__dirname, '..'].concat(config.path['webpack-build'])
);

export default function getChunckPath(chunckName) {
  if (process.env.NODE_ENV === 'production') {
    const stats = require(`${buildPath}/stats`);
    return `${config.path.publicPath}${stats.assetsByChunkName[chunckName]}`;
  }
  return `${chunckName}.js`;
}
