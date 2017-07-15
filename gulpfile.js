//Include required modules
var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    babelify = require('babelify'),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    source = require("vinyl-source-stream")
;

//Compile Sass FIles
gulp.task('sass', function(){
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Copy html and images into build folder
gulp.task('dist-html', function() {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'));
});
gulp.task('dist-images',function(){
    gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('build/images'));
});

//Convert ES6 ode in all js files in src/js folder and copy to build folder as bundle.js
gulp.task("build",["sass", "dist-html", "dist-images"], function(){
    return browserify({
        entries: ["./app/js/index.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build/js"))
    ;
});

//Watch project files
gulp.task('watch',['startServer'], function(){
    gulp.watch('app/scss/**/*.scss', ['reload-css']);
    gulp.watch('app/**/*.html', ['reload-html']);
    gulp.watch('app/**/*.js', ['reload-js']);
});

//Reload project on changes
gulp.task('reload-js', ['build'], () => {
    return gulp.src('app/js/**/*.js').pipe(connect.reload());
});
gulp.task('reload-html', ['build'], () => {
    return gulp.src('app/**/*.html').pipe(connect.reload());
});
gulp.task('reload-css', ['build'], () => {
    return gulp.src('app/scss/**/*.scss').pipe(connect.reload());
});

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task("default",[ "build", "watch"]);

//Start a test server with doc root at build folder and 
//listening to 9001 port. Home page = http://localhost:9001
gulp.task("startServer", function(){
    connect.server({
        root : "./build",
        livereload : true,
        port : 9001
    });
});