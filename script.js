// Runs once the page has loaded.
console.log("Hello World");

const image = document.querySelector("img");
const themeToggle = document.querySelector("#theme-toggle");
const dcjsImage = document.querySelector("#dcjs-image");
const yesText = document.querySelector("#yes-text");
const backButton = document.querySelector("#back-button");
const rewardGif = document.querySelector("#reward-gif");

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme", themeToggle.checked);
});

dcjsImage.addEventListener("click", () => {
  yesText.hidden = !yesText.hidden;
});

let dcjsRotation = 0;
let clockwiseRotation = 0;
let rewardShown = false;

dcjsImage.addEventListener("wheel", (event) => {
  event.preventDefault();
  const wheelRotation = event.deltaY > 0 ? 15 : -15;
  dcjsRotation += wheelRotation;
  clockwiseRotation = Math.max(0, clockwiseRotation + wheelRotation);
  dcjsImage.style.transform = `rotate(${dcjsRotation}deg)`;

  if (!rewardShown && clockwiseRotation >= 360) {
    rewardShown = true;
    rewardGif.hidden = false;
  }
}, { passive: false });

backButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

let isAnimating = false;

image.addEventListener("click", () => {
  if (isAnimating) return;

  if (image.src.endsWith("/images/__tut_023882.jpg")) {
    isAnimating = true;
    image.style.pointerEvents = "none";

    const duration = 2800;
    const startTime = performance.now();

    function growAndDisappear(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic acceleration: starts slowly and becomes much faster.
      const acceleratedProgress = progress * progress * progress;
      const scale = 1 + acceleratedProgress * 7;
      const opacity = 1 - Math.pow(progress, 1.5);

      image.style.transform = `scale(${scale})`;
      image.style.opacity = opacity.toString();

      if (progress < 1) {
        requestAnimationFrame(growAndDisappear);
        return;
      }

      image.src = "images/未命名作品 1.png";
      image.style.opacity = "1";
      image.style.transform = "scale(1)";
      image.style.pointerEvents = "auto";
      isAnimating = false;
    }

    requestAnimationFrame(growAndDisappear);
    return;
  }

  if (!decodeURIComponent(image.src).endsWith("/images/未命名作品 1.png")) return;

  isAnimating = true;
  image.style.pointerEvents = "none";

  const startScroll = window.scrollY;
  const distance = Math.min(window.innerHeight * 0.65, document.documentElement.scrollHeight - window.innerHeight - startScroll);
  const duration = 1800;
  const startTime = performance.now();

  function moveCameraDown(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out: fast at the beginning and slow at the end.
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startScroll + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(moveCameraDown);
      return;
    }

    image.style.pointerEvents = "auto";
    isAnimating = false;
  }

  requestAnimationFrame(moveCameraDown);
});
