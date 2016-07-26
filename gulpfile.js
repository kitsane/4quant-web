const gulp = require('gulp'),
    babel = require('gulp-babel'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    uglyfly = require('gulp-uglyfly');

const config = {
    bowerDir: 'bower_components',
    outputDir: '.tmp/dist'
}

gulp.task('bower', function () {
    return bower();
});

gulp.task('fonts', function () {
    return gulp.src([
    config.bowerDir + '/font-awesome/fonts/**.*',
    config.bowerDir + '/reveal.js/lib/font/*/**.*'
    ])
        .pipe(gulp.dest(config.outputDir + '/fonts'));
});

gulp.task('images', function () {
    return gulp.src([
      'source/images/**/*',
      'source/slides/**/*',
      'source/news/**/*'
     ])
        .pipe(imagemin())
        .pipe(gulp.dest(config.outputDir + '/images'));
});

gulp.task('sass', function () {
    return gulp.src('source/stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.outputDir + '/stylesheets'));
});

gulp.task('scripts-nobabel', function() {
    return gulp.src([
        config.bowerDir + "/jquery/dist/jquery.min.js",
        config.bowerDir + "/tether/dist/js/tether.js",
        config.bowerDir + "/bootstrap/js/dist/util.js",
        config.bowerDir + "/bootstrap/js/dist/modal.js",
        config.bowerDir + "/bootstrap/js/dist/carousel.js",
      //   config.bowerDir + "/bootstrap/js/dist/tooltip.js",
    ])
    .pipe(concat("noBabel.js"))
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('scripts-babel', function() {
    return gulp.src([
      "source/javascripts/main.js",
    ])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat("babel.js"))
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('scripts', ['scripts-nobabel', 'scripts-babel'], function () {
    return gulp.src([
      config.outputDir + '/javascripts/noBabel.js',
      config.outputDir + '/javascripts/babel.js',
    ])
    .pipe(concat("concat.js"))
    .pipe(uglyfly())
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('markedjs', function () {
    return gulp.src([
      config.bowerDir + "/reveal.js/plugin/markdown/marked.js",
      config.bowerDir + "/reveal.js/plugin/markdown/markdown.js",
      config.bowerDir + "/reveal.js/plugin/highlight/highlight.js",
      config.bowerDir + "/reveal.js/lib/js/classList.js",
      config.bowerDir + "/reveal.js/lib/js/head.min.js",
      config.bowerDir + "/reveal.js/plugin/math/math.js",
      config.bowerDir + "/reveal.js/plugin/zoom-js/zoom.js"
    ])
    .pipe(uglyfly())
    .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('revealjs', function () {
    return gulp.src([
      config.bowerDir + "/reveal.js/js/reveal.js",
      "source/javascripts/reveal_initialize.js"
    ])
        .pipe(concat("reveal.js"))
        .pipe(gulp.dest(config.outputDir + '/javascripts'));
});

gulp.task('default', function () {
    runSequence('bower', ['sass', 'scripts', 'revealjs', 'markedjs', 'fonts']);
});

gulp.task('watch', function () {
    gulp.watch('source/stylesheets/**/*.scss', ['sass']);
    gulp.watch('source/javascripts/**/*.js', ['scripts', 'revealjs']);
});
