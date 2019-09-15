const LoaderUtils=require('loader-utils');
module.exports=function(source){
    console.log(this.query.name);
    const options=LoaderUtils.getOptions(this);
    console.log(options.name);
    // return source.replace('del','dell')
    // const result=source.replace('del','dell');
    // this.callback(null,result);
    const callback=this.async();
    setTimeout(()=>{
callback();
    },1000)
}
// this.callback(
//     err:Error|null,
//     content:string|Buffer,
//     sourceMap?:SourceMap,
//     meta?:any
//     )