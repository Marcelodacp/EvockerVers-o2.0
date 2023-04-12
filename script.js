var radio = document.querySelector('.manual-btn')
var cont = 1

document.getElementById('radio1').checked = true

setInterval(() => {
    proximaImg()
}, 3000)

function proximaImg(){
    cont++
    
    if(cont > 3){
        cont = 1
    }

    document.getElementById('radio'+cont).checked = true
}
document.querySelector(".hamburger").addEventListener("click", () =>
    document.querySelector(".menu-hamburguer").classList.toggle("show-menu")
);
const usuariobtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
	loginPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
	loginPopup.style.display = "none";
});