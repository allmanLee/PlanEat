// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: ` 
          @import "@/assets/css/function.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://openapi.foodsafetykorea.go.kr/api",
        // pathRewrite: { "^/": "" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
