<?php

/**
 * 
 */
// 



/**
 *  AJAX Filter Team Members:
 *  will echo a $response back to an $.ajax function
 *
 * @param [type] $dataFromJavaScript
 * @return void
 */
function filter_team_members()
{

    $response = '';

    $ajaxposts = new WP_Query([
        'post_type' => 'hc-our-team',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'desc',
        'tax_query' => [
            array(
                'taxonomy' => 'team-member-categories',
                'field' => 'slug',
                'terms' => $_POST['term'],
            )
        ]
    ]);

    if ($ajaxposts->have_posts()) {
        $response .= '<div class="is-filtered-query-section"><h2>' . ucfirst($_POST['term']) . '</h2><ul class="columns-3 alignwide has-background has-base-background-color wp-block-post-template is-layout-grid wp-container-core-post-template-layout-1 wp-block-post-template-is-layout-grid">';
        while ($ajaxposts->have_posts()) : $ajaxposts->the_post();

            ob_start();
            get_template_part('partial-templates/team-member');

            $response .= ob_get_clean();

        endwhile;
        $response .= '</ul></div>';
    } else {
        $response = 'empty';
    }

    // // $response = do_blocks('<!-- wp:template-part {"slug":"query-loop-team-members","tagName":"div"} /-->');
    // $response = do_blocks('<!-- wp:pattern {"slug":"hencovestarter/posts"} /-->');


    echo $response;
    exit;
}
add_action('wp_ajax_filter_team_members', 'filter_team_members');
add_action('wp_ajax_nopriv_filter_team_members', 'filter_team_members');

function get_acf_image_data()
{
    $post_id = intval($_POST['post_id']);
    // $image = get_field('video_clip', $post_id); // Replace 'image_field' with your ACF field name


    $orVideo = get_field('video_file', $post_id);

    if (!empty($orVideo)) {
        $image_data = [
            'isVideo' => true,
            'url' => esc_url($orVideo['url'])
        ];
        wp_send_json_success($image_data);
    } else {
        // if ($image) {
        //     $image_data = [
        //         'url' => esc_url($image['url']),
        //         'alt' => esc_attr($image['alt']),
        //     ];
        //     wp_send_json_success($image_data);
        // } else {
            wp_send_json_error('No video found.');
        // }
    }
}

add_action('wp_ajax_get_acf_image_data', 'get_acf_image_data');
add_action('wp_ajax_nopriv_get_acf_image_data', 'get_acf_image_data');
