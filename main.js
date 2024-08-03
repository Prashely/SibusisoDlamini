/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== READ MORE FEATURE ====================*/
function toggleReadMore() {
  const readMoreText = document.querySelector(".read-more-text");
  const readMoreBtn = document.querySelector(".read-more-btn");
  const readLessBtn = document.querySelector(".read-less-btn");

  if (
    readMoreText.style.display === "none" ||
    readMoreText.style.display === ""
  ) {
    readMoreText.style.display = "inline";
    readMoreBtn.style.display = "none";
    readLessBtn.style.display = "inline";
  } else {
    readMoreText.style.display = "none";
    readMoreBtn.style.display = "inline";
    readLessBtn.style.display = "none";
  }
}

/*==================== TOKENS TOP 10 ====================*/
const apiURL = "https://api.coingecko.com/api/v3/coins/markets";
const currency = "zar"; // Change to South African Rand (ZAR)
const limit = 10;
const updateInterval = 30000; // 1 hour in milliseconds
let previousPrices = {};

async function fetchTokenData() {
  const response = await fetch(
    `${apiURL}?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1`
  );
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return [];
  }
  return response.json();
}

function createTickerItem(token) {
  const tickerItem = document.createElement("div");
  tickerItem.classList.add("ticker-item");

  const logo = document.createElement("img");
  logo.src = token.image;
  logo.alt = `${token.name} logo`;
  tickerItem.appendChild(logo);

  const name = document.createElement("span");
  name.textContent = token.name;
  name.classList.add("name");
  tickerItem.appendChild(name);

  const priceElement = document.createElement("span");
  priceElement.classList.add("price");
  priceElement.textContent = `R${token.current_price.toFixed(2)}`;

  // Set color based on price change
  if (previousPrices[token.id] !== undefined) {
    priceElement.style.color =
      token.current_price > previousPrices[token.id] ? "green" : "red";
  }
  previousPrices[token.id] = token.current_price;
  tickerItem.appendChild(priceElement);

  return tickerItem;
}

async function initTicker() {
  const tickerContainer = document.getElementById("ticker");
  const tokens = await fetchTokenData();

  if (!tokens.length) {
    console.error("No tokens found or failed to fetch.");
    return;
  }

  // Clear previous items
  tickerContainer.innerHTML = "";

  // Create and append ticker items
  const items = tokens.map((token) => createTickerItem(token));
  items.forEach((item) => tickerContainer.appendChild(item));

  // Duplicate the ticker items for continuous scrolling
  items.forEach((item) => tickerContainer.appendChild(item.cloneNode(true)));

  // Set container width to accommodate all ticker items
  tickerContainer.style.width = `${tickerContainer.scrollWidth}px`;

  // Reset animation
  tickerContainer.style.animation = "none";
  tickerContainer.offsetHeight; // Trigger reflow
  tickerContainer.style.animation = "ticker 60s linear infinite";
}

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  setInterval(initTicker, updateInterval); // Update prices every hour
});
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, index) => {
  modalBtn.addEventListener("click", () => {
    modal(index);
  });
});

modalCloses.forEach((modalClose, index) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
var swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/
var swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Prevent The Default Paste Behaviour

document.addEventListener("paste", function (e) {
  // Check if the target is an input field or a textarea
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    // Prevent the default paste behavior
    e.preventDefault();

    // Get the copied text from the clipboard
    var text = (e.clipboardData || window.clipboardData).getData("text");

    // Insert the text into the target element
    if (document.execCommand) {
      document.execCommand("insertText", false, text);
    } else if (e.target.setRangeText) {
      // Fallback for browsers that don't support execCommand
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      e.target.setRangeText(text);
      // Move the cursor to the end of the inserted text
      e.target.setSelectionRange(start + text.length, start + text.length);
    }
  }
});
