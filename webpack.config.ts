import * as path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const dirApp = path.join(__dirname, "app");

const dirImages = path.join(__dirname, "app/images");
const dirShared = path.join(__dirname, "shared");
const dirStyles = path.join(__dirname, "styles");
const dirWorkers = path.join(__dirname, "workers");
const dirNode = "node_modules";

export const commonConfig: webpack.Configuration = {
  entry: [path.join(dirApp, "index.ts"), path.join(dirStyles, "index.scss")],
  resolve: {
    modules: [dirApp, dirImages, dirShared, dirWorkers, dirStyles, dirNode],
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // Load '*.ts' files
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      // Load '*.scss' files
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Output the scss with its original name
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  output: {
    clean: true,
  },
};