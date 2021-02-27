const path = require("path");

module.exports = {
  entry: {
    server: "./src/server.ts",
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
};
