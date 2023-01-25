const Slides = document.querySelectorAll("section.main-gift-container");
let SlidesContainer = document.querySelector(".gift-inspiration");
console.log("initial container width: ", SlidesContainer.clientWidth);
SlidesContainer.style.gap = "15px";
let percentageMove2 = 4;
let FirstSlide = Slides[0];
let NoOfClicks = -1;
let LastSlide = Slides[Slides.length - 1];
let MaxMove = Math.ceil(Slides.length/percentageMove2);
const NextBtn = document.getElementById("right-btn2");
const PrevBtn = document.getElementById("left-btn2");
let EachSlideWidth = FirstSlide.clientWidth;
console.log("each slide width: ", EachSlideWidth);
let TotalWidth = percentageMove2*EachSlideWidth + Number(SlidesContainer.style.gap.slice(0, -2))*(percentageMove2-1);
console.log("total width: ", TotalWidth);
SlidesContainer.style.width = `${TotalWidth}px`;
console.log("final container width: ",SlidesContainer.clientWidth);

let BarContainer = document.querySelector(".moving-bar2");
let RunnerBar = document.querySelector("#runner-bar2");
let NewRunnerWidth = BarContainer.clientWidth / 2;
RunnerBar.style.width = `${NewRunnerWidth}px`

let Trial = -2.338;
// let count = 1;
// let currentPadding = 2;
// SlidesContainer.style.paddingLeft = "2px";



let IsDown = false;
let StartX;
let ScrollLeft = 0;

let k = 0;
let Tracks = 0;
const Start = (e) => {
    IsDown = true;
    SlidesContainer.classList.add('active');
    StartX = e.pageX || e.touches[0].pageX - SlidesContainer.offsetLeft;
    ScrollLeft = SlidesContainer.ScrollLeft;	
    console.log("Started StartX ", StartX,  "ScrollLeft: ", ScrollLeft);
}

const move2 = (e) => {
	if(!IsDown) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - SlidesContainer.offsetLeft;
  const dist = (x - StartX);
  k = IsDown ? dist : k + dist;
  console.log("1st k", k);
  SlidesContainer.ScrollLeft = ScrollLeft - dist;

  console.log("2nd k", k);
  Tracks = k-ScrollLeft;
  RunnerBar.style.transform = `translateX(${-1*(Tracks)*BarContainer.clientWidth/(TotalWidth*(MaxMove))}px)`;
  
  // console.log("focus here", StartX - Trial);
  console.log("Moving. x", x, "distance: ", dist);
  
}

const Move2 = (e) => {
	if(!IsDown) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - SlidesContainer.offsetLeft;
  const dist = (x - StartX);
  k = IsDown ? dist : k + dist;
  console.log("1st k", k);
  BarContainer.ScrollLeft = ScrollLeft - dist;

  console.log("2nd k", k);
  Tracks = k-ScrollLeft;
  RunnerBar.style.transform = `translateX(${(Tracks)*BarContainer.clientWidth/(TotalWidth*(MaxMove))}px)`;
  
  // console.log("focus here", StartX - Trial);
  console.log("Moving. x", x, "distance: ", dist);
  
}


const End = () => {
	IsDown = false;
    SlidesContainer.classList.remove('active');
    ScrollLeft = SlidesContainer.ScrollLeft;
    console.log("Ended: IsDown: ", IsDown, "Scrollleft: ", ScrollLeft);
    console.log("Total width", TotalWidth);
    // RunnerBar.style.transform = `translateX(${(ScrollLeft/1000)*RunnerBar.clientWidth}px)`;
}


(() => {
	SlidesContainer.addEventListener('mousedown', Start);
	// SlidesContainer.addEventListener('touchstart', start);

	SlidesContainer.addEventListener('mousemove', move2);
	// SlidesContainer.addEventListener('touchmove', move);

	SlidesContainer.addEventListener('mouseleave', End);
	SlidesContainer.addEventListener('mouseup', End);
	// SlidesContainer.addEventListener('touchend', end);
})();

(() => {
	 BarContainer.addEventListener('mousedown', Start);
	// SlidesContainer.addEventListener('touchstart', start);

	BarContainer.addEventListener('mousemove', Move2);
	// SlidesContainer.addEventListener('touchmove', move);

	BarContainer.addEventListener('mouseleave', End);
	BarContainer.addEventListener('mouseup', End);
	// SlidesContainer.addEventListener('touchend', end);
})();










NextBtn.addEventListener("click", function (){
    if (NoOfClicks === 0){NoOfClicks = -1};
    if (NoOfClicks === -1){
        RunnerBar.style.transform = `translateX(${NewRunnerWidth}px)`;
        Slides.forEach((slide) => {
            slide.style.transform = `translateX(${-1*(Number(SlidesContainer.style.gap.slice(0, -2)) + EachSlideWidth)}px)`})
           // SlidesContainer.style.padding = `${currentPadding*count}px`;
            NoOfClicks--;
           // count++;
    }
    else if(NoOfClicks === -1*(MaxMove)){
        console.log("Cannot move further");
    }else{
    RunnerBar.style.transform = `translateX(${NoOfClicks*Trial*RunnerBar.clientWidth}px)`;
    Slides.forEach((slide) => {
    slide.style.transform = `translateX(${-1*(Number(SlidesContainer.style.gap.slice(0, -2)) + EachSlideWidth)}px)`})
    NoOfClicks--}
    console.log(NoOfClicks);
});

PrevBtn.addEventListener("click", function (){
    if (NoOfClicks === 0){
        console.log("Cannot move further");}
    else if(NoOfClicks === -1){
        console.log("Cannot move further");
    }
    else {
        RunnerBar.style.transform = `translateX(${(NoOfClicks+2)*Trial*RunnerBar.clientWidth}px)`;
        Slides.forEach((slide) => {
        slide.style.transform = `translateX(${(SlidesContainer.clientWidth + Number(SlidesContainer.style.gap.slice(0, -2)))*(NoOfClicks+2)}px)`});
        NoOfClicks++;
    }
    
    console.log(NoOfClicks);
})

function CalculateOnResize(){
    percentageMove2 = 4;
    MaxMove = Math.ceil(Slides.length/percentageMove2);
    EachSlideWidth = FirstSlide.clientWidth;
    TotalWidth = percentageMove2*EachSlideWidth + Number(SlidesContainer.style.gap.slice(0, -2))*(percentageMove2-1);
    SlidesContainer.style.width = `${TotalWidth}px`;
    NewRunnerWidth = BarContainer.clientWidth / 2;
    RunnerBar.style.width = `${NewRunnerWidth}px`;
    console.log("ResizeD");
}

window.addEventListener("resize", CalculateOnResize);