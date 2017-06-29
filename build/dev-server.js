import ip from 'ip'
import webpack from 'webpack'
import config from './config'
import Koa from 'koa'
import proxy from 'koa-proxies'
import history from 'koa-connect-history-api-fallback'
import devConfig from './webpack.dev.config'
import {
    devMiddleware,
    hotMiddleware
} from './webpackMiddleware'

export default () => {

    const app = new Koa()

    const proxyTable = config.dev.proxyTable;
    Object.keys(proxyTable).forEach(context => {
        let options = proxyTable[context]
        if (typeof options === 'string') {
            options = {
                target: options,
                changeOrigin: true,
                logs: true
            }
        } 
        console.log(`🌹  Proxy ${context} --> ${options.target}`)
        
        app.use(proxy(context, options))
    })

    const compiler = webpack(devConfig)
    const hotMiddlewareCompliler = hotMiddleware(compiler)
    const devMiddlewareCompliler = devMiddleware(compiler, {
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    })

    app.use(history({
        verbose: true
    }))
    app.use(hotMiddlewareCompliler)
    app.use(devMiddlewareCompliler)

    const port = config.dev.port || 8000;
    app.listen(port, () => {
        console.log(`\n🌹  Listening at http://localhost:${port}`)
        console.log(`🌹  Listening at http://${ip.address()}:${port}\n`)
    })

    // webpack(devConfig, (err, stats) => {
    //   if (err) throw err
    //   process.stdout.write(stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: false,
    //     chunks: false,
    //     chunkModules: false
    //   }) + '\n')
    // })

}