/** @format */

// NavBar menu
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".links");
if (hamburger && nav) {
  hamburger.onclick = function () {
    nav.classList.toggle("act");
    const isOpen = nav.classList.contains("act");
    if (isOpen) {
      hamburger.classList.remove("fa-bars");
      hamburger.classList.add("fa-xmark");
    } else {
      hamburger.classList.remove("fa-xmark");
      hamburger.classList.add("fa-bars");
    }
  };
}

// Slider image
const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".btn");
let currentSlide = 0; // Start at 0 for array indexing
let autoSlideTimeout; // Variable to hold the timeout ID

if (slides.length > 0 && btns.length > 0) {
  const updateActiveSlide = function (index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    btns.forEach((btn) => btn.classList.remove("active"));

    slides[index].classList.add("active");
    btns[index].classList.add("active");
    currentSlide = index;
  };

  const startAutoSlide = function () {
    clearTimeout(autoSlideTimeout); // Clear existing timeout
    if (slides.length > 1) {
      // Only run if there's more than one slide
      autoSlideTimeout = setTimeout(function () {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
          nextIndex = 0;
        }
        updateActiveSlide(nextIndex);
        startAutoSlide(); // Schedule the next auto slide
      }, 7000);
    }
  };

  const manualNav = function (manualIndex) {
    updateActiveSlide(manualIndex);
    startAutoSlide(); // Restart auto-slide timer after manual navigation
  };

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      manualNav(i);
    });
  });

  // Initial setup: Find the initially active slide from HTML, or default to 0
  const initialActiveIndex = Array.from(slides).findIndex((s) =>
    s.classList.contains("active")
  );
  currentSlide = initialActiveIndex !== -1 ? initialActiveIndex : 0;
  if (slides[currentSlide]) {
    // Check if the slide exists
    updateActiveSlide(currentSlide); // Ensure consistency and set currentSlide
  }

  startAutoSlide(); // Start the slideshow
}

// Sticky header on scroll
const header = document.querySelector(".sec-head2");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("bg-dark", window.scrollY > 10);
  });
}

// ############## Progress Scroll ###################
const scrollProgress = document.getElementById("progress");

const calcScrollValue = () => {
  if (!scrollProgress) return;
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (calcHeight === 0) {
    scrollProgress.style.display = "none";
    return;
  }
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid"; // Changed from "grid" to "flex" or "block" if "grid" causes issues with conic-gradient
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.style.background = `conic-gradient(var(--color-primary) ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

if (scrollProgress) {
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
}

// Active Nav Links
const navLinks = document.querySelectorAll(".links ul li a");
function resetNavLinks() {
  navLinks.forEach((a) => {
    a.classList.remove("activee");
  });
}
navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    resetNavLinks();
    a.classList.add("activee");
    if (nav && nav.classList.contains("act") && hamburger) {
      nav.classList.remove("act");
      hamburger.classList.remove("fa-xmark");
      hamburger.classList.add("fa-bars");
    }
  });
});
// Smooth scroll to sections with header offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hrefAttribute = this.getAttribute("href");

    // Ensure it's a valid hash link and not just href="#"
    if (
      hrefAttribute &&
      hrefAttribute.length > 1 &&
      hrefAttribute.startsWith("#")
    ) {
      const targetId = hrefAttribute.substring(1); // Get id without '#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault(); // Prevent default jump

        const header = document.querySelector(".sec-head2"); // Your sticky header
        let headerOffset = 0;
        if (header) {
          headerOffset = header.offsetHeight; // Get the current height of the header
        }

        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 10; // 10px extra padding

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Optional: Update URL hash without page jump (for better history/bookmarking)
        // history.pushState(null, null, `#${targetId}`);

        // Close mobile menu if open
        const nav = document.querySelector(".links");
        const hamburger = document.querySelector(".hamburger");
        if (nav && nav.classList.contains("act") && hamburger) {
          nav.classList.remove("act");
          hamburger.classList.remove("fa-xmark");
          hamburger.classList.add("fa-bars");
        }
      }
    }
  });
});

// Number Counting Animation
const valueDisplays = document.querySelectorAll(".num");
if (valueDisplays.length > 0) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const valueDisplay = entry.target;
          if (valueDisplay.classList.contains("counted")) return; // Prevent re-counting

          valueDisplay.classList.add("counted");
          let startValue = 0;
          let endValue = parseInt(valueDisplay.getAttribute("data-val")) || 0;
          let intervalTime = 2000;
          let duration =
            endValue === 0
              ? intervalTime
              : Math.max(10, Math.floor(intervalTime / endValue));

          if (endValue === 0) {
            // Handle if endValue is 0 directly
            valueDisplay.textContent = 0;
            // observer.unobserve(valueDisplay); // Optional
            return;
          }

          let counter = setInterval(function () {
            startValue += 1;
            valueDisplay.textContent = startValue;
            if (startValue >= endValue) {
              valueDisplay.textContent = endValue;
              clearInterval(counter);
            }
          }, duration);
          // observer.unobserve(valueDisplay); // Optional: Unobserve after animation
        }
      });
    },
    { threshold: 0.5 }
  );

  valueDisplays.forEach((valueDisplay) => {
    countObserver.observe(valueDisplay);
  });
}

// Popup Show
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup .close");

if (popup && closePopup) {
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    // To persist dismissal, use localStorage uncommented in window.onload
  });
}

// ScrollReveal Animations
const matchResult = window.matchMedia("(min-width: 768px)");
if (matchResult.matches && typeof ScrollReveal !== "undefined") {
  // Check if ScrollReveal is loaded
  ScrollReveal({
    reset: false,
    distance: "60px",
    duration: 2000,
    delay: 200,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".presentation-ecole > h1", {
    delay: 300,
    origin: "left",
  });
  ScrollReveal().reveal(".presentation-info", { delay: 400, origin: "bottom" });
  ScrollReveal().reveal(".presentation-img", { delay: 400, origin: "right" });

  ScrollReveal().reveal(".Service-Scolaire h1", { delay: 300, origin: "top" });
  ScrollReveal().reveal(".Service-Scolaire .container-counter", {
    delay: 200,
    origin: "bottom",
    interval: 150,
  });

  ScrollReveal().reveal(".pedagogie > h1", { delay: 300, origin: "top" });
  ScrollReveal().reveal(".wrapper-pedagogie .box", {
    delay: 200,
    origin: "bottom",
    interval: 150,
  });

  ScrollReveal().reveal(".nos-partenaire > h1", { delay: 300, origin: "top" });
  ScrollReveal().reveal(".nos-partenaire .partenaires img", {
    delay: 200,
    origin: "bottom",
    interval: 100,
    viewFactor: 0.3,
  });

  ScrollReveal().reveal(".galerie > h1", { delay: 300, origin: "top" });
  // Corrected selector for gallery filter items if they are direct children of ul.gallery
  ScrollReveal().reveal(".container-gal ul.gallery > li.filter", {
    delay: 200,
    origin: "left",
    interval: 50,
  });
  ScrollReveal().reveal(".product .itembox", {
    delay: 300,
    origin: "bottom",
    interval: 100,
    viewFactor: 0.2,
  });
  ScrollReveal().reveal(".galerie .buttonA", { delay: 200, origin: "bottom" }); // Targets the "More" button

  ScrollReveal().reveal(".ContactUs > h1", { delay: 300, origin: "top" });
  ScrollReveal().reveal(".container-contact .contactInfo", {
    delay: 400,
    origin: "left",
    distance: "80px",
  });
  ScrollReveal().reveal(".container-contact .contactForm", {
    delay: 400,
    origin: "right",
    distance: "80px",
  });
  ScrollReveal().reveal(".maps", { delay: 200, origin: "bottom" });

  ScrollReveal().reveal(".container-recrut header", {
    delay: 300,
    origin: "top",
  });
  ScrollReveal().reveal(".container-recrut .form", {
    delay: 400,
    origin: "bottom",
  });
}

// Gallery Filter Logic
const galleryFilter = document.querySelector(".galerie ul.gallery");
const itemboxes = document.querySelectorAll(".galerie .product .itembox");

if (galleryFilter && itemboxes.length > 0) {
  galleryFilter.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter")) {
      const activeFilter = galleryFilter.querySelector(".active-gal");
      if (activeFilter) activeFilter.classList.remove("active-gal");

      e.target.classList.add("active-gal");
      const filterValue = e.target.getAttribute("data-filter");

      itemboxes.forEach((item) => {
        if (item.classList.contains(filterValue) || filterValue === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });
}

// Gallery "Voir Plus" Button
const galleryMoreButton = document.querySelector(".galerie .buttonA");
if (galleryMoreButton) {
  galleryMoreButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Voir Plus clicked - Implement loading more images logic.");
    // Example: Toggle animation class if button has .animate effect
    // galleryMoreButton.classList.toggle('animate');
  });
}

// ######################### Toast Notification Logic #########################
const toastElement = document.querySelector(".toast");
const toastCloseIcon = document.querySelector(".toast .closetoast");
const toastProgres = document.querySelector(".toast .progres");
let toastTimer1, toastTimer2;

function showToast(
  messageText = "Votre message a été envoyé avec succès",
  type = "success" // "success" or "error"
) {
  if (!toastElement || !toastProgres) return;

  const toastMessageElement = toastElement.querySelector(".text.text-2");
  const toastTitleElement = toastElement.querySelector(".text.text-1");
  const toastCheckIcon = toastElement.querySelector(".toast-content .check");
  const toastBorder = toastElement;

  if (toastMessageElement) toastMessageElement.textContent = messageText;

  if (type === "error") {
    if (toastTitleElement) toastTitleElement.textContent = "Erreur";
    if (toastCheckIcon) {
      toastCheckIcon.classList.remove("fa-check");
      toastCheckIcon.classList.add("fa-exclamation-triangle"); // Example error icon
      toastCheckIcon.style.backgroundColor = "#e84545"; // Error color
    }
    toastBorder.style.borderLeftColor = "#e84545";
    if (toastProgres) toastProgres.style.backgroundColor = "#e84545"; // Progress bar error color
    if (toastProgres.firstChild)
      toastProgres.firstChild.style.backgroundColor = "#e84545"; // For :before element
  } else {
    // Success or default
    if (toastTitleElement) toastTitleElement.textContent = "Succès";
    if (toastCheckIcon) {
      toastCheckIcon.classList.remove("fa-exclamation-triangle");
      toastCheckIcon.classList.add("fa-check");
      toastCheckIcon.style.backgroundColor = "#4070f4"; // Success color
    }
    toastBorder.style.borderLeftColor = "#4070f4";
    if (toastProgres) toastProgres.style.backgroundColor = "#ddd"; // Reset progress bar base
    // For :before element
    const progressBarBefore = toastProgres.querySelector(":scope::before"); // Target pseudo-element if possible (not directly via JS)
    // Or ensure CSS handles color for .progres:before
    // The :before element's color is set by CSS, so ensure that logic is sound or adjust CSS.
    // For simplicity, we rely on CSS for the progress bar's active color.
    // Let's assume the CSS handles the active color correctly based on success.
    // If error needs different progress bar color, CSS would need to adapt, e.g. .toast.error .progres:before
  }

  toastElement.classList.add("activeto");
  toastProgres.classList.add("activeto"); // This class triggers animation

  clearTimeout(toastTimer1);
  clearTimeout(toastTimer2);

  toastTimer1 = setTimeout(() => {
    toastElement.classList.remove("activeto");
  }, 5000);

  toastTimer2 = setTimeout(() => {
    toastProgres.classList.remove("activeto");
  }, 5300); // Ensure progress animation class is removed after toast hides
}

if (toastCloseIcon && toastElement && toastProgres) {
  toastCloseIcon.addEventListener("click", () => {
    toastElement.classList.remove("activeto");
    setTimeout(() => {
      // Delay removing progress animation class
      toastProgres.classList.remove("activeto");
    }, 300); // Match transition duration or slightly longer
    clearTimeout(toastTimer1);
    clearTimeout(toastTimer2);
  });
}

// Form Submission (Recruitment Form - SheetDB)
const sheetDbForm = document.getElementById("sheetdb-form");
if (sheetDbForm) {
  sheetDbForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = sheetDbForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
    }

    fetch(sheetDbForm.action, {
      method: "POST",
      body: new FormData(sheetDbForm),
    })
      .then((response) => {
        if (!response.ok) {
          return response
            .json()
            .then((errData) => {
              throw new Error(errData.error || `HTTP error ${response.status}`);
            })
            .catch(() => {
              throw new Error(
                `HTTP error ${response.status}, unable to parse error response.`
              );
            });
        }
        return response.json();
      })
      .then((data) => {
        console.log("SheetDB Success:", data);
        showToast("Votre candidature a été soumise avec succès !", "success");
        sheetDbForm.reset();
      })
      .catch((error) => {
        console.error("SheetDB Error:", error);
        showToast(
          "Erreur: " + error.message + ". Veuillez réessayer.",
          "error"
        );
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Soumettre";
        }
      });
  });
}

// Initial setup calls on window load
window.addEventListener("load", function () {
  calcScrollValue();

  const initialPopup = document.querySelector(".popup");
  if (initialPopup) {
    // Example: Show popup if not dismissed (using localStorage)
    // For testing, you might want to show it always or based on a session.
    // if (!localStorage.getItem("popupDismissedToday")) {
    setTimeout(function () {
      initialPopup.style.display = "block"; // Or 'flex' if contentBox uses flex
    }, 2000);
    // }

    const initialPopupClose = initialPopup.querySelector(".close");
    if (initialPopupClose) {
      initialPopupClose.addEventListener("click", () => {
        // To dismiss for the day/session:
        // localStorage.setItem('popupDismissedToday', 'true');
        // Or use sessionStorage.setItem('popupDismissedThisSession', 'true');
      });
    }
  }
});

window.addEventListener("scroll", calcScrollValue);
