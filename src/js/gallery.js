//======Slide's with buttons

const btnsPrev = [...document.querySelectorAll(".btn--prev")];
const btnsNext = [...document.querySelectorAll(".btn--next")];

btnsPrev.map(btn => btn.addEventListener("click", handlerChangeOnPrevImg));
btnsNext.map(btn => btn.addEventListener("click", handlerChangeOnNextImg));

function checkAndToggle(event, state) {
  const allNodes = [...event.target.parentNode.children];
  const slides = allNodes.filter(node => node.className === "slides")[0];
  const shownSlide = [...slides.children].find(slide =>
    slide.className.includes("slide--showing")
  );
  if (state === "prev") {
    if (shownSlide.previousElementSibling) {
      shownSlide.classList.add("slide--hidden");
      shownSlide.classList.remove("slide--showing");
      shownSlide.previousElementSibling.classList.remove("slide--hidden");
      shownSlide.previousElementSibling.classList.add("slide--showing");
    }
  } else if (state === "next") {
    if (shownSlide.nextElementSibling) {
      shownSlide.classList.add("slide--hidden");
      shownSlide.classList.remove("slide--showing");
      shownSlide.nextElementSibling.classList.remove("slide--hidden");
      shownSlide.nextElementSibling.classList.add("slide--showing");
    }
  }
}

function handlerChangeOnPrevImg(e) {
  checkAndToggle(e, "prev");
}

function handlerChangeOnNextImg(e) {
  checkAndToggle(e, "next");
}

//=====Slide's with swipe
const slides = [...document.querySelectorAll(".slides")];
let touchStartX;
slides.map(slide => {
  slide.addEventListener("touchstart", getStartCoord);
  slide.addEventListener("touchend", handlerChangeImgMob);
});

function getStartCoord(e) {
  touchStartX = e.changedTouches[0].clientX;
}
function handlerChangeImgMob(e) {
  let touchEndX = e.changedTouches[0].clientX;
  const target = e.currentTarget;
  if (touchEndX > touchStartX) checkAndToggleMob(target, "prev");
  else if (touchEndX < touchStartX) checkAndToggleMob(target, "next");
  else return;
}
function checkAndToggleMob(elem, state) {
  const shownSlide = [...elem.children].find(slide =>
    slide.className.includes("slide--showing")
  );
  if (state === "prev") {
    if (shownSlide.previousElementSibling) {
      shownSlide.classList.add("slide--hidden");
      shownSlide.classList.remove("slide--showing");
      shownSlide.previousElementSibling.classList.remove("slide--hidden");
      shownSlide.previousElementSibling.classList.add("slide--showing");
    }
  } else if (state === "next") {
    if (shownSlide.nextElementSibling) {
      shownSlide.classList.add("slide--hidden");
      shownSlide.classList.remove("slide--showing");
      shownSlide.nextElementSibling.classList.remove("slide--hidden");
      shownSlide.nextElementSibling.classList.add("slide--showing");
    }
  }
}
