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
    video.addEventListener("loadeddata", function() {
      video.play().catch(error => console.log("Autoplay failed:", error));
    });
  }

  // Navbar scroll behavior
  let prevScrollpos = window.pageYOffset;
  let hasScrolled = false;

  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 0) {
      hasScrolled = true;
    }

    if (hasScrolled && currentScrollPos < prevScrollpos) {
      document.getElementById("nav").style.top = "0"; 
    } else {
      document.getElementById("nav").style.top = "-50px"; 
    }

    prevScrollpos = currentScrollPos;

    // Update scroll indicator
    scrollIndicator();

    // Handle fading effect for h1
    fadeH1OnScroll();

    // Handle footer opacity on scroll
    footerOpacityOnScroll();
  };

  function scrollIndicator() {
    let winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressMarker").style.left = scrolled + "%";
  }

  function fadeH1OnScroll() {
    let scrollY = window.scrollY;
    let maxScroll = 500; // Adjust this value as needed
    let opacity = Math.max(1 - scrollY / maxScroll, 0); // Fade out h1 based on scroll position
    document.querySelector("h1").style.opacity = opacity;
  }

  function footerOpacityOnScroll() {
    let targetElement = document.getElementById("bibliography"); // Element to trigger fade
    let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    let scrollY = window.scrollY;
    let maxScroll = targetPosition;
    let opacity = (scrollY >= maxScroll) ? 1 : 0; // Footer fades in after reaching target position

    document.querySelector(".footer").style.opacity = opacity;
  }

  function updateClock() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    document.getElementById("liveClock").textContent = formattedTime;
  }

  setInterval(updateClock, 1000);
  updateClock();
});
