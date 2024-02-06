// const labA = {
//   title: "Laberinto sin fauno",
//   level: "Easy",
//   body: {
//     0: [73, [], "", []],
//     1: ["", [], [], []],
//     2: [[], [], "", []],
//     3: [{}, "", "", ""],
//   },
// };
//!  <script type="module" <--
import {
  labA,
  labB,
  labWayZ,
  labWayZZ,
  labWayZZLarge,
  labWayYYLarge,
  labWayZZZLarge,
  MIKE,
  MIKE_FACE
} from "./modelos.js"; //! .js

var titleh= document.getElementById("titleh")

const sonidoPasos = new Audio("./sounds/pasos.mp3");
const sonidoLlegada = new Audio("./sounds/llegada.mp3");
var time = 20;
var contador = time; // Establecer el tiempo inicial en segundos
var reloj;

var fechaInicial;
var modeloLab;

const listLab = [
  labA,
  labB,
  labWayZ,
  labWayZZ,
  labWayZZLarge,
  labWayYYLarge,
  labWayZZZLarge,
  MIKE,
  MIKE_FACE
];

function obtenerModeloLab() {
  titleh.innerHTML= "LABERINTO: "
  const indiceAleatorio = Math.floor(Math.random() * listLab.length);
  const modeloLab = listLab[indiceAleatorio];
  
  titleh.innerHTML = titleh.innerHTML + modeloLab.title
  return modeloLab.lab;
}

const inicio = { x: 0, y: 0 };
var puntoHuman = { ...inicio };
const llegada = { x: 8, y: 2 };

var terreno = document.getElementById("terreno");
var crear_laberinto = document.getElementById("crear_laberinto");

function armarLaberinto() {
  terreno.innerHTML = "";
  fechaInicial = new Date();
  // console.log("laberinto en construcción");
  modeloLab = obtenerModeloLab();
  puntoHuman = { ...inicio };
  for (const key in modeloLab) {
    let divFile = document.createElement("div");
    divFile.className = "fila";
    modeloLab[key].forEach((element, index) => {
      let divColumn = document.createElement("div");
      divColumn.id = key + "." + index;
      setElementClass(divColumn, element);
      divFile.appendChild(divColumn);
    });
    terreno.appendChild(divFile);
  }
}

function setElementClass(element, elementType) {
  if (Array.isArray(elementType)) {
    element.className = "camino";
  } else if (elementType === 73) {
    element.className = "humano";
  } else if (elementType === "") {
    element.className = "pared";
  } else {
    element.className = "llegada";
  }
}

function moveHuman(event) {
  const currentPosition = document.getElementById(
    `${puntoHuman.x}.${puntoHuman.y}`
  );
  if (currentPosition) {
    currentPosition.className = "camino";

    let newPosX = puntoHuman.x;
    let newPosY = puntoHuman.y;

    switch (event.key) {
      case "ArrowUp":
        newPosX--;
        break;
      case "ArrowDown":
        newPosX++;
        break;
      case "ArrowLeft":
        newPosY--;
        break;
      case "ArrowRight":
        newPosY++;
        break;
    }

    if (modeloLab[newPosX] && modeloLab[newPosX][newPosY] !== undefined) {
      const newPosition = document.getElementById(`${newPosX}.${newPosY}`);
      if (newPosition) {
        let fechaActual = new Date();
        const diferenciaEnMilisegundos = fechaActual - fechaInicial;
        const segTranscurridos = diferenciaEnMilisegundos / 1000;
        console.log("--> ", segTranscurridos);
        if (segTranscurridos >= time) {
          alert("Ha pasado tu tiempo, lo siento");
          contador = time;
          clearInterval(reloj);
          puntoHuman = inicio;
          armarLaberinto();
          iniciarReloj();
          return;
        }
        if (newPosition.className === "camino") {
          sonidoPasos.play();
          newPosition.className = "humano";
          puntoHuman.x = newPosX;
          puntoHuman.y = newPosY;
        } else if (newPosition.className === "llegada") {
          sonidoLlegada.play();
          puntoHuman = inicio;
          armarLaberinto();
          clearInterval(reloj);
          alert("¡Lo has logrado!");
          iniciarReloj();
        } else if (newPosition.className === "pared") {
          currentPosition.className = "humano";
        }
      }
    } else {
      currentPosition.className = "humano";
    }
  }
}

// crear_laberinto.addEventListener("click", armarLaberinto);
document.addEventListener("keydown", moveHuman);

var contadorElemento = document.getElementById("contadorA");
var contadorElementoB = document.getElementById("contadorB");

function actualizarContador() {
  contadorElemento.textContent = contador;
  contadorElementoB.textContent = contador;
  if (contador === 0) {
    clearInterval(reloj); // Detener el reloj cuando el contador llega a cero
    alert("Tiempo agotado. Inténtalo de nuevo.");
    puntoHuman = inicio;
    armarLaberinto();
  } else {
    contador--;
  }
}

function iniciarReloj() {
  clearInterval(reloj); // Limpiar el intervalo anterior
  contador = time; // Restablecer el contador a x segundos
  reloj = setInterval(actualizarContador, 1000); // Establecer un nuevo intervalo
}

crear_laberinto.addEventListener("click", function () {
  armarLaberinto();
  iniciarReloj(); // Iniciar el reloj al armar el laberinto
});
