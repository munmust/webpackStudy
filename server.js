const express =require('express');
const webpack =require('webpack');
const webpackDevMiddleware=require('webpack-dev-middleware');
const config=require('./webpack.config.js');
const complier=webpack(config);
//起一个服务器
const app=express();
app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath
}))
//服务器监听3000端口 执行函数
app.listen(3000,()=>{})