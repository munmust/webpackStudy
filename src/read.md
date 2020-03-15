--- 代码分隔 Code Splitting

//例如:
    当你引入别的库进行打包时打包文件会打包导入的库导致打包文件很大，而加载速度变慢
    当我们修改了用户代码，用户将需要从新加载我们打包后的文件
//解决方案:
    1将导入的挂载到全局window上
     将会拥有一个加载的js 当业务代码改变时只需要加载业务代码打包的包
    2在webpack中定义optimization中的配置
    3异步代码import

--- 懒加载
    需要再加载
--- chunk
    每一个都是一个文件

--- css文件的切割
    css打包为css文件而不是打包到js中

--- 库文件打包

    
---PWA
    当你的服务器挂了，他会使用缓存来加载

----关于路由


----打包速度提升
    1，跟上技术的迭代
    2，在尽可能少的模块上应用Loader
    3，plugin尽可能精简并确保可靠
    4，resolve参数的合理配置
    5，