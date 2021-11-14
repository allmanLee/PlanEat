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
};
