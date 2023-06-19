/** @format */

// NavBar menu
hamburger = document.querySelector(".hamburger");
nav = document.querySelector(".links");
hamburger.onclick = function () {
  nav.classList.toggle("act");
  const inOpen = nav.classList.contains("act");
  hamburger.classList = inOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

// Slider image
// var counter = 1;
// setInterval(function () {
//   document.getElementById("radio" + counter).checked = true;
//   counter++;
//   if (counter > 4) {
//     counter = 1;
//   }
// }, 5000);

var slides = document.querySelectorAll(".slide");
var btns = document.querySelectorAll(".btn");
let currentSlide = 1;

// Javascript for image slider manual navigation
var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");

    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[manual].classList.add("active");
  btns[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

// Javascript for image slider autoplay navigation
var repeat = function (activeClass) {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });

      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 10000);
  };
  repeater();
};
repeat();

// scroll bar
// var nav = document.querySelector(".sec-head2");
// window.addEventListener("scroll", function () {
//   if (window.pageYOffset > 59) {
//     nav.classList.add("bg-dark");
//   } else {
//     nav.classList.remove("bg-dark");
//   }
// });

let header = document.querySelector(".sec-head2");
window.addEventListener("scroll", () => {
  header.classList.toggle("bg-dark", window.scrollY > 10);
});

// TweenMax.from(".logo-ec", 1, {
//   opacity: 0,
//   x: -20,
//   ease: Expo.easeInOut,
// });

// ##################################### Scroll Animations #####################################
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// ############## Progress ###################
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  // scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  scrollProgress.style.background = `conic-gradient(#33479d ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

var links = document.querySelectorAll(".links ul li a");
links.forEach((a) => {
  a.addEventListener("click", () => {
    resetLinks();
    a.classList.add("activee");
  });
});
function resetLinks() {
  links.forEach((a) => {
    a.classList.remove("activee");
  });
}

// Number Counting
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

// Popup Show ##################################"""""""
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
window.onload = function () {
  setTimeout(function () {
    popup.style.display = "block ";
    // Add some time delay to show popup
  }, 2000);
};
close.addEventListener("click", () => {
  popup.style.display = "none";
});
// ScrollReveal ###############################
//// Attention //// don't show animation in r.Mobile
const matchResult = window.matchMedia("(max-width: 500px)");
if (!matchResult.matches) {
  ScrollReveal({
    reset: false,
    distance: "60px",
    duration: 2500,
    delay: 400,
  });

  ScrollReveal().reveal(".presentation-ecole > h1", {
    delay: 500,
    origin: "left",
  });
  ScrollReveal().reveal(".presentation-info", {
    delay: 500,
    origin: "bottom",
  });
  ScrollReveal().reveal(".Service-Scolaire .container-counter", {
    delay: 500,
    origin: "left",
    interval: 100,
  });
  ScrollReveal().reveal(".presentation-img", {
    delay: 500,
    origin: "right",
  });

  ScrollReveal().reveal(".wrapper-pedagogie .box", {
    delay: 300,
    origin: "bottom",
    interval: 200,
  });
  ScrollReveal().reveal(".product .itembox", {
    delay: 300,
    // origin: "bottom",
    interval: 200,
  });
}

// #################""" Galerie ###################################################
const gallery = document.querySelector(".gallery");
const itemboxes = document.querySelectorAll(".itembox");
console.log(itemboxes);
gallery.addEventListener("click", (e) => {
  console.log(e);

  if (e.target.classList.contains("filter")) {
    gallery.querySelector(".active-gal").classList.remove("active-gal");
    e.target.classList.add("active-gal");
    const filterValue = e.target.getAttribute("data-filter");
    // connsole.log(filterValue);
    itemboxes.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === "all") {
        item.classList.add("show");
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }
});

// ########################## button ############################
const button = document.querySelector(".buttonA");
button.addEventListener("click", (e) => {
  e.preventDefault;
  button.classList.add("animate");
  setTimeout(() => {
    button.classList.remove("animate");
  }, 600);
});

// ######################## Email ############################

// function sendEmail() {
//   Email.send({
//     Host: "smtp.gmail.com",
//     Username: "contact.subrinioulfa@gmail.com",
//     Password: "RCAtdi20",
//     To: "badrtdi101@gmail.com",
//     From: document.getElementById("emaill").value,
//     Subject: "New Contact Form Enquiry",
//     Body: "And this is th body",
//   }).then((message) => alert(message));
// }
// var btn = document.getElementById("btnn");
// btn.addEventListener("click", function (e) {
//   e.preventDefault();
//   var emaill = document.getElementById("emaill").value;
//   Email.send({
//     Host: "smtp.gmail.com",
//     Username: "contact.subrinioulfa@gmail.com",
//     Password: "SUBtdi20",
//     To: "contact.subrinioulfa@gmail.com",
//     From: emaill,
//     Subject: "This is the subject",
//     Body: "And this is the body",
//   }).then((message) => alert(message));
// });

// ########################## Recrutement ##########################
// const scriptURL =
//   "https://script.google.com/macros/s/AKfycbzqc77vnxck_pMh7bhceSlytbDLwWeanD_OdB4rM-YQXHHSifMRiDcWPGT1Gb1AXm68/exec";
// const form = document.forms["google-sheet"];

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(scriptURL, { method: "POST", body: new FormData(form) })
//     .then((response) =>
//       alert("Thanks for Contacting us..! We Will Contact You Soon...")
//     )
//     .catch((error) => console.error("Error!", error.message));
// });

var form = document.getElementById("sheetdb-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
  })
    .then((response) => response.json())
    .then((html) => {
      // you can put any JS code here
      alertV();
    });
});

// ######################### msg Notification
function alertV() {
  const buttonT = document.querySelector(".buttonToast"),
    toast = document.querySelector(".toast");
  (closeIcon = document.querySelector(".closetoast")),
    (progres = document.querySelector(".progres"));
  let timer1, timer2;
  buttonT.addEventListener("click", () => {
    toast.classList.add("activeto");
    progres.classList.add("activeto");

    timer1 = setTimeout(() => {
      toast.classList.remove("activeto");
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
      progres.classList.remove("activeto");
    }, 5300);
  });

  closeIcon.addEventListener("click", () => {
    toast.classList.remove("activeto");

    setTimeout(() => {
      progress.classList.remove("activeto");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
  });
}
// function Validation input

// function checkforblank() {
//   if (document.getElementById("prenomR").value === "") {
//     alert("plz champs!");
//     return false;
//   } else {
//     alertV();
//     return true;
//   }
// }
