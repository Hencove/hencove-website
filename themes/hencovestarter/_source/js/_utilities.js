import { gsap } from "gsap";

const debounce = function (func, delay) {
    let timer;
    return function () {
        //anonymous function
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};
//
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Setup breakpoints with GSAP MatchMedia
const setupBreakpoints = (breakpoint = 1024) => {
    const mm = gsap.matchMedia();
    let isMobile = false;

    mm.add(`(max-width: ${breakpoint}px)`, () => {
        isMobile = true;
    });

    mm.add(`(min-width: ${breakpoint + 1}px)`, () => {  
        isMobile = false;
    });

    return isMobile;
};

const addGutterLines = (element) => {
	$(element).append(
		'<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>'
	);
};

//
// Source: 
// Maciek Caputa
// https://css-tricks.com/overlaying-video-with-transparency-while-wrangling-cross-browser-support/
//
const supportsHEVCAlpha = () => {
	const navigator = window.navigator;
	const ua = navigator.userAgent.toLowerCase();
	const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo);
	const isSafari = ((ua.indexOf('safari') != -1) && (!(ua.indexOf('chrome')!= -1) && (ua.indexOf('version/')!= -1)));
	return isSafari && hasMediaCapabilities;
};

const handleHEVC = (element) => {

    const players = $(element).find('video');

    console.log(players);

    players.each(function() {
        const file = $(this).attr('src').split('/').pop();

        if (supportsHEVCAlpha()) {  
            console.log('Checking for MOV version of:', file);
            
            // Create a source element for the MOV file
            const movSource = $(this).attr('src').replace('.webm', '.mov');
            
            try {
                fetch(movSource, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                        console.log('Found MOV file, swapping source');
                        $(this).attr('src', movSource);
                    }
                })
                .catch(error => {
                    console.log('Error checking MOV file, keeping webm:', error);
                });
            } catch (error) {
            }
        }
    });
};

export { 
    debounce, 
    throttle, 
    setupBreakpoints, 
    addGutterLines,
    handleHEVC
};