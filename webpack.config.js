const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const packageJSON = require('./package');

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

let PROJECT_ENV = {
    proxyV2: 'https://apijumboweb.smdigital.cl/proxy/api/v2',
    proxy: 'https://apijumboweb.smdigital.cl/proxy/api/v1',
    ordersV2: 'https://apijumboweb.smdigital.cl/orders/api/v2',
    ordersV3: 'https://apijumboweb.smdigital.cl/orders/api/v3',
    orders: 'https://apijumboweb.smdigital.cl/orders/api/v1',
    user: 'https://apijumboweb.smdigital.cl/user/api/v1',
    userAddress: 'https://apijumboweb.smdigital.cl/user/address/api/v1',
    shoppingList: 'https://apijumboweb.smdigital.cl/shopping-list/api/v1',
    salesChannelV2: 'https://apijumboweb.smdigital.cl/sales-channel-geolocation/api/v2',
    salesChannel: 'https://apijumboweb.smdigital.cl/sales-channel-geolocation/api/v1',
    promotions: 'https://apijumboweb.smdigital.cl/promotions/api/v1',
    express: 'https://api.smdigital.cl:8443/v0/cl/juboAhoraWeb/proxy/CMS',
    search: 'https://apijumboweb.smdigital.cl/search/api/v1',
    abandonedCart: 'https://apijumboweb.smdigital.cl/abandoned-cart/api/v1',
    apiKey: '5CIqbUOvJhdpZp4bIE5jpiuFY3kLdq2z'
};

let publicPath = '/';
let urlPath = '';

module.exports = env => {

    const production = env && env.production;

    const postcssPlugins = [
        require('autoprefixer')({})
    ];

    if(env && env.NODE_ENV === 'local'){
        PROJECT_ENV = Object.assign(PROJECT_ENV, {
            proxy: 'http://localhost:3001/api/v1',
            orders: 'http://localhost:3002/api/v1',
            user: 'http://localhost:3003/api/v1',
            userAddress: 'http://localhost:3004/api/v1',
            shoppingList: 'http://localhost:3005/api/v1',
            salesChannel: 'http://localhost:3006/api/v1',
            promotions: 'http://localhost:3000/api/v1'
        });
    }

    if(env && env.NODE_ENV === 'development'){
        PROJECT_ENV = Object.assign(PROJECT_ENV, {
            authDevelopment: true
        });
    }

    if(env && env.NODE_ENV === 'production') {
        publicPath = 'https://cl-sisa-web-front-assets.smdigital.cl/';
    }

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

    PROJECT_ENV.s3 = publicPath;

    plugins.push(new webpack.DefinePlugin({ PROJECT_ENV: JSON.stringify(PROJECT_ENV) }));
    plugins.push(new webpack.DefinePlugin({ VERSION_ENV: JSON.stringify(packageJSON.version) }));
    plugins.push(new webpack.DefinePlugin({ PATH_ENV: JSON.stringify(urlPath) }));

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
