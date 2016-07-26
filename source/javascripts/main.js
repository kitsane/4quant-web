$(function($) {
    $('#mainNavigation .navbar').click(function(event) {
        $('#mainNavigation').modal('toggle');
    });
    $('#menu-toggler').click(function(event){
        $('#mainNavigation').modal({
            keyboard: true
        });
    });
    $('#menu-toggler-close').click(function(event) {
        $('#mainNavigation').modal('toggle');
    });
    const testemonialCarouselOpts = {
        interval: 2000,
        pause: "hover",
        wrap: false,
        keyboard: false,
    }

    $('#testemonial-carousel-one').carousel(testemonialCarouselOpts);
    $('#testemonial-carousel-two').carousel(testemonialCarouselOpts);
});
