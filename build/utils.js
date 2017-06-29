import path from 'path'
import glob from 'glob'
import config from './config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'
const generateLoaders = loader => {
    var loaders = [{
        loader: 'css-loader',
        options: {
            minimize: isProduction,
            sourceMap: !isProduction
        }
    }]
    if (loader) {
        loaders.push({
            loader: loader + '-loader',
            options: {
                sourceMap: !isProduction
            }
        })
    }
    if (isProduction) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader',
            publicPath: !config.build.publicPath ? '../../' : config.build.publicPath
        })
    } else {
        return ['vue-style-loader'].concat(loaders)
    }
}

export const cssLoaders = {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('sass')
}

export const getEntries = (globPath) => {
    let entries = {}
    glob.sync(globPath).forEach(entry => {
        const basename = path.basename(entry, path.extname(entry))
        const tmp = entry.split('/').splice(-3)
        const pathname = tmp.splice(1, 1) + '/' + basename;
        entries[pathname] = entry

        // entries[basename] = entry
    })

    return entries
}

export const htmlPlugins = (() => {
    let plugins = [];
    const pages = getEntries(path.join(config.dev.srcRoot, '/module/**/*.html'))
    for (const page in pages) {
        const filename = pages[page].split('/').slice(-1)[0]
        const conf = {
            filename: filename,
            template: pages[page],
            inject: true,
            favicon: getEntries(path.join(config.dev.srcRoot, 'assets/favicon.ico'))['assets/favicon'],
            chunks: Object.keys(pages).filter(item => {
                return (item == page)
            }).concat(['vendor/vendor'])
        }
        plugins.push(new HtmlWebpackPlugin(conf))
    }
    return plugins
})()