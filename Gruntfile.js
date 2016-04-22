module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			options:{livereload:true},
			files:['app/**'],
			tasks:[]
		},
		express:{
			all:{
				options:{
					port:3000,
					hostname:'localhost',
					bases:['./app'],
					livereload:true
				}
			}
		},
		open : {
			server: {
				path: 'http://localhost:3000/'
		  }
		}
	});

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-express');
		grunt.loadNpmTasks('grunt-open');
		grunt.registerTask('serve',['express', 'open:server', 'watch']);

	};
