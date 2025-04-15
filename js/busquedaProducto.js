// Lista de compras inicial
const listaDeCompras = ['leche', 'pan', 'huevos', 'carne', 'frutas'];
        
// Función para renderizar la lista de productos
function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    listaDeCompras.forEach((producto, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.id = `product-${index}`;
        productItem.textContent = producto;
        productList.appendChild(productItem);
    });
}

// Función de búsqueda secuencial
async function buscarProducto() {
    const productoBuscar = document.getElementById('searchInput').value.trim().toLowerCase();
    const output = document.getElementById('output');
    
    if (!productoBuscar) {
        output.textContent = 'Por favor ingresa un producto para buscar';
        output.className = 'output';
        return;
    }
    
    // Resetear estilos
    renderProductList();
    output.className = 'output';
    output.textContent = `Buscando: ${productoBuscar}...`;
    
    let encontrado = false;
    
    // Simular búsqueda paso a paso con delay
    for (let i = 0; i < listaDeCompras.length; i++) {
        // Resaltar el producto actual que se está comparando
        const currentProduct = document.getElementById(`product-${i}`);
        currentProduct.classList.add('active');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (listaDeCompras[i].toLowerCase() === productoBuscar) {
            encontrado = true;
            currentProduct.classList.remove('active');
            currentProduct.classList.add('found');
            
            output.className = 'output found';
            output.textContent = `¡Producto encontrado: ${productoBuscar} en la posición ${i}!`;
            break;
        }
        
        currentProduct.classList.remove('active');
    }
    
    if (!encontrado) {
        output.className = 'output not-found';
        output.textContent = `Producto no encontrado: ${productoBuscar}`;
    }
}

// Inicializar la lista al cargar la página
window.onload = renderProductList;

// Permitir buscar con Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarProducto();
    }
});