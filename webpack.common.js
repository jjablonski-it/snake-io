const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = {
  nodeConfig: merge(baseConfig, {
    entry: "./src/server.ts",
    target: "node",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "dist"),
    },
  }),
  webConfig: merge(baseConfig, {
    ...baseConfig,
    entry: "./src/client/script.ts",
    target: "web",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist", "client"),
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
        filename: "index.html",
      }),
    ],
  }),
};
