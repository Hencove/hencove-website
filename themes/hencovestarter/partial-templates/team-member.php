<?php

/**
 * 
 */
// 


$personAttributes = [
    'li_classes' => 'wp-block-post hc-our-team type-hc-our-team has-post-thumbnail team-member-categories-ligers',
    'thumbnail' => get_the_post_thumbnail($post),
    'url' => get_permalink($post),
    'name' => $post->post_title
];
?>
<li class="<?php echo $personAttributes['li_classes']; ?>">

    <div class="wp-block-group has-global-padding is-content-justification-left">
        <figure style="aspect-ratio:3/4;width:220px; padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;" class="aligncenter wp-block-post-featured-image">
            <a href="<?php echo $personAttributes['url']; ?>" target="_self">
                <?php echo $personAttributes['thumbnail']; ?>
            </a>
        </figure>


        <div class="wp-block-group has-base-background-color has-background has-global-padding is-content-justification-left is-layout-constrained wp-container-core-group-layout-8 wp-block-group-is-layout-constrained" style="padding-top:var(--wp--preset--spacing--x-small);padding-right:var(--wp--preset--spacing--x-small);padding-bottom:var(--wp--preset--spacing--x-small);padding-left:var(--wp--preset--spacing--x-small)">
            <h4 class="wp-block-post-title"><a href="<?php echo $personAttributes['url']; ?>" target="_self"><?php echo $personAttributes['name']; ?></a></h4>

            <div class="taxonomy-team-member-categories wp-block-post-terms has-x-small-font-size"><a href="https://hencove-starter.local/team-member-categories/<?php echo $_POST['term']; ?>/" rel="tag"><?php echo ucfirst($_POST['term']); ?></a></div>

            <div class="wp-block-post-excerpt has-x-small-font-size">
                <p class="wp-block-post-excerpt__excerpt"><?php echo wp_trim_words(get_the_excerpt($post), 25); ?></p>
            </div>
        </div>
    </div>

</li>