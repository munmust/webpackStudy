const path=require('path');


module.exports={
    mode:'production',
    entry:'./src/index.js',
    //忽略的引用库
    //externals:["lodash"],
    externals:{
        lodash:{
            //使用的是script的标签
            root:'',
            //使用require的时候引用的库名字
            commonjs:'lodash'
        }
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'library.js',
        //可以用<script>标签来引入这个库
        library:'library',
        //让你无论用什么方法都可以引用这个库
        libraryTarget:'umd',
    }
}