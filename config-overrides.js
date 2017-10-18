const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );
  config = rewireLess(config, env, {
    modifyVars: {
      "@primary-color": "#61dafb",
      "@info-color": "#61dafb",
      "@font-size-base": "14px"
    }
  });
  return config;
};
