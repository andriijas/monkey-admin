const path = require("path");
const webpack = require("webpack");

const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
    config
  );
  return rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#61dafb",
      "@info-color": "#61dafb",
      "@font-size-base": "14px"
    }
  })(config, env);
};
