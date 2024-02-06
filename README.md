# LABERINTO INFINITO

Son una serie de Laberintos que puedes iniciar a recorrer con el comando:
```bash
npm start
```
Enjoy!!!

```
```

## Si quieres crear tu propio Laberinto te invito a ir al repo
https://github.com/HX-MLuquez/Laberinto-JS

- Clonar o descargar
- Ir a el archivo modelos.js
  - Allí puedes apreciar como se arman los laberintos
  - Crea uno propio
  - Conecta el Laberinto tuyo en el archivo index.js para que entre en el selector random
  - Y listo, a probar tu propio Laberinto

```
```
## Si quieres realizar un SUPER EJERCICIO EN JS te invito a:
### Consigna del Ejercicio: "El Laberinto Infinito"

1. En este ejercicio, se te presenta un laberinto en forma de matriz unidimensional, donde cada elemento representa una celda del laberinto. El objetivo aparente es encontrar una ruta desde la celda inicial hasta la celda final siguiendo las reglas del laberinto. Sin embargo, hay un giro sorprendente: ¡el laberinto no tiene solución!

2. Tu tarea es escribir una función recursiva en JavaScript llamada resolverLaberintoInfinito que tome como entrada el laberinto (un array) y la posición actual del jugador. La función debe intentar encontrar una solución moviéndose de una celda a otra de acuerdo con las siguientes reglas:

Recuerda:
```
El jugador comienza en la celda inicial, que se encuentra en la posición 0.
Puedes moverte a la celda adyacente a la derecha si su valor es 1.
Puedes moverte a la celda adyacente a la izquierda si su valor es 1.
Si te encuentras en la posición final (la última celda del array), has "resuelto" el laberinto.

Sin embargo, aquí está el truco: el laberinto está diseñado de tal manera que, sin importar cuántos movimientos hagas, nunca llegarás a la celda final. Tu función debe ser recursiva y, en cada paso, intentar moverse a la derecha y a la izquierda. La recursión debe continuar hasta que se dé cuenta de que no es posible llegar a la celda final, momento en el que debe detenerse y regresar false.
```
Ejemplo:

```js
//* Lab simple
const initLabA = { x: 0, y: 0 };
const finishLabA = { x: 3, y: 0 };

export const labA = {
  0: [73, [], "", []],
  1: ["", [], [], []],
  2: [[], [], "", []],
  3: [{}, "", "", ""],
};

export const labWayA = {
  0: [73, [], "", ""],
  1: ["", [], "", ""],
  2: [[], [], "", ""],
  3: [{}, "", "", ""],
};
```