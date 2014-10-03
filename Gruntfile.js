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
			tasks: ['sass', 'jade', 'fontcustom']
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
		},

		shell: {
            // Compile Font Custom font.
			fontcustom: {
				command: 'fontcustom compile src/icons'
			}
		},
		copy: {
            // Copy Font Custom fonts to proper place.
			fontcustom: {
				files: [
					{src: ['src/icons/fontcustom/*.woff'], dest: 'css/fonts/icons.woff'},
					{src: ['src/icons/fontcustom/*.eot'],  dest: 'css/fonts/icons.eot'},
					{src: ['src/icons/fontcustom/*.svg'],  dest: 'css/fonts/icons.svg'},
					{src: ['src/icons/fontcustom/*.ttf'],  dest: 'css/fonts/icons.ttf'}
				]
			}
		},
		replace: {
            // Replace Font Custom CSS.
			fontcustom: {
				src: ['src/icons/fontcustom/fontcustom.css'],
				dest: ['css/exts/_icons.scss'],
				replacements: [{
					from: /fontcustom_[^.]+/g,
					to: 'fonts/icons'
				}, {
					from: 'fontcustom',
					to: 'icons'
				}]
			}
		}
	});

	// Define grunt tasks
	// =======================================
	grunt.registerTask('default', ['sass', 'jade', 'connect', 'watch']);
	grunt.registerTask('fontcustom', ['shell:fontcustom', 'copy:fontcustom', 'replace:fontcustom']);

	// Load grunt packages
	// =======================================
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-shell');

};
