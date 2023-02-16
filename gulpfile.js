// importing source, destination, watch & series function from gulp package
const { src, dest, watch, series } = require('gulp')

/* importing gulp-sass plugin package which return a function
to us and we need to invoke that function using parantheses
at the end then we need to pass in our set compiler that we
also installed i.e. sass compiler */
const sass = require('gulp-sass')(require('sass'))

// require & load the purgecss plugin into the gulpfile
const purgecss = require('gulp-purgecss')

/**
 * This function is responsible for compiling sass file into css
 * and inside this function we need to take in a source sass file
 * and compile it into a css file then pipe it to some kind of
 * destination folder.
 */
function buildStyles() {
    /* '**' denotes any subfolder with a sass file 
    or sass file inside the folder 'shinobi' */
    return src('shinobi/**/*.scss')
        .pipe(sass())
        /* incorporate purgecss into buildstyles() function by chaining into
        pipe() method & invoke the returned function within the require. */
        .pipe(purgecss({ content: ['*.html'] }))    // content property tell the plugin which files to look in to determine what css rules we are using for out website
        .pipe(dest('css'))
}

/**
 * This is a watcher function which actively watch our source sass
 * file & when we make changes to that file & save them, it
 * automatically run buildStyles() function for us.
 */
function watchTask() {
    watch(['shinobi/**/*.scss', '*.html'], buildStyles)
}

/* we can use series() function to export
& run the functions in an order */
exports.default = series(buildStyles, watchTask)