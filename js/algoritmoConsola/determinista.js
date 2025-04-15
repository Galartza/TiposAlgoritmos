function sumaAcumulativa(lista) {
    // Paso 1: Inicializar acumulador con el primer elemento
    let suma = lista[0]; 
    const resultado = [suma]; // Guardamos cada paso para demostrar linealidad

    // Paso 2: Recorrer la lista desde el segundo elemento
    for (let i = 1; i < lista.length; i++) {
        // Paso 3: Cada paso suma el elemento actual al acumulador
        suma += lista[i]; 
        resultado.push(suma); // Registramos el estado actual
    }

    // Paso 4: Retornar el resultado final
    return resultado;
}

// Ejemplo de uso
const numeros = [2, 4, 1, 5];
const sumaAcum = sumaAcumulativa(numeros);
console.log("Suma acumulativa paso a paso:", sumaAcum); 
// Output: [2, 6, 7, 12] (2 → 2+4=6 → 6+1=7 → 7+5=12)