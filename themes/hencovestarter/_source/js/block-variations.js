const { registerBlockVariation } = wp.blocks;

wp.blocks.registerBlockVariation("core/search", {
	name: "hencove/team-member-search",
	title: "Team Member Search",
	attributes: {
		query: {
			post_type: "hc-our-team",
		},
	},
});

wp.blocks.registerBlockVariation("core/search", {
	name: "hencove/blog-posts-search",
	title: "Search only your Blog Posts",
	attributes: {
		query: {
			post_type: "post",
		},
	},
});