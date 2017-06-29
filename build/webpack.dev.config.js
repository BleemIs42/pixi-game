import path from 'path'
import webpack from 'webpack'
import config from './config'
import baseWebpackConfig from './webpack.base.config'
import { getEntries } from './utils'

let jsEntries = getEntries(path.join(config.dev.srcRoot, '/module/**/*.js'))

Object.keys(jsEntries).forEach(function (name) {
  jsEntries[name] = [path.resolve(__dirname, './dev-reload.js')].concat(jsEntries[name])
})

export default Object.assign({}, baseWebpackConfig, {
    entry: Object.assign({}, baseWebpackConfig.entry, jsEntries),
    output: {
        path: config.dev.srcRoot,
        publicPath: config.dev.publicPath,
        filename: 'js/[name].js'
    },
    plugins: [
        ...baseWebpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})
