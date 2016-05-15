var gulp = require('gulp')
var webpack = require('gulp-webpack')
var htmlone = require('gulp-htmlone')
var named = require('vinyl-named')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var px2rem = require('postcss-px2rem')

var appList = ['main', 'jsbridge']

var BASE_DPR = 2 // NEED CONFIG IN EACH PROJECT
var REM_UNIT = 75 // NEED CONFIG IN EACH PROJECT

gulp.task('default', ['build'], function () {
  console.log('done')
})

gulp.task('css', function() {
  var processors = [
    px2rem({remUnit: REM_UNIT, baseDpr: BASE_DPR}),
    autoprefixer({browsers: ['ios_saf >= 7', 'android >= 4']})
  ];
  return gulp.src('src/*.css')
   .pipe(postcss(processors))
   .pipe(gulp.dest('dist/'))
})

gulp.task('bundle', ['css'], function () {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig()))
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function () {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig({watch: true})))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['bundle'], function () {
  return gulp.src(mapFiles(appList, 'html'))
    .pipe(htmlone())
    .pipe(gulp.dest('dist'))
})

/**
 * @private
 */
function getConfig(opt) {
  var config = {
    output: {
      publicPath: '../dist/'
    },
    module: {
      loaders: [
        {test: /\.json$/, loader: 'json'}
      ]
    },
    devtool: 'source-map'
  }
  if (!opt) {
    return config
  }
  for (var i in opt) {
    config[i] = opt[i]
  }
  return config
}

/**
 * @private
 */
function mapFiles(list, extname) {
  return list.map(function (app) {return 'src/' + app + '.' + extname})
}
