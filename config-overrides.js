const path = require("path");
const webpack = require("webpack");

const { injectBabelPlugin } = require("react-app-rewired");
//const rewireLess = require("react-app-rewire-less");
const rewireLess = require("react-app-rewire-less-modules");

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }

  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
    config
  );

  return rewireLess.withLoaderOptions(
    `${env === "production" ? "app" : "[local]"}-[hash:base64:8]`,
    {
      modifyVars: {
        "@primary-color": "#61dafb",
        "@info-color": "#61dafb",
      }
    }
  )(config, env);
};
