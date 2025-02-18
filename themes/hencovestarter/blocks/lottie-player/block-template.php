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
// $innerBlocks = '<InnerBlocks />';
// get ACF fields for this block
$fields = get_fields();
// get ACF fields for this post
// $postFields = get_fields($post_id);
$classes = return_acf_block_base_css_classes_array($block, ['lottie-player']);
$classString = esc_attr(join(' ', $classes));
// 

// Support custom "anchor" values.
$anchor = '';
if (!empty($block['anchor'])) {
    $anchor = 'id=' . esc_attr($block['anchor']);
}


$contentText = '';
if (is_admin()) {
    $contentText = '<p style="text-align:center;">Lottie Player<br />Under Construction</p>';
}

$jsonURL = '';
if( !empty($fields['lottie_player']['url_or_file']) ){
    if( !empty($fields['lottie_player']['lottie_file']['url']) ){
        $jsonURL = $fields['lottie_player']['lottie_file']['url'];
    }
} else {
    $jsonURL = $fields['lottie_player']['lottie_url'];
}




?>
<div <?php echo esc_attr($anchor); ?> class="<?php echo $classString; ?>" data-json="<?php echo $jsonURL; ?>">
    <div>
        <?php echo $contentText ?>
    </div>
</div>