var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var shell = require('gulp-shell');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var through = require('through2');
var pkg;

try{
  pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
  pkg_bower = JSON.parse(fs.readFileSync('./bower.json', 'utf8'))
  pkg_component = JSON.parse(fs.readFileSync('./component.json', 'utf8'))
}catch(e){}

var wpConfig = {
 output: {
    filename: "rehub.js",
    library: "rehub",
    libraryTarget: "umd"
  }
}



gulp.task('jshint', function(){
      // jshint
  gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

})

gulp.task("build", ["jshint"], function(){

  gulp.src("src/index.js")
    .pipe(webpack(wpConfig))
    .pipe(wrap(signatrue))
    .pipe(gulp.dest('dist/'))
    .pipe(wrap(mini))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .on("error", function(err){
      throw err
    })
})

gulp.task('dev', function(){
  gulp.watch(['src/**/*.js'], ['build'])
})

gulp.task('test', function(){
  // todo
})




function wrap(fn){
  return through.obj(fn);
}

function signatrue(file, enc, cb){
  var sign = '/**\n'+ '@author\t'+ pkg.author.name + '\n'+ '@version\t'+ pkg.version +
    '\n'+ '@homepage\t'+ pkg.homepage + '\n*/\n';
  file.contents =  Buffer.concat([new Buffer(sign), file.contents]);
  cb(null, file);
}

function mini(file, enc, cb){
  file.path = file.path.replace('.js', '.min.js');
  cb(null, file)
}