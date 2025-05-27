import { setupBreakpoints, handleHEVC } from "../../_utilities";
//
//
const TeamData = {
	bees: {
		postID: 47,
		alias: "Marketing",
		description:
			"Our marketing masterminds and communication connoisseurs spearhead client relationships, set winning strategies, and effortlessly manage projects from end to end.",
		imageUrl: `${window.location.origin}/wp-content/uploads/2025/01/Bee.png`,
	},
	blobfish: {
		postID: 8,
		alias: "Creative",
		description:
			"Our creative whizzes—web developers, graphic designers, illustrators, videographers, and animators—possess a skill and passion for showcasing brands through visual tools and digital interactions.",
		imageUrl: `${window.location.origin}/wp-content/uploads/2025/01/Blobfish.png`,
	},
	echidnas: {
		postID: 7,
		alias: "Operations",
		description:
			"Our clever and compassionate leaders support the health and success of our agency, ensuring our team, clients, and network of connections can reach their highest potential.",
		imageUrl: `${window.location.origin}/wp-content/uploads/2025/01/Echidna.png`,
	},
	ligers: {
		postID: 48,
		alias: "Content",
		description:
			"Our skilled storytellers, deep thinkers, and in-house grammar police take your meaningful mission and run with it—crafting authentic brand narratives that spotlight your unique value and expertise.",
		imageUrl: `${window.location.origin}/wp-content/uploads/2025/01/Liger.png`,
	},
};

const TeamClipData = {
	386: {
		name: "Abbie Nelson",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/abbie.webm`,
	},
	387: {
		name: "Abby Wilson",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/abby.webm`,
	},
	376: {
		name: "Alana Caporale",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/alana.webm`,
	},
	325: {
		name: "Alex Bouthillier",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/alex.webm`,
	},
	388: {
		name: "Allison Lyles",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/allison.webm`,
	},
	396: {
		name: "Cassie Kuchma",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/cassie.webm`,
	},
	399: {
		name: "Chih-Yuan Chang (Jacky)",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/jacky.webm`,
	},
	397: {
		name: "Claire Collins",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/claire.webm`,
	},
	398: {
		name: "Daniel Black",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/daniel.webm`,
	},
	2403: {
		name: "Ellie Lester",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/ellie.webm`,
	},
	400: {
		name: "Kerrianne Keogh",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/kerianne.webm`,
	},
	2406: {
		name: "Liz Duplay",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/liz.webm`,
	},
	402: {
		name: "Mary Hoffman",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/mary.webm`,
	},
	403: {
		name: "Mel Dunn",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/mel.webm`,
	},
	404: {
		name: "Tony Fontana",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/tony.webm`,
	},
	405: {
		name: "Will Macowski",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/will.webm`,
	},
	3060: {
		name: "Jonathan Bell",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/03/jonathan.webm`,
	},
	3365: {
		name: "Erin Roddy",
		clipURL: `${window.location.origin}/wp-content/uploads/2025/05/erin.webm`,
	}
};

//
//
export const TeamFilters = {
	isMobile: false,
	outerContainer: undefined,
	queryBlockContainer: undefined,
	filtersContainer: undefined,
	popupCard: undefined,
	activeFilterButton: undefined,
	activeFilterButtonValue: undefined,
	buttonLabels: undefined,
	//
	//
	init() {
		this.outerContainer = $(".is-team-grid-outer-container");
		this.cacheElements();
		this.isMobile = setupBreakpoints();
		// DOM manipulation to set up initial state
		this.reorderLayout();
		this.fetchNewTeamClips();
		// integrate pre-filtered URL into the initial state
		this.checkForQuery();
		// bind/re-bind events after AJAX rebuilds the DOM
		this.bindEvents();

		handleHEVC(this.outerContainer);
	},
	//
	//	* 		find all team member <li>
	//
	fetchNewTeamClips() {
		//
		const teamCards = $("li.hc-our-team", this.queryBlockContainer);
		//
		teamCards.each((index, card) => this.loadTeamClip(card));
	},
	
	//
	//	*		for each team member, load their webm clip into the card

	loadTeamClip(card) {
		// Extract the post ID from the card's class (e.g., "post-386" → 386)
		const postId = String(
			$(card)
				.attr("class")
				.match(/post-(\d+)/)?.[1]
		);
		if (!postId) return;

		// Find the matching team member in TeamClipData
		const teamMember = TeamClipData[postId];
		if (!teamMember) {
			console.error(`No data found for postId: ${postId}`);
			$(card).find("figure").addClass("no-clip"); // Add fallback class
			return;
		}

		// Check if the team member has a clipURL
		if (!teamMember.clipURL) {
			console.warn(`No clipURL available for team member: ${teamMember.name}`);
			$(card).addClass("no-clip"); // Add fallback class
			return;
		}

		// Create the <video> element
		const videoElement = $(
			`<video class="teamClip" src="${teamMember.clipURL}" muted loop preload="auto"></video>`
		);

		// Append the video to the card
		$(card).find("figure div").append(videoElement);

		// Add hover event listeners to play/pause the video
		$(card)
			.off("mouseenter mouseleave") // Remove existing listeners to avoid duplicates
			.on("mouseenter", () => videoElement[0]?.play())
			.on("mouseleave", () => videoElement[0]?.pause());
	},
	//
	//
	cacheElements() {
		//
		// Return early if outerContainer is not found
		if (!this.outerContainer.length) {
			// console.warn("Outer container not found. Exiting cacheElements.");
			return;
		}

		// Cache other elements scoped to the outerContainer
		this.queryBlockContainer = this.outerContainer.find(
			".is-team.wp-block-kadence-query"
		);
		//
		this.filtersContainer = this.outerContainer.find(".kadence-query-filter");
		//
		this.popupCard = this.outerContainer.find(".is-team-popup");
	},
	//
	//
	checkForQuery() {
		const urlParams = new URLSearchParams(window.location.search);

		// Check for the 'team' query parameter
		const team = urlParams.get("team");

		if (team) {
			// console.log(`Found 'team' query parameter: ${team}`);

			// Find the button with matching data-value
			const button = this.filtersContainer.find(
				`.kb-button[data-value="${team}"]`
			);

			if (button.length) {
				// console.log(`Found button for team ${team}:`, button);
				// Store the button reference for future use
				this.activeFilterButton = button;
				this.activeFilterButtonValue = $(button).data("value");
				this.fetchButtonMetadata();
			} else {
				// console.warn(`No button found for team ${team}`);
			}

			if (this.popupCard.length) {
				this.togglePopUpCard();
			}
		} else {
			// console.log("No 'team' query parameter found in the URL.");
		}
	},
	//
	//
	bindEvents() {
		//
		// hook into the team filters directly
		document.addEventListener("kb-query-loaded", (event) => {
			//	update our state
			const button = $(event.target).find('button[aria-pressed="true"]');
			const value = $(button).data("value");
			this.activeFilterButton = button;
			this.activeFilterButtonValue = value;

			this.fetchNewTeamClips();
			this.fetchButtonMetadata();
			this.togglePopUpCard();
		});
	},
	//
	//
	fetchButtonMetadata() {
		const button = this.activeFilterButton;
		const postId = parseInt($(button).data("value"), 10); // Ensure postId is a number

		// Find the team object with the matching postID
		const team = Object.values(TeamData).find((team) => team.postID === postId);

		if (team) {
			// Pass the team data to updatePopup and updateButtonLabel
			this.updatePopup({
				team_image: { url: team.imageUrl },
				team_description: team.description,
			});
			this.updateButtonLabel(button, team.alias);
		} else {
			console.error(`No team found with postID: ${postId}`);
		}
	},

	//
	//
	updatePopup(fields) {
		//
		//
		this.popupCard.find("img").attr({
			src: fields.team_image.url,
			srcset: "",
			sizes: "",
		});
		//
		//
		this.popupCard
			.find("p")
			.html($("<div>").html(fields.team_description).text());
	},

	//
	//
	//
	shiftMascot() {

		if (!this.popupCard || !this.popupCard.length) {
			// console.warn("Popup card not found. Cannot shift mascot.");
			return;
		}

		if (!this.activeFilterButton || !this.activeFilterButton.length) {
			// console.warn("Active filter button not found. Cannot shift mascot.");
			return;
		}

		// Get the mascot image element inside the popup
		const mascotElement = this.popupCard.find(".wp-block-image");

		if (!mascotElement.length) {
			// console.warn("Mascot element not found inside popup.");
			return;
		}

		// Reset mascot's transform to calculate accurate offsets
		mascotElement.css({ transform: "translate(-50%, -66%)" });

		// Calculate the mascot's center
		const mascotOffset =
			mascotElement.offset().left + mascotElement.outerWidth() / 2;

		// Calculate the button's center
		const buttonOffset =
			this.activeFilterButton.offset().left +
			this.activeFilterButton.outerWidth() / 2;

		// Calculate the horizontal difference between the button and mascot centers
		const offsetDifference = buttonOffset - mascotOffset;

		console.log("Mascot is:", mascotOffset);
		console.log("Button is:", buttonOffset);

		// Shift mascot to align with button
		mascotElement.css({
			transform: `translate(calc(-50% + ${offsetDifference}px), -66%)`,
		});

		console.log("Mascot aligned with active filter button.");
	},
		//
	//
	//
	shiftMascotMobile() {

		if (!this.popupCard || !this.popupCard.length) {
			// console.warn("Popup card not found. Cannot shift mascot.");
			return;
		}

		if (!this.activeFilterButton || !this.activeFilterButton.length) {
			// console.warn("Active filter button not found. Cannot shift mascot.");
			return;
		}

		// Get the mascot image element inside the popup
		const mascotElement = this.popupCard.find(".wp-block-image");

		if (!mascotElement.length) {
			// console.warn("Mascot element not found inside popup.");
			return;
		}

		console.log("Mascot aligned for mobile.");
	},

	//
	//
	updateButtonLabel(button, label) {
		button.html(label);
	},
	//
	//
	togglePopUpCard() {
		if (!this.popupCard || !this.popupCard.length) {
			// console.warn("Popup card not found.");
			return;
		}

		// If there is no active filter button, hide the popup
		if (
			!this.activeFilterButton ||
			!this.activeFilterButton.hasClass("pressed")
		) {
			this.popupCard.removeClass("is-active");
			console.log("Popup card hidden because no active filter button.");
			return;
		}
		// Otherwise, show the popup
		this.popupCard.addClass("is-active");

		// console.log("Popup card activated.");
		const windowSize = $(window).width();
		if (!this.isMobile){
			this.shiftMascot();
		} else {
			this.shiftMascotMobile();
		}
	},

	//
	// 		move the "popup card" from its placeholder position into the correct position
	//
	reorderLayout() {
		// Ensure popupCard and filtersContainer are properly cached
		if (!this.popupCard || !this.popupCard.length) {
			// console.warn("Popup card not found. Skipping layout reordering.");
			return;
		}

		if (!this.filtersContainer || !this.filtersContainer.length) {
			// console.warn("Filters container not found. Skipping layout reordering.");
			return;
		}

		// Move popupCard to be the next sibling after filtersContainer
		this.popupCard.detach().insertAfter(this.filtersContainer);
	},
	//
	//
	ajaxRequest(action, data, successCallback) {
		$.ajax({
			url: acfFetchData.ajax_url,
			type: "POST",
			data: { action, ...data },
			success: successCallback,
			error: () => console.error(`AJAX request for ${action} failed.`),
		});
	},
};
