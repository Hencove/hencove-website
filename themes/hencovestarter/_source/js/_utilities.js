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


export {debounce, throttle};