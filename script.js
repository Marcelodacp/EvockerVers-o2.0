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
/* filtro galeria */
$('.filter-btn').on('click', function() {

    let type = $(this).attr('id');
    let boxes = $('.gallery-items');


    $('.main-btn').removeClass('active');
    $(this).addClass('active');

    
    if(type == 'rpg-btn') {
        eachBoxes('rpg', boxes);
      } else if(type == 'ave-btn') {
        eachBoxes('ave', boxes);
      } else if(type == 'his-btn') {
        eachBoxes('his', boxes);
      } else {
        eachBoxes('all', boxes);
      }
  
    });
  
    function eachBoxes(type, boxes) {
  
      if(type == 'all') {
        $(boxes).fadeIn();
      } else {
        $(boxes).each(function() {
          if(!$(this).hasClass(type)) {
            $(this).fadeOut('slow');
          } else {
            $(this).fadeIn();
          }
        });
      }
    }