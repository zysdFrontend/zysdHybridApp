const path = require('path'); //路劲模块
const webpack = require('webpack'); //webpack模块
const { VueLoaderPlugin } = require('vue-loader'); //渲染vue模板模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模块
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离样式
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包删除旧文件

const isDev = process.env.NODE_ENV === "development"; //判断是否为开发模式

const config = {
	devtool: false,
	entry: { //入口配置
		index: path.join(__dirname, 'src/index.js') //入口js文件
	},
	output: { //输出配置
		path: path.join(__dirname, 'dist'), //输出路径
		//  publicPath: '/',//发布路径前缀
		filename: 'js/[name].js' //输出文件名+哈希值
	},
	module: {
		rules: [{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
			},
			{
				test: /\.json$/,
				use: ['json-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
            {
                test: /\.(jpg|png|jpeg|gif|ico|bmp|Webp)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
			{
				test: /\.(woff2|woff|svg|eot|ttf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader'
                }]
			}
		]
	},
	plugins: [
		//把模式变量添加到webpack全局变量中
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HtmlWebpackPlugin({ //生成html插件
			filename: 'index.html', //html文件名
			template: 'index.html', //生成html的模板
			// historyFallback : {},//单页面应用记录历史
			chunks: ['index'],
			minify: {
				collapseWhitespace: true, //合并空格
				removeComments: true, //去掉注释
				removeEmptyAttributes: true, //去掉空属性
				collapseInlineTagWhitespace: true, //合并内联空格
				minifyCSS: true, //压缩css
				minifyJS: true //压缩js
			},
			inject: 'body' //script标签插入的位置（head,body,false）
		}),
		new webpack.ProvidePlugin({
			jQuery: 'zepto-webpack',
			$: 'zepto-webpack'
		}),
		new VueLoaderPlugin(), //渲染vue模板插件
		new CleanWebpackPlugin(['dist/js/*.js', 'dist/css/*.css'], {
			root: __dirname,//根目录
			verbose: true,//开启在控制台输出信息
			dry: false//启用删除文件
		})
	]
}
//开发模式
if (isDev) {
	//调试模式
	config.devtool = '#cheap-module-eval-source-map'
	//调试服务器
	config.devServer = {//本地服务器配置
		port: "8089", //端口号
		host: "0.0.0.0", //可通过localhost或本机ip访问
		overlay: {
			error: true //把错误都显示在网页上
		},
		contentBase: "./dist", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, // 任意的 404 响应都替代为 index.html
		hot: true, // 启用 webpack 的模块热替换特
		proxy: {
			"/UCG_OSS": {    //需要代理的路径
			  target: "http://192.168.13.220:8090",  //需要代理的域名
			  pathRewrite: {'^/' : ''}
			}
		  }
	}
	//	添加热加载插件
	config.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), //HMR
		new webpack.NoEmitOnErrorsPlugin()
	)
	config.module.rules.push({
		test: /\.css$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					minimize: true //css压缩
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						return [
							require('autoprefixer')({
								"browsers": "last 5 version"
							})
						]
					}
				}
			}
		]
	}, {
		test: /\.(scss)$/,
		use: [{
			loader: 'style-loader',
		}, {
			loader: 'css-loader',
		}, {
			loader: 'postcss-loader',
			options: {
				plugins: function () {
					return [
						require('precss'),
						require('autoprefixer')
					];
				}
			}
		}, {
			loader: 'sass-loader' // compiles Sass to CSS
		}]
	}, {
		test: /\.less$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						return [
							require('autoprefixer')({
								"browsers": "last 5 version"
							})
						]
					}
				}
			},
			'less-loader'
		]
	});
} else { //生产模式
	config.plugins.push(
		new ExtractTextPlugin('css/common-[hash:8].css')
	)
	config.module.rules.push({
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						minimize: true //css压缩
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"browsers": "last 5 version"
								})
							]
						}
					}
				}
			]
		})
	}, {
		test: /\.less$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"browsers": "last 5 version"
								})
							]
						}
					}
				}, 'less-loader'
			]
		})
	});
}

module.exports = config;