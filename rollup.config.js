import fs from 'fs';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

let pkg = JSON.parse(fs.readFileSync('./package.json'));

let external = Object.keys(pkg.dependencies || {});

export default {
	entry: 'src/index.js',
	dest: pkg.main,
	sourceMap: false,
	moduleName: pkg.amdName,
	format: 'umd',
	useStrict: false,
	external,
	plugins: [
		babel({
			babelrc: false,
			comments: false,
			presets: [
				[
					"es2015",
					{
						"loose": true,
						"modules": false
					}
				],
				'stage-0'
			],
			plugins: [
				'inferno',
				'transform-class-properties',
				['transform-es2015-classes', { loose:true }]
			]
		}),
		commonjs({
			include: 'node_modules/**',
			exclude: '**/*.css'
		})
	]
};
