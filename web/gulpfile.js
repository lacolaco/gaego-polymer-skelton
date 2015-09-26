var gulp = require("gulp");
var exec = require('child_process').exec;
var tsconfig = require("gulp-tsconfig-update");
var runSequence = require("run-sequence");

gulp.task("tscfg", ()=>{
  return gulp.src([
    "./scripts/**/*.ts"
  ]).pipe(tsconfig())
});

gulp.task("tsc", ["tscfg"], (cb)=>{
  return exec("$(npm bin)/tsc", function (err) {
    cb(err);
  });
});

gulp.task("vulcanize", (cb)=>{
  return exec("$(npm bin)/vulcanize components/components.html > ./components.vulcanized.html", function (err) {
    cb(err);
  });
});

gulp.task("wp", (cb)=>{
  return exec("$(npm bin)/webpack --color", function (err) {
    cb(err);
  });
});

gulp.task("dist", ()=>{
  return gulp.src([
    "./index.html",
    "./bundle.js",
    "./components.vulcanized.html"
  ]).pipe(gulp.dest("./dist"));
});

gulp.task("publish", ()=>{
  return gulp.src("./dist/**/*.*").pipe(gulp.dest("../api/publish/"));
});

gulp.task("watch", ()=>{
  gulp.watch("./scripts/**/*.ts", ["tsc"]);
  gulp.watch("./scripts/**/*.js", ["wp"]);
  gulp.watch("./components/**/*.html", ["vulcanize"]);
  gulp.watch([
    "./index.html",
    "./bundle.js"
  ], ["dist"]);
  gulp.watch("./dist/**/*.*", ["publish"]);
});

gulp.task("build", (cb)=>{
  return runSequence("tsc", "wp","vulcanize", "dist", "publish", cb);
});

gulp.task("default", (cb)=>{
  return runSequence("build", "watch", cb);
});