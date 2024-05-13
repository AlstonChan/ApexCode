var price = document.getElementById("price");
localStorage.getItem("price"); //follow martin part
document.write("RM" + price);

var audio = document.getElementById("audio");
var popup = document.getElementById("popup");
var div = document.getElementsByClassName("div")
document.getElementById("pay").addEventListener("click", () => {
    audio.play(); //need to wait a while
    popup.style.display = "flex";
    div.style.opacity = 0;
});


//const dimmedBg = document.createElement("div");
//dimmedBg.classList.add("hidden");
//dimmedBg.id = "dimmed-bg";
//document.querySelector("body").appendChild(dimmedBg);
//const dimmedBg = document.getElementById("dimmed-bg");

//if(popup.style.display = "flex"){
//    popup.style.opacity = "1";
//    div.style.opacity = "0.2";
//}
