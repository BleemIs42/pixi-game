import path from 'path'
import config from './config'
import webpack from 'webpack'
import { getEntries, cssLoaders } from './utils'
import baseWebpackConfig from './webpack.base.config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const jsEntries = getEntries(path.join(config.dev.srcRoot, '/module/**/*.js'))

export default Object.assign({}, baseWebpackConfig, {
    entry: Object.assign({}, baseWebpackConfig.entry, jsEntries),
    output: Object.assign({}, baseWebpackConfig.output, {
        path: config.build.distRoot,
        publicPath: config.build.publicPath,
        filename: 'js/[name].[chunkhash:10].js'
    }),
    devtool: false,
    plugins: [
        ...baseWebpackConfig.plugins,
        new ExtractTextPlugin({
            filename: "css/[name].[contenthash:10].css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
