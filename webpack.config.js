const path = require ('path');

module.exports = {
  mode: 'production',
  entry: path.resolve (__dirname, 'src/AirbnbCarousel.jsx'),
  output: {
    path: path.resolve (__dirname, './dist'),
    filename: 'AirbnbCarousel.js',
    libraryTarget: 'umd',
    library: 'react-airbnb-carousel',
  },
  devtool: 'source-map',
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      // React dep should be available as window.React, not window.react
      root: 'React',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: { extensions: ['.js', '.jsx'] },
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
        },
      },
    ],
  },
};
