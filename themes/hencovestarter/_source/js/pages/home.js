import { debounce, addGutterLines } from '../_utilities';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DividerLine } from "../experimental/_dividing-line";
import { MonthFilterHandler } from "./home/monthFilters";

export const Home = {
	dividerContainer: undefined,
	divider: undefined,
	
	init() {
		//
		//
		gsap.registerPlugin(ScrollTrigger);

		MonthFilterHandler.init();

		addGutterLines(".is-the-homepage-hero");
		addGutterLines(".is-ditto-coverup");

		this.setupDivider();
		this.setupSlideUpCard();
		this.setupMakeMagic();

		const debouncedResizeHandler = debounce(() => {
			this.setupDivider();
		}, 100);

		window.addEventListener("resize", debouncedResizeHandler);
	},

	setupDivider() {
		this.dividerContainer = $('.is-make-magic-container');
		this.divider = new DividerLine(this.dividerContainer[0], true, 50, 300);

		const headingTop = this.dividerContainer.find('.kb-row-layout-wrap').offset().top;
		const headingBottom = this.dividerContainer.find('.kb-row-layout-wrap:has(.is-magic-text)').offset().top;
		const dividerOffset = ((headingBottom - headingTop));

		this.divider.updatePosition(dividerOffset);
	},

	setupSlideUpCard() {
		//
		const timelineHome = gsap.timeline({});
		
		// ? first step of homepage animation is the slide-up card that flys up and off screen
		const slideUpCard = $(".is-homepage-hero-slideup-card");
		
		if (slideUpCard.length > 0) {
		
			gsap.set(slideUpCard, {
				y: -32,
			});
		
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
	},

	setupMakeMagic() {

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
	},
}

if ($('body').hasClass('home')) {
	Home.init();
}