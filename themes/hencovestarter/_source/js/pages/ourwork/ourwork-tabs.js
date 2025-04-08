import { throttle, debounce, setupBreakpoints } from "../../_utilities";

export const ourworkTabs = {
	container: undefined,
	tabsBlock: undefined,
	tabsWrapper: undefined,
	contentWrapper: undefined,
	detachedWrapper: undefined,
    menuTrigger: undefined,
	isMobile: false,
	init: function() {
		// Find the container and set up other elements
		this.container = $(".is-the-detached-tabs-container");
		if (!this.container.length) {
			console.warn("Detached tabs container not found!");
			return;
		}

		this.tabsBlock = this.container.find(".wp-block-kadence-tabs");
		this.tabsWrapper = this.container.find(".kt-tabs-title-list");
		this.contentWrapper = this.container.find(".kt-tabs-content-wrap");
		this.detachedWrapper = this.container.find(".is-the-b2b-menu");
        this.menuTrigger = this.container.find('.is-the-menu-trigger');

		if (
			!this.tabsWrapper.length ||
			!this.contentWrapper.length ||
			!this.detachedWrapper.length
		) {
			console.warn("Required tab elements are missing!");
			return;
		}

		// Call moveTabs to set up the tabs
		this.moveTabs();

		// Bind event listeners to newly cloned tabs
		this.bindEventListeners();
		this.isMobile = setupBreakpoints();
		this.resizeMedia();
		const debouncedResizeHandler = debounce(() => {
			this.isMobile = setupBreakpoints();
			this.resizeMedia();
		 }, 200);
 
		 // Handle window resize
		 window.addEventListener("resize", debouncedResizeHandler);
	},

	resizeMedia() {
		if (!this.isMobile) {
			return;
		}

		const grids = $('.our-work-grid');

		grids.each((index, grid) => {
			const gridItems = $(grid).children();

			gridItems.each((index, item) => {

				let spanColumns;
				let spanRows;

				if ($(item).css('grid-column')) {
					spanColumns = parseInt($(item).css('grid-column').replace('span ', ''));
					spanRows = parseInt($(item).css('grid-row').replace('span ', ''));

				} else if ($(item).css('grid-area')) {
					spanColumns = parseInt($(item).css('grid-area').split(' ')[0].replace('span ', ''));
					spanRows = parseInt($(item).css('grid-area').split(' ')[1].replace('span ', ''));
				}

				if (spanColumns == 3 || spanColumns == 4) {
					$(item).addClass('mobile-grid-item-full-width');
				} else if (spanColumns == 1 || (spanColumns == 2 && spanRows == 1) || (spanColumns == 2 && !spanRows)) {
					$(item).addClass('mobile-grid-item-half-width');
				}
				
			});

		});
	},

	moveTabs() {
		// Find all the <li> elements inside the tabsWrapper
		const tabItems = this.tabsWrapper.find("li");

		if (!tabItems.length) {
			console.warn("No tabs found to move!");
			return;
		}

        const tabList = tabItems.parents('ul').clone();
        this.detachedWrapper.append(tabList);

        // Hide the original tabsWrapper
		this.tabsWrapper.hide();
	},

	bindEventListeners() {
		// Find all cloned <li> elements in the detachedWrapper
		const clonedTabs = this.detachedWrapper.find("li");

		clonedTabs.each((index, tab) => {
			$(tab).on("click", (e) => {
				e.preventDefault();

				const clickedTabID = $(tab).attr("id");
				if (!clickedTabID) {
					console.warn("Clicked tab has no ID!");
					return;
				}

				// Hide the menu first
				this.detachedWrapper.removeClass("is-shown");

				const matchingContent = this.contentWrapper.find(
					`.wp-block-kadence-tab[aria-labelledby="${clickedTabID}"]`
				);

				if (!matchingContent.length) {
					console.warn(`No content found for tab ID: ${clickedTabID}`);
					return;
				}

				// Hide all tabs, then show only the matching one
				this.contentWrapper.find(".wp-block-kadence-tab").hide();
				matchingContent.show();

				// Update the trigger text after hiding the menu
				const clickedTabLabel = $(tab).find('a').text();
				this.menuTrigger.find('a').text(clickedTabLabel);
			});
		});
        // Toggle menu visibility when the trigger is clicked
        this.menuTrigger.off("click.b2bMenu").on("click.b2bMenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.detachedWrapper.toggleClass("is-shown");
        });

        // Prevent default behavior when links inside the menu are clicked
        this.detachedWrapper
            .off("click.b2bMenu", "a")
            .on("click.b2bMenu", "a", (event) => {
                event.preventDefault();
                event.stopPropagation();
            });

        // Close the menu when clicking outside the menu or the trigger
        $(document)
            .off("click.b2bMenu")
            .on("click.b2bMenu", (event) => {
                if (
                    !$(event.target).closest(".is-the-b2b-menu").length &&
                    !$(event.target).closest(".is-the-menu-trigger").length
                ) {
                    this.detachedWrapper.removeClass("is-shown");
                }
            });
	},
};