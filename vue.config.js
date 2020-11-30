const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        "components": path.resolve(__dirname, 'src/components'),
        "http": path.resolve(__dirname, 'src/http'),
        "pages": path.resolve(__dirname, 'src/pages'),
        "router": path.resolve(__dirname, 'src/router'),
        "routes": path.resolve(__dirname, 'src/routes'),
        "store": path.resolve(__dirname, 'src/store')
      }
    }
  }
}