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
//

// Support custom "anchor" values.
$anchor = '';
if (! empty($block['anchor'])) {
    $anchor = ' id="' . esc_attr($block['anchor']) . '" ';
}

// Create class attribute allowing for custom "className" and "align" values.
$class_name = 'hencurve';
if (! empty($block['className'])) {
    $class_name .= ' ' . $block['className'];
}
if (! empty($block['align'])) {
    $class_name .= ' align' . $block['align'];
}
if ( ! empty( $block['textColor'] ) ) {
	$class_name .= ' has-stroke-color';
	$class_name .= ' has-' . $block['textColor'] . '-stroke-color';
}

$stroke_color = ! empty( $block['textColor'] ) ? $block['textColor'] : 'base';

?>

<div <?php echo esc_attr($anchor); ?>
    class="<?php echo esc_attr($class_name); ?>" 
    data-color="<?php echo esc_attr($stroke_color); ?>"
    >
        <InnerBlocks />
</div>