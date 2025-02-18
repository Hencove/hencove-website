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
$shape_size        = get_field('shape_size');
$stroke_width      = get_field('stroke_width');
$z_index           = get_field('z-index');

//

$class_name = ['class' => 'hencurve-anchor'];
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes($class_name) ); ?>
    data-shape-size="<?php echo esc_attr($shape_size); ?>"
    data-stroke-width="<?php echo esc_attr($stroke_width); ?>"
    data-z-index="<?php echo esc_attr($z_index); ?>"
    >
</div>