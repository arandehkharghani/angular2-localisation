const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const path = require('path');
const tsconfig = require('tsconfig');
const project = tsconfig.loadSync('tsconfig.json');
const gulpDebug = require('gulp-debug');
const gulpFilter = require('gulp-filter');
const gulpPlumber = require('gulp-plumber');
const watch = require('gulp-watch');

gulp.task('scripts', function () {
    // the following task transiples the ts files in project
    return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(babel({ presets: ['es2015']}))
    .pipe(sourcemaps.write('.', { includeContent: true}))
    .pipe(gulp.dest(''));
});


gulp.task('deploy',function(){    
});

gulp.task('build', function (done) {
    runSequence('scripts', done);
});
    
gulp.task('default', function (done) {
    runSequence( 'build', done);
});

gulp.task('watch', function(cb) {  
    return tsProject.src()
        .pipe(watch(project.files))  
        .pipe(gulpFilter((file) => { file.base = '.'; return file.event === 'change'; }))
        .pipe(gulpPlumber())
        .pipe(gulpDebug({title: 'changed'}))
        .pipe(sourcemaps.init())
        .pipe(gulpDebug({title: 'a'}))
        .pipe(ts({ isolatedModules: true, module: 'cjs',target: "es2015", moduleResolution: "node",sourceMap: true,emitDecoratorMetadata: true,experimentalDecorators: true,removeComments: false,noImplicitAny: false }))
        .js
        .pipe(gulpDebug({title: 'b'}))
        .pipe(babel({ presets: ['es2015']}))
        .pipe(gulpDebug({title: 'compiled'}))
        .pipe(sourcemaps.write('.', { includeContent: true}))
        .pipe(gulp.dest('.'));
});