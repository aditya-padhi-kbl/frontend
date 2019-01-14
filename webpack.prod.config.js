const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const devConfig = {
    mode: 'production',
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
        extensions: [".ts", ".tsx", ".js", ".json"]
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
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { 
                        // this loader extracts the css and minifies them.  Use only in Prod mode instead of style loader
                        loader: MiniCssExtractPlugin.loader 
                    },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    }
                ]
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
                    html5 : true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: false,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributese : true,
                    useShortDoctype: true
                }
            }),
            new CleanWebpackPlugin(['dist']),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
              })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        dead_code: true
                    },
                    output: {
                        beautify: true
                    }
                },

                sourceMap: true,
                exclude: /node_modules/,
                parallel: true,
                
                
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    }
}

module.exports = devConfig;
