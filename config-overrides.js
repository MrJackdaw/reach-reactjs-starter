/* eslint-disable */
const { useBabelRc, override } = require("customize-cra");
const webpack = require("webpack");

module.exports = {
  webpack: override(useBabelRc(), projectOverride)
};

function projectOverride(dConfig, _env) {
  const config = { ...dConfig };
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify")
  };

  config.ignoreWarnings = [/Failed to parse source map/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  ]);

  return config;
}
