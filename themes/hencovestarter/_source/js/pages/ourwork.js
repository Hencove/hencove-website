import { divider } from "../experimental/_dividing-line";
import { debounce } from "../_utilities";
import { ourworkHero } from "./ourwork/ourwork-hero";
import { ourworkTabs } from "./ourwork/ourwork-tabs";
import { DividerLine } from "../experimental/_dividing-line";

//
export const App = {

	init() {
		document.addEventListener("DOMContentLoaded", () => {

            // Store divider instances
            this.twoTeamDivider = null;
            this.collaborationDivider = null;

            this.setupHero();
            this.setupTabs();
            this.setupTwoTeam();
            this.setupCollaboration();
            this.setupSwiper();

            // Adjust stuff on resize
            const debouncedResizeHandler = debounce(() => {
                // Recreate dividers on resize
                this.setupDividers();
            }, 0);

            
            // Handle window resize
            window.addEventListener("resize", debouncedResizeHandler);
		});
	},

    setupHero() {
        $(".is-the-our-work-hero").append(
            '<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
        );
        ourworkHero.init();
    },

    setupTabs() {
        ourworkTabs.init();
    },

    setupDividers() {

        // Collaboration divider
        this.collaborationDivider = new DividerLine($(".is-collaboration-container")[0], true, 10, 1000);
        const collabOffset = $('.is-collaboration-container .kt-row-column-wrap .wp-block-kadence-column:last-child').offset().top
            - $('.is-collaboration-container').offset().top - 6;
        this.collaborationDivider.updatePosition(collabOffset);

        // Two Team divider
        this.twoTeamDivider = new DividerLine($(".is-two-team-container")[0], true, 50, 400);
        const twoTeamOffset = $('.is-two-team-container figure').outerHeight(true);
        this.twoTeamDivider.updatePosition(twoTeamOffset);

    },

    setupCollaboration() {
        $(".is-collaboration-container").append(
            '<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
        );
        this.setupDividers();
    },

    setupTwoTeam() {
        $(".is-two-team-container").append(
            '<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
        );
        this.setupDividers();
    },

    setupSwiper() {
        let queryContainer = $(
            ".featured-blogs-swiper .wp-block-kadence-query-card"
        );
        let items = $(".kb-query-item", queryContainer)
            .addClass("swiper-slide")
            .detach();

        $(".swiper-wrapper", ".related-posts-slider-rebuilt").append(items);

        const swiper = new Swiper(".swiper", {
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000,
            },

            // If we need pagination
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
};

const target = $('body').hasClass('page-id-79');

if (target) {
    App.init();
}
