Consigna del Ejercicio: "El Laberinto Infinito"

En este ejercicio, se te presenta un laberinto en forma de matriz unidimensional, donde cada elemento representa una celda del laberinto. El objetivo aparente es encontrar una ruta desde la celda inicial hasta la celda final siguiendo las reglas del laberinto. Sin embargo, hay un giro sorprendente: ¡el laberinto no tiene solución!

Tu tarea es escribir una función recursiva en JavaScript llamada resolverLaberintoInfinito que tome como entrada el laberinto (un array) y la posición actual del jugador. La función debe intentar encontrar una solución moviéndose de una celda a otra de acuerdo con las siguientes reglas:

El jugador comienza en la celda inicial, que se encuentra en la posición 0.
Puedes moverte a la celda adyacente a la derecha si su valor es 1.
Puedes moverte a la celda adyacente a la izquierda si su valor es 1.
Si te encuentras en la posición final (la última celda del array), has "resuelto" el laberinto.
Sin embargo, aquí está el truco: el laberinto está diseñado de tal manera que, sin importar cuántos movimientos hagas, nunca llegarás a la celda final. Tu función debe ser recursiva y, en cada paso, intentar moverse a la derecha y a la izquierda. La recursión debe continuar hasta que se dé cuenta de que no es posible llegar a la celda final, momento en el que debe detenerse y regresar false.

Ejemplo:

javascript
Copy code
const laberintoInfinito = [1, 1, 1, 1, 1, 1, 1, 1];
const resultado = resolverLaberintoInfinito(laberintoInfinito, 0);
console.log(resultado); // Debe imprimir "No se puede resolver el laberinto."
Nota: Este ejercicio tiene la intención de desafiar a los estudiantes a comprender y reconocer cuando una función recursiva debe terminar sin llegar a una solución. Puede ser útil para explorar conceptos de recursión y cómo manejar casos en los que no hay una solución real.