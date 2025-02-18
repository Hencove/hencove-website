import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import { SVG } from "@svgdotjs/svg.js";
//

export const TheRiver = {
	container: null,
	svgInstance: null,
	svgWidth: 0,
	svgHeight: 0,
	galleries: null,
	svgElement: null,

	init() {
		this.container = $(".is-the-river-container");
		if (!this.container.length) return;

		this.galleries = $(".wp-block-gallery", this.container);

		this.container.addClass("is-shown");
		this.addGutterLines();
		this.drawSVG();
		this.drawLine();
		this.adjustGallery();
		this.initMotionPath();
	},

	addGutterLines() {
		const gutterHTML =
			'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>';
		$(".is-river-overflow-wrapper").append(gutterHTML);
	},

	drawSVG() {
		const container = this.container[0];
		this.svgInstance = SVG().addTo(container).size("100%", "100%");

		// Hoist the SVG element reference
		this.svgElement = container.querySelector("svg");
		this.svgWidth = this.svgElement.clientWidth;
		this.svgHeight = this.svgElement.clientHeight;
	},

	drawLine() {
		const w = this.svgWidth; // SVG width
		const h = this.svgHeight; // SVG height

		// Calculate start and end points
		const startX = w;
		const startY = h * 0.9;
		const endX = 0;
		const endY = h * 0.1;

		// Draw the new line
		const linePath = this.svgInstance.line(startX, startY, endX, endY).attr({
			id: "linePath",
			stroke: "#f06",
			"stroke-width": "2",
		});

		// Convert the line into a motion path
		MotionPathPlugin.convertToPath(linePath.node);
	},

	adjustGallery() {
		this.galleries.each((index, gallery) => {
			// Add the 'adjusted-gallery' and unique gallery class
			const groupingNum = index + 1;
			const groupingClass = `adjusted-gallery gallery-${groupingNum}`;
			$(gallery).attr("class", groupingClass);

			const images = $(gallery).find(".wp-block-image");

			// Define groupings and subgroups configuration
			const groupConfigs = [
				{
					groupClass: "group group-1",
					subgroups: [
						{ class: "subgroup-1", count: 1 },
						{ class: "subgroup-2", count: 2 },
					],
				},
				{ groupClass: "group group-2", count: 3 },
				{ groupClass: "group group-3", count: 2 },
				{
					groupClass: "group group-4",
					subgroups: [
						{ class: "subgroup-1", count: 3 },
						{ class: "subgroup-2", count: 3, subSubgroup: true },
					],
				},
				{ groupClass: "group group-5", count: 1 },
			];

			let imageIndex = 0;

			// Loop through each group configuration
			groupConfigs.forEach(({ groupClass, count, subgroups }) => {
				const group = $(`<div class="${groupClass}"></div>`);

				if (subgroups) {
					subgroups.forEach(({ class: subgroupClass, count, subSubgroup }) => {
						const subgroup = $(`<div class="${subgroupClass}"></div>`);
						const selectedImages = images.slice(imageIndex, imageIndex + count);
						subgroup.append(selectedImages);

						if (subSubgroup) {
							const rowWrapper = $('<div class="row-wrapper"></div>');
							selectedImages.slice(0, 2).appendTo(rowWrapper);
							subgroup.append(rowWrapper);
							selectedImages.slice(2).appendTo(subgroup);
						}

						group.append(subgroup);
						imageIndex += count;
					});
				} else {
					const selectedImages = images.slice(imageIndex, imageIndex + count);
					group.append(selectedImages);
					imageIndex += count;
				}

				$(gallery).append(group);
			});
		});
	},

	initMotionPath() {
		// Ensure the SVG element has been initialized
		if (!this.svgElement) return;

		const gallery = this.container[0].querySelector(".adjusted-gallery");
		if (!gallery) return;

		// Use the created ScrollTrigger instance in the GSAP animation
		gsap.to(gallery, {
			// scrollTrigger: galleryScrollTrigger, // Reference the created ScrollTrigger
			scrollTrigger: {
				trigger: this.container,
				pin: false,
				pinnedContainer: ".wp-block-post-content",
				start: "top center",
				end: "bottom top",
				scrub: 1,
				// markers: true,
			},
			motionPath: {
				path: this.container[0].querySelector("#linePath"),
				align: this.container[0].querySelector("#linePath"),
				alignOrigin: [0.5, 0.5],
				start: 0.4,
				end: 0.6,
			},
		});
	},

	handleResize() {
		if (this.svgElement) {
			// Update dimensions
			this.svgWidth = this.svgElement.clientWidth;
			this.svgHeight = this.svgElement.clientHeight;

			// Clear old line
			this.clearLine();

			// Re-draw the line with updated dimensions
			this.drawLine();
		}
	},

	clearLine() {
		// Remove the existing line element, if it exists
		const oldLine = this.svgElement.querySelector("#linePath");
		if (oldLine) {
			oldLine.remove();
		}
	},
};
