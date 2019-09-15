const path=require('path');

module.exports={
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    module:{
        rules:[
            {
                test:/\.js/,
                use:[{
                    loader:path.resolve(__dirname,'./loaders/replace_Lodaer.js'),
                    options:{
                        name:'lee'
                    }
                }]
            }
        ]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        fileName:'[name].js'
    }
}