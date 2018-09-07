const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const arch = process.env.ARCH || process.arch;
const platform = process.env.PLATFORM || process.platform;


module.exports = {
  externals: [nodeExternals({
        modulesFromFile: true,
        whitelist: [
          /^@angular/,
          /^opencv4nodejs/,
          /^core-js/,
          /^path/,
          /^object-hash/,
          /^request/,
          /^rxjs/,
          /^zone.js/,
          /\.(?!(?:js|json)$).{1,5}$/i
        ]
    })],
    resolve: {
        extensions: [ '.ts', '.js', '.node']
    },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: "native-artifacts/precompiled-libraries/" + arch + "/" + platform,
        to: "native-artifacts/precompiled-libraries",
        from: {
          glob: "*",
          dot: true
        }
      },
      {
        context: ".",
        to: "",
        from: {
          glob: "native-artifacts/native-addons/*.node",
          dot: true
        }
      }
    ], {
      ignore: [
        ".gitkeep",
        "**/.DS_Store",
        "**/Thumbs.db",
        "opencv.js"
      ],
      debug: "warning"
    }),
    new webpack.DefinePlugin({
    })
],
target: "electron-renderer"
};
