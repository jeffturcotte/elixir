'use strict';

var batch = Elixir.Plugins.batch;

/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */

gulp.task('watch', function () {
    Elixir.hooks.watch.forEach(function (hook) {
        return hook();
    });

    runAllTasks();

    Elixir.tasks.forEach(function (task) {
        var batchOptions = Elixir.config.batchOptions;
        var watchOptions = Elixir.config.watch;

        if (task.hasWatchers()) {
            gulp.watch(task.watchers, watchOptions, batch(batchOptions, function (events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

/**
 * Trigger all registered tasks.
 */
function runAllTasks() {
    gulp.start('default');

    Elixir.isRunningAllTasks = false;
}