import { debounce } from "../_utilities";
import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";
import { AboutHero } from "./about/aboutHero";
import { HustleCards } from "./about/hustleCards";
import { TeamFilters } from "./about/teamFilters";
import { TheRiver } from "./about/theRiver";
//
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
//
//
//
$ = jQuery;
export const App = {
	scrollTriggerInstances: [],

	init() {
		document.addEventListener("DOMContentLoaded", () => {
			// Initialize modules
			AboutHero.init();
			HustleCards.init();
			TeamFilters.init();
			TheRiver.init();

			// Ensure all ScrollTriggers are recalculated
			// ScrollTrigger.refresh();
		});

		// Handle window resizing globally
		const handleResize = debounce(() => {
			// AboutHero.positionBee();
			TheRiver.handleResize();
		}, 200);

		window.addEventListener("resize", handleResize);
	},
};

App.init();
