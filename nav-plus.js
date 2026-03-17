const nav = document.getElementById("nav");

let lastScroll = 0;

window.addEventListener("scroll", () => {

let currentScroll = window.pageYOffset;

// glass navbar
if(currentScroll > 20){
nav.classList.add("scrolled");
}else{
nav.classList.remove("scrolled");
}

// hide on scroll down
if(currentScroll > lastScroll && currentScroll > 120){
nav.classList.add("hidden");
}else{
nav.classList.remove("hidden");
}

lastScroll = currentScroll;

});


// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if(menuBtn){
menuBtn.addEventListener("click", () => {
mobileMenu.classList.toggle("active");
});
}
