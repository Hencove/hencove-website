import { throttle, debounce, setupBreakpoints } from "../../_utilities";
import { gsap } from "gsap";

//
export const ourworkHero = {
    isMobile: false,
    container: undefined,
    leftWordContainer: undefined,
    rightWordContainer: undefined,
    wordListL: undefined,
    wordListR: undefined,
    wordListLeft: undefined,
    wordListRight: undefined,

    init: function() {

        this.container = $('.is-the-our-work-hero');
        this.wordListL = require('./wordListLeft.json');
        this.wordListR = require('./wordListRight.json');

        this.wordListLeft = this.wordListL.words;
        this.wordListRight = this.wordListR.words;

        // Populate #heroLeft and #heroRight with the entire word list inside a container
        this.leftWordContainer = $('<div class="wordListContainer"></div>');
        this.rightWordContainer = $('<div class="wordListContainer"></div>');

        // Add all words to the containers
        this.wordListLeft.forEach((word) => {
            const wordElementLeft = $(`<h1>${word}</h1>`);
            this.leftWordContainer.append(wordElementLeft);
        });

        this.wordListRight.forEach((word) => {
            const wordElementRight = $(`<h1>${word}</h1>`);
            this.rightWordContainer.append(wordElementRight);
        });

        // Append the word containers to #heroLeft and #heroRight
        $('#heroLeft').append(this.leftWordContainer);
        $('#heroRight').append(this.rightWordContainer);

        this.isMobile = setupBreakpoints();
        this.resetGSAPTransforms();

        const debouncedResizeHandler = debounce(() => {
           this.isMobile = setupBreakpoints();
           this.resetGSAPTransforms();
           
           // Recreate divider on resize
        }, 200);

        // Handle window resize
        window.addEventListener("resize", debouncedResizeHandler);
    },

    resetGSAPTransforms() {
        // // Kill existing animations
        gsap.killTweensOf([this.leftWordContainer, this.rightWordContainer]);
    
        // Force reset transform values and remove inline styles
        gsap.set([this.leftWordContainer, this.rightWordContainer], {
            x: 0,
            y: 0,
            clearProps: "transform"
        });
    
        // Ensure words return to the first word after resize
        this.leftWordContainer.css("transform", "translate3d(0px, 0px, 0px)");
        this.rightWordContainer.css("transform", "translate3d(0px, 0px, 0px)");
        
        // Delay re-initialization slightly to prevent animation conflicts
        setTimeout(() => {
            this.initWordSelect();
        }, 250);
    },

    updateWords(oldIndex, wordList, container) {
        const wordHeight = $('#heroLeft h1').outerHeight(true);
        const wordWidth = $('#heroLeft h1').outerWidth(true);
        
        const index = this.randomIndex(wordList.length);
        let distanceToMove = 0;
        
        const animation = $('.is-the-our-work-hero').find('video');
        if (animation.length) {
            $(animation).get(0).play();
        }
    
        // Ensure transforms are properly read and default to zero if missing
        const transformMatrix = container.css('transform');
        let currentTranslationX = 0, currentTranslationY = 0;
    
        if (transformMatrix && transformMatrix !== 'none') {
            const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/);
            if (matrixValues) {
                const values = matrixValues[1].split(', ');
                currentTranslationX = parseFloat(values[4]) || 0;
                currentTranslationY = parseFloat(values[5]) || 0;
            }
        }
    
        if (this.isMobile) {
            distanceToMove = ((index * wordWidth) - (oldIndex * wordWidth));
            const move = currentTranslationX - distanceToMove;
    
            gsap.to(container, {
                x: move,
                duration: 3,
                ease: "power4.inOut",
            });
    
        } else {
            distanceToMove = ((index * wordHeight) - (oldIndex * wordHeight));
            const move = currentTranslationY - distanceToMove;
    
            gsap.to(container, {
                y: move,
                duration: 3,
                ease: "power4.inOut",
            });
        }
    
        return index;
    },
    
    
    initWordSelect() {
  
        let initIndexLeft = this.updateWords(1, this.wordListLeft, this.leftWordContainer);
        let initIndexRight = this.updateWords(1, this.wordListRight, this.rightWordContainer);

        $('.is-the-our-work-hero').find('video').on('click', () => {
            initIndexLeft = this.updateWords(initIndexLeft, this.wordListLeft, this.leftWordContainer);
            initIndexRight = this.updateWords(initIndexRight, this.wordListRight, this.rightWordContainer);
        });
    },

    randomIndex(listLength) {
        return Math.floor(Math.random() * listLength) + 1;
    },
}

