const html = document.querySelector("html");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonLargo = document.querySelector(".app__card-button--largo");
const botones = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const screenTimer = document.querySelector("#timer");
const textStartPause = document.querySelector("#start-pause span");
const iconStartPause = document.querySelector(".app__card-primary-butto-icon");
const botonStartPause = document.querySelector("#start-pause");
const inputMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
const pauseSong = new Audio("./sonidos/pause.mp3");
const playSong = new Audio("./sonidos/play.wav");
const beepSong = new Audio("./sonidos/beep.mp3");

musica.loop = true;
let seconds = 1500;
let interval = null;

botonStartPause.addEventListener("click", () => {
    startPause();
});

botonCorto.addEventListener("click", () => {
    seconds = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add("active");
});

botonEnfoque.addEventListener("click", () => {
    seconds = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add("active");
});

botonLargo.addEventListener("click", () => {
    seconds = 900;
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

    showTimer();
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

function showTimer() {
    const time = new Date(seconds * 1000);
    const formatedTime = time.toLocaleTimeString("es-MX", {minute:'2-digit', second:'2-digit'});
    screenTimer.innerHTML = `${formatedTime}`;
}

const timer = () => {
    if (seconds <= 0) {
        beepSong.play();
        alert("Tu tiempo se acabo!!");
        reset();
        return;
    }
    textStartPause.textContent = "Pausar";
    iconStartPause.setAttribute("src", "./imagenes/pause.png");
    seconds -=1;
    showTimer();
};

function startPause (){
    if (interval){
        pauseSong.play();
        reset();
        return;
    }
    playSong.play();
    interval = setInterval(timer, 1000);
};

function reset(){
    clearInterval(interval);
    interval = null;
    textStartPause.textContent = "Comenzar";
    iconStartPause.setAttribute("src", "./imagenes/play_arrow.png");
}

showTimer();