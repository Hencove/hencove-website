<?php
// ? silence is golden
// ? code is poetry

/**
 * gets file names and paths within a directory at one depth
 * uses scandir to return an associated array of filenames and paths
 *
 * @param [string] $dir
 * @return array
 */
function get_dir_filenames_and_paths($dir)
{

	if (!is_dir($dir)) {
		return;
	}

	$finalArray = [];
	// remove '.' and '..' from the scandir
	$found = array_diff(scandir($dir), array('.', '..'));

	// capture only the name of the file
	foreach ($found as $item) {
		$finalArray[str_replace('.php', '', $item)] = $dir . $item;
	}

	//
	return $finalArray;
}



/**
 * return an inline-styles string for an acf block
 *
 * @param [type] $block
 * @param [type] $fields
 * @return void
 */
function return_acf_block_text_and_bg_style_string($block, $fields)
{
	$background_color = $fields['background_color'];
	$text_color       = $fields['text_color'];

	// Build a valid style attribute for background and text colors.
	$styles = array('background-color: ' . $background_color, 'color: ' . $text_color);
	$style  = implode('; ', $styles);


	return $style;
}


/**
 * return a classes array for explosion in block template
 *
 * @param [type] $block
 * @return array
 */
function return_acf_block_base_css_classes_array($block, $classes)
{

	// merge base class with block class
	$classes = array_merge(['acf-block'], $classes);

	// 	alignment
	if (!empty($block['align'])) {
		$classes[] = 'align' . $block['align'];
	}
	// 	full-height
	if (!empty($block['full_height'])) {
		$classes[] = 'is-full-height';
	}
	// 	align-text
	if (!empty($block['align_text'])) {
		$classes[] = 'has-text-align-' . $block['align_text'];
	}
	// 	align-content
	if (!empty($block['align_content'])) {
		$classes[] = 'is-vertically-aligned-' . $block['align_content'];
	}
	// 	bgcolor
	if (!empty($block['backgroundColor'])) {
		$classes[] = 'has-background';
		$classes[] = 'has-' . $block['backgroundColor'] . '-background-color';
	}
	// 	color
	if (!empty($block['textColor'])) {
		$classes[] = 'has-text-color';
		$classes[] = 'has-' . $block['textColor'] . '-color';
	}

	// custom classes from CMS
	if (!empty($block['className'])) {
		$classes = array_merge($classes, explode(' ', $block['className']));
	}

	return $classes;
}