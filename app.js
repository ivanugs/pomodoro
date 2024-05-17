const html = document.querySelector("html");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonLargo = document.querySelector(".app__card-button--largo");
const botones = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botonStartPause = document.querySelector("#start-pause");
const inputMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");

musica.loop = true;
let seconds = 10;
let interval = null;

botonStartPause.addEventListener("click", () => {
    startPause();
});

botonCorto.addEventListener("click", () => {
    cambiarContexto('descanso-corto');
    botonCorto.classList.add("active");
});

botonEnfoque.addEventListener("click", () => {
    cambiarContexto('enfoque');
    botonEnfoque.classList.add("active");
});

botonLargo.addEventListener("click", () => {
    cambiarContexto('descanso-largo');
    botonLargo.classList.add("active");
});

inputMusica.addEventListener("change", () => {
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

function cambiarContexto(contexto){

    botones.forEach(function(contexto){
        contexto.classList.remove("active");
    });

    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagenes/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie<br>
            <strong class="app__title-strong">Haz una pausa larga</strong>`
            break;
    }
}

const timer = () => {
    if (seconds <= 0) {
        reset();
        alert("Tu tiempo se acabo!!");
        return;
    }
    seconds -=1;
    console.log(seconds);
};

function startPause (){
    if (interval){
        reset();
        return;
    }
    interval = setInterval(timer, 1000);
};

function reset(){
    clearInterval(interval);
    interval = null;
}