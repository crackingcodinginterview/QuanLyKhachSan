var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var argv = require('yargs').argv;
var os = require('os');
var path = require('path');
var gulpOpen = require('gulp-open');
var cssimport = require("gulp-cssimport");
var acss = require('gulp-atomizer');
var open = argv.open;
var tinylr, currentVersion, nextVersion;
var rjs = require('gulp-requirejs');

var paths = {
    scss: ['./scss/**/*.scss'],
};
config = {
    DEV_PORT: 1234,
    LIVERELOAD_PORT: 5678
};

function notifyLiveReload(event) {
    var fileName = path.relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('acss', function() {
    return gulp.src('./src/**/*.html')
        .pipe(acss('atomic.scss'))
        .pipe(gulp.dest('./scss'));
});

gulp.task('scss', function (done) {
    gulp.src('./scss/app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(cssimport({}))
        .pipe(minifyCss({processImport: false}))
        .pipe(gulp.dest('./css/'))
        .on('end', done);
});

gulp.task('requirejsBuild', function() {
    return rjs({
        baseUrl: './',
        out: 'dist/main.js',
        name: 'main',
        findNestedDependencies: true,
        shim: {
        },
    })
        .pipe(gulp.dest('./main/')); // pipe it to the output DIR
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch('./src/**/*.html', ['acss']);
    // gulp.watch('./src/**/*.html', notifyLiveReload);
    gulp.watch('./src/css/*.css', notifyLiveReload);
});

// Development task
gulp.task('express', function () {
    var express = require('express');
    var app = express();
    var port = process.env.PORT || (argv.port || config.DEV_PORT);
    var dir = argv.dir || '';
    var assetPath = path.join(__dirname, dir);
    app.use(require('connect-livereload')({port: config.LIVERELOAD_PORT}));
    app.use(express.static(assetPath));
    app.listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
    app.get('/', function (req, res) {
        res.sendFile("index.html");
    });
});

gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(config.LIVERELOAD_PORT);
});

gulp.task('default', ['scss', 'express', 'livereload', 'watch'], function () {
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
    return gulp.src('index.html').pipe(gulpOpen({
        uri: 'http://localhost:' + config.DEV_PORT,
        app: browser
    }));
});
