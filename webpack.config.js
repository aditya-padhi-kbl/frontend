const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        './src/index.tsx'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename : '[name].[hash].chunk.js',
        publicPath: ''
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                include: path.join(__dirname, "src"),
                use: [{loader: 'babel-loader'}, {loader: 'ts-loader'}]
            },
            {
                test: /\.(css|less)$/,
                use: [ 
                    {"loader": 'style-loader'}, 
                    // {"loader": 'css-loader'},
                    {"loader": 'css-loader?modules'}, 
                    {"loader": 'less-loader'} 
                ],
            },
            
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        stripdeclarations: true
                    }
                }
            }
        ]
    },
    plugins: [
            new HTMLWebpackPLugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: 'index.html',
                inject: 'body',
                hash: true,
                minify: {
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes: true
                }
            }),
            new webpack.NoEmitOnErrorsPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    }
}

module.exports = devConfig;
