import * as template from "../js/template/sosial-links.hbs";
import sosialLinksList from "../js/template/links-data.json";

function createLinks(data) {
  const container = document.querySelector("#sosial-links");
  const markup = template(data);
  container.innerHTML = markup;
}

createLinks(sosialLinksList);

//==================================================

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

//===================================
window.addEventListener("DOMContentLoaded", requestVideo);

function requestVideo() {
  const key = "AIzaSyBGx_OvfBj4-hj2Dle4rJzCtGA837RrE48";
  const playlistId = "PL1HIp83QRJHRWUhAIEfdL4-_0VvrjK4US";
  let is_ie;

  function checkIE() {
    const ua = window.navigator.userAgent.toLowerCase();
    return (is_ie = /trident/gi.test(ua) || /msie/gi.test(ua));
  }

  if (checkIE()) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${key}&part=snippet`,
      false
    );
    xhr.send();
    if (xhr.status != 200) {
      console.log(xhr.status + ": " + xhr.statusText);
    } else {
      const resp = JSON.parse(xhr.responseText);
      const id = resp.items[0].snippet.resourceId.videoId;
      console.log(id);
      addVideo(id);
    }
  } else {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${key}&part=snippet`
    )
      .then(response => response.json())
      .then(data => {
        const id = data.items[0].snippet.resourceId.videoId;
        addVideo(id);
      })
      .catch(error => console.log("ERROR" + error));
  }

  function addVideo(id) {
    const wrap = document.querySelector("#video-wrapper");
    wrap.innerHTML = `
    <iframe class="video" width="715" height="450" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `;
  }
}

//===============================
window.addEventListener("DOMContentLoaded", requestSawCount);

function requestSawCount() {
  const count = document.querySelector(".info__saw-count");
  let increment = 1;
  const intervalId = setInterval(function() {
    count.textContent = Number(count.textContent) + increment;
  }, 3000);
}

//============================================
const slides = [...document.querySelectorAll(".slides")];
let touchStartX;
slides.map(slide => {
  slide.addEventListener("touchstart", foo);
  slide.addEventListener("touchstend", foo2);
  // slide.addEventListener("mousedown", foo);
  // slide.addEventListener("mouseup", foo2);
});

function foo(e) {
  touchStartX = e.changedTouches[0].clientX;
  console.log(e.changedTouches[0].clientX);
  console.log(e.currentTarget);
}
function foo2(e) {
  console.log(e.currentTarget);

  let touchEndX = e.changedTouches[0].clientX;
  const target = e.currentTarget;
  if (touchEndX > touchStartX) checkAndToggle2(target, "next");
  else if (touchEndX < touchStartX) checkAndToggle2(target, "prev");
  else return;
}
function checkAndToggle2(elem, state) {
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
