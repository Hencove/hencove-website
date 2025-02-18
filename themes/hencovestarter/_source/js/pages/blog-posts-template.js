import { throttle, debounce } from "../_utilities";
import { DividerLine } from "../experimental/_dividing-line";

(function (document, window, $) {
	//

	document.addEventListener("DOMContentLoaded", () => {
		const body = document.querySelector("body");

		if (!$(body).hasClass("single-post")) {
			return;
		}

		$(".is-the-post-hero").append(
			'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
		);
		// const heroHeight = $('.is-the-post-hero > .kt-row-column-wrap').height() - $('.is-the-post-hero > .kt-row-column-wrap .wp-block-kadence-column').offset().top;
		// $('.gutterLineCoverUp').css('height', `${heroHeight}px`);

		// Store divider instances
		const dividers = new Map();
		const containers = document.querySelectorAll(".is-the-post-hero");
		
		containers.forEach((container) => {
			// Create initial dividers
			dividers.set(container, new DividerLine(container, false, 5, 0));
		});

		const debouncedResizeHandler = debounce(() => {
			containers.forEach((container) => {
				// Recreate dividers on resize
				dividers.set(container, new DividerLine(container, false, 5, 0));
			});
		}, 0);
		// Handle window resize
		window.addEventListener("resize", debouncedResizeHandler);

		let queryContainer = $(
			".featured-blogs-swiper .wp-block-kadence-query-card"
		);
		let items = $(".kb-query-item", queryContainer)
			.addClass("swiper-slide")
			.detach();

		// console.log(items);

		$(".swiper-wrapper", ".related-posts-slider-rebuilt").append(items);

		const swiper = new Swiper(".swiper", {
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},

			// And if we need scrollbar
			// scrollbar: {
			// 	el: ".swiper-scrollbar",
			// },
		});

		//* Update item divider
		let item_dividers = document.querySelectorAll(".kb-dynamic-list-divider");
		console.log(item_dividers);
		item_dividers.forEach((element) => {
			element.innerHTML = `, &nbsp;`;
		});
	});
})(document, window, jQuery);
