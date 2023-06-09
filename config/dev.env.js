'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"http://localhost:9526/index.php"',
  VUE_APP_API_TOKEN: '"ApiToken"',
  VUE_APP_QQ_APPID: '"102050965"'
})
