//webpack --config webpackconfig.js

//tree Shaking 只会打包引入的东西 
//只支持 ES Module方法引入
//例如定义了一个模块两个方法min和max 在别的文件下导入了min方法，那么只会打包min方法，而max方法不会打包


//打后结束后自动添加html文件并把打包的js文件自动引入该html文件
//打包自动生成index--->使用定义的html格式----->注入打包的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//打包前将前打包的文件清除
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');
//连接两个配置文件的插件
const merge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.js/index.js');

const path = require('path');
//告诉webpack已什么配置文件打包
//webpack的模块
const devConfig = {
    //有问题的时候会在网页弹出错误
    overlay: true,
    //打包的模式(是否压缩打包)
    mode: "development/production",
    //development:
    //production:

    //开发下的服务器
    devServer: {
        //服务器起在哪个文件夹下
        contentBase: '',
        //自动打开一个页面
        open: true,
        //关于路由的配置 BrowserRouter 的方法
        historyApiFallback: true,
        // historyApiFallback:{
        //     //自己写路由规则
        //     rewrites:[{
        //         //当访问XX 定向到 XXX
        //         form:'/abc',
        //         to:'/list'
        //     }]
        // },
        //地址的代理（当访问了8000端口的api地址的话转到3000端口
        proxy: [
            //当你访问/api下的全部接口的时候都将他们代理到http://XXXXX服务器上
            {
                //对根目录进行代理    就是  /
                index: '',
                //需要代理的接口的集合
                context: ['/api', 'auth'],
                //目标代理服务器
                target: "http://1244344",
                //请求的拦截
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log("XXXX");
                        return false;
                    }
                },
                //防止其他网站不支持origin
                changeOrigin: true,
                //球盖请求头的配置
                headers: {
                    cookie: '',
                    host: ''
                },

                //实现对https网址的转发
                secure: false,
                pathRewrite: {
                    //当你拿header.js的数据的时候转为拿demo.json 的数据
                    'header.json': 'demo.json'
                }
            }
        ],
        //打开的端口号
        prot: "",
        //热模块替换HMR 样式改变，不刷新页面，只修改配置
        //是否开启
        hot: true,
        // //浏览器自动刷新
        // hotOnly:true
    },
    //devtool
    devtool: "source-map",
    //source-map  它是一个映射关系，它知道打包文件下的内容实际对应的文件的地址
    //inline 将映射关系转化为base64写到打包的js文件中。
    //cheap 只对应业务代码 精确的行，并不需要到列
    //module   不仅只管业务代码，也管使用的模块
    //eval  使用eval的方式引用
    //development环境下   使用 cheap-module-eval-source-source-map 错误提示比较全，打包速度快
    //production环境下    使用cheap-module-source-map


    //打包入口文件
    //可以有多个入口 
    entry: {
        main: "",
        two: ""
    },
    //打包出口文件
    output: {
        //打包文件的引用前面都加一个
        publicPath: '/',
        //打包后的文件名
        //[name]:默认为入口文件下设置的文件名
        filename: [name].js,
        //引入的js的前缀地址
        publicPath: "",
        //打包文件存放的文件夹
        path: path.resolve(__dirname, "") //根路径下的.....
    },
    resolve: {
        extensions:['js','jsx'],
        //引入文件的名字 会对导报效率有影响
        mainFiles:['index','child'],
        alias:{
            //当我看到xxx的时候其实是别的文件的别名
            XXX:path.resolve(__dirname,'../XXX')

        }
    },

    //模块打包配置
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                //自哟普src文件夹下的文件才进行
                include: path.resolve(__dirname, '../src'),
                //使用eslint的检测,一般不使用eslint-loader
                use: ['babel-loader', {
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        cache: true
                    }
                }],
                force: 'pre'
            },
            {
                //当文件为.jpg时
                test: "/\.(png|jpe?g|gif)$/i",
                //使用的loader
                use: {
                    loader: 'file-loader',
                    //二外配置项
                    options: {
                        //打包后文件的名字
                        //pla       占位符
                        /*
                        [ext] 文件/资源扩展名（jpg，js....）
                        [name] 文件的基名（原本的文件名）
                        [path]  文件相对webpack/config的路径context
                        [emoji]  一个随机的表情符号表示content
                        [emoji:<length>] :定义多个数量的表情符号表示content
                        [hash]  指定用于散列文件内容的哈希方法
                        [contenthash] 指定散列文件的内容的哈希方法
                        [N] 从匹配当前文件名获取第n个匹配的regExp
                        */
                        name: '[name].[ext]',
                        //打包的文件存放的文件夹
                        outputPath: 'images/'
                    }
                }
            }, {
                test: "/\.(png|jpe?g|gif)$/i",
                //使用的loader
                use: {
                    //url-loader会打包为一个base64的文件存放在js中而不是一个图片
                    loader: 'url-loader',
                    //二外配置项
                    options: {
                        //文件大小的限制
                        limit: '',
                        //当文件大小超过限制时使用什么进行loader进行打包
                        fallback: ''

                    }
                }
            }, {
                test: /\.css$/,
                use: {
                    //loader会从下到上，从右到左的顺序
                    loader: [
                        //将css文件挂载到页面的header中生成style引入最终的css文件
                        'style-loader',
                        //分析几个css文件的关系，最终生成一个css文件
                        {
                            loader: 'css-loader',
                            use: {
                                //import方法引入css也会先走两个loader
                                importLoaders: 2,
                                //css模块化
                                /*
                                    防止样式修改到其他的文件的样式
                                    防止样式的冲突
                                */
                                module: true,
                            }
                        },
                        //sass文件的打包loader 作用类似css-loader
                        'sass-loader',
                        //自动添加厂商前缀的loader
                        'postcss-loader'
                    ],


                }
            }, {
                //字体文件打包
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                }
            }, {
                test: /\.js$/,
                //除去在/babel_modules文件下的文件
                exclude: /babel_modules/,
                use: {
                    loader: 'babel-loader',

                }
            }
        ]
    },
    //在webpack运行到摸个时刻做的事情
    //使用插件
    plugins: [
        //使用HtmlWebpackPlugin插件
        new HtmlWebpackPlugin({
            //生成的html文件使用的模板
            template: "./src/index.html"
        }),
        //当我打包前删除第三天文件目录下的文件
        new CleanWebpackPlugin(['dist']),
        //热模块替换插件（例如：你只修改了样式，只要样式发生改变，并不需要页面进行刷新）
        //                    你修改一个文件的js不去修改其他的js    
        //if(module.hot){module.hot.accept('',()=>{})}
        new Webpack.HotModuleReplacementPlugin()
    ],
    //开发环境使用tree Shaking的方法
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig);

/**
 * loader  打包的方案
 */

/*
Hash:           //本次打包的唯一哈希值
Version：       //对应的webpack版本
Time：          //打包用时
Build at：      //打包时间
Asset 打包出的文件  Size 打包出的大小  Chunks 每一个js文件对应的id Chunk Name 每个文件对应的名字


*/