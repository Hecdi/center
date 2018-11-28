var argv = require('yargs').argv;
var entry,title;
const path = require('path');
const webpack = require('webpack');
const SRC_DIR = path.resolve(__dirname, 'schedule.websitev2');
const WIDGET_DIR = path.resolve(__dirname, './src/plugins');
switch(argv.projectName){
  case 'smartScheduling':
    entry = './index.js';
    title = '智能调度';
    break;
  case 'test':
    entry = './Page/main.js';
    title = 'test';
    break;
  default:
    entry = './index.js';
    title = '智能调度';
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: entry,
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: title,
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],

    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  configureWebpack: {
	module: {
	  rules: [
		  {
			  enforce: 'pre',
			  test: /\.js$/,
			  exclude: [WIDGET_DIR, /node_modules/],
			  use: {
				  loader: 'eslint-loader',
				  options: {
					  fix: true,
				  },
			  },
		  },
	  ]
	},
    resolve:{
      modules:[SRC_DIR, 'node_modules', 'common','lib', 'Page/components']
    }
  },
  lintOnSave: true,
  productionSourceMap: false,
}
