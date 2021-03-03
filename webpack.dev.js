const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { merge } = require("webpack-merge");
const { nodeConfig, webConfig } = require("./webpack.common");

const config = {
  mode: "development",
  devtool: "inline-source-map",
};

const node = merge(nodeConfig, {
  ...config,
  plugins: [new NodemonPlugin()],
});

const web = merge(webConfig, {
  ...config,
  plugins: [new CleanWebpackPlugin()],
});

module.exports = [node, web];
