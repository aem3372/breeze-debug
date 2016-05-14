var gulp = require('gulp')
var vue = require('vue-loader')
var webpack = require('gulp-webpack')
var htmlone = require('gulp-htmlone')
var named = require('vinyl-named')
var autoprefixer = require('autoprefixer')
var px2rem = require('postcss-px2rem')

var appList = ['main', 'jsbridge']

var BASE_DPR = 2 // NEED CONFIG IN EACH PROJECT
var REM_UNIT = 75 // NEED CONFIG IN EACH PROJECT

gulp.task('default', ['build'], function () {
  console.log('done')
})

gulp.task('bundle', function () {
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
        {test: /\.vue$/, loader: 'vue'},
        {test: /\.json$/, loader: 'json'}
      ]
    },
    vue: {
      postcss: [
        // img4dpr({dpr: 3, q: 'q50', s: 's150'}),
        px2rem({remUnit: REM_UNIT, baseDpr: BASE_DPR})
      ],
      autoprefixer: {browsers: ['ios_saf >= 7', 'android >= 4']}
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
