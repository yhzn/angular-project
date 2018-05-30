

const webpack=require('webpack');
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const UglifyJSPlugin=require('uglifyjs-webpack-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dev=process.env.NODE_ENV==='dev';
const pro=process.env.NODE_ENV==='pro';


const plugins=[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title:'延华智能',
        template:'./src/index.html',
        filename:'./index.html',
        inject:true
    }),
    new webpack.ProvidePlugin({

        $:"jquery",

        jQuery:"jquery",

        "window.jQuery":"jquery"

    }),
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor'
    }),
    new ExtractTextPlugin('styles.[hash].css',{
        disable:false,
        allChunks:true // 所有独立样式打包成一个css 文件
    }),

]

let devTool=''

if(dev){
    devTool='#source-map'

}

if(pro){
    plugins.push(new UglifyJSPlugin())
}

module.exports = {

    entry: {
        app:'./src/index.js',
        // vendor: ["angular", "angular-ui-router", "angular-cookies"]
    },
    devtool:devTool,
    output:{
        filename:'[name].[hash].bundle.js',
        path:path.resolve(__dirname, './dist'),
        // publicPath: publicPath,
        // chunkFilename: "chunks/[name].chunk.[chunkhash].js"
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                use: [
                    'html-withimg-loader',  // 处理img 图片无法加载问题
                ]

            },
            {
                test:/\.css$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract({
                    fallback:[{   // 不写会报错 window is not defined
                        loader:'style-loader'
                    }],
                    use:[{
                        loader:'css-loader',
                        // options:{
                        //     modules:true
                        // }00
                    },{
                        loader:'autoprefixer-loader'
                    }
                    ]
                })
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:[{
                        loader:'style-loader'
                    }],
                    use:[{
                        loader:'css-loader?sourceMap!sass-loader?sourceMap!autoprefixer-loader'
                    }
                    ]
                })
                //     [
                //     'style-loader',
                //     'css-loader?sourceMap',  // webpack scss 转换后 可看到 css 文件
                //     'sass-loader?sourceMap',
                //     'autoprefixer-loader'
                // ]

            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            // {
            //     test: require.resolve("angular"),
            //     loader: "expose-loader?angular"
            // },

            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    "url-loader?limit=10000&mimetype=application/font-woff"
                ]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    "url-loader?limit=10000&mimetype=application/octet-stream"
                ]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    "url-loader?limit=10000&mimetype=image/svg+xml"
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use : [
                    'file-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    'url-loader?limit=8192&name=images/[name].[ext]!image-webpack?{ progressive:true, optimizationLevel: 7 }'
                ]
            }
            // {
            //     test:/\.(woff|woff2|eot|ttf|otf)$/,
            //     use: [
            //         'file-loader'
            //     ]
            // }
        ]
    },
    devServer:{
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html'] //添加在此的后缀所对应的文件可以省略后缀
    },
    plugins:plugins
};