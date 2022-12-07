module.exports = function (webpackEnv) {
    return {
      resolve: {
        fallback: {
            zlib: require.resolve("browserify-zlib"),
            path: require.resolve("path-browserify"),
            querystring: require.resolve("querystring-es3"),
            crypto: require.resolve("crypto-browserify"),
  
        }
      }
    }
  }