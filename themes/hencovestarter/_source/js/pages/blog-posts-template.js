import { debounce, addGutterLines } from "../_utilities";
import { DividerLine } from "../experimental/_dividing-line";
import { swiper } from "../patterns/swiper";

(function (document, window, $) {
	//

	document.addEventListener("DOMContentLoaded", () => {
		const body = document.querySelector("body");

		if (!$(body).hasClass("single-post")) {
			return;
		}

		addGutterLines(".is-the-post-hero");		
		setupDivider();
		
		const debouncedResizeHandler = debounce(() => {
			setupDivider();
		}, 0);
		window.addEventListener("resize", debouncedResizeHandler);

		swiper.init();

		//* Update post ategory divider
		let item_dividers = document.querySelectorAll(".kb-dynamic-list-divider");
		item_dividers.forEach((element) => {
			element.innerHTML = `, &nbsp;`;
		});

		// Set up the svg in the hero
		function setupDivider() {
			const divider = new DividerLine($('.is-the-post-hero')[0], false, 5, 0);
			divider.updatePosition(divider.offsetHeight);
		}
	});
})(document, window, jQuery);
