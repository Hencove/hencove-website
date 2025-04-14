import { gsap } from "gsap";
import { debounce, setupBreakpoints, addGutterLines } from "../../_utilities";
import { SVG } from "@svgdotjs/svg.js";

export const AboutHero = {
	isMobile: false,
	container: null,
	init() {
		// Bail early if the hero section doesn't exist
		if (!$(".is-about-us-hero").length) return;
		this.container = $(".is-about-us-hero");

		// Add gutter lines (always runs, even on mobile)
		addGutterLines($(".is-about-us-hero"));
		addGutterLines($(".is-team-grid-outer-container"));

		this.isMobile = setupBreakpoints();
		this.destroy();
		if (!this.isMobile) {
			this.drawSVG();
			this.positionBee();
		}

		const debouncedResizeHandler = debounce(() => {
			this.isMobile = setupBreakpoints();
			this.destroy();
			if (!this.isMobile) {
				this.drawSVG();
				this.positionBee();
			}
		}, 200);

		window.addEventListener("resize", debouncedResizeHandler);
	},

	drawSVG() {
		const heading = this.container.find(".wp-block-heading");

		let siteMargin = 32;
		let margin = 32;
		let strokeWidth = 6;

		const radius = heading.outerHeight() / 2;
		const startY = heading.offset().top - margin;

		const startX = siteMargin;
		const endX = window.innerWidth - siteMargin;

		let shapeData = `M ${startX},${startY} \n`;
		shapeData += `H ${heading.outerWidth(true) + heading.offset().left - radius / 2} \n`;

		shapeData += `a ${radius},${radius} 90 0 1 ${radius},${radius} \n`;
		shapeData += `a ${radius},${radius} 90 0 0 ${radius},${radius} \n`;

		shapeData += `H ${endX} \n`;

		let svgInstance = SVG()
			.addTo(this.container[0])
			.size("100%", "100%")
			.addClass("hencurve");

		svgInstance
			.path(shapeData)
			.stroke({
				color: "var(--wp--preset--color--primary)",
				width: strokeWidth,
			})
			.fill("none");
	},

	destroy() {
		$("svg.hencurve").remove();
	},

	positionBee() {
		// Find the bee image and SVG path
		const heroImages = $(".wp-block-image", ".has-nested-images");
		const bee = heroImages[2];
		const pathElement = document.querySelector(
			".is-about-us-hero .hencurve path"
		);
		const position = 0.65;

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
					start: position,
					end: position,
				},
			});
		}
	},
};
