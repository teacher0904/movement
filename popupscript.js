
const closeBtn = document.getElementById("close-btn");
const dontShowBtn = document.getElementById("dont-show-btn");

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

function hidePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
}

function showPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
  }
}

dontShowBtn.addEventListener("click", () => {
  setCookie("hidePopup", true, 1);
  hidePopup();
});

closeBtn.addEventListener("click", () => {
  hidePopup();
});

const isHidePopup = getCookie('hidePopup') === 'true';

if (!isHidePopup) {
  showPopup();
}