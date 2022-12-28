const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (env, options) => {
  return {
    target: 'node',
    entry: './src/',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.m?(ts|js)$/,
          exclude: /(node_modules)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }]
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: [
            'ts-loader'
          ]
        }
      ]
    },
    externals: [nodeExternals()],
    plugins: [
      new Dotenv({
        path: './.env.defaults',
        defaults: true,
        systemvars: true
      }),
      new NodemonPlugin()
    ]
  }
}