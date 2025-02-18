import { throttle, debounce } from "../_utilities";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DividerLine } from "../experimental/_dividing-line";

gsap.registerPlugin(ScrollTrigger);

(function (document, window, $) {
	//

	const body = document.querySelector("body");

	if (body.classList.contains("page-id-80")) {
		//
		document.addEventListener(
			"wp-block-kadence-query-result-count",
			(event) => {
				console.log("LOOK HERE");
				console.log(event);
			}
		);
		document.addEventListener("kb-query-loaded", (event) => {
			$(".infinite-scroll-trigger").hide();
			//	update our state
			console.log("Query Loaded Event:", event);
			ScrollTrigger.refresh();

			//
			// 		also check to hide the load more button if no pages exist
			//
			//
		});
	}

	$(".is-load-more-button").on("click", (event) => {
		event.preventDefault();
		$(".infinite-scroll-trigger").show();
	});

	$("body.page-id-80 .entry-content > .alignfull:first-child").append(
		'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
	);
	$(".is-blog-page-posts-container").append(
		'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
	);
	// $("body.page-id-80 .entry-content > .alignfull:last-child").append(
	// 	'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
	// );
	//
	const b2bMenu = {
		menuEl: undefined,
		triggerEl: undefined,

		_init: function () {
			this.menuEl = $(".is-the-b2b-menu");
			this.triggerEl = $(".is-the-menu-trigger a");

			if (!this.menuEl.length || !this.triggerEl.length) {
				////console.warn("B2B Menu or Trigger not found.");
				return;
			}
			//? Update the 'All' button text
			this.menuEl.find(".kb-button").first().text("all things B2B");

			// Remove the 'Uncategorized' button and its parent container
			this.menuEl.find(".kb-button").each(function () {
				if ($(this).text().trim() === "Uncategorized") {
					$(this).closest(".btn-inner-wrap").remove(); // Remove the entire btn-inner-wrap
				}
			});
			//
			this._addEventHandlers();
			this.checkForQuery();
		},

		//
		//
		checkForQuery() {
			const urlParams = new URLSearchParams(window.location.search);

			// Check for the 'category' query parameter
			const category = urlParams.get("category");
			const page = urlParams.get("pg");

			if (page) {
				console.log(`Found 'pg' query parameter: ${page}`);

				// Remove the 'pg' query parameter
				urlParams.delete("pg");

				// Build the new URL without 'pg'
				const newUrl =
					window.location.pathname +
					(urlParams.toString() ? `?${urlParams}` : "");

				// Reload the page with the new URL
				window.location.href = newUrl;
			}

			if (category) {
				console.log(`Found 'category' query parameter: ${category}`);
				// Find the button with matching data-value

				const button = $(".is-the-b2b-menu").find(
					`.kb-button[data-value="${category}"]`
				);
				if (button.length) {
					console.log(`Found button for category ${category}:`, button);
					// Store the button reference for future use

					$(button).addClass("is-active");

					this.triggerEl.text($(button).text());
				} else {
					console.warn(`No button found for category ${category}`);
				}
			} else {
				console.log("No 'category' query parameter found in the URL.");
			}
		},

		_addEventHandlers: function () {
			// Toggle menu visibility when the trigger is clicked
			this.triggerEl.off("click.b2bMenu").on("click.b2bMenu", (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.menuEl.toggleClass("is-shown");
			});

			// Prevent default behavior when links inside the menu are clicked
			this.menuEl
				.off("click.b2bMenu", "a")
				.on("click.b2bMenu", "a", (event) => {
					// console.log(event);
					event.preventDefault();
					event.stopPropagation();
				});

			// Close the menu when clicking outside the menu or the trigger
			$(document)
				.off("click.b2bMenu")
				.on("click.b2bMenu", (event) => {
					if (
						!$(event.target).closest(".is-the-b2b-menu").length &&
						!$(event.target).closest(".is-the-menu-trigger").length
					) {
						this.menuEl.removeClass("is-shown");
					}
				});

			// Close the menu when the page scrolls
			// $(window)
			// 	.off("scroll.b2bMenu")
			// 	.on("scroll.b2bMenu", () => {
			// 		this.menuEl.removeClass("is-shown");
			// 	});

			// Close the menu and force a reload when a submit button inside the menu is clicked
			this.menuEl
				.off("click.b2bMenu", 'button[type="submit"]')
				.on("click.b2bMenu", 'button[type="submit"]', (event) => {
					event.stopPropagation();
					event.preventDefault();
					this.menuEl.removeClass("is-shown");
					location.reload(); // Force a page reload
				});
		},
	};

	const blogPageFilters = {
		filterEl: undefined,

		_init: function () {
			this.filterEl = $(
				".kadence-query-filter",
				".is-blog-page-posts-container"
			);

			if (!this.filterEl.length) {
				////console.warn("Blog page filter not found.");
				return;
			}

			this.filterEl.detach();
			$(".is-the-b2b-menu").append(this.filterEl);
			$(".wp-block-kadence-query").addClass("is-fully-loaded");
			this._addSearchToMenu();
		},
		_addSearchToMenu: function () {
			let buttonOptions = $(".buttons-options", this.menuEl);

			let somethingSpecific =
				'<div class="btn-inner-wrap"> \
					<button class="kb-button button is-something-specific-search-trigger">\
						something specific\
					</button>\
				</div>';

			console.log(buttonOptions);
			console.log(somethingSpecific);
			$(buttonOptions).append(somethingSpecific);

			let searchForm = $(
				".wp-block-kadence-query-filter-search",
				".is-the-b2b-menu"
			);

			let temp = $(searchForm).detach();

			$(".is-something-specific-search-trigger").parent().append(temp);

			let trigger = $(
				".is-something-specific-search-trigger",
				".is-the-b2b-menu"
			);
			$(trigger).on("click", function (event) {
				//*
				$(".wp-block-kadence-query-filter-search", ".is-the-b2b-menu")
					.toggleClass("is-shown")
					.css("width", "auto");
				//*
				$(this).hide();
				// console.log(this);
				// console.log(event.target);
				// console.log(event.delegateTarget);
			});
		},
	};

	const blogPageMotion = {
		timeline: undefined,
		postContainer: undefined,
		posts: undefined,

		_init: function () {
			this.timeline = gsap.timeline({});
			this.postContainer = $(".is-blog-page-posts-container");

			if (!this.postContainer.length) {
				////console.warn("Post container not found.");
				return;
			}

			this.posts = $("#featured-posts", this.postContainer);

			if (!this.posts.length) {
				//console.warn("Featured posts not found.");
				return;
			}

			this._doPinnedScrollingPosts();
			this._doCuriosityFadeSwap();
		},

		_doPinnedScrollingPosts: function () {
			ScrollTrigger.create({
				trigger: ".is-blogs-shadow-overlay", // start arg uses this
				endTrigger: ".is-blog-page-posts-container", // end arg uses this
				start: "top top",
				end: "bottom center",
				pin: true,
				pinSpacing: false,
				// markers: true,
			});
		},

		_doCuriosityFadeSwap: function () {
			let overlayContainer = $(".is-blogs-shadow-overlay");

			if (!overlayContainer.length) {
				//console.warn("Overlay container not found.");
				return;
			}

			let curiosity = overlayContainer.find("p").first();
			let curiosityMenu = overlayContainer.find("div p");

			gsap.set(curiosityMenu, { opacity: 0, y: 40 });

			this.timeline
				.addLabel("Curiosity Fade Out")
				.to(
					curiosity,
					{
						opacity: 0,
						y: -20,
						scrollTrigger: {
							trigger: overlayContainer,
							start: "top 300px",
							end: "+=150",
							scrub: true,
						},
					},
					"Curiosity Fade Out"
				)
				.addLabel("CuriosityMenu Fade In")
				.to(
					curiosityMenu,
					{
						opacity: 1,
						y: "-50%",
						scrollTrigger: {
							trigger: overlayContainer,
							start: "top top",
							end: "+=150",
							scrub: true,
						},
					},
					"CuriosityMenu Fade In"
				);
		},
	};

	document.addEventListener("DOMContentLoaded", () => {
		const body = document.querySelector("body");

		if (!body.classList.contains("page-id-80")) return;

		blogPageFilters._init();
		b2bMenu._init();
		blogPageMotion._init();

		const containers = document.querySelectorAll(
			".is-blog-page-posts-container"
		);

		// Store divider instances
		const dividers = new Map();

		const debouncedResizeHandler = debounce(() => {
			containers.forEach((container) => {
				// Recreate dividers on resize
				dividers.set(container, new DividerLine(container, true, 20, 500));
			});
		}, 0);

		containers.forEach((container) => {
			// Create initial dividers
			dividers.set(container, new DividerLine(container, true, 20, 500));
		});

		// Handle window resize
		window.addEventListener("resize", debouncedResizeHandler);
	});
})(document, window, jQuery);
