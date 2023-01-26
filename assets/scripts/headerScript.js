// function a() {
//   var x = document.getElementById("headerSliderText");
//   if (x.innerHTML === "Hello") {
//     x.innerHTML = "Swapped text!";
//   } else {
//     x.innerHTML = "Hello";
//   }
// }

// header navigation bar scroll event v1
// var lastScrollTop = 0;
// navbar = document.getElementById("header-navbar");
// window.addEventListener("scroll", () => {
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//   console.log(`scrollTop: ${scrollTop}`);
//   console.log(`lastScrollTop: ${lastScrollTop}`);

//   if (scrollTop > lastScrollTop) {
//     navbar.style.top = "-125px";
//     // navbar.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 3s";
//   } else {
//     navbar.style.top = "0px";
//     navbar.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 3s";
//   }
//   lastScrollTop = scrollTop;
// });

// header navigation bar scroll event v2
var lastScrollTop = 0;
navbar = document.getElementById("header-navbar");
window.addEventListener("scroll", () => {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // console.log(`scrollTop: ${scrollTop}`);
  // console.log(`lastScrollTop: ${lastScrollTop}`);

  if (scrollTop > lastScrollTop) {
    navbar.style.transform = "translateY(-130px) translateZ(0px)";
    navbar.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 0s";
  } else {
    navbar.style.transform = "translateY(0px) translateZ(0px)";
    navbar.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 0s";
  }
  lastScrollTop = scrollTop;
});
