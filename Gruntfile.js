module.exports = function(grunt) {

	grunt.initConfig({

        /*== Development ================================================*/

		// Server
		connect: {
			server: {
				options: {
					port: 8989
				}
			}
		},

		// Watch
		watch: {
            // Setup a LiveReload server.
            options: { livereload: true },
			files: [
				'js/**/*.js',
				'css/**/*.scss',
				'css/**/*.sass',
				'**/*.jade',
				'src/icons/*',
                'assets/**/*',
                'img/**/*',

                // Ignore:
                '!css/exts/_icons.scss'
			],
			tasks: ['sass', 'jade']
		},

		// Compile SASS/SCSS
		// Since all other stylesheets are @import-ed in index.scss,
		// that's the only one we need to compile.
        sass: {
            app: {
                files: {
                    'css/index.css': 'css/index.sass'
                }
            }
        },

		// Compile Jade templates.
		jade: {
			compile: {
				options: {
					pretty: true,
					client: false
				},
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/*.jade',
                        '!node_modules/**/*.jade',
                        '!inc/**/*.jade'
                    ],
                    dest: '.',
                    ext: '.html'
                }]
			}
		}

	});

	// Define grunt tasks
	// =======================================
	grunt.registerTask('default', ['sass', 'jade', 'connect', 'watch']);

	// Load grunt packages
	// =======================================
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');

};
