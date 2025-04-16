(function (document, window, $) {
	//
	// 	? Making the whole blog post card clickable
	//
	const BLOG_POSTS_CONTAINER_SELECTOR = ".blog-posts-container";
	const COVER_BLOCK_SELECTOR = ".wp-block-cover";
	const POST_TITLE_LINK_SELECTOR = ".wp-block-post-title a";

	const coverBlogPosts = {
		containerEl: undefined,

		_init: function () {
			this.containerEl = $(BLOG_POSTS_CONTAINER_SELECTOR);

			// Exit if the container doesn't exist
			if (!this.containerEl.length) {
				return;
			}

			this._findPosts();
		},

		_findPosts: function () {
			let posts = this.containerEl.find(COVER_BLOCK_SELECTOR);

			// Exit if no cover blocks are found
			if (!posts.length) {
				return;
			}

			// Iterate through each cover block
			posts.each((index, coverBlock) => {

				if( $(coverBlock).hasClass('is-adjusted') ){
					return;
				}

				
				this._getLink(coverBlock);
				this._reorgForMobile(coverBlock);

				$(coverBlock).addClass('is-adjusted');
			});
		},

		_getLink: function (coverBlock) {
			let link = $(coverBlock).find(POST_TITLE_LINK_SELECTOR).attr("href");

			// Exit if no link is found in the post title
			if (!link) {
				return;
			}

			let anchorTag = `<a href="${link}" target="_self" class="is-the-post-permalink-overlay"></a>`;
			this._appendLink(anchorTag, coverBlock);
		},

		_appendLink: function (anchorTag, coverBlock) {
			// Avoid adding duplicate overlay links
			if ($(coverBlock).find(".is-the-post-permalink-overlay").length > 0) {
				return;
			}
			$(coverBlock).prepend(anchorTag);
		},

		_reorgForMobile: function (coverBlock) {
			
			let textGroup = $(coverBlock)
				.find(".wp-block-cover__inner-container")
				.clone();
			let queryItem = $(coverBlock).parents("li.kb-query-item");

			$(queryItem).append($(textGroup).html());
		},
	};

	document.addEventListener("kb-query-loaded", (event) => {
		coverBlogPosts._init();
	});
	document.addEventListener("DOMContentLoaded", () => {
		coverBlogPosts._init();
	});
})(document, window, jQuery);
