(function (document, window, $) {
	//
	const joinCrew = {
		init() {
			// Cache references to elements
			this.tabcontainer = $(
				".marketing-pre-footer-banner .wp-block-kadence-tabs"
			);
			this.tabs = $(".kt-tab-title", this.tabcontainer);

			// Initially hide the tab container
			this.tabcontainer.addClass("is-initially-hidden");

			// Check for hash on initial load
			this.checkHash();

			// Listen for hash changes dynamically
			$(window).on("hashchange", () => {
				this.checkHash();
			});

			$(this.tabs).on('click', (event) => {

				$(this.tabcontainer).removeClass('is-initially-hidden');

			});
		},

		checkHash() {
			this.tabs.each((index, element) => {
				// Get the 'href' attribute of each tab
				let hash = $(element).attr("href");

				// Check if the window location hash matches the tab's href
				if (window.location.hash === hash) {
					console.warn("Hash match detected");
					this.tabcontainer.removeClass("is-initially-hidden");
				}
			});
		},
	};

	//
	document.addEventListener("DOMContentLoaded", function () {
		// Initialize the joinCrew functionality
		joinCrew.init();

		// Update button styling or functionality as needed
		const submitButton = document.querySelector("#wpforms-submit-111");

		if (submitButton) {
			submitButton.innerHTML = `<svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.7071 8.20711C26.0976 7.81658 26.0976 7.18342 25.7071 6.7929L19.3431 0.428934C18.9526 0.0384095 18.3195 0.0384094 17.9289 0.428934C17.5384 0.819458 17.5384 1.45262 17.9289 1.84315L23.5858 7.5L17.9289 13.1569C17.5384 13.5474 17.5384 14.1805 17.9289 14.5711C18.3195 14.9616 18.9526 14.9616 19.3431 14.5711L25.7071 8.20711ZM-8.74228e-08 8.5L25 8.5L25 6.5L8.74228e-08 6.5L-8.74228e-08 8.5Z" fill="#262626"/></svg>`;
		}

		//
		//
		// remove "Category: " from Archive title
		if ($('body').hasClass('archive')) {
			const heading = $('.wp-block-heading');

			// Default structure is: Category: <span>Branding</span>
			// isolate the span and replace all inner content with it
 			const category = heading.find('span').text();
			heading.text(category);
		}

		
		//
		//
		//
		
	});
})(document, window, jQuery);