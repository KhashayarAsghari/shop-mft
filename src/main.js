import { getAllProducts as allProductsFetcher } from "./services.js";

const mobileMenuContainer = document.getElementById("mobile-menu")
const headerSlider = document.getElementById("header-slider")
const sliderContainer = document.getElementById("slider")
const root = document.getElementById("root")

let lastSlideElement;

const slides = [
    {
        id: 1,
        title: "برای سوپرایز آماده شودی",
        img: "gholaam.webp"
    },
    {
        id: 2,
        title: "مد برای هر زمان",
        img: "javad.webp"
    },
    {
        id: 3,
        title: "مد برای هر مکان",
        img: "javad.webp",
    }
]

function renderSlider(items) {
    const template = items.map(item => {
        return `
            <div class="w-full h-full duration-1000 inline-block bg-slate-300 absolute top-0 left-0">
                <img class="w-1/3 absolute bottom-0 left-10" src="/src/public/images/images/${item.img}" width="500" />

                <span class="absolute top-1/2 right-10 max-w-80">
                ${item.title}
                </span>

            </div>
        `
    }).join("")

    sliderContainer.innerHTML = template

}

renderSlider(slides)

async function renderProducts() {
    const products = await allProductsFetcher()

    const template = products.map(product => {
        const isLowPrice = product.price < 100;

        return `
        <div class="w-full border rounded-xl overflow-hidden relative">
        <img class="rounded-xl w-full h-96" src="${product.image}" alt="">
        <div class="p-2">
            <h4>${product.title}</h4>
            <span>${product.price}$</span>
        </div>

        ${isLowPrice ? (`
                <div class="text-white absolute top-2 right-2 w-max cursor-default rounded-full bg-red-500 px-2 py-1">
                    فروش ویژه
                </div>
            `) : ""}
        <div class="absolute p-2 rounded-full cursor-pointer top-2 left-2 bg-white shadow-xl hover:bg-red-500">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </div>
    </div>
        `
    }).join("")

    const container = `
    <div class="grid grid-cols-4">
        ${template}
    </div>
    `

    root.innerHTML = container
}

renderProducts()
function nextSlide() {
    if (lastSlideElement) {
        if (lastSlideElement.nextElementSibling) {
            lastSlideElement = lastSlideElement.nextElementSibling;
            lastSlideElement.classList.add("translate-x-full")
        } else {
            while (document.querySelector(".translate-x-full")) {
                document.querySelector(".translate-x-full").classList.remove("translate-x-full")
            }
            lastSlideElement = sliderContainer.firstElementChild;
        }

    } else {
        lastSlideElement = sliderContainer.firstElementChild;
        lastSlideElement.classList.add("translate-x-full")
    }

}

setInterval(() => {
    nextSlide()
}, 5000)

function prevSlide() {

}

function toggleMobileMenu() {
    mobileMenuContainer.classList.toggle("!hidden")
}
headerSlider.scrollLeft = headerSlider.scrollWidth

function animateHeaderSlider() {
    if (headerSlider.scrollLeft >= (headerSlider.scrollWidth / 2) * -1)
        headerSlider.scrollLeft = (headerSlider.scrollWidth * -1);
    else
        headerSlider.scrollLeft += 1
}

setInterval(animateHeaderSlider, 20)