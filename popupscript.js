const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");
const dontShowBtn = document.getElementById("dont-show-btn");
const today = new Date().toISOString().slice(0, 10);

if (localStorage.getItem("hidePopup") !== today) {
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}

closeBtn.addEventListener("click", () => {
  hidePopup();
});

dontShowBtn.addEventListener("click", () => {
  localStorage.setItem("hidePopup", today);
  hidePopup();
});
