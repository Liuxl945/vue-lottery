module.exports = {
    configureWebpack:{
        module:{
            rules:[
            ]
        },
        externals: {
            "vue":"Vue",
            "vuex":"Vuex",
            "axios":"axios",
        }
    },

    publicPath: "",
    // publicPath: "http://cdn.nxsound.com/ih5/20_06lslz/",
    chainWebpack: config => {
        config
        .module
        .rule("images")
        .test(/\.(jpg|png|gif)$/)
        .use("url-loader")
        .loader("url-loader")
        .options({
            limit:10,
            // 以下配置项用于配置file-loader
            // 根据环境使用cdn或相对路径
            publicPath: process.env.NODE_ENV === 'production' ? 'http://cdn.nxsound.com/ih5/20_06lslz/img/' : './',
            // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
            outputPath: 'img',
            // 配置打包后图片文件名
            name: '[name].[hash:10].[ext]',
        })
        .end()
        
        config
        .module
        .rule("media")
        .test(/\.(mp3)(\?.*)?$/)
        .use("url-loader")
        .loader("url-loader")
        .options({
            limit:10,
            // 以下配置项用于配置file-loader
            // 根据环境使用cdn或相对路径
            publicPath: process.env.NODE_ENV === 'production' ? 'http://cdn.nxsound.com/ih5/20_06lslz/media/' : './',
            // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
            outputPath: 'media',
            // 配置打包后图片文件名
            name: '[name].[hash:10].[ext]',
        })
        .end()
    }
}