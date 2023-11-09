// const labA = {
//   0: [73, [], "", []],
//   1: ["", [], [], []],
//   2: [[], [], "", []],
//   3: [{}, "", "", ""],
// };
//!  <script type="module" <--
import { labA, labB, labWayZ } from "./modelos.js"; //! .js

const listLab = [labA, labB, labWayZ];
function obtenerModeloLab() {
  const indiceAleatorio = Math.floor(Math.random() * listLab.length); 
  const modeloLab = listLab[indiceAleatorio]; 
  return modeloLab;
}

var modeloLab 

const inicio = { x: 0, y: 0 };
var puntoHuman = { ...inicio };
const llegada = { x: 8, y: 2 };

var terreno = document.getElementById("terreno");
var crear_laberinto = document.getElementById("crear_laberinto");

function armarLaberinto() {
  terreno.innerHTML = "";
  // console.log("laberinto en construcción");
  modeloLab = obtenerModeloLab()
  puntoHuman = { ...inicio }
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
  setTimeout(() => {
    alert("tu tiempo se ha terminado")
  }, 5000);
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

    const newPosition = document.getElementById(`${newPosX}.${newPosY}`);
    if (newPosition) {
      if (newPosition.className === "camino") {
        newPosition.className = "humano";
        puntoHuman.x = newPosX;
        puntoHuman.y = newPosY;
      } else if (newPosition.className === "llegada") {
        alert("¡Lo has logrado!");
        puntoHuman = inicio;
        armarLaberinto();
      } else if (newPosition.className === "pared") {
        currentPosition.className = "humano";
      }
    }
  }
}

crear_laberinto.addEventListener("click", armarLaberinto);
document.addEventListener("keydown", moveHuman);
