import path from "path" // 아래과 같다 다만 이 경우는 모던JS(ES6+)
const path = require("path"); // 예전 JS의 import 방식줄(이 파일은 모던JS파일이 아니라 안정버전으로 써줘야 한다.)
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // 어디에서 왔는지?
const OUTPUT_DIR = path.join(__dirname, "static"); // 어디로 보내는지?

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]"
  }
};

module.exports = config;