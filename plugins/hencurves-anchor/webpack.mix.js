const mix = require('laravel-mix');
require('laravel-mix-clean');

mix

    .js('_source/js/scripts.js', '_build/js/scripts.js').sourceMaps()
    .sass('_source/scss/styles.scss', '_build/css/styles.css').sourceMaps()
    .clean({
        cleanOnceBeforeBuildPatterns: ['./_build/*'],
    })
    .options({
        processCssUrls: false
    });