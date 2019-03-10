window.addEventListener("DOMContentLoaded", requestSawCount);

function requestSawCount() {
  const count = document.querySelector(".info__saw-count");
  let increment = 1;
  const intervalId = setInterval(function() {
    count.textContent = Number(count.textContent) + increment;
  }, 3000);
}
