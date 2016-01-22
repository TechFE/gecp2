module.exports = function(grunt) {

  // var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   /* sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './style.css': './scss/style.scss'
        }
      }
    },*/
    concat: {
      dist: {
        src: ['./src/bootstrap/js/*.js', './src/common/js/*.js','./src/home/js/*.js','./src/login/js/*.js','./src/res/js/*.js'],
        //src:['./src/../*.js'],
        dest: './dest/<%= pkg.name %>.js',
      },
    },
    uglify: {
      compressjs: {
        files: {
          './dest/<%= pkg.name %>.mini.js': ['./dest/<%= pkg.name %>.js']
        }
      }
    },
    jshint: {
       options: {
          '-W033': true
      },//忽略分号的错误
      all: ['./dest/<%= pkg.name %>.js']
    },
    watch: {
      scripts: {
        files: ['./src/bootstrap/js/*.js', './src/common/js/*.js','./src/home/js/*.js','./src/login/js/*.js','./src/res/js/*.js'],
        tasks: ['concat','jshint','uglify']
      },
     /* sass: {
        files: ['./scss/style.scss'],
        tasks: ['sass']
      },*/
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              'login.html',
              'home/home.css',
              'dest/<%= pkg.name %>.min.js'
          ]
      }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729, //LiveReload的默认端口号，你也可以改成你想要的端口号
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('jshintjs',['jshint']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('default');

};