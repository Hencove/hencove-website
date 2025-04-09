import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { DividerLine } from "../../experimental/_dividing-line";
import { debounce } from "../../_utilities";

export const HustleCards = {
	container: undefined,
	cardContainer: undefined,
	cards: undefined,
	divider: undefined,
	// Hoisted animation configuration
	cardAnimationLength: 800, // Duration for each card animation
	gapLength: 200, // Gap between consecutive card animations

	/**
	 * Initialize HustleCards functionality.
	 */
	init: function () {
		this.container = $(".is-hustle-container");
		this.cardContainer = $(".has-the-hustle-cards");
		this.cards = gsap.utils.toArray(".is-the-hustle-card");

		// Early return if essential elements are missing
		if (!this.container.length || !this.cardContainer.length) {
			return;
		}

		this.setupCards();
		this.pinSection();
		this.handleCardTriggers();
		// this.setupDivider();

		const debouncedResizeHandler = debounce(() => {
			// this.setupDivider();
		}, 200);

		window.addEventListener("resize", debouncedResizeHandler);
	},

	setupDivider() {
		this.divider = new DividerLine(this.container[0], true, 1, 5000);

		const headingTop = $(".is-make-magic-container").find("h2").offset().top;
		const headingBottom = $(".is-make-magic-container")
			.find(".is-magic-text")
			.offset().top;
		const dividerOffset = headingBottom - headingTop;

		this.divider.updatePosition(dividerOffset);
	},

	/**
	 * Adjust initial positions of cards to create a stacked visual effect.
	 */
	setupCards() {
		const totalCards = this.cards.length;

		this.cards.forEach((card, index) => {
			const initialY = (totalCards - index - 1) * 5; // Stack cards slightly apart
			gsap.set(card, {
				y: `${initialY}%`,
			});
		});
	},

	/**
	 * Pin the section for the calculated total duration.
	 * This ensures the section stays in view while all animations play out.
	 */
	pinSection() {
		const totalEnd =
			(this.cardAnimationLength + this.gapLength) * this.cards.length;

		ScrollTrigger.create({
			trigger: ".is-hustle-container",
			pin: ".wp-block-post-content",
			start: "top 20%", // Pin starts when the section reaches 33% of viewport height
			end: `+=${totalEnd}px`, // Pin duration covers all animations and gaps
			scrub: 1,
			pinSpacing: true,
			// markers: true, // Remove for production
		});
	},

	/**
	 * Animate cards in reverse order with staggered start times and consistent gaps.
	 */
	handleCardTriggers() {
		const totalOffset = this.cardAnimationLength + this.gapLength;
		let offsetBy = this.gapLength; // Initial gap before the first animation starts

		// Reverse cards for proper stacking animation
		const reversedCards = [...this.cards].reverse();

		reversedCards.forEach((card, index) => {
			// Increment offset for subsequent cards
			if (index > 0) {
				offsetBy += totalOffset;
			}

			gsap.to(card, {
				y: "-=1200px", // Move card offscreen upward
				scrollTrigger: {
					trigger: ".is-hustle-container",
					start: `${offsetBy}px 33%`, // Start animation after offset
					end: `+=${this.cardAnimationLength}px`, // Animation duration
					scrub: 1,
					// markers: true,
				},
			});
		});

		const lastCard = reversedCards[reversedCards.length - 1];

		gsap.to($(".is-magic-text"), {
			opacity: 1,
			scrollTrigger: {
				trigger: lastCard,
				start: `${offsetBy}px 50%`,
				end: `+=100px`, // Animation duration
				scrub: 1,
				// markers: true,
			},
		});
	},
};
