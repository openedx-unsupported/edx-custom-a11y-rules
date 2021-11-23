// Karma configuration
// Generated on Tue Oct 13 2015 10:55:18 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // fixtures
        {pattern: 'test/fixtures/*.html', watched: true, served: true, included: false},

        // lib
        {pattern: 'lib/*.js', watched: true, served: true, included: true},

        // axe-core
        {pattern: 'node_modules/axe-core/axe.min.js', watched: false, served: true, included: true},

        // specs
        'test/spec/**spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'lib/*.js': 'coverage'
    },

    // test results reporter to use

    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'kjhtml'],
    coverageReporter: {
        reporters: [
            { type: 'text-summary' },
            { type: 'html'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // plugins required for running the karma tests
    plugins:[
        'karma-jasmine',
        'karma-jasmine-jquery',
        'karma-jasmine-html-reporter',
        'karma-firefox-launcher',
        'karma-coverage',
        'karma-spec-reporter'
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
