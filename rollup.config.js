/*
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-05-11 15:28:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-11 15:38:37
 */
const {terser} = require("rollup-plugin-terser");

const path = require("path");
const resolve = (p) => {
  return path.resolve(__dirname, p);
};
console.log(terser);
module.exports = {
  input: resolve("./main.js"),
  output: {
    file: resolve("./dist/vue.dev.js"),
    format: "es",
  },

  // ...其他配置
  plugins: [
    // ...其他插件
    terser(), // 使用 terser 插件进行代码压缩
  ],
};
