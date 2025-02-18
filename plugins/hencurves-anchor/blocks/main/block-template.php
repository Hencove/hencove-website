<?php

/**
 * 
 * @link https://www.advancedcustomfields.com/resources/acf_register_block_type/
 * 
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */
// 
// get ACF fields for this block
$fields            = get_fields();
$stroke_width      = get_field('stroke_width');
$z_index           = get_field('z-index');

//

// Support custom "anchor" values.
$anchor = '';
if (! empty($block['anchor'])) {
    $anchor = ' id="' . esc_attr($block['anchor']) . '" ';
}

$class_name = 'hencurve-anchor';

$stroke_color = ! empty( $block['textColor'] ) ? $block['textColor'] : 'base';

?>

<div <?php echo esc_attr($anchor); ?>
    class="<?php echo esc_attr($class_name); ?>" 
    data-stroke-width="<?php echo esc_attr($stroke_width); ?>"
    data-z-index="<?php echo esc_attr($z_index); ?>"
    data-color="<?php echo esc_attr($stroke_color); ?>"
    >
</div>