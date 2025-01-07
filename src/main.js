const mobileMenuContainer = document.getElementById("mobile-menu")
const headerSlider = document.getElementById("header-slider")
function toggleMobileMenu() {
    mobileMenuContainer.classList.toggle("!hidden")
}
headerSlider.scrollLeft =headerSlider.scrollWidth

function animateHeaderSlider() {
    debugger
    console.log(headerSlider.scrollLeft)
    if(headerSlider.scrollLeft >= (headerSlider.scrollWidth / 2) * -1)
        headerSlider.scrollLeft = (headerSlider.scrollWidth * -1);
    else 
        headerSlider.scrollLeft +=1 
}

setInterval(animateHeaderSlider, 20)