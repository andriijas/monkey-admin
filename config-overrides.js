const path = require("path");

const { injectBabelPlugin } = require("react-app-rewired");
//const rewireLess = require("react-app-rewire-less");
const rewireLess = require("react-app-rewire-less-modules");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// Temporary untill https://github.com/facebookincubator/create-react-app/pull/3145 is merged
const webpack = require("webpack");
const paths = require("react-scripts/config/paths");
const NameAllModulesPlugin = require("name-all-modules-plugin");
const vendors = [
  "classnames",
  "dva",
  "dva-loading",
  "moment",
  "prop-types",
  "react",
  "react-dom",
  "react-router-dom",
  "react-router-redux",
  "react-redux",
  "redux",
  "redux-saga"
];

/**
 * Retrieves plugin's index in webpack configuration or returns null
 * @param {Object} config - webpack configuration
 * @param {string} name - Plugin name
 * @returns {number|null}
 */
function getPluginIndex(config, name) {
  const index = config.plugins.findIndex(
    plugin => plugin.constructor.name === name
  );
  return index !== -1 ? index : null;
}

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }

  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
    config
  );

  // Temporary untill https://github.com/facebookincubator/create-react-app/pull/3145 is merged
  if (env === "production") {
    config.entry = {
      main: paths.appIndexJs,
      polyfills: require.resolve("react-scripts/config/polyfills"),
      vendors
    };

    config.plugins.push(new webpack.NamedModulesPlugin());

    config.plugins.push(
      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
          return chunk.name;
        }
        const chunkNames = chunk.mapModules(m => m);
        chunkNames.sort((chunkA, chunkB) => chunkA.depth - chunkB.depth);
        const fileName = chunkNames[0].resource;
        return path.basename(fileName, path.extname(fileName));
      })
    );

    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendors",
        minChunks: Infinity
      })
    );

    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: "runtime"
      })
    );

    config.plugins.push(new NameAllModulesPlugin());

    const etpIndex = getPluginIndex(config, "ExtractTextPlugin");
    if (etpIndex) {
      config.plugins[etpIndex].options.allChunks = true;
    }

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static"
      })
    );
  }

  return rewireLess.withLoaderOptions(
    `${env === "production" ? "app" : "[local]"}-[hash:base64:8]`,
    {
      modifyVars: {
        "@primary-color": "#61dafb",
        "@info-color": "#61dafb"
      }
    }
  )(config, env);
};
