import { throttle, debounce } from '../_utilities';
import { SVG } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

import { MonthFilterHandler } from "./home/monthFilters";
import { MotionPathPlugin } from "gsap/all";

//
//
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);
(function (document, window, $) {
	//
	//
	MonthFilterHandler.init();

	document.addEventListener("DOMContentLoaded", () => {
		$(".is-the-homepage-hero").append(
			'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
		);
		$(".is-ditto-coverup").append(
			'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
		);

		//
		const timelineHome = gsap.timeline({});

		// ? first step of homepage animation is the slide-up card that flys up and off screen
		let slideUpCard = $(".is-homepage-hero-slideup-card");

		if (slideUpCard.length > 0) {
			let shiftBy = $(slideUpCard).outerHeight() / 3;

			gsap.set(slideUpCard, {
				y: -32,
			});

			// gsap.set(".is-your-mission-blurb", {
			// 	"margin-top": `-${shiftBy}`,
			// });

			//
			timelineHome.addLabel("Hero").to(slideUpCard, {
				y: "-200px",
				scrollTrigger: {
					trigger: slideUpCard,
					start: "top center",
					end: () => {
						return slideUpCard.clientHeight / 2;
					},
					scrub: 2,
					// markers: true,
				},
			});
		}

		const MakeMagic = {
			containerElement: undefined,
			svgInstance: undefined,
			pathInstance: undefined,
			strokeWidth: 6,
			containerElementWidth: undefined,

			init() {
				if (!$(".is-make-magic-container").length) return;

				const target = $('.is-make-magic-container svg');

				if (target.length) {
					$(target).remove();
				}

				this.cacheElements();
				this.drawSVG();
				this.drawLine();
				this.animateLine();
				this.animateMagic();
			},

			cacheElements() {
				this.containerElement = document.querySelector(
					".is-make-magic-container"
				);
				const rect = this.containerElement.getBoundingClientRect();
				this.containerElementWidth = rect.width - 32; // Accurate width including padding/border
			},

			drawSVG() {

				const offset = $($(this.containerElement).children()[0]).outerHeight();

				this.svgInstance = SVG()
					.addTo(this.containerElement)
					.size(this.containerElementWidth, this.strokeWidth)
					.addClass("is-motion-horizontal-line")
					.css({ "max-width": "unset", margin: 0 });

				if ($('body').hasClass('home')){
					this.svgInstance.css('top', `${offset}px`);
				}
			},

			drawLine() {
				let edgePadding = 32;
				let stroke = this.strokeWidth;

				if ($(window).width() < 1025) {
					edgePadding = 16;
					stroke = 4;
					this.containerElementWidth += 16;
				}

				const pathData = `M ${edgePadding},${stroke / 2} H ${
					this.containerElementWidth
				}`;

				this.svgInstance
					.path(pathData)
					.addClass("is-line-path")
					.stroke({
						color: "var(--wp--preset--color--secondary)",
						width: stroke,
					})
					.fill("none");
			},

			animateLine() {
				gsap.fromTo(
					".is-make-magic-container .is-line-path",
					{ drawSVG: "0%" }, // Start fully hidden
					{
						drawSVG: "100%", // Draw to 100%
						scrollTrigger: {
							trigger: this.containerElement,
							start: "top center", // Trigger when the top of the .is-ditto-coverup element reaches the center of the viewport
							end: "+=300", // Animation ends when the bottom of the element reaches the center
							scrub: 1, // Smooth scrub animation
						},
					}
				);
			},
			animateMagic() {
				if ($('body').hasClass('home')){
					gsap.fromTo(
						".is-make-magic-container .is-magic-text",
						{ autoAlpha: 0 },
						{
							autoAlpha: 1,
							scrollTrigger: {
								trigger: ".is-make-magic-container .is-magic-text",
								start: "top 60%", // Trigger when the top of the .is-ditto-coverup element reaches the center of the viewport
								end: "+=300", // Animation ends when the bottom of the element reaches the center
								scrub: 1, // Smooth scrub animation
							},
						}
					);
				}
			},
		};

		MakeMagic.init();
		// Handle window resizing globally
		const handleResize = debounce(() => {
			MakeMagic.init();
		}, 0);

		window.addEventListener("resize", handleResize);

	});
	//
	//
})(document, window, jQuery);
