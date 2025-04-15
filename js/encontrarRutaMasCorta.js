        // Lista de rutas inicial
        const rutasDisponibles = [
            {nombre: 'Ruta A', distancia: 50},
            {nombre: 'Ruta B', distancia: 30},
            {nombre: 'Ruta C', distancia: 70},
            {nombre: 'Ruta D', distancia: 20},
        ];
        
        let isSearching = false;
        let currentShortestIndex = 0;
        let maxDistance = Math.max(...rutasDisponibles.map(r => r.distancia));
        
        // Función para renderizar las rutas
        function renderRoutes(activeIndex = -1, checkIndex = -1) {
            const routesContainer = document.getElementById('routesContainer');
            routesContainer.innerHTML = '';
            
            rutasDisponibles.forEach((ruta, index) => {
                const routeElement = document.createElement('div');
                routeElement.className = 'route';
                
                if (index === activeIndex) {
                    routeElement.classList.add('active');
                }
                
                if (index === currentShortestIndex && checkIndex !== -1) {
                    routeElement.classList.add('current-shortest');
                }
                
                if (index === currentShortestIndex && checkIndex === -1 && !isSearching) {
                    routeElement.classList.add('final-shortest');
                }
                
                const percentage = (ruta.distancia / maxDistance) * 100;
                
                routeElement.innerHTML = `
                    <div class="route-info">
                        <div class="route-name">${ruta.nombre}</div>
                        <div class="route-distance">Distancia: ${ruta.distancia} km</div>
                        <div class="distance-bar">
                            <div class="distance-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
                
                routesContainer.appendChild(routeElement);
            });
        }
        
        // Función para encontrar la ruta más corta con visualización
        async function visualFindShortestRoute() {
            isSearching = true;
            document.getElementById('startBtn').disabled = true;
            currentShortestIndex = 0;
            
            const output = document.getElementById('output');
            output.className = 'output';
            output.textContent = `Iniciando búsqueda... Ruta más corta actual: ${rutasDisponibles[currentShortestIndex].nombre} (${rutasDisponibles[currentShortestIndex].distancia} km)`;
            
            renderRoutes(0, 0);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            for (let i = 1; i < rutasDisponibles.length; i++) {
                // Mostrar ruta actual siendo evaluada
                output.textContent = `Comparando: ${rutasDisponibles[currentShortestIndex].nombre} (${rutasDisponibles[currentShortestIndex].distancia} km) con ${rutasDisponibles[i].nombre} (${rutasDisponibles[i].distancia} km)`;
                renderRoutes(i, i);
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                if (rutasDisponibles[i].distancia < rutasDisponibles[currentShortestIndex].distancia) {
                    // Actualizar la ruta más corta
                    currentShortestIndex = i;
                    output.textContent = `¡Nueva ruta más corta encontrada! ${rutasDisponibles[i].nombre} (${rutasDisponibles[i].distancia} km)`;
                    renderRoutes(i, i);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            }
            
            // Mostrar resultado final
            output.className = 'output found';
            output.textContent = `Ruta más corta encontrada: ${rutasDisponibles[currentShortestIndex].nombre} con distancia de ${rutasDisponibles[currentShortestIndex].distancia} km`;
            renderRoutes(-1, -1);
            
            isSearching = false;
            document.getElementById('startBtn').disabled = false;
        }
        
        // Función para reiniciar
        function reset() {
            isSearching = false;
            currentShortestIndex = 0;
            renderRoutes();
            document.getElementById('output').className = 'output';
            document.getElementById('output').textContent = 'Presiona "Iniciar Búsqueda" para comenzar';
            document.getElementById('startBtn').disabled = false;
        }
        
        // Event listeners
        document.getElementById('startBtn').addEventListener('click', visualFindShortestRoute);
        document.getElementById('resetBtn').addEventListener('click', reset);
        
        // Inicializar
        renderRoutes();