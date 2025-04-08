import { debounce, setupBreakpoints } from '../_utilities';

//*
//* Off Canvas menu styles
//*

const header = {
    offCanvas: $('.kb-off-canvas-inner-wrap'),
    contactContent: null,
    navContent: null,
    isMobile: false,

	init: function() {
        this.contactContent = this.offCanvas.find('.is-contact-content');
        this.navContent = this.offCanvas.find('.is-off-canvas-content-group .kb-row-layout-wrap:first-child');
        
        // Setup menu trigger handler
        $('.wp-block-kadence-off-canvas-trigger').on('click', () => {
            setTimeout(() => {
                this.load();
            }, 50);
        });
	},
    
    load: function() {
        this.isMobile = setupBreakpoints();
        this.fixLogo();
        this.fixNav();
    },

    // ? Fix off canvas logo to match header logo
    fixLogo: function() {
        
        let siteLogo;

        if (this.isMobile) {
            siteLogo = $('.wp-block-kadence-header-tablet img.custom-logo');
        } else {
            siteLogo = $('.wp-block-kadence-header-desktop img.custom-logo');
        }
        
        this.offCanvas.find('.is-site-logo img').css('min-width', siteLogo.width());
        this.offCanvas.find('.is-site-logo img').css('max-width', siteLogo.width());
    }, 

    fixNav: function() {
        const navHeight = this.navContent.outerHeight(true);
        const identityHeight = $('.kb-identity').outerHeight(true);
        this.navContent.css('margin-top', `${($(window).height() / 2) - (navHeight / 2) - identityHeight}px`);
    },
}
$(window).on('load', () => {
    header.init();
});

const debouncedResizeHandler = debounce(() => {
    header.load();
}, 32);

// Handle window resize
window.addEventListener("resize", debouncedResizeHandler);