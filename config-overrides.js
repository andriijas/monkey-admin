const {
  injectBabelPlugin,
  compose,
  getLoader,
  loaderNameMatches,
} = require("react-app-rewired");
//const rewireLess = require("react-app-rewire-less");
const rewireLess = require("react-app-rewire-less-modules");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const paths = require("react-app-rewired/scripts/utils/paths");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
    config,
  );

  if (env === "production") {
    // Remove default polyfills
    config.entry = { main: paths.appIndexJs };

    // Change css module class names in production
    const cssLoader = getLoader(
      config.module.rules,
      rule => String(rule.test) === String(/\.module\.css$/),
    ).loader.find(loader => loaderNameMatches(loader, "css-loader"));
    cssLoader.options.localIdentName = "ma-[hash:base64:8]";

    // Include bundle analyzation
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
    );
  }

  const rewires = compose(
    rewireLess.withLoaderOptions({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#ff79c6",
        "@info-color": "#61dafb",
        "@layout-body-background": "#EEEEF0",
        "@layout-header-background": "#fff",
        "@layout-sider-background": "#282A36",
        "@menu-dark-bg": "#282A36",
        "@menu-dark-submenu-bg": "#000a0a",
      },
    }),
  );

  return rewires(config, env);
};
