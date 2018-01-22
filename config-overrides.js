const path = require("path");

const {
  injectBabelPlugin,
  compose,
  getLoader,
  loaderNameMatches
} = require("react-app-rewired");
//const rewireLess = require("react-app-rewire-less");
const rewireLess = require("react-app-rewire-less-modules");
const rewireVendorSplitting = require("react-app-rewire-vendor-splitting");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }

  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
    config
  );

  if (env === "production") {
    const cssRules = getLoader(
      config.module.rules,
      rule => String(rule.test) === String(/\.module\.css$/)
    );
    const cssLoader = cssRules.loader.find(loader =>
      loaderNameMatches(loader, "css-loader")
    );
    if (cssLoader) {
      cssLoader.options.localIdentName = "app-[hash:base64:8]";
    } else {
      throw new Error(
        "config-overrides.js: Can not find cssLoader for localIdentName"
      );
    }

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      })
    );
  }

  const rewires = compose(
    rewireLess.withLoaderOptions({
      modifyVars: {
        "@primary-color": "#61dafb",
        "@info-color": "#61dafb"
      }
    }),
    rewireVendorSplitting
  );

  return rewires(config, env);
};
