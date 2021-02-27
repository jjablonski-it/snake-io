const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    server: "./src/server.ts",
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
  output: {
    path: path.resolve(__dirname, "dist"),
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
