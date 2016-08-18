// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    //CONFIGURATION
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'Src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'Dist/JS/Grid.min.js': 'Src/JS/Grid.js',
          'Dist/JS/LinnearEquation.min.js': 'Src/JS/LinnearEquation.js'
          //Minifying multiple files into one - observe the array syntax
          //, 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js']
        }
      }
    },

    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'Src/CSS/basic.css': 'Src/CSS/basic.less'
        }
      }
    },

     // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'Dist/CSS/basic.min.css': 'Src/CSS/basic.css'
        }
      }
    },

    //Configuration for watch
    watch: {
      // for stylesheets, watch css and less files 
      stylesheets: { 
        files: ['Src/CSS/*.css', 'Src/CSS/*.less'], tasks: ['less', 'cssmin'] 
      },

      // for scripts, run jshint and uglify 
      scripts: { 
        files: 'Src/JS/*.js', tasks: ['jshint', 'uglify'] 
      } 
    }
  });
  
  // ============= CREATE TASKS ========== //
  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']); 

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};

