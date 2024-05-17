const price = document.querySelectorAll("span[data-price]");
const audio = document.getElementById("audio");
const popup = document.getElementById("popup");
const form = document.getElementById("paymentForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  audio.play();
  popup.classList.remove("hidden");
});
