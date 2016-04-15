var gulp = require('gulp'),
    babel = require('gulp-babel'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var config = {
  bowerDir: 'bower_components',
  outputDir: '.tmp/dist'
}

gulp.task('bower', function() {
  return bower();
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest(config.outputDir + '/fonts'));
});

gulp.task('images', function() {
  return gulp.src('source/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(config.outputDir + '/images'));
});

gulp.task('sass', function() {
  return gulp.src('source/stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
});

gulp.task('scripts', function() {
    return gulp.src([
      config.bowerDir + "/jquery/dist/jquery.min.js",
      config.bowerDir + "/bootstrap/js/dist/util.js",
      config.bowerDir + "/bootstrap/js/dist/modal.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat("concat.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('markedjs', function() {
    gulp.src([
      config.bowerDir + "/reveal.js/plugin/markdown/marked.js",
      config.bowerDir + "/reveal.js/plugin/markdown/markdown.js",
      config.bowerDir + "/reveal.js/lib/js/classList.js",
      config.bowerDir + "/reveal.js/lib/js/head.min.js",
      config.bowerDir + "/reveal.js/plugin/math/math.js"
      ])
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['es2015'] }))
      // .pipe(concat("markedjs.js"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('revealjs', function() {
    return gulp.src([
      
      // config.bowerDir + "/reveal.js/lib/js/classList.js",
      // config.bowerDir + "/reveal.js/lib/js/head.min.js",
      config.bowerDir + "/reveal.js/js/reveal.js",
      "source/javascripts/reveal_initialize.js"
    ])
    .pipe(sourcemaps.init())
    // .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat("reveal.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('default', ['sass', 'scripts', 'revealjs', 'markedjs', 'icons', 'images']);

gulp.task('watch', function() {
  gulp.watch(config.bowerDir  + '/**/*', ['sass', 'scripts', 'icons']);
  gulp.watch('source/images/**/*', ['images']);
  gulp.watch('source/stylesheets/**/*.scss', ['sass']);
  gulp.watch('source/javascripts/**/*.js', ['scripts']);
});
