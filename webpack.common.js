const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const SRC_DIR = path.resolve(__dirname, 'schedule.websitev2');
const BUILD_DIR = path.resolve(__dirname, './release/website');
const WIDGET_DIR = path.resolve(__dirname, './src/plugins');

const extractSass = new ExtractTextPlugin({
    filename: 'style.[hash].css',
});

const copyFiles = new CopyWebpackPlugin([
    //{ from: 'public/iconfont/iconfont.*', to:  `${BUILD_DIR}/iconfont/`,flatten:true,force:true},
    //{ from: 'public/images/*', to:  `${BUILD_DIR}/images/`,flatten:true,force:true},
	//{ from: 'widget/map-gl/src/sprites/*', to:  BUILD_DIR,flatten:true,force:true},
    //{ from: 'public/fonts/', to: `${BUILD_DIR}/fonts/`, toType: 'dir' , force:true}
]);


if(argv.Program === 'schedule'){
    var entry = {
        index: [
			`babel-polyfill`,
            `./index.js`,
            `./Page/scss/smartScheduling.scss`,
        ],
    };
    var htmlWebpack = new HtmlWebpackPlugin({
		title:'智能排班',
		template: './public/index.html',
		vue: true,
    });
	let vueLoaderPlugin = new VueLoaderPlugin();
    var plugins=[
        extractSass,
        htmlWebpack,
        copyFiles,
		vueLoaderPlugin,
    ]
}

module.exports = {
    entry: entry,
    output: {
        filename: '[name].[hash].js',
        path: BUILD_DIR,
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                loader: 'worker-loader',
            },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: [WIDGET_DIR, /node_modules/],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                    },
                },
            },
            {
                test: /\.js$/,
				exclude: [WIDGET_DIR, /node_modules/],
				use:[{
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-env', 'vue'],
						plugins: [
							'@babel/plugin-syntax-dynamic-import'
							//'react-hot-loader/babel',
							//'transform-inline-environment-variables',
							//'transform-decorators-legacy',
							//'transform-runtime',
						],
					},
				}]
            },
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                        options: {
                            alias: {
                                './images': './Pages/assets',
                                './fonts': './public/fonts',
                            },
                            sourceMap: true,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                //require('postcss-svg')({
                                    //dirs: ['./public/'],
                                    //svgo: {plugins: [{cleanupAttrs: true}]},
                                //}),
                                //require('precss')(),
                                //require('postcss-cssnext')(),
                                require('postcss-pxtorem')({
                                    rootValue: 16,
                                    propList: ['*'],
                                    selectorBlackList: ['body'],
                                }),
                                require('postcss-automath')(),
                                require('cssnano')({
                                    preset: [
                                        'default', {
                                            discardComments: {removeAll: true},
                                            svgo: {plugins: [{removeDoctype: true}]},
                                        }],
                                }),
                            ],
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true,
                        },
                    }],
            },
            {
                test: /\.css$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // loader: 'file-loader',
                        options: {
                            name: './img/[name].[hash].[ext]',
                        },
                    }],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]',
                },
            },
            // {
            //     test: /\.hbs$/,
            //     use: [{loader: 'handlebars-loader'}],
            // },
        ],
    },
    resolve: {
        modules: [SRC_DIR, 'node_modules', 'common', 'lib','./Page/components']
    },
    plugins: plugins,
    //stomp 报错 找不到 net 模块
    node: {
        fs: 'empty',
        net: 'empty',
    },
};

