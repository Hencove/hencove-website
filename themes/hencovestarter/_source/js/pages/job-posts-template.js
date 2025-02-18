// Import dependencies
import { throttle, debounce } from "../_utilities";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { DividerLine } from "../experimental/_dividing-line";

// Add MobileNavigation class before JobPostPage class
class MobileNavigation {
    constructor() {
        this.jobDescription = $('.entry-content');
        this.headings = this.jobDescription.find('h5');
        this.anchorList = $('.job-post-anchor-list');
    }

    init() {
        this.moveAnchorList();
        this.setupMobileMenu();
        this.setupCloseButton();
        this.setupHeadingTriggers();
        this.setupAnchorLinks();
    }

    moveAnchorList() {
        // Clone the anchor list and insert after .entry-content for mobile
        const mobileAnchorList = this.anchorList.clone();
        mobileAnchorList.insertAfter('.entry-content');
        mobileAnchorList.addClass('job-post-anchor-list-mobile');
        
        // Update the reference to the mobile version
        this.anchorList = mobileAnchorList;
        
        // Remove previous menu trigger if it exists
        $('.job-post-menu-trigger').remove();
    }

    setupMobileMenu() {
        // Add close button to anchor list
        const closeButton = $(`
            <button class="menu-close-button">
                <svg viewBox="0 0 496.1 496.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="-84.2" y="233.2" width="664.3" height="30" transform="translate(-102.9 248) rotate(-45)"></rect>
                    <rect x="232.9" y="-83.9" width="30" height="664.3" transform="translate(-102.9 248) rotate(-45)"></rect>
                </svg>
            </button>
        `);
        this.anchorList.prepend(closeButton);
    }

    setupCloseButton() {
        // Handle close button click
        this.anchorList.find('.menu-close-button').on('click', () => {
            this.anchorList.removeClass('is-shown');
            this.headings.removeClass('active-trigger');
        });

        // Close menu when clicking outside
        $(document).on('click', (e) => {
            if (!$(e.target).closest('.job-post-anchor-list, h5').length) {
                this.anchorList.removeClass('is-shown');
                this.headings.removeClass('active-trigger');
            }
        });
    }

    setupHeadingTriggers() {
        // Handle heading clicks
        this.headings.on('click', (e) => {
            e.preventDefault();
            
            // Get the first heading's offset to use as a reference point
            const firstHeadingOffset = this.headings.first().parent().offset().top;
            
            // Calculate relative position by subtracting first heading's offset
            const headingOffset = $(e.currentTarget).parent().offset().top - firstHeadingOffset;
            
            this.anchorList.css({
                'top': `${headingOffset + 40}px`
            });
            
            // Toggle menu visibility
            if ($(e.currentTarget).hasClass('active-trigger')) {
                this.anchorList.removeClass('is-shown');
                $(e.currentTarget).removeClass('active-trigger');
            } else {
                this.headings.removeClass('active-trigger');
                $(e.currentTarget).addClass('active-trigger');
                this.anchorList.addClass('is-shown');
            }
        });
    }

    setupAnchorLinks() {
        // Handle anchor link clicks
        this.anchorList.find('a').on('click', (e) => {
            e.preventDefault();
            this.anchorList.removeClass('is-shown');
            this.headings.removeClass('active-trigger');
            
            if ($(e.currentTarget).attr('href') === '#join-the-crew') {
                // Scroll to join-the-crew section
                const $target = $('#join-the-crew');
                const windowHeight = $(window).height();
                const targetOffset = $target.offset().top;
                const scrollTo = targetOffset - (windowHeight * 0.3);
                
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 500);
            } else {
                // Logic for heading navigation
                const targetHeading = this.headings.filter((_, el) => 
                    $(el).text() === $(e.currentTarget).text()
                );
                if (targetHeading.length) {
                    const windowHeight = $(window).height();
                    const targetOffset = targetHeading.offset().top;
                    const scrollTo = targetOffset - (windowHeight * 0.3);
                    
                    $('html, body').animate({
                        scrollTop: scrollTo
                    }, 500);
                }
            }
        });
    }
}

// Create a JobPostPage class to encapsulate functionality
class JobPostPage {
    constructor() {
        this.isMobile = false;
        this.heroDivider = null;
        this.crewDivider = null;
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setupBreakpoints();
            this.setupGutterLines(); 
            this.setupDividers();
            this.setupResizeHandler();
            this.getTeamMascot();
            this.setupAnchorLinks();
            this.getAnchorList();
            this.setupNavigation();
        });
    }

    setupGutterLines() {
        const gutterMarkup = '<div class="gutterLineCoverUp left"></div><div class="gutterLineCoverUp right"></div>';
        $(".is-the-job-post-hero").append(gutterMarkup);
        $("#join-the-crew").append(gutterMarkup);
    }

    setupDividers() {
        // Create hero divider
        this.heroDivider = new DividerLine($(".is-the-job-post-hero")[0], false, 50, 500);
        this.positionDivider();
    }

    setupResizeHandler() {
        const debouncedResizeHandler = debounce(() => {
            this.setupBreakpoints();
            // Remove existing navigation before setting up new one
            $('.job-post-anchor-list').removeClass('is-shown');
            $('.wp-block-heading').removeClass('active-trigger');
            // Reset any inline styles that might have been added
            $('.job-post-anchor-list').css('top', '');
            
            this.setupNavigation();
            this.setupDividers();
        }, 100);

        window.addEventListener("resize", debouncedResizeHandler);
    }

    setupNavigation() {
        // Clear previous event handlers
        $('.job-post-anchor-list a').off('click');
        $('.wp-block-heading').off('click');
        
        if (!this.isMobile) {
            this.setupAnchorNav();
            $('.job-post-anchor-list-mobile').hide();
        } else {
            this.setupAnchorNavMobile();
        }
    }

    setupBreakpoints() {
        const mm = gsap.matchMedia();
        const breakPoint = 1024;

        mm.add(`(max-width: ${breakPoint}px)`, () => {
            this.isMobile = true;
        });

        mm.add(`(min-width: ${breakPoint + 1}px)`, () => {
            this.isMobile = false;
        });
    }

    setupAnchorLinks() {
        const jobDescription = $('.entry-content');
        const headings = jobDescription.find('.wp-block-heading');
        
        // Create URL-friendly IDs from heading text
        headings.each((i, heading) => {
            const text = $(heading).text();
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            $(heading).attr('id', `section-${id}`);
        });
    }

    getAnchorList() {
        const jobDescription = $('.entry-content');
        const headings = jobDescription.find('.wp-block-heading');
        const anchorList = $('.job-post-anchor-list');
        
        // Clear existing list items
        anchorList.empty();
        
        // Create new list items for each heading
        headings.each((i, heading) => {
            const $heading = $(heading);
            const listItem = $(`<li><a href="#${$heading.attr('id')}">${$heading.text()}</a></li>`);
            anchorList.append(listItem);
        });

        // Add the Apply Now link
        const joinCrewLink = $('<li><a href="#join-the-crew" class="has-large-font-size">Apply Now</a></li>');
        anchorList.append(joinCrewLink);
    }

    setupAnchorNav() {
        const jobDescription = $('.entry-content');
        const headings = jobDescription.find('.wp-block-heading');
        const listElements = $('.job-post-anchor-list').children();

        listElements.find('a').addClass('has-accent-underline');
        listElements.find('a').addClass('has-large-font-size');

        // Add click handler for anchor links
        listElements.find('a').on('click', (e) => {
            e.preventDefault();
            const targetId = $(e.currentTarget).attr('href');
            const $target = $(targetId);
            
            if ($target.length) {
                const windowHeight = $(window).height();
                const targetOffset = $target.offset().top;
                const linkOffset = $(e.currentTarget).offset().top;
                const scrollTo = targetOffset - (windowHeight * 0.3);
                
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 500);
            }
        });

        headings.each((i, heading) => {
            this.createScrollTrigger(heading, listElements[i]);
        });
    }

    createScrollTrigger(heading, listElement) {
        const navItem = $(listElement).find('a');
        const sectionHeight = $(heading).parent().outerHeight(true);

        ScrollTrigger.create({
            trigger: heading,
            start: "top 40%",
            end: `+=${sectionHeight}`,
            scrub: 1,
            onEnter: () => this.updateActiveNavItem(navItem),
            onEnterBack: () => this.updateActiveNavItem(navItem),
            onLeave: () => navItem.removeClass('is-active'),
            onLeaveBack: () => navItem.removeClass('is-active'),
        });
    }

    updateActiveNavItem(navItem) {
        $('.job-post-anchor-list a').removeClass('is-active');
        navItem.addClass('is-active');
    }

    setupAnchorNavMobile() {
        const mobileNav = new MobileNavigation();
        mobileNav.init();
    }

    getTeamMascot() {
        const teamMap = {
            'Bee': '/wp-content/uploads/2025/01/Bee.png',
            'Blobfish': '/wp-content/uploads/2025/01/Blobfish.png',
            'Echidna': '/wp-content/uploads/2025/01/Echidna.png',
            'Liger': '/wp-content/uploads/2025/01/Liger.png'
        };

        if (typeof acf_data !== 'undefined' && acf_data.team) {
            const imageUrl = teamMap[acf_data.team];
            if (imageUrl) {
                this.updateFeaturedImage(imageUrl, acf_data.team);
            }
        }
    }

    updateFeaturedImage(imageUrl, team) {
        const $featuredImage = $('.post-thumbnail img');
        
        if ($featuredImage.length) {
            $featuredImage
                .attr('src', imageUrl)
                .on('load', () => this.positionDivider());
        } else {
            const $newImage = $('<img>')
                .attr('src', imageUrl)
                .attr('alt', team)
                .addClass('dynamic-featured-image')
                .on('load', () => this.positionDivider());
            $('.is-the-job-post-hero figure').prepend($newImage);
        }
    }

    positionDivider() {
        if (!this.heroDivider) return;

        const hero = $('.is-the-job-post-hero');

        if (this.isMobile) {
            const figure = hero.find('figure');
            const position = figure.offset().top + (figure.outerHeight() / 2);
            this.heroDivider.updatePosition(position);
        } else {
            const heading = hero.find('.kt-inside-inner-col h1');
            const para = hero.find('.kt-inside-inner-col p');
            const headingBottom = heading.offset().top + heading.height();
            const paraTop = para.offset().top;
            const middlePosition = headingBottom + ((paraTop - headingBottom) / 2) - 40;
            this.heroDivider.updatePosition(middlePosition);
        }
    }
}

// Initialize if on job post template
if ($('body').hasClass('job-post-template-default')) {
    new JobPostPage();
}