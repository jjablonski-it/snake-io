const { merge } = require("webpack-merge");
const config = require("./webpack.common");

module.exports = merge(config, {
  mode: "development",
  rules: {
    module: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new NodemonPlugin()],
});
