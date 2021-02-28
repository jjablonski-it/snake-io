const NodemonPlugin = require("nodemon-webpack-plugin");
const { merge } = require("webpack-merge");
const config = require("./webpack.common");

module.exports = merge(config, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new NodemonPlugin()],
});
