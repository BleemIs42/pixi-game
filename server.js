import devServer from './build/dev-server'
import build from './build/build'
import config from './build/config'

if(config.env === 'production' || config.env === 'preview'){
    build()
}else if(config.env === 'development'){
    devServer()
}else{
    console.log(`NODE_ENV="${config.env}" isn't matched, please check NODE_ENV right...`)
}
