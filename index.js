const slides = document.querySelectorAll("section.product-container");
let slidesContainer = document.querySelector(
  ".featured-sets-wholebody-container"
);
console.log("initial container width: ", slidesContainer.clientWidth);
slidesContainer.style.gap = "35px";
console.log("gap: ", slidesContainer.style.gap);
let percentageMove = 4;
let firstSlide = slides[0];
let noOfClicks = -1;
let lastSlide = slides[slides.length - 1];
let maxMove = Math.ceil(slides.length / percentageMove);
const nextBtn = document.getElementById("right-btn");
const prevBtn = document.getElementById("left-btn");
let eachSlideWidth = firstSlide.clientWidth;
console.log("each slide width: ", eachSlideWidth);
let totalWidth =
  percentageMove * eachSlideWidth +
  Number(slidesContainer.style.gap.slice(0, -2)) * (percentageMove - 1);
console.log("total width: ", totalWidth);
slidesContainer.style.width = `${totalWidth}px`;
console.log("final container width: ", slidesContainer.clientWidth);

let barContainer = document.querySelector(".moving-bar");
let runnerBar = document.querySelector("#runner-bar");
let newRunnerWidth = barContainer.clientWidth / (maxMove * 2);
runnerBar.style.width = `${newRunnerWidth}px`;

let trial = -2.338;
// let count = 1;
// let currentPadding = 2;
// slidesContainer.style.paddingLeft = "2px";

let isDown = false;
let startX;
let scrollLeft = 0;

let j = 0;
let tracks = 0;
const start = (e) => {
  isDown = true;
  slidesContainer.classList.add("active");
  startX = e.pageX || e.touches[0].pageX - slidesContainer.offsetLeft;
  scrollLeft = slidesContainer.scrollLeft;
  console.log("Started startX ", startX, "scrollLeft: ", scrollLeft);
};

const move = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - slidesContainer.offsetLeft;
  const dist = x - startX;
  j = isDown ? dist : j + dist;
  console.log("1st j", j);
  slidesContainer.scrollLeft = scrollLeft - dist;

  console.log("2nd j", j);
  tracks = j - scrollLeft;
  runnerBar.style.transform = `translateX(${
    (-1 * tracks * barContainer.clientWidth) / (totalWidth * maxMove)
  }px)`;

  // console.log("focus here", startX - trial);
  console.log("Moving. x", x, "distance: ", dist);
};

const Move = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - slidesContainer.offsetLeft;
  const dist = x - startX;
  j = isDown ? dist : j + dist;
  console.log("1st j", j);
  barContainer.scrollLeft = scrollLeft - dist;

  console.log("2nd j", j);
  tracks = j - scrollLeft;
  runnerBar.style.transform = `translateX(${
    (tracks * barContainer.clientWidth) / (totalWidth * maxMove)
  }px)`;

  // console.log("focus here", startX - trial);
  console.log("Moving. x", x, "distance: ", dist);
};

const end = () => {
  isDown = false;
  slidesContainer.classList.remove("active");
  scrollLeft = slidesContainer.scrollLeft;
  console.log("Ended: isDown: ", isDown, "scrollleft: ", scrollLeft);
  console.log("Total width", totalWidth);
  // runnerBar.style.transform = `translateX(${(scrollLeft/1000)*runnerBar.clientWidth}px)`;
};

(() => {
  slidesContainer.addEventListener("mousedown", start);
  // slidesContainer.addEventListener('touchstart', start);

  slidesContainer.addEventListener("mousemove", move);
  // slidesContainer.addEventListener('touchmove', move);

  slidesContainer.addEventListener("mouseleave", end);
  slidesContainer.addEventListener("mouseup", end);
  // slidesContainer.addEventListener('touchend', end);
})();

(() => {
  barContainer.addEventListener("mousedown", start);
  // slidesContainer.addEventListener('touchstart', start);

  barContainer.addEventListener("mousemove", Move);
  // slidesContainer.addEventListener('touchmove', move);

  barContainer.addEventListener("mouseleave", end);
  barContainer.addEventListener("mouseup", end);
  // slidesContainer.addEventListener('touchend', end);
})();

nextBtn.addEventListener("click", function () {
  if (noOfClicks === 0) {
    noOfClicks = -1;
  }
  if (noOfClicks === -1) {
    runnerBar.style.transform = `translateX(${
      noOfClicks * trial * runnerBar.clientWidth
    }px)`;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${
        slidesContainer.clientWidth * noOfClicks -
        Number(slidesContainer.style.gap.slice(0, -2))
      }px)`;
    });
    // slidesContainer.style.padding = `${currentPadding*count}px`;
    noOfClicks--;
    // count++;
  } else if (noOfClicks === -1 * maxMove) {
    console.log("Cannot move further");
  } else {
    runnerBar.style.transform = `translateX(${
      noOfClicks * trial * runnerBar.clientWidth
    }px)`;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${
        slidesContainer.clientWidth * noOfClicks +
        noOfClicks * Number(slidesContainer.style.gap.slice(0, -2))
      }px)`;
    });
    noOfClicks--;
  }
  console.log(noOfClicks);
});

prevBtn.addEventListener("click", function () {
  if (noOfClicks === 0) {
    console.log("Cannot move further");
  } else if (noOfClicks === -1) {
    console.log("Cannot move further");
  } else {
    runnerBar.style.transform = `translateX(${
      (noOfClicks + 2) * trial * runnerBar.clientWidth
    }px)`;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${
        (slidesContainer.clientWidth +
          Number(slidesContainer.style.gap.slice(0, -2))) *
        (noOfClicks + 2)
      }px)`;
    });
    noOfClicks++;
  }

  console.log(noOfClicks);
});

function calculateOnResize() {
  percentageMove = 4;
  maxMove = Math.ceil(slides.length / percentageMove);
  eachSlideWidth = firstSlide.clientWidth;
  totalWidth =
    percentageMove * eachSlideWidth +
    Number(slidesContainer.style.gap.slice(0, -2)) * (percentageMove - 1);
  slidesContainer.style.width = `${totalWidth}px`;
  newRunnerWidth = barContainer.clientWidth / (maxMove * 2);
  runnerBar.style.width = `${newRunnerWidth}px`;
  console.log("Resized");
}

window.addEventListener("resize", calculateOnResize);
