import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
// import yargs from 'yargs'
import yargs from 'yargs';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps'
import del from 'del';
import series from 'gulp';
import parallel from 'gulp';
import watch from 'gulp';
import webpack from 'webpack-stream';
import src from 'gulp';
import dest from 'gulp';
import uglify from 'gulp-uglify'
import named from 'vinyl-named';
// const PRODUCTION = yargs.prod;

const PRODUCTION = yargs.prod;

//const PRODUCTION = yargs.argv.prod;
// let PRODUCTION = yargs.argv.production;
const sass = gulpSass(dartSass);


const paths = {
    styles: {
        src: ['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
        dest: 'dist/assets/css'
    },
    images: {
        src: 'src/assets/images/**/*.{jpg,jpeg,gif,png,svg}',
        dest: 'dist/assets/images'
    },
    scripts: {
        src: ['src/assets/js/bundle.js', 'src/assets/js/admin.js'],
        dest: 'dist/assets/js'
    },
    other: {
        src: ['src/assets/**/*', '!src/assets/{images,js,scss}', '!src/assets/{images,js,scss}/**/*'],
        dest: 'dist/assets'
    }
}

//del method 
export const clean = () => del(['dist']);


// export const styles = () => {

//     return gulp.src(paths.styles.src)
//         .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulpif(PRODUCTION, cleanCSS({ compatibility: 'ie8' })))
//         .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
//         .pipe(gulp.dest(paths.styles.dest));

// }

export const styles = () => {

    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));



}

// export const images = () => {
//     return gulp.src(paths.images.src)
//         .pipe(gulpif(PRODUCTION, imagemin()))
//         .pipe(gulp.dest(paths.images.dest));

// }

export const images = () => {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));

}

export const copy = () => {
    return gulp.src(paths.other.src)
        .pipe(gulp.dest(paths.other.dest));
}

export const scripts = () => {
    return gulp.src(paths.scripts.src)
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-proposal-class-properties']
                            }
                        }
                    }
                ]
            },

            // mode: PRODUCTION ? 'production' : 'development',
            //devtool: !PRODUCTION ? 'inline-source-map' : false,
            devtool: 'inline-source-map',
            output: {
                filename: '[name].js'
            },
        }))
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulp.dest(paths.scripts.dest));
}

export const watchForChanges = () => {
    gulp.watch('src/assets/scss/**/*.scss', styles);
    gulp.watch('src/assets/js/**/*.js', scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.other.src, copy);
}





export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, copy), watchForChanges)
export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, copy))
export default dev;
