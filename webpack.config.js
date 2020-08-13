var path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'index.bundle.js'
  },
  plugins:[
     
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};