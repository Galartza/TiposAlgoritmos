darCambio = (monto) => {
    const denominaciones = [ 20, 10, 5, 1]; // Denominaciones de billetes y monedas
    const resultado = {}; // Objeto para almacenar el resultado

    for (let billete of denominaciones) {
        if (monto >= billete) {
            const cantidad = Math.floor(monto / billete); // Calcular la cantidad de billetes/monedas
            resultado[billete] = cantidad; // Almacenar en el objeto resultado
            monto -= cantidad * billete; // Reducir el monto restante
        }
    }
    console.log("Cambio:", resultado); // Mostrar el resultado

    for(let [billete, cantidad] of Object.entries(resultado)) {
        console.log(`$${billete}: ${cantidad} billetes(s) o moneda(s)`); // Mostrar la cantidad de cada billete/moneda
    }
}

// Probamos con $87
darCambio(87);