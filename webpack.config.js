const fs = require('fs')
const path = require("path")
const webpack = require("webpack")

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// defines where the bundle file will live
const bundlePath = path.resolve(__dirname, "dist/")

module.exports = (_env,argv)=> {
  let entryPoints = {
    VideoComponent:{
      path:"./src/VideoComponent.js",
      outputHtml:"video_component.html",
      build:true
    },
    Panel:{
      path:"./src/Panel.js",
      outputHtml:"panel.html",
      build:true
    },
    Config:{
      path:"./src/Config.js",
      outputHtml:"config.html",
      build:true
    },
    Mobile:{
      path:"./src/Mobile.js",
      outputHtml:"mobile.html",
      build:true
    }
  }

  let entry = {}

  // edit webpack plugins here!
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
  ]

  for(name in entryPoints){
    if(entryPoints[name].build){
      entry[name]=entryPoints[name].path
      if(argv.mode==='none' || argv.mode === 'development'){
        plugins.push(new HtmlWebpackPlugin({
          inject:true,
          chunks:[name],
          template:'./public/index.html',
          filename:entryPoints[name].outputHtml
        }))
      }
    }    
  }

  let config={
    //entry points for webpack- remove if not used/needed
    entry,
    optimization: {
      minimize: false, // neccessary to pass Twitch's review process
      minimize: false, // neccessary to pass    's review process
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(jpe?g|png|gif)$/i, 
          loader: "file-loader",
          options:{
            name:"img/[name].[ext]"
          }
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack', 'url-loader'],
				},
        {
					test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
					{
							loader: 'file-loader',
							options: {
									name: '[name].[ext]',
									outputPath: 'fonts/'
							}
					}
					]
        }
      ]
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
    output: {
      filename: "[name].bundle.js",
      path:bundlePath
    },
    plugins
  }

  if(argv.mode==='development'){
    config.devServer = {
      contentBase: path.join(__dirname,'public'),
      host:argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 8080
    }
    config.devServer.https = true
  }
  if(argv.mode==='none'){
    config.optimization.splitChunks={
      cacheGroups:{
        default:false,
        vendors:false,
        vendor:{
          chunks:'all',
          test:/node_modules/,
          name:false
        }
      },
      name:false
    }
  }  

  return config;
}
