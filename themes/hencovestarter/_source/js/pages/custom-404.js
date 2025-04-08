import { debounce, setupBreakpoints, addGutterLines } from "../_utilities";
import { SVG } from "@svgdotjs/svg.js";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";


export const App = {

    container: undefined,
    isMobile: false,

	init() {

        gsap.registerPlugin(DrawSVGPlugin);

        this.container = $("body.error404 .wp-site-blocks > .wp-block-group");

		document.addEventListener("DOMContentLoaded", () => {
            
            addGutterLines(this.container);

            this.isMobile = setupBreakpoints();
            this.drawSVG();
        });

        
		// Handle window resizing globally
		const handleResize = debounce(() => {
            this.isMobile = setupBreakpoints();
            this.destroy();
            this.drawSVG();
        }, 200);
        
		window.addEventListener("resize", handleResize);
	},

    drawSVG() {

        const heading = this.container.find('h2');
        const button = this.container.find('.wp-block-button');

        let siteMargin = 32;
        let margin = 32;
        let strokeWidth = 6;

        const headingBottom = heading.offset().top + heading.height();
        const radius = (button.offset().top - heading.outerHeight() - heading.offset().top) / 2;
        const startY = button.offset().top - (radius * 3);
        
        if (this.isMobile){
            siteMargin = 16;
            margin = 0;
            strokeWidth = 4;
        }        
        
        const startX = siteMargin;
        const endX = this.container.outerWidth(true) - siteMargin;
        
        let shapeData = `M ${startX},${startY} \n`;
        shapeData += `H ${heading.offset().left - radius - margin} \n`

        shapeData += `a ${radius},${radius} 90 0 1 ${radius},${radius} \n`;
        shapeData += `a ${radius},${radius} 90 0 0 ${radius},${radius} \n`;
        
        shapeData += `h ${heading.outerWidth() - (radius * 2) + (margin * 2)} \n`
        
        shapeData += `a ${radius},${radius} 90 0 0 ${radius},${-radius} \n`;
        shapeData += `a ${radius},${radius} 90 0 1 ${radius},${-radius} \n`;
        
        shapeData += `H ${endX} \n`;

        let svgInstance = SVG()
            .addTo(this.container[0])
            .size("100%", "100%")
            .addClass('hencurve');

        svgInstance
            .path(shapeData)
            .stroke({
                color: "var(--wp--preset--color--primary)",
                width: strokeWidth,
            })
            .fill("none");
    },

    destroy() {
        $('svg.hencurve').remove();
    }

};
const target = $('body').hasClass('error404');

if (target) {
    App.init();
}
