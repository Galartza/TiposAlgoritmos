encontrarRutaMasCorta = (rutas) => {
    let rutaMasCorta = rutas[0]; // Inicializamos la ruta mas corta con la primera ruta

    for(let i = 1; i < rutas.length; i++) {
        if (rutas[i].distancia < rutaMasCorta.distancia) {
            rutaMasCorta = rutas[i]; // Actualizamos la ruta mas corta
        }
    }
    console.log(`Ruta mas corta es: ${rutaMasCorta.nombre} con distancia de ${rutaMasCorta.distancia} km`);
}

// Lista de rutas
const rutasDisponibles = [
    {nombre: 'Ruta A', distancia: 50},
    {nombre: 'Ruta B', distancia: 30},
    {nombre: 'Ruta C', distancia: 70},
    {nombre: 'Ruta D', distancia: 20},
]

// Llamamos a la funcion para encontrar la ruta mas corta
encontrarRutaMasCorta(rutasDisponibles); // Ruta mas corta es: Ruta D con distancia de 20 km