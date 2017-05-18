/**
 * Created by jet on 12/27/16.
 */

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var fs   = require('fs');
var path = require('path');


const APPLICATION_PATH = {
    ROOT:    path.join(__dirname,"src"),
    OUTPUT:  path.resolve(__dirname,"build/js/")
};


var files = []
var entries =  fs.readdirSync(APPLICATION_PATH.ROOT).filter(function (file) {
     if(file.match(/.*\.js$/))
     {
         var fileName =  path.basename(file,".js");
         var fileParameter= fileName.concat(":").concat(path.resolve(APPLICATION_PATH.ROOT,file));
         files.push(fileParameter);
     }
});


module.exports = {

    entry: ['webpack/hot/dev-server',path.join(APPLICATION_PATH.ROOT,"index.js")],
    // entry: files,

    output: {
        path: path.resolve(__dirname, APPLICATION_PATH.OUTPUT),
        filename: "main.js"
    },

    devServer: {
        inline: true,
        hot:true,
        port:3000,
        publicPath:"/build"
    },

    module:{
        loaders:[
            // { test:/\.jsx?$/,include:APPLICATION_PATH.ROOT,loaders: 'babel',query: { presets: ['es2015', 'react'] }},
            { test:/\.jsx?$/,  include:APPLICATION_PATH.ROOT,loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']},
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.json$/, loader: "url-loader?limit=8192" }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};

