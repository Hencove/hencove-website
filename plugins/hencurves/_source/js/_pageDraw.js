import { debounce, setupBreakpoints } from "./_utilities";
import { SVG } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);
import Path from "./_path";

const pageDraw = {
	isMobile: false,
	containerElements: null,
	timelines: [], // Track active GSAP timelines
	startYs: [],
	endYs: [],

	// Initialization
	init() {
		this.isMobile = setupBreakpoints();

		// Destroy previous animations before reinitializing
		this.destroy();

		// Select all blocks to animate
		this.containerElements = document.querySelectorAll(".hencurve");

		if (!this.containerElements.length) return;

		// Initialize SVGs and animations for each block
		this.containerElements.forEach((block) => {
			this.mobileLayout(block);

			if (this.isMobile) {
				this.mobileTimeline(block);
			} else {
				this.drawSVGs(block);
			}
		});
	},

	// Cleanup and reset state
	destroy() {
		// Kill all active GSAP timelines
		this.timelines.forEach((tl) => tl.kill());
		this.timelines = [];

		// Remove SVG containers and reset inline styles
		if (this.containerElements) {
			this.containerElements.forEach((block) => {
				// Remove dynamically created SVG containers
				block.querySelectorAll(".svgContainer").forEach((svg) => svg.remove());

				// Reset all inline styles on `.textContainer`
				block
					.querySelectorAll(".textContainer")
					.forEach((textContainer) => textContainer.removeAttribute("style"));
			});
		}

		// Reset internal state
		this.startYs = [];
		this.endYs = [];
	},

	// Create and inject SVGs, and handle animations
	drawSVGs(block) {
		const siteMargin = 32;
		const strokeWidth = 6;

		const $textContainer = $(".textContainer", block);
		const blockWrapper = $(block).parents(".entry-content");

		const width = $(blockWrapper).outerWidth() - siteMargin;
		const height = $(block).outerHeight() + siteMargin;

		// Update `.textContainer` styles
		$textContainer.css({
			opacity: "1",
			"transition-duration": "0.5s",
			right: `${width}px`,
			bottom: `${height}px`,
			width: `${width}px`,
			height: `${height}px`,
		});

		// Create paths and add SVGs
		const flipPath = new Path(width, height, strokeWidth);
		const unflipPath = new Path(width, height, strokeWidth);

		const flip = `<div class="svgContainer">${flipPath.getMaskFlipSVG()}</div>`;
		this.startYs.push(flipPath.startY / height, unflipPath.startY / height);
		this.endYs.push(flipPath.endY / height, unflipPath.endY / height);

		$(block).find(".acf-innerblocks-container").after($(flip));

		// Apply stroke color
		$(".svgContainer svg g path.strokePath", block).css(
			"stroke",
			`var(--wp--preset--color--${$(block).data("color")})`
		);

		// Initialize timelines for animations
		this.handleTimelines(block);
	},

	// Setup and manage GSAP timelines
	handleTimelines(block) {
		const svgContainers = gsap.utils.toArray(".svgContainer", block);

		svgContainers.forEach((container) => {
			// Skip if not a "flip" block
			if (!$(container).parents(".hencurve")[0].className.includes("flip"))
				return;

			// Create and track the timeline
			const tl = gsap.timeline({
				defaults: { ease: "power4.in", duration: 2 },
				delay: 1.5,
				repeat: -1,
				repeatDelay: 2,
				yoyo: true,
			});
			this.timelines.push(tl);

			// Morphing configuration
			const pivot = 40,
				pivotV = 50,
				originHGap = 1.1,
				originVGap = 28;

			const originString = `${pivot - originHGap}% ${pivotV + originVGap}%,
                                  ${pivot + originHGap}% ${
				pivotV + originVGap
			}%`;
			const originInvString = `${pivot + originHGap}% ${pivotV - originVGap}%,
                                     ${pivot - originHGap}% ${
				pivotV - originVGap
			}%`;
			const originStrokeString = `${pivot - 1.5}% ${pivotV - 28}%,
                                        ${pivot + 1.5}% ${pivotV + 28}%`;

			const morphConfig = (shape, origin) => ({
				ease: "power4.inOut",
				morphSVG: {
					shape,
					type: "rotational",
					origin,
					map: "position",
					precision: 5,
					shapeIndex: "auto",
				},
			});

			// Define animations
			tl.add("start", ">")
				.to(
					"#flip .strokePath",
					morphConfig("#unflip .strokePath", originStrokeString),
					"start"
				)
				.to(
					"#flip .curvePath",
					morphConfig("#unflip .curvePath", originString),
					"start"
				)
				.to(
					"#flipInverse .curvePath",
					morphConfig("#unflipInverse .curvePath", originInvString),
					"start"
				);
		});
	},

	mobileLayout(block) {
		const mobileHtml = '<div class="textContainer" id="inHouse">\
								<h1 id="el1">In</h1>\
								<h1 id="el2">House</h1>\
							</div>\
							<div class="svgContainer"></div>\
							<div class="textContainer" id="outSourced">\
								<h1 id="el3">Out</h1>\
								<h1 id="el4">Sourced</h1>\
							</div>'

		const desktopHtml = '<div class="textContainer">\
								<h1 id="el1">In</h1>\
							</div>\
							<div class="textContainer">\
								<h1 id="el2">House</h1>\
							</div>\
							<div class="textContainer">\
								<h1 id="el3">Out</h1>\
							</div>\
							<div class="textContainer">\
								<h1 id="el4">Sourced</h1>\
							</div>'
		if(this.isMobile){
			$(block).find(".acf-innerblocks-container").html(mobileHtml);

		} else {
			$(block).find(".acf-innerblocks-container").html(desktopHtml);
		}
	},

	// Setup and manage GSAP timelines
	mobileTimeline(block) {

		const container = $(block).find('.svgContainer');

		const gutterMobile = 16;

		const svgWidth = $(block).outerWidth() - gutterMobile;
		const strokeWidth = 6;

		// Define the path data for the line
		let pathData = `M ${gutterMobile},${strokeWidth / 2} H ${svgWidth}`;

		// Create the SVG instance and add the path
		let svgStrokeInstance = SVG()
			.addTo(container[0])
			.size("100%", `${strokeWidth}px`)
			.addClass("divider-svg");

		svgStrokeInstance
			.path(pathData)
			.stroke({
				color: "var(--wp--preset--color--primary)",
				width: strokeWidth,
			})
			.fill("none");

		gsap.fromTo(
			".divider-svg path",
			{ drawSVG: "0%" }, // Start fully hidden
			{drawSVG: "100%"}
		);
	},
};

// Initialize GSAP MatchMedia for responsive handling
(function (document, window, $) {
	const debouncedResizeHandler = debounce(() => {
		pageDraw.init(); // Always destroy and recreate on resize
	}, 32);

	// Initialize on load
	pageDraw.init();

	// Handle window resize
	window.addEventListener("resize", debouncedResizeHandler);
})(document, window, jQuery);
