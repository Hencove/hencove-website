<?php

/**
 * Plugin Name:       Hencurves
 * Description:       Animated "H" experiments with ScrollTrigger and MorphSVG
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Hencove
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hencurves
 *
 * @package           wp scaffold plugin
 */
// Define our constants.
define('PLUGIN_DIR', __DIR__);
define('PLUGIN_URL', plugin_dir_url(__FILE__));

// Includes
require 'acf-config.php';
add_action('init', 'hencurves_setup');
function hencurves_setup()
{
    $path = __DIR__ . "/blocks";

    if (is_dir($path)) {
        foreach (scandir($path) as $file) {
            $directory = $path . '/' . $file;
            if ($file !== '.' && $file !== '..' && is_dir($directory)) {
                register_block_type($directory);
            }
        }
    }

    // 
    wp_register_script('hencurves-js', plugin_dir_url(__FILE__) . '_build/js/scripts.js', ['jquery', 'acf']);
}
