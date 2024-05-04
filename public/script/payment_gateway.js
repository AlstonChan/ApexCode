var price = document.getElementById("price");
localStorage.getItem("price"); //follow martin part
document.write("RM" + price);

var spinner = document.getElementById("spinner");

var popup = document.getElementById("popup");

var id = document.getElementById("audio");

function animationFunction(){
    spinner.style.display = "block";
    setTimeout(function(){
        spinner.style.display = "none";
        popup.style.display = "flex";
    },2000)
    
}

