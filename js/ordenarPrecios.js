       // Lista de precios inicial
       let listaDePrecios = [100, 50, 200, 150, 300, 250];
       let isSorting = false;
       let sortingInterval;
       let delayTime = 500;
       
       // Función para renderizar la lista de precios
       function renderPriceList(highlightIndexes = [], sortedIndex = -1) {
           const priceList = document.getElementById('priceList');
           priceList.innerHTML = '';
           
           const maxPrice = Math.max(...listaDePrecios);
           const scaleFactor = 250 / maxPrice;
           
           listaDePrecios.forEach((precio, index) => {
               const barHeight = precio * scaleFactor;
               const priceBar = document.createElement('div');
               priceBar.className = 'price-bar';
               priceBar.style.height = `${barHeight}px`;
               priceBar.textContent = precio;
               
               if (index >= sortedIndex && sortedIndex !== -1) {
                   priceBar.classList.add('sorted');
               } else if (highlightIndexes.includes(index)) {
                   if (highlightIndexes.length === 2) {
                       priceBar.classList.add(highlightIndexes[0] === index ? 'comparing' : 'swapping');
                   } else {
                       priceBar.classList.add('comparing');
                   }
               }
               
               priceList.appendChild(priceBar);
           });
       }
       
       // Función de ordenamiento con visualización
       async function visualBubbleSort() {
           isSorting = true;
           document.getElementById('startBtn').disabled = true;
           
           let n = listaDePrecios.length;
           let cambio;
           let sortedIndex = n; // Índice a partir del cual está ordenado
           
           do {
               cambio = false;
               for (let i = 0; i < n - 1; i++) {
                   // Mostrar comparación
                   document.getElementById('stepInfo').textContent = 
                       `Comparando: ${listaDePrecios[i]} y ${listaDePrecios[i+1]}`;
                   renderPriceList([i, i+1], sortedIndex);
                   
                   await new Promise(resolve => setTimeout(resolve, delayTime));
                   
                   if (listaDePrecios[i] > listaDePrecios[i + 1]) {
                       // Mostrar intercambio
                       document.getElementById('stepInfo').textContent = 
                           `Intercambiando: ${listaDePrecios[i]} y ${listaDePrecios[i+1]}`;
                       
                       // Intercambiar los elementos
                       let temp = listaDePrecios[i];
                       listaDePrecios[i] = listaDePrecios[i + 1];
                       listaDePrecios[i + 1] = temp;
                       cambio = true;
                       
                       renderPriceList([i, i+1], sortedIndex);
                       await new Promise(resolve => setTimeout(resolve, delayTime));
                   }
               }
               n--; // Reducimos el tamaño de la lista a ordenar
               sortedIndex = n; // Marcamos el último elemento como ordenado
           } while (cambio);
           
           document.getElementById('stepInfo').textContent = '¡Lista ordenada!';
           renderPriceList([], 0); // Mostrar toda la lista como ordenada
           isSorting = false;
           document.getElementById('startBtn').disabled = false;
       }
       
       // Función para reiniciar
       function reset() {
           if (isSorting) {
               clearTimeout(sortingInterval);
               isSorting = false;
           }
           listaDePrecios = [100, 50, 200, 150, 300, 250];
           renderPriceList();
           document.getElementById('stepInfo').textContent = 'Presiona "Iniciar Ordenamiento" para comenzar';
           document.getElementById('startBtn').disabled = false;
       }
       
       // Event listeners
       document.getElementById('startBtn').addEventListener('click', visualBubbleSort);
       document.getElementById('resetBtn').addEventListener('click', reset);
       document.getElementById('speed').addEventListener('input', function() {
           delayTime = 1100 - this.value; // Invertir el valor para que mayor sea más rápido
       });
       
       // Inicializar
       renderPriceList();
       
       // Explicación del algoritmo
       document.getElementById('algorithmInfo').innerHTML = `
           <h3>¿Cómo funciona el ordenamiento?</h3>
           <ol>
               <li>Compara elementos adyacentes uno por uno.</li>
               <li>Si el primer elemento es mayor que el segundo, los intercambia.</li>
               <li>Repite este proceso hasta que no se necesiten más intercambios.</li>
               <li>En cada pasada completa, el elemento más grande se reubica hasta su posición correcta al final.</li>
           </ol>
           <p><strong>Colores:</strong></p>
           <ul>
               <li><span style="color: #4CAF50">Verde</span>: Elemento normal</li>
               <li><span style="color: #FFC107">Amarillo</span>: Elemento siendo comparado</li>
               <li><span style="color: #F44336">Rojo</span>: Elemento que será intercambiado</li>
               <li><span style="color: #2196F3">Azul</span>: Elemento en su posición final</li>
           </ul>
       `;