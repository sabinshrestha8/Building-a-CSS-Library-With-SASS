// importing source, destination, watch & series function from gulp package
const { src, dest, watch, series } = require('gulp')

/* importing gulp-sass plugin package which return a function
to us and we need to invoke that function using parantheses
at the end then we need to pass in our set compiler that we
also installed i.e. sass compiler */
const sass = require('gulp-sass')(require('sass'))


/**
 * This function is responsible for compiling sass file into css
 * and inside this function we need to take in a source sass file
 * and compile it into a css file then pipe it to some kind of
 * destination folder.
 */
function buildStyles() {
    return src('index.scss')
        .pipe(sass())
        .pipe(dest('css'))
}

/**
 * This is a watcher function which actively watch our source sass
 * file & when we make changes to that file & save them, it
 * automatically run buildStyles() function for us.
 */
function watchTask() {
    watch(['index.scss'], buildStyles)
}

/* we can use series() function to export
& run the functions in an order */
exports.default = series(buildStyles, watchTask)