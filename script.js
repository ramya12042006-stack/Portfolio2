const canvas = document.getElementById("frameCanvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => 
  `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

const images = [];
let img = new Image();

// Resize canvas properly
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const image = new Image();
    image.src = currentFrame(i);
    images.push(image);
}

// Draw first frame
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

// Scroll animation
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    });
});
