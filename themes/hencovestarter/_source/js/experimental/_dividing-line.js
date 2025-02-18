import { SVG } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

$ = jQuery;

class DividerLine {
	constructor(container, animateScroll = false, start = 50, end = 500) {
		this.container = container;
		this.animateScroll = animateScroll;
		this.start = start;
		this.end = end;
		this.gutterDesktop = 32;
		this.gutterMobile = 16;
		this.strokeWidth = 6;
		
		this.init();
	}

	init() {
		this.cleanupExisting();
		this.createDivider();
		if (this.animateScroll) {
			this.setupAnimation();
		}
	}

	cleanupExisting() {
		const target = $('.divider-svg', this.container);
		if (target.length) {
			$(target).remove();
		}
	}

	getGutter() {
		return $(window).width() > 1024 ? this.gutterDesktop : this.gutterMobile;
	}

	createDivider() {
		const gutter = this.getGutter();
		const svgWidth = $(this.container).outerWidth() - gutter;
		const pathData = `M ${gutter},${this.strokeWidth / 2} H ${svgWidth}`;

		this.svgInstance = SVG()
			.addTo(this.container)
			.size("100%", `${this.strokeWidth}px`)
			.addClass("divider-svg");

		this.svgInstance
			.path(pathData)
			.stroke({
				color: "var(--wp--preset--color--secondary)",
				width: this.strokeWidth,
			})
			.fill("none");
	}

	setupAnimation() {
		gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

		gsap.fromTo(
			$(this.container).find('.divider-svg path'),
			{ drawSVG: "0%" },
			{
				drawSVG: "100%",
				scrollTrigger: {
					trigger: this.container,
					start: `top ${this.start}%`,
					end: `+=${this.end}`,
					scrub: 1,
					// markers: true, // Remember to remove in production
				},
			}
		);
	}

	updatePosition(topOffset) {
		$(this.container).find('.divider-svg').css('top', `${topOffset}px`);
	}
}

export { DividerLine };
