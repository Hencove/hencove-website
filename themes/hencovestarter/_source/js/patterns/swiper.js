const swiper = {
    init: function() {

        let queryContainer = $(
            ".featured-blogs-swiper .wp-block-kadence-query-card"
        );
        let items = $(".kb-query-item", queryContainer)
            .addClass("swiper-slide")
            .detach();

        $(".swiper-wrapper", ".related-posts-slider-rebuilt").append(items);

        const swiper = new Swiper(".swiper", {
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000,
            },

            // If we need pagination
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
}

export { swiper };