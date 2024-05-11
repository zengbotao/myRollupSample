/*
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-05-11 10:22:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-11 15:44:16
 */
const rollup = require("rollup");
const fs = require("fs");
const terser = require("terser");
const zlib = require("zlib");
let builds = require("./config").getAllBuilds();
console.log(builds[0]);

rollup
  .rollup(builds[0])
  .then((bundle) => {
    console.log(bundle);
    // 生成输出包配置
    const outputOptions = { 
      file: "bundle.js", // 输出文件
      format: "cjs", // 输出格式
    };

    // 生成打包结果
    return bundle.generate(outputOptions);
  })
  .then(async ({ output: [{ code }] }) => {
    console.log(terser.minify,code);
    let codes = await terser.minify(code, {
      toplevel: true, // 将代码作为顶级脚本处理，适用于压缩立即执行的函数表达式（IIFE）
      output: {
        ascii_only: true, // 非ASCII字符将被转义
      },
      compress: {
        pure_funcs: ["makeMap"], // 在压缩过程中，移除纯函数（即没有副作用的函数）
      },
    });
    console.log(codes);
    fs.writeFile(builds[0].output.file, codes.code, (err) => {
      // 如果在写入过程中发生错误，则返回一个拒绝的Promise
      // 这个Promise将包含错误对象作为参数
      if (err) console.log(err);
      // 使用zlib.gzip对代码进行压缩
      zlib.gzip(codes.code, (err, zipped) => {
        // 如果在压缩过程中发生错误，则返回一个拒绝的Promise
        // 这个Promise将包含错误对象作为参数

        // 报告压缩后的代码的大小
        console.log(err, zipped,
          "blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || '')"
        );
      });
    });
  });
