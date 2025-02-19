import {
  labA,
  labB,
  labWayZ,
  labWayZZ,
  labWayZZLarge,
  labWayYYLarge,
  labWayZZZLarge,
  MIKE,
  MIKE_FACE,
  large,
  PACMANsolution,
} from "./modelos.js"; 

var titleh = document.getElementById("titleh");

const sonidoPasos = new Audio("./sounds/pasos.mp3");
const sonidoLlegada = new Audio("./sounds/llegada.mp3");
var time = 60;

var contador = time; // Establecer el tiempo inicial en segundos
var reloj;

var fechaInicial;
var modeloLab;
var title = "Laberinto sin fauno";

const listLab = [
  labA,
  labB,
  PACMANsolution,
  labWayZ,
  PACMANsolution,
  labWayZZ,
  PACMANsolution,
  labWayZZLarge,
  PACMANsolution,
  labWayYYLarge,
  labWayZZZLarge,
  PACMANsolution,
  MIKE,
  MIKE_FACE,
  large,
];

var inicio = { x: 23, y: 10 };

function obtenerModeloLab() {
  titleh.innerHTML = "MAZE: ";
  const indiceAleatorio = Math.floor(Math.random() * listLab.length);
  modeloLab = listLab[indiceAleatorio];
  titleh.innerHTML = titleh.innerHTML + modeloLab.title;
  if (modeloLab.title === "PACMAN") {
    inicio = { x: 23, y: 14 };
  } else {
    inicio = { x: 0, y: 0 };
  }
  title = modeloLab.title;
  return modeloLab.lab;
}

// de 14[0] salta a 14[26]   y de  14[27] salta a 14[1]

// var inicio = { x: 23, y: 14 };

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

function moveHuman(event, title) {
  // console.log("moveHuman", title);
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
    // console.log(">>>title>>>>>", title);
    // console.log(">>>>>>>>", puntoHuman.x);
    if (title === "PACMAN" && puntoHuman.x === 14) {
      if (newPosY === 0) {
        newPosY = 26; // Si sale por la izquierda (14[0]), lo mandamos a (14[26])
      } else if (newPosY === 27) {
        newPosY = 1; // Si sale por la derecha (14[27]), lo mandamos a (14[1])
      }
    }

    // if (modeloLab[newPosX] && modeloLab[newPosX][newPosY] !== undefined) {
      if (
        modeloLab.hasOwnProperty(newPosX) &&
        Array.isArray(modeloLab[newPosX]) &&
        newPosY >= 0 &&
        newPosY < modeloLab[newPosX].length
      ) {
      
      const newPosition = document.getElementById(`${newPosX}.${newPosY}`);
      if (newPosition) {
        let fechaActual = new Date();
        const diferenciaEnMilisegundos = fechaActual - fechaInicial;
        const segTranscurridos = diferenciaEnMilisegundos / 1000;
        // console.log("--> ", segTranscurridos);
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
document.addEventListener("keydown", (event) =>
  moveHuman(event, title)
);

var contadorElemento = document.getElementById("contadorA");

function actualizarContador() {
  contadorElemento.textContent = contador;
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

//* Cursor para movimiento para versión responsive - funciones
function handleDirection(direction) {
  // console.log("-->", direction);
  const event = { key: direction };
  moveHuman(event); // Llama a la función que mueve al personaje
}

//* Agregar eventos de clic para cada botón de dirección

// Mejorar la experiencia táctil
// Experiencia de movimiento más fluida, escuchar el evento touchstart en lugar de click,
// para que el personaje se mueva tan pronto como el usuario toque el botón.
/*
document
  .getElementById("up")
  .addEventListener("touchstart", () => handleDirection("ArrowUp"));
document
  .getElementById("down")
  .addEventListener("touchstart", () => handleDirection("ArrowDown"));
document
  .getElementById("left")
  .addEventListener("touchstart", () => handleDirection("ArrowLeft"));
document
  .getElementById("right")
  .addEventListener("touchstart", () => handleDirection("ArrowRight"));
*/

document
  .getElementById("up")
  .addEventListener("click", () => handleDirection("ArrowUp"));
document
  .getElementById("down")
  .addEventListener("click", () => handleDirection("ArrowDown"));
document
  .getElementById("left")
  .addEventListener("click", () => handleDirection("ArrowLeft"));
document
  .getElementById("right")
  .addEventListener("click", () => handleDirection("ArrowRight"));
