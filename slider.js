document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".section-slider__carousel", {
    loop: true,
    speed: 600,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".section-slider__dots-container",
      clickable: true,
      bulletClass: "section-slider__dot",
      bulletActiveClass: "active",
    },
  });
});
