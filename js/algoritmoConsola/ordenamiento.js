ordenarPrecios = (lista) => {
    let n = lista.length;
    let cambio;

    // Ordenamiento
    do {
        cambio = false;
        for (let i = 0; i < n -1; i++) {
            if (lista[i] > lista[i + 1]) {
                // Intercambiar los elementos
                
                // Guardamos el elemento en una variable temporal
                let temp = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = temp;
                cambio = true;
            }
        }
        n--; // Reducimos el tamaño de la lista a ordenar
    } while (cambio); // Repetimos mientras haya cambios

    console.log("Lista ordenada: ", lista);

}


// Lista de precios
const listaDePrecios = [100, 50, 200, 150, 300, 250];

// Llamamos a la funcion para ordenar la lista de precios
ordenarPrecios(listaDePrecios); // Lista ordenada:  [50, 100, 150, 200, 250, 300]