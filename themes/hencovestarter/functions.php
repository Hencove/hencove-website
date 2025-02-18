<?php

/**
 * This file adds functions to the Frost WordPress theme.
 *
 * @package Hencove Starter
 * @author  Hencove
 * @license GNU General Public License v2 or later
 * @link    https://hencove.com/
 */
// 
/**
 * 
 */
require_once(get_template_directory() . '/classes/setup-theme.php');
require_once(get_template_directory() . '/classes/registerBlockStyles.php');
require_once(get_template_directory() . '/classes/registerPatternCategories.php');
require_once(get_template_directory() . '/functions/apply-filters.php');
// 
require_once(get_template_directory() . '/functions/register-blocks.php');



function register_block_variations()
{

	wp_enqueue_script(
		'block-variations',
		get_template_directory_uri() . '/_build/js/block-variations.js',
		array('wp-blocks'),
		filemtime(get_template_directory() . '/_build/js/block-variations.js'),
		true
	);
}
add_action('enqueue_block_editor_assets', 'register_block_variations');

require_once(get_theme_file_path('/functions/query-loop-ajax.php'));


// 
// ? were checking for ?month=# custom query property manually added to buttons on the page
// 
add_filter('kadence_blocks_pro_query_loop_query_vars', function ($query, $ql_query_meta, $ql_id) {

	// if blog posts query on home page
	if ($ql_id == 2497) {
		// custom query var
		$month = !empty($_GET['month']) ? $_GET['month'] : null;
		if (!empty($month)) {
			// update date_query with month property
			$query['date_query']['month'] = $month;
		}
	}
	// 
	// 
	if ($ql_id == 'getforteammembers') {
		// get the term (i.e., get the blobfish category) description
		// also get the custom field for the term featured image!
		// and fire this javascript function (magic!)
	}

	return $query;
}, 10, 3);


function job_post_custom_field() 
{
    $post_id = get_the_ID();
    $data = array(
        'team' => get_field( 'team', $post_id ),
        // Add more custom fields as needed
    );
    wp_localize_script( 'job-posts-template', 'acf_data', $data );
}

add_action('wp_enqueue_scripts', 'job_post_custom_field');

function enqueue_acf_fetch_script()
{
	// Localize the script to pass data to JavaScript
	// wp_localize_script('acf-fetch-script', 'acfFetchData', [
	wp_localize_script('main', 'acfFetchData', [
		'ajax_url' => admin_url('admin-ajax.php'),
		'nonce'    => wp_create_nonce('acf_fetch_nonce'),
	]);
}
add_action('wp_enqueue_scripts', 'enqueue_acf_fetch_script');

// 
// 
// 
// 
function handle_acf_field_fetch()
{

	// Verify nonce
	if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'acf_fetch_nonce')) {
		wp_send_json_error(['message' => 'Invalid nonce']);
	}

	// Get the post ID
	$post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

	if (!$post_id) {
		wp_send_json_error(['message' => 'Invalid post ID']);
	}

	// Fetch the ACF field value
	// $field_value = get_field('team_image', 'team_member_category_' . $post_id); // Replace 'your_field_name' with your actual field name
	$field_value = get_fields('team-member-category_' . $post_id); // Replace 'your_field_name' with your actual field name

	if ($field_value) {
		wp_send_json_success(['field_value' => $field_value]);
	} else {
		wp_send_json_error(['message' => 'Field not found']);
	}
}
add_action('wp_ajax_fetch_acf_field', 'handle_acf_field_fetch');
add_action('wp_ajax_nopriv_fetch_acf_field', 'handle_acf_field_fetch');

function custom_blog_post_permalink($permalink, $post)
{
	// Check if the post type is ‘post’
	if ($post->post_type == 'post') {
		// Build the new permalink structure
		$new_permalink = home_url('/blog/' . $post->post_name . '/');
		return $new_permalink;
	}
	// Return the default permalink for other post types
	return $permalink;
}
add_filter('post_link', 'custom_blog_post_permalink', 10, 2);

function add_custom_rewrite_rules()
{
	add_rewrite_rule('^blog/([^/]+)/?', 'index.php?name=$matches[1]', 'top');
}
add_action('init', 'add_custom_rewrite_rules');

//*
//* Bulk Add Tags
//*
function bulk_add_terms_to_taxonomy()
{
	$taxonomy = 'category'; // Replace with your taxonomy slug
	$terms = [
		"Branding",
		"Strategy",
		"Social Media",
		"Content",
		"Web & Digital",
		"Public Relations",
		"Graphic Design",
		"Video & Animation"
	];

	foreach ($terms as $term) {
		$term_exists = term_exists($term, $taxonomy);

		if (!$term_exists) {
			wp_insert_term($term, $taxonomy);
		}
	}
}

add_action('init', 'bulk_add_terms_to_taxonomy');
