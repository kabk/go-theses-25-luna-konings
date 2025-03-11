// Function to ensure the JavaScript runs after HTML is loaded
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  // Autoplay video on Safari fix
  const video = document.querySelector(".live-feed");
  if (video) {
      video.muted = true; // Ensure it's muted
      video.play().catch(error => console.log("Autoplay failed:", error));
  }

  // Navbar scroll behavior
  let prevScrollpos = window.pageYOffset;
  let hasScrolled = false; // Track if user has scrolled

  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    // Detect if the user has started scrolling
    if (currentScrollPos > 0) {
      hasScrolled = true;
    }

    // Only show the navbar when scrolling up *after* the user has started scrolling
    if (hasScrolled && currentScrollPos < prevScrollpos) {
      document.getElementById("nav").style.top = "0"; // Show navbar when scrolling up
    } else {
      document.getElementById("nav").style.top = "-50px"; // Hide navbar when scrolling down or at page load
    }

    prevScrollpos = currentScrollPos;

    // Scroll Indicator
    scrollIndicator();
  };

  function scrollIndicator() {
    let winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressMarker").style.left = scrolled + "%";
  }

  function updateClock() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of year
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    document.getElementById("liveClock").textContent = formattedTime;
  }

  // Update clock every second
  setInterval(updateClock, 1000);
  updateClock(); // Initial call to prevent 1-sec delay

  // Scroll-based fading effect for h1
  document.addEventListener("scroll", function () {
    let scrollY = window.scrollY;
    let maxScroll = 500; // Adjust this value as needed
    let opacity = Math.max(1 - scrollY / maxScroll, 0);

    document.querySelector("h1").style.opacity = opacity;
  });
});

document.addEventListener("scroll", function () {
  // Get the position of the element with the specified id
  let targetElement = document.getElementById("bibliography"); // Replace "bibliography" with your desired id
  let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Get the absolute position of the element

  let scrollY = window.scrollY; // Get the current scroll position
  let maxScroll = targetPosition; // Set maxScroll to the position of the target element
  let opacity = (scrollY >= maxScroll) ? 1 : 0; // Footer fades in when scroll position exceeds target position

  // Update footer opacity
  document.querySelector(".footer").style.opacity = opacity;
});

