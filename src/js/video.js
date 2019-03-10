window.addEventListener("DOMContentLoaded", requestVideo);

function requestVideo() {
  const key = "AIzaSyBGx_OvfBj4-hj2Dle4rJzCtGA837RrE48";
  const playlistId = "PL1HIp83QRJHRWUhAIEfdL4-_0VvrjK4US";
  let is_ie;

  function checkIE() {
    const ua = window.navigator.userAgent.toLowerCase();
    return (is_ie = /trident/gi.test(ua) || /msie/gi.test(ua));
  }

  // if IE browser

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
  }
  // if NOT IE browser
  else {
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
