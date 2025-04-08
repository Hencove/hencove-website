const mix = require("laravel-mix");
require("laravel-mix-clean");

// Define your JS file paths for modular structure
const jsFiles = {
	pages: [
		"_source/js/pages/ourwork.js",
		"_source/js/pages/about.js",
		"_source/js/pages/blog-posts-template.js",
		"_source/js/pages/job-posts-template.js",
		"_source/js/pages/blog.js",
		"_source/js/pages/home.js",
		"_source/js/pages/custom-404.js"
	],
	patterns: [
		"_source/js/patterns/blog-posts.js",
		"_source/js/patterns/_pinwheelMotionpath.js",
		"_source/js/patterns/swiper.js",
		"_source/js/patterns/header.js",
	],
};

// Combine all files into one build process
const allJsFiles = [...jsFiles.pages, ...jsFiles.patterns];

mix
	// Process each JS file separately
	.js("_source/js/block-variations.js", "_build/js/block-variations.js")
	.js("_source/js/scripts.js", "_build/js/scripts.js")
	.sourceMaps();

allJsFiles.forEach((filePath) => {
	const outputFile = filePath.replace("_source/js", "_build/js");
	mix.js(filePath, outputFile).sourceMaps();
});

mix
	// Process your SCSS files
	.sass("_source/scss/styles.scss", "_build/css/styles.css")
	.sass("_source/scss/editor-styles.scss", "_build/css/editor-styles.css")
	.sass("_source/scss/block-styles.scss", "_build/css/block-styles.css")
	.sourceMaps()
	// Clean the build directory
	.clean({
		cleanOnceBeforeBuildPatterns: ["./_build/*"],
	})
	.options({
		processCssUrls: false,
	});
