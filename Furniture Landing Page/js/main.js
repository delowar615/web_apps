const burgerBtn = document.getElementById("burgerBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn"); // Новая кнопка
const mobileMenu = document.getElementById("mobileMenu");
const body = document.body;

function toggleMenu() {
    mobileMenu.classList.toggle("active");
    burgerBtn.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "";
    }
}

// Открытие/закрытие по бургеру
burgerBtn.addEventListener("click", toggleMenu);

// Закрытие по внутреннему крестику
closeMenuBtn.addEventListener("click", () => {
    // Если меню активно, закрываем его
    if (mobileMenu.classList.contains("active")) {
        toggleMenu();
    }
});

// Закрытие при клике на ссылку (опционально, удобно для навигации)
const menuLinks = document.querySelectorAll(".mobile-nav-list a");
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("active")) {
            toggleMenu();
        }
    });
});

const swiper = new Swiper(".product-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
    },
});
