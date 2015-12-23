module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['./controller/*.js', './service/*.js', 'public/js/*.js', 'public/js/helper/*.js']
    },
    karma: {  
      unit: {
        options: {
          frameworks: ['jasmine', 'browserify'],
          singleRun: true,
          browsers: ['Chrome'],
          reporters: ['progress'],
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'tests/publicTest/module.js',
            'public/js/*.js',
            'public/js/helper/*.js',
            'tests/publicTest/*.js'
          ],
          preprocessors: {
            'tests/publicTest/module.js': ['browserify'],
            'public/js/*.js': ['browserify'],
            'public/js/helper/*.js': ['browserify']            
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');  
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['karma']);
};