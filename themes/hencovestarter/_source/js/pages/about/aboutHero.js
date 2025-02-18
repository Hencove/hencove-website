import { gsap } from "gsap";
import { debounce } from "../../_utilities";

export const AboutHero = {
	init() {
		// Bail early if the hero section doesn't exist
		if (!$(".is-about-us-hero").length) return;

		// Add gutter lines (always runs, even on mobile)
		this.addGutterLines();

		// Setup GSAP MatchMedia for responsive handling
		this.setupBreakpoints();

		// Listen for the custom "pathReady" event from the SVG-drawing app
		this.bindPathReadyListener();
	},

	addGutterLines() {
		const gutterHTML = `
			<div class="gutterLineCoverUp left"></div>
			<div class="gutterLineCoverUp right"></div>
		`;
		$(".is-about-us-hero, .is-team-grid-outer-container").append(gutterHTML);
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
	},

	handleResize() {
		// Ensure path and bee exist before repositioning
		const pathElement = document.querySelector(
			".is-about-us-hero .hencurve-anchors-svg path"
		);
		const heroImages = $(".wp-block-image", ".has-nested-images");
		const bee = heroImages[2];

		if (!bee || !pathElement) return;

		this.positionBee();
	},

	bindPathReadyListener() {
		// Listen for the custom "pathReady" event from the SVG-drawing app
		document.addEventListener("hencurvesPathReady", (event) => {
			console.log("Path is ready. Repositioning bee...");
			this.positionBee(); // Snap the bee to the path when it's ready
		});
	},

	setupBreakpoints() {
		const mm = gsap.matchMedia();
		const breakPoint = 1024;

		// Mobile-specific logic
		mm.add(`(max-width: ${breakPoint}px)`, () => {
			// Find the bee image
			const heroImages = $(".wp-block-image", ".has-nested-images");
			const bee = heroImages[2];

			// Bail early if the bee doesn't exist
			if (!bee) return;

			// Remove any inline styles applied to the bee
			bee.style = ""; // Reset all inline styles
			console.log("Removed inline styles from the bee for mobile breakpoint");
		});

		// Desktop-specific logic
		mm.add(`(min-width: ${breakPoint + 1}px)`, () => {
			this.positionBee(); // Ensure the bee is positioned on desktop
			console.log("Entered desktop breakpoint and positioned the bee");
		});
	},
};
