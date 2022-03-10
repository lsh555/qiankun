const packageName = require('./package.json').name;
module.exports = {
  publicPath: '/',
  configureWebpack: {
    output: {
      // 必须打包出一个库文件
      library: `${packageName}-[name]`,
      // 库的格式必须是 umd
      libraryTarget: 'umd',
    }
  },
  devServer: {
    port: 10000,
    headers:{
      'Access-Control-Allow-Origin': '*' // 允许跨域
    }
  },
};
