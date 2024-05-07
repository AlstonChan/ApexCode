var price = document.getElementById("price");
localStorage.getItem("price"); //follow martin part
document.write("RM" + price);

//document.getElementById("pay").addEventListener("click", displayFunction);

var audio = document.getElementById("audio");
var popup = document.getElementById("popup");

//function displayFunction() {
//  audio.play();
//  popup.style.display = "flex";
//}

//document.getElementById("pay").addEventListener("click", () => {
//  audio.play();
//  popup.style.display = "flex";
//});

if (document.getElementById("pay").click) {
  audio.play();
  popup.setAttribute("style", "display: flex");
}
