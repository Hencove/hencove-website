<?php
// ? silence is golden
// ? code is poetry

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}



class SetupTheme
{

	/**
	 * Holds the instance.
	 */
	private static $instance;


	/**
	 * Init Main Instance.
	 *
	 * Insures that only one instance exists in memory at any one
	 * time. Also prevents needing to define globals all over the place.
	 */
	public static function instance()
	{

		// manage state to keep only one instace in memory
		if (!isset(self::$instance) && !(self::$instance instanceof SetupTheme)) {

			self::$instance = new SetupTheme();
			self::$instance->includes();
			self::$instance->enqueueStyles();
			self::$instance->enqueueScripts();
			self::$instance->enqueueBlockStyles();
			// 
			// self::$instance->registerMenus();
			self::$instance->setThemeSupports();
		}

		// return new instance
		return self::$instance;
	}

	private function enqueueBlockStyles()
	{
		// 
		add_action('enqueue_block_assets', function () {
			wp_register_style(
				'hc-block-styles',
				get_template_directory_uri() . '/_build/css/block-styles.css',
				array(),
				filemtime(get_template_directory() . '/_build/css/block-styles.css')
			);
			// 
			wp_enqueue_style('hc-block-styles');



			wp_enqueue_style('fontawesome-kit', 'https://kit.fontawesome.com/9b8cf50ca1.js');
			wp_enqueue_style('typekit-fonts', 'https://use.typekit.net/xsw3fgj.css');
			wp_enqueue_style('typekit-fonts2', 'https://use.typekit.net/odh2icl.css');
		});
	}
	private function enqueueStyles()
	{
		// 
		add_action('wp_enqueue_scripts', function () {
			wp_register_style(
				'main',
				get_template_directory_uri() . '/_build/css/styles.css',
				array(),
				filemtime(get_template_directory() . '/_build/css/styles.css')
			);
			// 
			wp_enqueue_style('main');
			//
			//
			wp_register_style(
				'select2Styles',
				"https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
			);
			// 
			wp_enqueue_style('select2Styles');
			wp_register_style(
				'swipercss',
				"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
			);
			// 
			wp_enqueue_style('swipercss');
		});
	}
	private function enqueueScripts()
	{

		add_action('wp_enqueue_scripts', function () {
			// 
			wp_register_script(
				'main',
				get_template_directory_uri() . '/_build/js/scripts.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/scripts.js'),
				true
			);
			wp_enqueue_script('main');

			/* 
				Page / Pattern Scripts (broken up)
			*/
			wp_register_script(
				'about-page',
				get_template_directory_uri() . '/_build/js/pages/about.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/about.js'),
				true
			);
			wp_register_script(
				'blog-post-single',
				get_template_directory_uri() . '/_build/js/pages/blog-posts-template.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/blog-posts-template.js'),
				true
			);
			wp_register_script(
				'job-posts-template',
				get_template_directory_uri() . '/_build/js/pages/job-posts-template.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/job-posts-template.js'),
				true
			);
			wp_register_script(
				'blog-page',
				get_template_directory_uri() . '/_build/js/pages/blog.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/blog.js'),
				true
			);
			wp_register_script(
				'our-work-page',
				get_template_directory_uri() . '/_build/js/pages/ourwork.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/ourwork.js'),
				true
			);
			wp_register_script(
				'home-page',
				get_template_directory_uri() . '/_build/js/pages/home.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/home.js'),
				true
			);
			wp_register_script(
				'404-page',
				get_template_directory_uri() . '/_build/js/pages/custom-404.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/pages/custom-404.js'),
				true
			);
			wp_register_script(
				'blog-post-cards',
				get_template_directory_uri() . '/_build/js/patterns/blog-posts.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/patterns/blog-posts.js'),
				true
			);
			wp_register_script(
				'pinwheel',
				get_template_directory_uri() . '/_build/js/patterns/_pinwheelMotionpath.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/patterns/_pinwheelMotionpath.js'),
				true
			);
			wp_register_script(
				'swiper',
				get_template_directory_uri() . '/_build/js/patterns/swiper.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/patterns/swiper.js'),
				true
			);
			wp_register_script(
				'header',
				get_template_directory_uri() . '/_build/js/patterns/header.js',
				array('jquery'),
				filemtime(get_template_directory() . '/_build/js/patterns/header.js'),
				true
			);

			/* 

				Vendor Scripts

			*/

			// 
			wp_register_script(
				'select2Scripts',
				'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
			);
			// 
			wp_register_script(
				'swiperjs',
				'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
			);

			wp_enqueue_script('select2Scripts');
			wp_enqueue_script('swiperjs');
			wp_enqueue_script('header');

			if (is_page('9')) {
				wp_enqueue_script('home-page');
				wp_enqueue_script('pinwheel');
				wp_enqueue_script('blog-post-cards');
			}
			if (is_page('78')) {
				wp_enqueue_script('about-page');
			}
			if (is_page('80')) {
				wp_enqueue_script('blog-page');
				wp_enqueue_script('blog-post-cards');
			}
			if (is_page('79')) {
				wp_enqueue_script('our-work-page');
				wp_enqueue_script('swiper');
				wp_enqueue_script('blog-post-cards');
			}
			if (is_single()) {
				wp_enqueue_script('blog-post-single');
				wp_enqueue_script('swiper');
				wp_enqueue_script('job-posts-template');
			}
			if (is_404()) {
				wp_enqueue_script('404-page');
			}
		});
	}

	private function registerMenus()
	{
		add_action('after_setup_theme', function () {

			// This theme uses wp_nav_menu() in one location.
			register_nav_menus(
				array(
					'menu-1' => esc_html__('Primary', 'hencovestarter'),
				)
			);
		});
	}

	private function setThemeSupports()
	{
		add_action('after_setup_theme', function () {

			/**
			 * Make theme available for translation.
			 * Translations can be filed in the /languages/ directory.
			 */
			load_theme_textdomain('hencovestarter', get_template_directory() . '/languages');

			/**
			 * Enable support for Post Thumbnails on posts and pages.
			 *
			 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
			 */
			add_theme_support('post-thumbnails');

			/**
			 * Add support for core custom logo.
			 *
			 * @link https://codex.wordpress.org/Theme_Logo
			 */
			add_theme_support(
				'custom-logo',
				array(
					'height'      => 250,
					'width'       => 250,
					'flex-width'  => true,
					'flex-height' => true,
				)
			);

			/**
			 * 		Misc Supports and Filters
			 */
			// add_filter('show_admin_bar', '__return_true');			// force showing the admin bar when logged in (front end)
			add_theme_support('body-open');								// enable wp_body_open filter
			add_post_type_support('page', 'excerpt');						// let pages have excerpts

			/**
			 * 
			 * 		Block Editor Filter / Supports
			 * 
			 */
			add_filter('should_load_remote_block_patterns', '__return_false');  // remove remote block patterns
			add_filter('should_load_separate_core_block_assets', '__return_true');    // enable / enforce loading separate block stylesheets
			add_theme_support('disable-custom-font-sizes');        // disable wp core custom font sizes
			add_theme_support('disable-custom-colors');            // disable wp core custom colors
			add_theme_support('disable-custom-gradients');        	// disable wp core custom gradients
			add_theme_support('align-wide');                      	// enable wide alignment for blocks
			add_theme_support('custom-spacing');                  	// opt-in to letting blocks set padding
			add_theme_support('editor-gradient-presets', []); 		// remove the preset gradients in wp core
			// add_theme_support('editor-styles');
			remove_theme_support('core-block-patterns');           // remove the "patterns" library
			/**
			 * register our editor stylesheet
			 */
			add_editor_style(get_template_directory_uri() . '/_build/css/editor-styles.css');
		});
	}


	private function includes()
	{

		// ... require_once template files here
		require_once(get_template_directory() . '/functions/utility.php');
		require_once(get_template_directory() . '/functions/apply-filters.php');
		require_once(get_template_directory() . '/functions/acf-blocks.php');
	}
}

SetupTheme::instance();
