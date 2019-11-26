var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {
  CheckerPlugin
} = require("awesome-typescript-loader");
var ROOT = path.resolve(__dirname);
module.exports = {
  entry: "./demo/app.tsx",
  // devtool: "source-map",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "index.js"
    // sourceMapFilename: "[name].bundle.map.js"
  },
  module: {
    rules: [{
      test: /\.ts[x]?$/,
      loader: "awesome-typescript-loader"
    },
    {
      enforce: "pre",
      test: /\.ts[x]$/,
      loader: "source-map-loader"
    },
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.less$/,
      // include: ROOT + "/src",
      use: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "less-loader"
      }
      ]
    },
    {
      test: /\.png/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 1024 * 20
        }
      }]
    }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".png",],
    alias: {
      "@": ROOT + "/src"
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 8888
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};