/*
 * @Description: rollup打包的三种方法  
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-05-11 10:23:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-11 10:47:04
 */
const path = require('path')
const {terser} = require("rollup-plugin-terser");


const resolve = p => {
  return path.resolve(__dirname,  p)
}

const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('./main.js'),
    dest: resolve('./dist/vue.dev.js'),
    format: 'cjs',
    env: 'development',
  }
}

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    plugins: [
      // ...其他插件
      terser(), // 使用 terser 插件进行代码压缩
    ],
  }




  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
