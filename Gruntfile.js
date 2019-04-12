module.exports = function( grunt ) {

	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'compressed', // can be set to minify compressed or expanded
					require: 'sass-globbing'
				},
				files: {
					'./src/App.css' : './src/scss/main.scss'
				}
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require( 'autoprefixer' )({ browsers: ['last 8 versions', 'ie 9'] })
				]
			},
			dist: {
				src: 'src/*.css'
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				files: [
					'./src/scss/**/**/*.scss',
					'./src/scss/10_settings/**/**/*.scss',
					'./src/scss/20_tools/**/**/*.scss',
					'./src/scss/30_generic/**/**/*.scss',
					'./src/scss/40_base/**/**/*.scss',
					'./src/scss/50_layout/**/**/*.scss',
					'./src/scss/60_uigroups/**/**/*.scss',
					'./src/app/components/**/**/*.scss',
				],
				tasks: [ 'sass', 'postcss' ]
			},
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );

	grunt.registerTask( 'default', [ 'sass', 'postcss' ] );
	grunt.registerTask( 'local', [ 'sass', 'postcss', 'watch' ] );

};
