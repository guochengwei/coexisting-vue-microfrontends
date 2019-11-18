// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143
module.exports = {
  chainWebpack: config => {
    config.devServer.set('inline', false)
    config.devServer.set('hot', true)
    config.externals(['vue', 'vue-router'])
    // config.module.rule('compile').parser({ system: false })
    // config.output.libraryTarget('amd')
    // config.output.library('app1')
  },
  filenameHashing: false
}
