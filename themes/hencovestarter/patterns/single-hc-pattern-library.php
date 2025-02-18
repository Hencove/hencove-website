<?php
/**
 * Title: single-hc-pattern-library
 * Slug: hencovestarter/single-hc-pattern-library
 * Categories: hidden
 * Inserter: no
 */
?>
<!-- wp:template-part {"slug":"header","tagName":"header","className":"site-header"} /-->

<!-- wp:group {"tagName":"main"} -->
<main class="wp-block-group"><!-- wp:group {"tagName":"article","style":{"spacing":{"blockGap":"var:preset|spacing|large"}},"layout":{"type":"default"}} -->
<article class="wp-block-group"><!-- wp:group {"align":"full","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:cover {"dimRatio":50,"overlayColor":"base","isUserOverlayColor":true,"minHeight":400,"contentPosition":"center center","isDark":false,"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull is-light" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-base-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:post-title {"textAlign":"center","level":1} /--></div></div>
<!-- /wp:cover -->

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|x-small","bottom":"var:preset|spacing|x-small","left":"var:preset|spacing|x-small","right":"var:preset|spacing|x-small"}},"border":{"top":{"width":"1px"},"right":[],"left":[]}},"layout":{"type":"default"}} -->
<div class="wp-block-group alignwide" style="border-top-width:1px;padding-top:var(--wp--preset--spacing--x-small);padding-right:var(--wp--preset--spacing--x-small);padding-bottom:var(--wp--preset--spacing--x-small);padding-left:var(--wp--preset--spacing--x-small)"><!-- wp:bcn/breadcrumb-trail /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-group alignwide"><!-- wp:columns {"align":"wide","className":"has-tablet-columns-2 has-mobile-columns-1","style":{"spacing":{"margin":{"top":"var:preset|spacing|x-large"}}}} -->
<div class="wp-block-columns alignwide has-tablet-columns-2 has-mobile-columns-1" style="margin-top:var(--wp--preset--spacing--x-large)"><!-- wp:column {"width":"","layout":{"type":"constrained","justifyContent":"left"}} -->
<div class="wp-block-column"><!-- wp:post-content {"align":"full","style":{"spacing":{"blockGap":"var:preset|spacing|large"}},"layout":{"type":"constrained","justifyContent":"center"}} /--></div>
<!-- /wp:column -->

<!-- wp:column {"width":"240px"} -->
<div class="wp-block-column" style="flex-basis:240px"><!-- wp:group {"style":{"position":{"type":"sticky","top":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"align":"right"} -->
<p class="has-text-align-right"><?php esc_html_e('<strong>Pattern Categories</strong>', 'hencovestarter');?></p>
<!-- /wp:paragraph -->

<!-- wp:navigation {"ref":1602,"overlayMenu":"never","style":{"spacing":{"blockGap":"0"}},"fontSize":"x-small","layout":{"type":"flex","orientation":"vertical","justifyContent":"right","flexWrap":"nowrap"}} /--></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></article>
<!-- /wp:group --></main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer","className":"site-footer"} /-->