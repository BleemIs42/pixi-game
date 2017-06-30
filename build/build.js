import webpack from 'webpack'
import config from './webpack.config.js'

webpack(config, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})