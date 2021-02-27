const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

const config = {
  entry: {
    server: {
      import: "./src/server.ts",
      filename: "server.js",
    },
    client: "./src/client/script.ts",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
      excludeChunks: ["server"],
    }),
  ],
  target: "node",
};

module.exports = (_env, argv) => {
  console.log(argv);
  if (argv.mode === "production") {
    config.output = {
      filename: "[name].[contenthash].js",
    };
  } else if (argv.mode === "development") {
    config.plugins = [...config.plugins, new NodemonPlugin()];
  }
  return config;
};
