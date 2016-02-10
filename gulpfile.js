var gulp = require('gulp');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver'); //this is the webdriverIO-driver as gulp-plugin

/**
 * task to install the selenium-standalone server. Won't download the library if it has been done
 * already.
 * will also start the selenium-standalone server.
 */
gulp.task('selenium', (done) => {
    selenium.install({logger: console.log}, () => {
        selenium.start((err, child) => {
            if (err) {
                return done(err);
            }
            selenium.child = child;
            done();
        });
    });
});

/**
 * requires the task selenium to be done.
 * will start the webdriver which the config from wdio.conf.js.
 * implementation of the error-callback to stop the selenium-server and the process itself.
 */
gulp.task('e2e', ['selenium'], () => {
    return gulp.src('wdio.conf.js')
        .pipe(webdriver()).on('error', () => {
            selenium.child.kill();
            process.exit(1);
        });
});

/**
 * main test-task to run all in once and stop the selenium-server if all went well.
 */
gulp.task('test', ['e2e'], () => {
    selenium.child.kill();
});