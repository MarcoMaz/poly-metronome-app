import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import { commonConfig } from "./webpack.config";

const configBuild: webpack.Configuration = {
  mode: "production",
  devtool: false,
  stats: "minimal",
  module: {
    rules: [
      // Load Fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]",
        },
      },
      // Load Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // Create an HTML file
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index.html",
    }),
    // Copy the files as they are
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./app/images",
          to: "images",
        },
        {
          from: "manifest.json",
          to: "",
        },
        {
          from: "serviceWorker.js",
          to: "",
        },
        {
          from: "./workers/worker.js",
          to: "workers",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};

const configBuildDist = {
  ...commonConfig,
  ...configBuild,
  module: {
    ...commonConfig.module,
    ...configBuild.module,
    rules: [...commonConfig.module.rules, ...configBuild.module.rules],
  },
  plugins: [...commonConfig.plugins, ...configBuild.plugins],
};

export default configBuildDist;
