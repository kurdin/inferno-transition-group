var path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '..',
		frameworks: ['mocha', 'chai-sinon'],
		reporters: ['mocha'],

		browsers: [process.env.KARMA_BROWSERS || 'PhantomJS'],

		files: [
			'tests/**/*.js'
		],

		browsers: ['Chrome'],

		preprocessors: {
			'tests/**/*.js': ['webpack'],
			'src/**/*.js': ['webpack'],
			// '**/*.js': ['sourcemap']
		},

		client: {
			mocha: {
				timeout: 6000
			}
		},

		webpack: {
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel',
						query: {
							// sourceMap: 'inline',
							presets: [['es2015', {loose: true}], 'stage-0'],
							plugins: [
								'transform-class-properties',
								'transform-object-rest-spread',
								'inferno'
							]
						}
					},
					{
						test: /\.css$/,
						loader: 'style!css'
					}
				]
			},
			resolve: {
				modulesDirectories: [
					path.resolve(__dirname, '..'),
					'node_modules'
				],
				alias: {
					src: path.resolve(__dirname, '..', 'src')
				}
			}
		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};
