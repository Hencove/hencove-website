import { debounce, addGutterLines, setupBreakpoints, handleHEVC } from "../_utilities";
import { ourworkHero } from "./ourwork/ourwork-hero";
import { ourworkTabs } from "./ourwork/ourwork-tabs";
import { DividerLine } from "../experimental/_dividing-line";
//
export const App = {

    twoTeamDivider: null,
    collaborationDivider: null,
    heroDivider: null,
    isMobile: false,

	init() {

        
        document.addEventListener("DOMContentLoaded", () => {
            
            this.isMobile = setupBreakpoints();
            
            window.addEventListener("load", () => {
                this.setupHero();
                this.setupDividers();
                handleHEVC('.is-the-our-work-hero');
                handleHEVC('.is-the-detached-tabs-container');
            });

            this.setupTabs();
            this.setupTwoTeam();
            this.setupCollaboration();

            // Adjust stuff on resize
            const debouncedResizeHandler = debounce(() => {
                // Recreate dividers on resize
                this.isMobile = setupBreakpoints();

                this.setupDividers();
                this.adjustRowHeights($('.is-collaboration-container'), 'h4');
            }, 100);

            
            // Handle window resize
            window.addEventListener("resize", debouncedResizeHandler);
		});
	},

    setupHero() {
        addGutterLines(".is-the-our-work-hero");
        ourworkHero.init();
    },

    setupTabs() {
        ourworkTabs.init();
    },

    setupDividers() {

        // Hero divider
        this.heroDivider = new DividerLine($('.is-the-our-work-hero')[0], false, 5, 0);
        let heroOffset = 0;
        if (!this.isMobile) {
            heroOffset = $('.heroWord').offset().top;
        } else {
            heroOffset = $('video').offset().top + $('video').outerHeight() * 0.5;
        }
        this.heroDivider.updatePosition(heroOffset);

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
        addGutterLines(".is-collaboration-container");
        // this.setupDividers();
        this.adjustRowHeights($('.is-collaboration-container'), 'h4');
        // this.adjustRowHeights($('.is-collaboration-container'), 'h6');
    },

    setupTwoTeam() {
        addGutterLines(".is-two-team-container");
        // this.setupDividers();
    },

    // borrowed this from what I wrote for Haverford. It's more complex than it needs to be for this, but it works
    // ideally, this would work for all items in the column, not just the h4
    adjustRowHeights(container, selector) {
        if (!container.length) {
            return;
        }

        const columnsContainer = container
            .find(".kt-row-column-wrap")
            .children(".wp-block-kadence-column");

        let rows = [[]];

        // Reset all heading heights before recalculating
        columnsContainer.find(selector).css("min-height", "auto");

        columnsContainer.each(function (i, col) {
            const heading = $(col).find(selector);

            if (heading.length === 0 || !heading.is(":visible")) return; // Ensure title exists and is visible

            if (i !== 0) {
                const prevColRowIndex = columnsContainer
                    .eq(i - 1)
                    .find(selector)
                    .offset().top;
                const rowIndex = heading.offset().top;
                const newRow = rowIndex > prevColRowIndex;

                if (newRow) {
                    rows.push([]); // Start a new row array
                }
            }

            // Push current column into the latest row array
            rows[rows.length - 1].push(col);
        });

        // Loop through each row, find max height, and apply it to all items in that row
        rows.forEach((row) => {
            let maxHeight = 0;

            // Determine the max height in the row
            row.forEach((col) => {
                const heading = $(col).find(selector);
                const headingHeight = heading.outerHeight();
                maxHeight = Math.max(maxHeight, headingHeight);
            });

            // Apply max height to all elements in the row
            row.forEach((col) => {
                $(col)
                    .find(selector)
                    .css("min-height", maxHeight + "px");
            });
        });
    },
};

const target = $('body').hasClass('page-id-79');

if (target) {
    App.init();
}
