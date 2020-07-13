const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    hash: false,
    minify: {
        html5: false,
        collapseWhitespace: false,
        removeComments: true
    },
    filename: 'index.html',
    template: __dirname + '/public/index.html',
    inject: false
}));

plugins.push(new CopyWebpackPlugin({
    patterns: [
        'public/manifest.json'
    ]
}));

plugins.push(new MiniCssExtractPlugin({
    filename: '[hash]-styles.css',
    chunkFilename: '[hash]-[id].css',
    ignoreOrder: true,
}));

let publicPath = '/';

module.exports = env => {

    const production = env && env.production;

    const postcssPlugins = [
        require('autoprefixer')({})
    ];

    if(production) {
        plugins.push(new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'build'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 480,
            height: 640,
            penthouse: {
                blockJSRequests: false,
            }
        }));

        plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

        postcssPlugins.push(require('cssnano')());
    }

    return {
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: '[chunkhash]-bundle.js',
            chunkFilename: '[chunkhash]-[name].bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: publicPath
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use:  'eslint-loader'
                },
                {
                    test: /\.jsx?$/,
                    use: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [ {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },'css-loader', 'postcss-loader' ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    includePaths: ["src/app"]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /font.*\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9-]+)?$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: '[hash].[ext]'
                        }
                    },
                },
                {
                    test: /\.html$/,
                    exclude: /index.html$/,
                    use: ['file-loader?name=[hash]-[name].[ext]', 'extract-loader',{
                        loader: 'html-loader?interpolate',
                        options: {
                            minimize: true,
                            removeComments: true
                        }
                    }]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            stats: {
                children: false,
                modules: false
            }
        },
        resolve: {
            alias: {
                hooks: path.resolve(__dirname, 'src/app/hooks/'),
                components: path.resolve(__dirname, 'src/app/components/'),
                services: path.resolve(__dirname, 'src/app/services/'),
                pages: path.resolve(__dirname, 'src/app/pages/'),
                scss: path.resolve(__dirname, 'src/app/scss/')
            }
        },
        devtool: "source-map",
        plugins,
        stats: {
            children: false,
            modules: false,
            performance: false
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                automaticNameDelimiter: '~',
                automaticNameMaxLength: 30,
                cacheGroups: {
                    react: {
                        test: /(\/)node_modules(\/)(react(?!-lottie))(\/?)/,
                        name: 'react',
                        priority: -10
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/](!react)(!react-[^\*]+)(!react-lottie)(!lottie-web)[\\/]/,
                        name: 'vendor',
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        externals: {}
    };
};
