document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-btn");
  const dontShowBtn = document.getElementById("dont-show-btn");
  const storageKey = "hidePopup";
  const hidePopupExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  function setLocalStorageWithExpiration(name, value, time) {
    const storageObject = {
      value: value,
      expires: new Date().getTime() + time,
    };
    localStorage.setItem(name, JSON.stringify(storageObject));
  }

  function getLocalStorageWithExpiration(name) {
    const storedObject = JSON.parse(localStorage.getItem(name));
    if (!storedObject) return null;

    const now = new Date().getTime();
    if (storedObject.expires > now) {
      return storedObject.value;
    } else {
      localStorage.removeItem(name);
      return null;
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

  if (dontShowBtn) {
    dontShowBtn.addEventListener("click", () => {
      setLocalStorageWithExpiration(storageKey, true, hidePopupExpiration);
      hidePopup();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hidePopup();
    });
  }

  const isHidePopup = getLocalStorageWithExpiration(storageKey);

  if (!isHidePopup) {
    showPopup();
  }
});
