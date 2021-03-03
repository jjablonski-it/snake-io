const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

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

module.exports = [
  {
    ...baseConfig,
    mode: "development",
    entry: "./src/server.ts",
    target: "node",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "dist"),
    },
  },
  {
    ...baseConfig,
    mode: "development",
    entry: "./src/client/script.ts",
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
  },
];
