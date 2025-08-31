import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/main.js',
  output: {
    filename: '[fullhash]-production.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Task Tracker',
        template: path.resolve(__dirname, './src/index.html'),
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
};