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
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'react-dom',
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
      root: 'styled-components',
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
