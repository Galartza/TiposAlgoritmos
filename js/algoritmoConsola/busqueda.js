// Ejemplo de busqueda secuencial en un array de productos
// Definimos la funcion buscarProducto que recibe una lista y un producto a buscar

buscarProducto = (lista, productoBuscar) => {
    for( let i = 0; i < lista.length; i++) {
        if(lista[i] === productoBuscar) {
            console.log(`Producto encontrado: ${productoBuscar} en la posicion ${i}`);
            return;
        }
    }
    console.log(`Producto no encontrado: ${productoBuscar}`);
}

// Lista de compras 
const listaDeCompras = ['leche', 'pan', 'huevos', 'carne', 'frutas'];
// Producto a buscar

// Producto encontrado
buscarProducto(listaDeCompras, 'huevos'); // Producto encontrado: pan en la posicion 1
// Producto no encontrado
buscarProducto(listaDeCompras, 'arroz'); // Producto no encontrado: arroz