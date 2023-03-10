// ------------ connecting gulp
import gulp from 'gulp'


// ------------ config import
import path from './config/path.js'
import plugins from './config/plugins.js'


// ------------ connecting plugins
import browserSync from 'browser-sync'       // browser live reload


// ------------ importing tasks
import clear from './tasks/clear.js'
import pug from './tasks/pug.js'
import scss from './tasks/scss.js'
import img from './tasks/img.js'
import svg from './tasks/svg.js'


// ------------ server task
const server = () => {
    browserSync.init(plugins.browser);
};


// ------------ watching tasks
const watcher = () => {
    gulp.watch(path.pug.watch, pug).on('all', browserSync.reload);  // watching Pug
    gulp.watch(path.scss.watch, scss).on('all', browserSync.reload);  // watching CSS
    gulp.watch(path.img.watch, img).on('all', browserSync.reload);  // watching images
    gulp.watch(path.svg.watch, svg).on('all', browserSync.reload);  // watching svg icons
};


// ------------ granular tasks
export { clear };
export { pug };
export { scss };
export { img };
export { svg };
export { watcher };


// ------------ builds
const build = gulp.series(
    clear,
    gulp.parallel(
        pug,
        scss,
        img,
        svg)
);

const dev = gulp.series(
    build,
    gulp.parallel(
        watcher,
        server)  //
);

export default plugins.isProd
    ? build
    : dev;