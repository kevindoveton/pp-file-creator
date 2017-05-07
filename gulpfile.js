var gulp = require('gulp');
var todo = require('gulp-todo');
 
// generate a todo.md from your javascript files 
gulp.task('todo', function() {
  gulp.src(['./**/*.js', '!node_modules/**/*'])
    .pipe(todo())
    .pipe(gulp.dest('./'));
      // -> Will output a TODO.md with your todos 
});

gulp.task('default', ['todo']);
