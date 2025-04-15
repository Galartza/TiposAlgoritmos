adivinarNumero = (numeroSecreto) => {
    let intento;
    let intentosRealizados = 0;

    do {
        intento = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
        intentosRealizados++;
        console.log(`Intento ${intentosRealizados}:  probando con el número ${intento}`);
    } while (intento !== numeroSecreto); // Repetir hasta adivinar el número

    console.log(`¡Adivinado! El número secreto era ${numeroSecreto} y se adivinó en ${intentosRealizados} intentos.`);  
}

// Número secreto a adivinar
const numeroSecreto = 6;

// Llamamos a la función para adivinar el número
adivinarNumero(numeroSecreto); // ¡Adivinado! El número secreto era 6 y se adivinó en 3 intentos.