//postcss-loader的配置文件
module.exports={
    plugins:[
        //自动添加厂商前缀的插件
        require('autoprefixer'),
        // 'postcss-import':{},
        // 'postcss-preset-env':{},
        // 'cssnano':{}
    ]
}