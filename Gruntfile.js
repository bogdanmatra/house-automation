module.exports = function(grunt){

    // Server setup
    var host = 'localhost';
    var port = 3000;
    var base = 'app';
    var livereload = true;

    // Minifiy configuration
    var initialJSPath = base + '/js/*.js';
    var initialCSSPath =  base + '/css/*.css';
    var distFolder = 'dist';
    var distJSPath = distFolder + '/house-automation.min.js';
    var distCSSPath = distFolder + '/house-automation.min.css';
    var unchangedFiles = ['index.html', 'favicon.ico', 'img/*', 'audio/*', 'mock-server/*'];
    var indexPath = distFolder + '/index.html';

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        // Tasks used in development mode to start server, livereaload and open page in browser:
        watch:{
            options:{ livereload: livereload },
            files:[ base + '/**' ]
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
        },

        // Tasks used only for creating 'dist' folder (minified app):
        clean: {
            dist: {
                src: distFolder
            }
        },
        concat: {
            js: {
                src: initialJSPath,
                dest: distJSPath
            },
            css: {
                src: initialCSSPath,
                dest: distCSSPath
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: [{
                    src: distJSPath,
                    dest: distJSPath
                }]
            }
        },
        tags: {
            js: {
                options: {
                    scriptTemplate: '<script src="{{ path }}"></script>',
                    openTag: '<!-- My JS start -->',
                    closeTag: '<!-- My JS end-->'
                },
                src: distJSPath,
                dest: indexPath
            },
            css: {
                options: {
                    linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                    openTag: '<!-- My CSS start -->',
                    closeTag: '<!-- My CSS end-->'
                },
                src: distCSSPath,
                dest: indexPath
            }
        },
        copy: {
            dist: {
                expand: true,
                cwd: base,
                src: unchangedFiles,
                dest: distFolder,
            },
        },
        cssmin: {
            dist: {
                files: [{
                    src: distCSSPath,
                    dest: distCSSPath
                }]
            }
        }
    });

    // Used for development
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    // Used to obtain minified version
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('server',['express', 'open:server', 'watch']);
    grunt.registerTask('dist',
        [
            'clean',      // Clean dist folder
            'copy',       // Copy unchaged files
            // Process JS
            'concat:js',  // Concatenate JS
            'uglify',     // Uglify JS
            'tags:js',    // Change index script tags
            // Process CSS
            'concat:css', // Concatenate CSS
            'cssmin',     // Minify CSS
            'tags:css'    // Change index link tags
        ]);

};
