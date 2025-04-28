document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".section-slider__carousel", {
    loop: true,
    speed: 300,
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
const slider = document.querySelector(".mtc-slider");
const dots = document.querySelectorAll(".mtc-dot");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const translateValue = index * -100;
    slider.style.transform = `translateX(${translateValue}%)`;

    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});
