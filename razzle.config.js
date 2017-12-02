const cloneDeep = require("lodash.clonedeep");
const {
  modifyPlugin,
  modifyRule,
  isPluginLoaded
} = require("razzle-config-utils");

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const localIdentName = `${dev
      ? "[name]--[local]-"
      : "app"}-[hash:base64:8]`;

    const lessLoaderOptions = {
      modifyVars: {
        "@primary-color": "#61dafb",
        "@info-color": "#61dafb"
      }
    };

    modifyRule(config, { loader: "babel-loader" }, rule => {
      rule.options.plugins = rule.options.plugins || [];

      if (dev) rule.options.plugins.push(["dva-hmr"]);

      if (target === "web") {
        rule.options.plugins.push([
          "import",
          {
            libraryName: "antd",
            style: true,
            libraryDirectory: "es"
          }
        ]);
      } else {
        rule.options.plugins.push([
          "css-modules-transform",
          {
            generateScopedName: localIdentName,
            extensions: [".css", ".less"]
          }
        ]);
      }
    });

    modifyRule(config, { test: /\.css$/ }, rule => {
      if (target === "node") {
        return;
      }
      const lessRule = cloneDeep(rule);
      const cssModulesRule = cloneDeep(rule);

      rule.exclude.push(/\.module\.css$/);
      cssModulesRule.test = /\.module\.css$/;

      cssModulesRule.use.forEach(rule => {
        if (rule.loader && rule.loader.indexOf("css-loader") !== -1) {
          rule.options = Object.assign(
            {
              modules: true,
              localIdentName
            },
            rule.options
          );
        }
      });
      config.module.rules.push(cssModulesRule);

      lessRule.test = /\.less$/;
      lessRule.exclude.push(/\.module\.less$/);
      const lessLoader = {
        loader: require.resolve("less-loader"),
        options: lessLoaderOptions
      };
      lessRule.use.push(lessLoader);
      config.module.rules.push(lessRule);

      const lessModulesRule = cloneDeep(cssModulesRule);
      lessModulesRule.test = /\.module\.less$/;
      lessModulesRule.use.push(lessLoader);
      config.module.rules.push(lessModulesRule);
    });

    if (target === "node") {
      config.module.rules.push({ test: /\.less$/, loader: "ignore-loader" });
    }

    if (isPluginLoaded(config, "ExtractTextPlugin")) {
      modifyPlugin(config, "ExtractTextPlugin", plugin => {
        plugin.options.allChunks = true;
      });
    }

    // console.log(`Config ${target}`);
    // console.log(config.plugins);

    // if (target === "node") {
    //   process.exit(1);
    // }

    return config;
  }
};
