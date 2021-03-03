const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  devtool: "inline-source-map",
};

const nodeConfig = merge(common, {
  ...config,
  target: "node",
  entry: "./src/server.ts",
  output: {
    filename: "server.js",
  },
  plugins: [new NodemonPlugin()],
});

const webConfig = merge(common, {
  ...config,
  target: "web",
  entry: "./src/client/script.ts",
  output: {
    filename: "client/[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      excludeChunks: ["server"],
      filename: "client/index.html",
    }),
  ],
});

module.exports = [nodeConfig, webConfig];
