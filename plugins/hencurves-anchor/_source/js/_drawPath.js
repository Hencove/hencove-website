import { debounce, setupBreakpoints } from "./_utilities";
import { SVG } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

(function (document, window, $) {
	let HencurveAnchors = {
		containers: undefined,
		isMobile: false, // Track media query state

		_init: function () {
			this.isMobile = setupBreakpoints();
			// Bail early if mobile
			if (this.isMobile) return;

			this.containers = document.querySelectorAll(
				".hencurve-anchors-container"
			);
			if (!this.containers.length) {
				return;
			}
			//
			this.containers.forEach((container) => {
				this._drawSVG(container);
			});
		},

		_drawSVG: function (container) {
			let svgInstance = SVG()
				.addTo(container)
				.size("100%", "100%")
				.addClass("hencurve-anchors-svg");

			this._findAnchors(container, svgInstance);
		},

		_findAnchors: function (container, svgInstance) {
			// Find anchors inside the container
			const anchors = container.querySelectorAll(".hencurve-anchor");

			// Bail early if less than two anchors
			if (anchors.length < 2) {
				// console.warn("Not enough anchors in container:", container);
				return;
			}

			// Get positions of anchors relative to the container
			const firstAnchor = anchors[0].getBoundingClientRect();
			const secondAnchor = anchors[1].getBoundingClientRect();
			const containerRect = container.getBoundingClientRect();

			const firstAnchorPos = {
				x: firstAnchor.left - containerRect.left,
				y: firstAnchor.top - containerRect.top + firstAnchor.height,
				width: firstAnchor.width,
			};

			const secondAnchorPos = {
				x: secondAnchor.left - containerRect.left,
				y: secondAnchor.top - containerRect.top,
				width: secondAnchor.width,
			};

			// Pass positions to the path drawing method
			this._drawPath(container, svgInstance, firstAnchorPos, secondAnchorPos);
		},

		_drawPath: function (container, svgInstance, firstAnchor, secondAnchor) {
			const siteMargin = 32;
			const svgHeight = $(container).height();
			const strokeWidth = 6;

			// Anchor positions
			const startX = siteMargin;
			const endX = $(window).width() - siteMargin;

			const startY =
				firstAnchor.y > secondAnchor.y ? svgHeight - strokeWidth : strokeWidth;
			const endY = firstAnchor.y > secondAnchor.y ? 0 : svgHeight;

			const firstAnchorEndX = firstAnchor.x + firstAnchor.width;
			const firstAnchorEndY = firstAnchor.y;

			const secondAnchorStartX = secondAnchor.x;
			let secondAnchorStartY = secondAnchor.y;

			secondAnchorStartY =
				firstAnchor.y > secondAnchor.y
					? endY + strokeWidth
					: endY - strokeWidth;

			const totalSpace = secondAnchorStartX - firstAnchorEndX;

			const arcSpace = totalSpace / 2;

			if (arcSpace < 0) {
				console.warn(
					"Not enough space for arcs. Adjust layout or stroke width."
				);
				return;
			}

			const arcRadius = Math.abs(firstAnchorEndY - secondAnchorStartY) / 2;

			let pathData = `M ${startX}, ${startY} \n`;

			const arc1StartX = firstAnchorEndX + arcSpace - arcRadius;

			pathData += `H ${arc1StartX} \n`;

			const arc1Direction = firstAnchorEndY < secondAnchorStartY ? 1 : 0;
			pathData += `a ${arcRadius},${arcRadius} 90 0 ${arc1Direction} ${arcRadius},${
				arc1Direction ? arcRadius : -arcRadius
			} \n`;

			const arc2Direction = arc1Direction ? 0 : 1;
			pathData += `a ${arcRadius},${arcRadius} 90 0 ${arc2Direction} ${arcRadius},${
				arc2Direction ? -arcRadius : arcRadius
			} \n`;

			pathData += `H ${endX} \n`;

			svgInstance
				.path(pathData)
				.stroke({
					color: "var(--wp--preset--color--primary)",
					width: strokeWidth,
				})
				.fill("none");

			this.onCompleteEvent(container);
		},

		animateSVG(container) {
			const reversePathDraw = false;
			gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

			if (!$(container).hasClass('is-about-us-hero')) {
				gsap.fromTo(
					".hencurve-anchors-svg path",
					{ drawSVG: reversePathDraw ? "100% 100%" : "0% 0%" }, // Start fully hidden
					{
						drawSVG: "0% 100%", // Draw to 100%
						scrollTrigger: {
							trigger: container,
							start: `top center`,
							end: `+=300`,
							scrub: 1, // Smooth scrub animation
							// markers: true, // Add markers for debugging (remove in production)
						},
					}
				);
			}
		},

		onCompleteEvent(container) {
			// Emit a custom event when the paths are ready
			const event = new CustomEvent("hencurvesPathReady", {
				detail: {
					block: container, // Reference to the block
					blockId: container.id, // Example: block ID
				},
			});

			this.animateSVG(container);

			// Dispatch the custom event
			document.dispatchEvent(event);
		},

		_destroy: function () {
			// Clear SVGs inside all containers
			$(".hencurve-anchors-container svg").remove();
		},
	};

	// Throttled resize handler
	const handleResize = debounce(() => {
		HencurveAnchors._destroy(); // Clear the SVG instance
		HencurveAnchors._init(); // Reinitialize on desktop resize
		
	}, 200);
	
	// Initialize on DOMContentLoaded
	document.addEventListener("DOMContentLoaded", () => {
		HencurveAnchors._init();
		window.addEventListener("resize", handleResize); // Add resize listener
	});
})(document, window, jQuery);
