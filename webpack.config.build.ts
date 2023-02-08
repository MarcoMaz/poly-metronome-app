import webpack from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import { commonConfig } from "./webpack.config";

const configBuild: webpack.Configuration = {
  mode: "production",
  devtool: false,
  stats: "minimal",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};

const configBuildDist = {
  ...commonConfig,
  ...configBuild,
};

export default configBuildDist;
