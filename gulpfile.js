const clean = require('gulp-clean');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');
const tsProject = ts.createProject('tsconfig.json');
const typings = require('gulp-typings');

const paths = {
  javascript: 'app/**/*.js',
  out: '',
  sourcemaps: 'app/**/*.js.map',
  sourcemapsOut: '.',
  typescript: ['**/*.ts', '!node_modules/**/*.*', '!typings/**/*.*'],
  typings: 'typings',
};

gulp.task('clean', () =>
  gulp.src([
    paths.javascript,
    paths.sourcemaps,
    paths.typings,
  ]).pipe(clean())
);

gulp.task('tslint', () =>
  gulp.src(paths.typescript)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
);

gulp.task('typings', () =>
  gulp.src('typings.json')
    .pipe(typings())
);

gulp.task('ts', () => {
  const tsResult = tsProject.src(paths.typescript)
    .pipe(sourcemaps.init())
    .pipe(ts(tsConfig.compilerOptions));

  return tsResult.js
    .pipe(sourcemaps.write(paths.sourcemapsOut))
    .pipe(gulp.dest(paths.out));
});

gulp.task('watch', () =>
  gulp.watch(paths.typescript, ['ts'])
);

gulp.task('build', (callback) =>
  runSequence(
    'clean',
    'tslint',
    'typings',
    'ts',
    callback
  )
);

gulp.task('default', ['build']);
