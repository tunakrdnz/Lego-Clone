let carousel = document.querySelector(".carousel"),
slides = carousel.querySelectorAll(".product-container"),
transparentClass = document.querySelectorAll(".transparent-container"),
firstImg = carousel.querySelectorAll(".product-container")[0],
arrowIcons = document.querySelectorAll(".wrapper i"),
runnerBar = document.querySelector("#runnerBar"),
runnerBarContainer = document.querySelector("#runnerBarCont");
let width = slides[0].clientWidth;
slides.forEach((slide) => {
    slide.style.minWidth = `${width - 18.75}px`;
})

let thePrev = 0;
let slidePace = 4;
let runnerPace = 0;
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

let IsDragStart = false, IsDragging = false, PrevPageX, PrevScrollLeft, PositionDiff;

let counterR = 0;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        width = slides[0].clientWidth;
        // let firstImgWidth = width + 25;
        let firstSlideWidth = width;
        // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        // carousel.scrollLeft += icon.id == "left" ? -slidePace*firstImgWidth; runnerPace = runnerPace-1 : slidePace*firstImgWidth;
        if (icon.id === "left"){
            if (counterR == -1){return}
            carousel.scrollLeft += -slidePace*firstSlideWidth - 25*(slidePace);
            counterR = counterR - 1;
            console.log("in left", counterR);
            runnerBar.style.transform = `translateX(${(slidePace*firstSlideWidth + 75)*(counterR)*100/(carousel.clientWidth + 18.75)}%)`;
        }else{
            carousel.scrollLeft += slidePace*firstSlideWidth + 25*(slidePace);
            if (counterR === 1){
                runnerBar.style.transform = `translateX(${(slidePace*firstSlideWidth + 75)*(counterR+1)*100/(carousel.clientWidth + 18.75)}%)`;
                counterR = counterR + 1;
            }
            else if (carousel.scrollLeft == 0 || counterR == 0){
                runnerBar.style.transform = `translateX(${(slidePace*firstSlideWidth + 75)*(counterR+1)*100/(carousel.clientWidth + 18.75)}%)`;
                counterR = counterR + 1;
            }else if(counterR == 2){
                runnerBar.style.transform = `translateX(${(slidePace*firstSlideWidth + 75)*(counterR+1)*100/(carousel.clientWidth)}%)`;
                counterR = counterR + 1;
                // runnerBar.style.transform = `translateX(${carousel.scrollLeft*100/(carousel.clientWidth + 18.75)}%)`;
            }
        }
        console.log("starting counterR", counterR);
        
        
        // let toUse = carousel.scrollLeft == 0 ? firstImgWidth : carousel.scrollLeft;
        // console.log("toUse", toUse);
        // runnerBar.style.transform = `translateX(${Number(toUse-toUse*0.2)*(runnerBarContainer.clientWidth)/3040}px)`;
        // runnerBar.style.transform = `translateX(${Number(firstImgWidth)*runnerPace*(runnerBarContainer.clientWidth)/3120}px)`;
        thePrev = carousel.scrollLeft;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 25;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const DragStart = (e) => {
    // updatating global variables value on mouse down event
    IsDragStart = true;
    PrevPageX = e.pageX || e.touches[0].pageX;
    PrevScrollLeft = runnerBarContainer.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    // console.log("e", e);
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    // runnerBar.style.transform = `translateX(${Number(carousel.scrollLeft)*(runnerBarContainer.clientWidth)/3120}px)`;
    runnerBar.style.transform = `translateX(${carousel.scrollLeft*100/(carousel.clientWidth + 18.75)}%)`;
    // console.log("carousel scrollleft", carousel.scrollLeft,"gap", runnerBar.clientWidth, "carosel width", carousel.clientWidth);
    showHideIcons();
}
const Dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!IsDragStart) return;
    e.preventDefault();
    console.log("e", e);
    IsDragging = true;
    runnerBarContainer.classList.add("dragging");
    PositionDiff = (e.pageX || e.touches[0].pageX) - PrevPageX;
    runnerBarContainer.scrollLeft = PrevScrollLeft - PositionDiff;
    runnerBar.scrollLeft(100);

    // console.log("runnerBar scrollleft", runnerBarContainer.scrollLeft, "runnerbar self", runnerBar.scrollWidth);
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    // autoSlide();
    showHideIcons();
}
const DragStop = () => {
    IsDragStart = false;
    runnerBarContainer.classList.remove("dragging");

    if(!IsDragging) return;
    IsDragging = false;
    autoSlide();
    showHideIcons();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// runnerBarContainer.addEventListener("mousedown", DragStart);
// runnerBarContainer.addEventListener("touchstart", DragStart);

// document.addEventListener("mousemove", Dragging);
// runnerBarContainer.addEventListener("touchmove", Dragging);

// document.addEventListener("mouseup", DragStop);
// runnerBarContainer.addEventListener("touchend", DragStop);



width = slides[0].clientWidth;
slides.forEach((slide) => {
    slide.style.minWidth = `${width}px`;
});

width = slides[0].clientWidth;

transparentClass.forEach((element) => {
    element.style.minHeight = `${width}px`;
})

// window.addEventListener("resize", calculatedValues);
// window.addEventListener("resize", newFunc);
