const path = require('path');

module.exports = {
  entry: './js/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: './js/app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

// module.exports = {
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//     filename: './js/app.js',
//   },
// };
