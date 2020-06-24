module.exports = {
    configureWebpack:{
        module:{
            rules:[
            ]
        }
    },
    publicPath: ""
    // chainWebpack: config => {
    //     const imagesRule = config.module.rule('images')
    //     imagesRule
    //         .use('image-webpack-loader')
    //         .loader('image-webpack-loader')
    //         .options({
    //             bypassOnDebug: true
    //         })
    //         .end()
    // }
}