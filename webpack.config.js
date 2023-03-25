const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const {VueLoaderPlugin}=require('vue-loader')
//import url from '@/stores/echarts.min.js'
//const url=require('@/stores/echarts.min.js')
module.exports = {
    mode:'production',
    entry:'./src/main.js',
    devServer: {
        static: './dist',
    },
    output:{
        clean:true,
        publicPath:'/',
        //chunkFormat:'module',
        //filename:'app.js',
        filename:'[name].js',
        chunkFilename:'[name]/[name].[chunkhash].js',
        assetModuleFilename:'images/[contenthash][ext]'

    },
    resolve:{
        alias:{
            '@':path.join(__dirname,'src'),
        }
    },
    module:{
        parser:{
            javascript:{
               /*commonjsMagicComments:true,
                dynamicImportPrefetch:true,
                dynamicImportMode: 'lazy',*/
            }
        },
        generator:{
            /*asset:{
                publicPath: '/[name]/images/'
            }*/
        },
        rules:[

            {
                test:/\.vue$/,
                loader:'vue-loader'
            },{
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },{
                test:/\.webp$/,
                type:'asset',
                generator:{
                }
            },{
                test:/\.gif$/,
                type:'asset/resource',

            },{
            test:/\.echarts.min.js$/,
                use:[{loader:'url-loader',
                    options:{limit:10}
            }]
            }, /*{
                test: /\.html$/i,
                use: ["extract-loader", "html-loader"],
            }, {
                test: /\.file.js$/i,
                type: "asset/resource",
            },
*/
        ]
    },
    plugins:[new MiniCssExtractPlugin({chunkFilename:'[name]/[id].[contenthash].css',
    filename:'[name].[contenthash].css'}),
    new HtmlWebpackPlugin({
        template:'./index.html',
        title:'每日计划',
        inject:'head',
        templateParameters:{

        }
    }),new VueLoaderPlugin(),new WebpackManifestPlugin({
            generate: (seed, files) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                // 添加自定义信息到 manifest 中
                manifestFiles['./src/stores/echarts.min.js'] = '/echarts.min.js';

                return manifestFiles;
            }
        })],
    optimization:{
        minimize:true,
    /*    runtimeChunk:{
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },*/
        /* minimizer:[new CssMinimizerPlugin({minimizerOptions:{
                 preset:['default',{discardComments:{removeAll:true}}]
             }})],*/
       splitChunks:{
           chunks:'all',
           minSize:20000,

           cacheGroups:{
               /*vue:{
                   name:'vue',
                   test:/[\\/]node_modules[\\/](vue|@vue\/.*)[\\/]/,
                   priority:0,
                   chunks:'all',
                   reuseExistingChunk:true,
               },*/
               vueVendors:{
                   test: /[\\/]node_modules[\\/](vue|@vue|vue-router|@vue-router|pinia|@pinia)[\\/]/,
                   priority: 0,
                   reuseExistingChunk: true,
                   name:'vue'
               },
              /* routerVendors:{
                   test: /[\\/]node_modules[\\/](vue-router|@vue-router)[\\/]/,
                   priority: 0,
                   reuseExistingChunk: true,
                   name:'vue'
               },
               pinaVendors:{
                   test: /[\\/]node_modules[\\/](pinia|@pinia)[\\/]/,
                   priority: 0,
                   reuseExistingChunk: true,
                   name:'vue'
               },*/
               elementVendor:{
                 test:  /[\\/]node_modules[\\/](element-plus|@element-plus)[\\/]/,
                   name:'element'
               },
               defaultVendors: {
                   name:'vendor',
                   test: /[\\/]node_modules[\\/]/,
                   priority: -10,
                   reuseExistingChunk: true,
               },
               default: {
                   minChunks: 2,
                   priority: -20,
                   reuseExistingChunk: true,
               },
           }
       }

    },
    experiments:{
        topLevelAwait:true,
    }
}
