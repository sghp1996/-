const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js', // 你的主入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json'], // 解析的文件类型
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 使用 Babel 转译 ES6+ 代码
        },
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    server: {
      type: 'https', // 启用 HTTPS

    },

    port: 9000,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 你的 HTML 模板
    }),
  ],
  mode: 'development', // 开发模式
};
