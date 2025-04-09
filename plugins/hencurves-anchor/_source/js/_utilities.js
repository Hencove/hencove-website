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

export { debounce, throttle, setupBreakpoints };
