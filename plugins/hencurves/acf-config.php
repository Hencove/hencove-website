<?php
/**
 * 
 */
// 
// Set a custom load path to ensure the plugin's field groups are loaded
add_filter('acf/settings/load_json', 'my_plugin_acf_json_load_point');
function my_plugin_acf_json_load_point($paths) {
    // Append path to plugin's acf-json directory
    $paths[] = plugin_dir_path(__FILE__) . 'acf-json';
    return $paths;
}

// Set the custom save path conditionally when updating a field group
add_action('acf/update_field_group', 'my_plugin_acf_json_save_conditionally', 1);
function my_plugin_acf_json_save_conditionally($field_group) {
    // Check if field group belongs to plugin (adjust the prefix to match your plugin)
    if (strpos($field_group['title'], 'Hencurves') === 0) {
        // Temporarily set the save path to plugin's directory
        add_filter('acf/settings/save_json', function($path) {
            return plugin_dir_path(__FILE__) . 'acf-json';
        });
    }
}
