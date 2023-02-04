import * as path from "path";

import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

import { commonConfig } from "./webpack.config";

const configDevelopment: webpack.Configuration = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    host: "0.0.0.0",
    port: 3000,
    hot: true,
  },
};

const configDevelopmentDist = {
  ...commonConfig,
  ...configDevelopment,
};

export default configDevelopmentDist;
