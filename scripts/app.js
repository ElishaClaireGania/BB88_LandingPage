const track = document.getElementById('carousel-track');
let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;

// Automatically scrolls the logo strip smoothly
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    track.scrollLeft += 1;
    
    // Jump back to start immediately when hitting the duplicate block border
    if (track.scrollLeft >= (track.scrollWidth - track.clientWidth - 10)) {
      track.scrollLeft = 0;
    }
  }, 25); // Controls flow speed
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Drag functionality for mouse control
track.addEventListener('mousedown', (e) => {
  isDown = true;
  stopAutoScroll();
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  startAutoScroll();
});

track.addEventListener('mouseup', () => {
  isDown = false;
  startAutoScroll();
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2; 
  track.scrollLeft = scrollLeft - walk;
});

// Pause flow when a user points at a logo, resume when pointer leaves
track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', startAutoScroll);

// Kick off auto scroll on window load
window.addEventListener('load', startAutoScroll);