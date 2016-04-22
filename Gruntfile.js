module.exports = function(grunt){

	// Simple gruntfile used for livereload, server start and open
  var host = 'localhost';
	var port = 3000;
  var base = 'app';
  var livereload = true;

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			options:{ livereload: livereload },
			files:[ base + '/**' ],
			tasks:[]
		},
		express:{
			all:{
				options:{
					port: port,
					hostname: host,
					bases:[ base ],
					livereload: livereload
				}
			}
		},
		open : {
			server: {
				path: 'http://' + host + ':' + port
		  }
		}
	});

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-express');
		grunt.loadNpmTasks('grunt-open');
		grunt.registerTask('serve',['express', 'open:server', 'watch']);

	};
