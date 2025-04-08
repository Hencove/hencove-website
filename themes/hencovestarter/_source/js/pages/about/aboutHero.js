import { gsap } from "gsap";
import { debounce, setupBreakpoints, addGutterLines } from "../../_utilities";

export const AboutHero = {
	isMobile: false,
	init() {
		// Bail early if the hero section doesn't exist
		if (!$(".is-about-us-hero").length) return;

		// Add gutter lines (always runs, even on mobile)
		addGutterLines($(".is-about-us-hero"));
		addGutterLines($(".is-team-grid-outer-container"));

		this.isMobile = setupBreakpoints();

		// Listen for the custom "pathReady" event from the SVG-drawing app
		this.bindPathReadyListener();

		const debouncedResizeHandler = debounce(() => {
			this.isMobile = setupBreakpoints();
		 }, 200);
 
		 // Handle window resize
		 
		 window.addEventListener("resize", debouncedResizeHandler);
	},

	positionBee() {
		// Find the bee image and SVG path
		const heroImages = $(".wp-block-image", ".has-nested-images");
		const bee = heroImages[2];
		const pathElement = document.querySelector(
			".is-about-us-hero .hencurve-anchors-svg path"
		);

		// Bail early if no bee image or path element exists
		if (!bee || !pathElement) return;

		if (this.isMobile) {
			bee.style = "";
		} else {
			// Snap the bee to the updated path
			gsap.set(bee, {
			motionPath: {
				path: pathElement,
				align: pathElement,
				alignOrigin: [0.5, 0.5],
					start: 0.55,
					end: 0.55,
				},
			});
		}
	},

	bindPathReadyListener() {
		// Listen for the custom "pathReady" event from the SVG-drawing app
		document.addEventListener("hencurvesPathReady", (event) => {
			this.positionBee(); // Snap the bee to the path when it's ready
		});
	}
};
