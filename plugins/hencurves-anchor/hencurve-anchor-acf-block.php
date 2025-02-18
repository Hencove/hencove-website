<?php

/**
 * Plugin Name:       Hencurves Anchor
 * Description:       Animated "H" experiments with ScrollTrigger and MorphSVG
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Hencove
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hencurves
 *
 * @package           HencurvesAnchor
 */
// 
require_once(plugin_dir_path(__FILE__) . 'acf-config.php');


/**
 * Setup the Hencurves Anchor plugin.
 */
add_action('init', 'hencurves_anchor_setup');
function hencurves_anchor_setup()
{
    $blocks_path = plugin_dir_path(__FILE__) . 'blocks';

    // Register blocks if the blocks directory exists.
    if (is_dir($blocks_path)) {
        foreach (scandir($blocks_path) as $file) {
            $directory = $blocks_path . '/' . $file;
            if ($file !== '.' && $file !== '..' && is_dir($directory)) {
                register_block_type($directory);
            }
        }
    }
}
