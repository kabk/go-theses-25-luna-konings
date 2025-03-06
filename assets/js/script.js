// Function to ensure the JavaScript runs after HTML is loaded
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  // functions go here if needed
});

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  // Navigation show/hide
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;

  // Scroll Indicator
  scrollIndicator();
};

function scrollIndicator() {
  let winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
