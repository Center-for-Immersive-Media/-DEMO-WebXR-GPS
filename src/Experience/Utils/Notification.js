import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default class Notification {
  constructor() {}

  set(message, duration) {
    Toastify({
      text: message,
      duration,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#d22630",
        zIndex: "99999",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}
