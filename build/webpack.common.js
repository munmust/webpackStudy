//共用的webpack配置
const HtmlWebpackPlugin=require('html-webpack-plugin');
const path=require('path');
const webpack=require('webpack');
module.exports={
  
    //打包入口文件
    //可以有多个入口 
    entry:{
        main:"",
        two:""
    },
    module:{
        rules:[
            {
            //当文件为.jpg时
            test:"/\.(png|jpe?g|gif)$/i",
            //使用的loader
            use:{
                loader:'file-loader',
                //二外配置项
                options:{
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
                    name:'[name].[ext]',
                    //打包的文件存放的文件夹
                    outputPath:'images/'
                }
            }},{
            test:"/\.(png|jpe?g|gif)$/i",
            //使用的loader
            use:{
                //url-loader会打包为一个base64的文件存放在js中而不是一个图片
                loader:'url-loader',
                //二外配置项
                options:{
                    //文件大小的限制
                    limit:'',
                    //当文件大小超过限制时使用什么进行loader进行打包
                    fallback:''
                 
                }
            }},{
                test:/\.css$/,
                use:{
                    //loader会从下到上，从右到左的顺序
                    loader:[
                        //将css文件挂载到页面的header中生成style引入最终的css文件
                        'style-loader'
                        ,
                        //分析几个css文件的关系，最终生成一个css文件
                        {
                            loader:'css-loader',
                            use:{
                                //import方法引入css也会先走两个loader
                                importLoaders:2,
                                //css模块化
                                /*
                                    防止样式修改到其他的文件的样式
                                    防止样式的冲突
                                */
                                module:true,
                            }
                        },
                        //sass文件的打包loader 作用类似css-loader
                        'sass-loader',
                        //自动添加厂商前缀的loader
                        'postcss-loader'
                    ],


                }
            } ,{
                //字体文件打包
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:{
                    loader:'file-loader',
                }
            },{
                test:/\.js$/,
                //除去在/babel_modules文件下的文件
                exclude:/babel_modules/,
                use:{
                    loader:'babel-loader',
                
                }
            }
        ]
    },
    plugins:[
        //使用HtmlWebpackPlugin插件
        new HtmlWebpackPlugin({
            //生成的html文件使用的模板
            template:"./src/index.html"
        }),
        //当我打包前删除第三天文件目录下的文件(默认认为配置文件的目录为根目录，清除的是根目录的指定文件)
        //定义根目录
        new CleanWebpackPlugin(['../dist'],{root:path.resolve(__dirname,'../')}),
        //自己定义
        new webpack.ProvidePlugin({
            //当你使用了$将会自动的帮助你导入jquery
            $:'jquery'
        })
    ],
    optimization:{
        usedExports:true,
        //代码分割  
        splitChunks:{
            //
            chunks:'all',
            //大于的时候打包时做代码分割
            minSize:30000,
            //当模块大于该值时，会尝试将这个模块进行二次分割，分割成 大小/maxSize=个数个
            maxSize:0,
            //当一个模块引入至少用了多少次之后会进行代码分割
            minChunks:1,
            //同时加载的模块库 当超过的时候将不会再进行代码分割
            maxAsyncRequests:5,
            //当首页进行加载的时候最多可以做的代码分割数
            maxInitialRequests:3,
            //文件名链接的时候的连接符
            automaticNameDelimiter:'~',
            //允许的名字的最大字符
            automaticNameMaxLength:30,
            //文件的名字走下面cacheGroups
            name:true,
            //同步代码的时候的组
            cacheGroups:{
                vendors:{
                    //从/node_module文件下的文件进行代码分割的配置
                    test:/[\\/]node_modules[\\/]/,
                    //打包时的优先值越大越优先
                    priority:-10,
                    //存放在vendor.js文件下
                    filename:'vendors.js',
                }
            },
            default:{
                priority:-2,
                //如果之前的导报里已经有打包的模块则不会再次打包，而是复用
                reuseExistingChunk:true,
                //打包到的文件
                filename:'common.js'
            }
        }
    },
        //打包出口文件
        output:{
            //打包文件的引用前面都加一个
            publicPath:'/',
            //filename文件的异步加载的文件
            chunkFilename:'[name].chunk.js',
            //打包后的文件名
            //[name]:默认为入口文件下设置的文件名
            filename:[name].js,
            //引入的js的前缀地址
            publicPath:"",
            //打包文件存放的文件夹
             path:path.resolve(__dirname,"")  //根路径下的.....
        },
}
module.exports=(env)=>{
    if(env && env.production){
        return merge()
    }else{
        return merge();
    }
}