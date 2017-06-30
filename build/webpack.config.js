import {
    resolve
} from 'path'
import webpack from 'webpack'

export default {
    resolve: {
        extensions: ['.js']
    },
    entry: resolve(__dirname, '../src/lib'),
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'pixi-game.min.js',
        publicPath: '/',
        library: 'pixi-game',
        libraryTarget: "umd"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: JSON.stringify('production'),
            DEBUG: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
}