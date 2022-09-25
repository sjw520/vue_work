const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //配置代理跨域
  devServer:{
    proxy:{
      // 路径中带有api
      "/api":{
        //获取数据服务器的IP地址
        target:"http://gmall-h5-api.atguigu.cn/"
      }
    }
  }
})
