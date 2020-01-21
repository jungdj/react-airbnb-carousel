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
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
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
          plugins: ['babel-plugin-styled-components'],
        },
      },
    ],
  },
};
