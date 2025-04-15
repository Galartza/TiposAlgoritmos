
        // Denominaciones disponibles (ordenadas de mayor a menor)
        const denominaciones = [20, 10, 5, 1];
        let isCalculating = false;
        let currentAmount = 0;
        
        // Función para renderizar las denominaciones
        function renderDenominations(activeDenomination = null, usedDenominations = {}) {
            const container = document.getElementById('denominationsContainer');
            container.innerHTML = '';
            
            denominaciones.forEach(denomination => {
                const denomElement = document.createElement('div');
                denomElement.className = 'denomination';
                denomElement.id = `denomination-${denomination}`;
                
                if (denomination === activeDenomination) {
                    denomElement.classList.add('active');
                }
                
                if (usedDenominations[denomination]) {
                    denomElement.classList.add('used');
                }
                
                denomElement.innerHTML = `
                    <div class="denomination-value">$${denomination}</div>
                    <div class="denomination-count" id="count-${denomination}">
                        ${usedDenominations[denomination] || 0}
                    </div>
                `;
                
                container.appendChild(denomElement);
            });
        }
        
        // Función para calcular el cambio con visualización
        async function visualCalculateChange() {
            if (isCalculating) return;
            
            isCalculating = true;
            document.getElementById('calculateBtn').disabled = true;
            
            const amount = parseInt(document.getElementById('amountInput').value);
            if (isNaN(amount) || amount < 1) {
                alert("Por favor ingrese un monto válido");
                isCalculating = false;
                document.getElementById('calculateBtn').disabled = false;
                return;
            }
            
            currentAmount = amount;
            const resultado = {};
            const stepInfo = document.getElementById('stepInfo');
            const remainingAmount = document.getElementById('remainingAmount');
            const resultsList = document.getElementById('resultsList');
            const progressBar = document.getElementById('progressBar');
            
            // Resetear visualización
            resultsList.innerHTML = '';
            remainingAmount.textContent = amount;
            progressBar.style.width = '0%';
            renderDenominations();
            
            stepInfo.textContent = `Iniciando cálculo para $${amount}...`;
            await new Promise(resolve => setTimeout(resolve, 800));
            
            for (let i = 0; i < denominaciones.length; i++) {
                const billete = denominaciones[i];
                
                // Mostrar denominación actual siendo evaluada
                stepInfo.textContent = `Evaluando billetes/monedas de $${billete}...`;
                renderDenominations(billete, resultado);
                await new Promise(resolve => setTimeout(resolve, 800));
                
                if (currentAmount >= billete) {
                    const cantidad = Math.floor(currentAmount / billete);
                    resultado[billete] = cantidad;
                    currentAmount -= cantidad * billete;
                    
                    // Actualizar visualización
                    document.getElementById(`count-${billete}`).textContent = cantidad;
                    remainingAmount.textContent = currentAmount;
                    progressBar.style.width = `${((amount - currentAmount) / amount) * 100}%`;
                    
                    stepInfo.textContent = `Usando ${cantidad} billete(s)/moneda(s) de $${billete}`;
                    renderDenominations(billete, resultado);
                    await new Promise(resolve => setTimeout(resolve, 1200));
                }
            }
            
            // Mostrar resultado final
            progressBar.style.width = '100%';
            stepInfo.textContent = `¡Cambio calculado! Monto restante: $${currentAmount}`;
            renderDenominations(null, resultado);
            
            // Mostrar resultados detallados
            resultsList.innerHTML = '';
            for (let [billete, cantidad] of Object.entries(resultado)) {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <span>$${billete}:</span>
                    <span>${cantidad} ${cantidad === 1 ? 'billete/moneda' : 'billetes/monedas'}</span>
                `;
                resultsList.appendChild(resultItem);
            }
            
            if (currentAmount > 0) {
                const remainingItem = document.createElement('div');
                remainingItem.className = 'result-item';
                remainingItem.innerHTML = `
                    <span>No hay denominación para:</span>
                    <span>$${currentAmount}</span>
                `;
                resultsList.appendChild(remainingItem);
            }
            
            isCalculating = false;
            document.getElementById('calculateBtn').disabled = false;
        }
        
        // Función para reiniciar
        function reset() {
            isCalculating = false;
            currentAmount = 0;
            document.getElementById('calculateBtn').disabled = false;
            document.getElementById('remainingAmount').textContent = '0';
            document.getElementById('stepInfo').textContent = 'Ingrese un monto y presione "Calcular Cambio" para comenzar.';
            document.getElementById('resultsList').innerHTML = '';
            document.getElementById('progressBar').style.width = '0%';
            renderDenominations();
        }
        
        // Event listeners
        document.getElementById('calculateBtn').addEventListener('click', visualCalculateChange);
        document.getElementById('resetBtn').addEventListener('click', reset);
        
        // Inicializar
        renderDenominations();