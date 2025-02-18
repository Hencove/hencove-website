<?php
/**
 * Load and save ACF field groups specifically for the Hencurves Anchor plugin.
 */

// Set a custom load path to ensure the plugin's field groups are loaded.
add_filter('acf/settings/load_json', 'plugin_acf_json_load_point');
function plugin_acf_json_load_point($paths) {
    // Append path to the plugin's acf-json directory.
    $paths[] = plugin_dir_path(__FILE__) . 'acf-json';
    return $paths;
}

// Set the custom save path conditionally when updating a field group.
add_filter('acf/update_field_group', 'plugin_acf_json_save_conditionally', 10, 1);
function plugin_acf_json_save_conditionally($field_group) {
    // Check if the field group belongs to the plugin (match by title).
    if (strpos($field_group['title'], 'Hencurves Anchor') === 0) {
        // Temporarily set the save path to the plugin's acf-json directory.
        add_filter('acf/settings/save_json', 'plugin_acf_json_save_path');
    }
}

// Specify the save path for the plugin's acf-json directory.
function plugin_acf_json_save_path($path) {
    // Return the path to the plugin's directory.
    return plugin_dir_path(__FILE__) . 'acf-json';
}

// Clear the custom save path filter after the field group is saved.
add_action('acf/save_post', 'plugin_clear_acf_json_save_filter', 20);
function plugin_clear_acf_json_save_filter() {
    remove_filter('acf/settings/save_json', 'plugin_acf_json_save_path');
}
