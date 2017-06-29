import path from 'path'

const env = process.env.NODE_ENV
console.log(`🌹  NODE_ENV: "${env}"\n`)

export default {
    env: env,
    dev: {
        port: 8001,
        srcRoot: path.resolve(__dirname, '../src'),
        publicPath: '' ,
        proxyTable: {
            '/api': {
                target: 'http://fans.in66.com/',
                changeOrigin: true,
                logs: true
            },
            '/mock': 'http://fans.in66.com/',
            '/wechat': 'http://fans.in66.com/'
        }
    },
    build: {
        port: 9001,
        distRoot: path.resolve(__dirname, '../dist'),
        // 空值使css文件里边的图片路径为 '../../images/', 
        // 有值替换为相应的值,配置见 utils.js
        publicPath: '' 
    }
}
