const cloneDeep = require("lodash.clonedeep");
const path = require("path");

const ruleChildren = loader =>
  loader.use ||
  loader.oneOf ||
  (Array.isArray(loader.loader) && loader.loader) ||
  [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource)
    ? rulesSource
    : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule)
        ? { index, rules }
        : findIndexAndRules(ruleChildren(rule), ruleMatcher))
  );
  return result;
};

const findRule = (rulesSource, ruleMatcher) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  return rules[index];
};

const cssRuleMatcher = rule =>
  rule.test && String(rule.test) === String(/\.css$/);

const createLoaderMatcher = loader => rule =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const cssLoaderMatcher = createLoaderMatcher("css-loader");
const babelLoaderMatcher = createLoaderMatcher("babel-loader");

function razzleLess(
  localIdentName = `[local]___[hash:base64:5]`,
  lessLoaderOptions = {}
) {
  return function(config) {
    const cssRule = findRule(config.module.rules, cssRuleMatcher);
    const lessRule = cloneDeep(cssRule);
    const cssModulesRule = cloneDeep(cssRule);

    cssRule.exclude.push(/\.module\.css$/);
    cssModulesRule.test = /\.module\.css$/;

    const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderMatcher);
    cssModulesRuleCssLoader.options = Object.assign(
      {
        modules: true,
        localIdentName
      },
      cssModulesRuleCssLoader.options
    );
    config.module.rules.push(cssModulesRule);

    lessRule.test = /\.less$/;
    lessRule.exclude.push(/\.module\.less$/);
    const lessLoader = {
      loader: require.resolve("less-loader"),
      options: lessLoaderOptions
    };
    ruleChildren(lessRule).push(lessLoader);
    config.module.rules.push(lessRule);

    const lessModulesRule = cloneDeep(cssModulesRule);
    lessModulesRule.test = /\.module\.less$/;
    ruleChildren(lessModulesRule).push(lessLoader);
    config.module.rules.push(lessModulesRule);

    return config;
  };
}

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const localIdentName = `${dev
      ? "[name]--[local]-"
      : "app"}-[hash:base64:8]`;
    const babelLoader = findRule(config.module.rules, babelLoaderMatcher);
    babelLoader.options.plugins = babelLoader.options.plugins || [];

    if (dev) {
      babelLoader.options.plugins.push(["dva-hmr"]);
    }

    if (target === "web") {
      babelLoader.options.plugins.push([
        "import",
        { libraryName: "antd", style: true, libraryDirectory: "es" }
      ]);

      config = razzleLess(
        localIdentName,
        {
          modifyVars: {
            "@primary-color": "#61dafb",
            "@info-color": "#61dafb"
          }
        },
        target
      )(config);
    } else {
      config.module.rules.push({ test: /\.less$/, loader: "ignore-loader" });
      babelLoader.options.plugins.push([
        "css-modules-transform",
        {
          generateScopedName: localIdentName,
          extensions: [".css", ".less"]
        }
      ]);
    }

    // console.log(`Config ${target}`);
    // console.log(config.module.rules);

    // if (target === "node") {
    //   process.exit(1);
    // }

    return config;
  }
};
