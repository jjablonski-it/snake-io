const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
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
  if (argv.mode === "production") {
    config.output.filename = "[name].[contenthash].js";
    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CleanWebpackPlugin(),
    ];
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    };
  } else if (argv.mode === "development") {
    config.plugins = [...config.plugins, new NodemonPlugin()];
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    };
  }
  return config;
};
