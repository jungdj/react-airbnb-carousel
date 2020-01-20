var path = require ('path');

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, 'src/AirbnbCarousel.jsx'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'AirbnbCarousel.js',
		libraryTarget: 'umd',
		library: 'react-airbnb-carousel'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/react']
				}
			}
		]
	}
};
