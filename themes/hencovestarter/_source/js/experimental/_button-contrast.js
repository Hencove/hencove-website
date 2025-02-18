//
//
import { hex, rgb } from "wcag-contrast";
(function (document, window, $) {
	// ? other stuff below
	//
	//
	document.addEventListener("DOMContentLoaded", () => {
		//
		//
		// console.log("DOM fully loaded, script running!");

		function ensureButtonContrast() {
			const buttons = document.querySelectorAll(".wp-block-button__link");


			console.warn('BUTTON CONTRAST');

			buttons.forEach((button) => {
				const parentWithBackground = button.closest(
					".has-background, .kt-inside-inner-col"
				);

				if (parentWithBackground) {
					// Get computed styles
					const parentStyles = window.getComputedStyle(parentWithBackground);
					const buttonStyles = window.getComputedStyle(button);

					const backgroundColor = parentStyles.backgroundColor;
					const textColor = buttonStyles.color;

					// Determine contrast using wcag-contrast
					let contrast;

					// Use RGB parsing or Hex if available
					if (backgroundColor.startsWith("rgb")) {
						const bgRGB = parseRGB(backgroundColor);
						const textRGB = parseRGB(textColor);
						if (bgRGB && textRGB) {
							contrast = rgb(bgRGB, textRGB);
						}
					} else if (backgroundColor.startsWith("#")) {
						contrast = hex(backgroundColor, textColor);
					}

					// Adjust button text color if contrast is below 4.5
					// if (contrast < 4.5) {
					// 	// button.style.color = "red"; // Set button text color to white
					// 	button.setAttribute("style", "color:red !important;");
					// }
				}
			});
		}

		// Helper function to parse RGB(A) color values
		function parseRGB(color) {
			const match = color.match(/rgba?\((\d+), (\d+), (\d+)/);
			if (match) {
				return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
			}
			return null;
		}

		// Run the function
		// ensureButtonContrast();

		//
		//
		//
	});

	// let container = document.querySelector(".our-work-filtered-query-container");

	//? Handle wp-block-kadence-column background detection	//

	document.querySelectorAll(".kt-inside-inner-col").forEach((column) => {
		const bgColor = window.getComputedStyle(column).backgroundColor;

		// Log detected background color
		// console.log(`Background color of column: ${bgColor}`);

		// Check for dark background
		const darkBgColor = "rgb(38, 38, 38)"; // Replace with the actual RGB value if needed
		if (bgColor === darkBgColor || bgColor.includes("contrast")) {
			// console.log("Dark background detected, adding data-dark-bg attribute.");
			column.setAttribute("data-dark-bg", "true");
		} else {
			// console.log("Background is not dark.");
		}
	});
	//? Handle wp-block-kadence-column background detection	//

	// if (!container) {
	//     return;
	// }
})(document, window, jQuery);
