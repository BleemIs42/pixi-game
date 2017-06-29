import path from 'path'
import webpack from 'webpack'
import px2rem from 'postcss-px2rem'
import autoprefixer from 'autoprefixer'
import config from './config'
import {
    cssLoaders,
    htmlPlugins
} from './utils'


export default {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'module': path.resolve(__dirname, '../src/module'),
            'lib': path.resolve(__dirname, '../lib'),
        }
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: cssLoaders,
                        postcss: [
                            px2rem({
                                remUnit: 40
                            }),
                            autoprefixer({
                                browsers: ['>1%']
                            })
                        ]
                    }
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                use: ['vue-html-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:10].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'css/fonts/[name].[hash:10].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        ...htmlPlugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.env)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor/vendor',
            filename: 'vendor.bundle.js'
        })
    ]
}