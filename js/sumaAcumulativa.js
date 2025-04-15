// Lista de números inicial
const listaNumeros = [2, 4, 1, 5];
let isRunning = false;
let currentIndex = 0;
let delayTime = 500;
let sumaAcumulada = 0;
const resultadosParciales = [];

// Función para renderizar los números y la suma acumulativa
function renderNumbers(currentIndex = -1) {
    const numbersContainer = document.getElementById('numbersContainer');
    numbersContainer.innerHTML = '';
    
    // Calcular altura máxima para escalar las barras
    const maxValue = Math.max(...listaNumeros, ...resultadosParciales, 10);
    const scaleFactor = (numbersContainer.clientHeight * 0.8) / maxValue;
    
    // Contenedor principal flexible
    const mainContainer = document.createElement('div');
    mainContainer.style.display = 'flex';
    mainContainer.style.gap = '15px';
    mainContainer.style.alignItems = 'flex-end';
    mainContainer.style.height = '100%';
    
    listaNumeros.forEach((numero, index) => {
        // Contenedor para cada par número-suma
        const pairContainer = document.createElement('div');
        pairContainer.style.display = 'flex';
        pairContainer.style.flexDirection = 'column';
        pairContainer.style.alignItems = 'center';
        pairContainer.style.gap = '5px';
        
        // Barra del número original
        const numberBar = document.createElement('div');
        numberBar.className = 'number-bar';
        numberBar.style.height = `${numero * scaleFactor}px`;
        numberBar.style.width = '40px';
        
        const numberSpan = document.createElement('span');
        numberSpan.textContent = numero;
        numberBar.appendChild(numberSpan);
        
        if (index === currentIndex) {
            numberBar.classList.add('current');
        }
        
        pairContainer.appendChild(numberBar);
        
        // Barra de la suma acumulativa (si existe)
        if (resultadosParciales.length > index) {
            const sumaBar = document.createElement('div');
            sumaBar.className = 'suma-bar';
            sumaBar.style.height = `${resultadosParciales[index] * scaleFactor}px`;
            sumaBar.style.width = '40px';
            
            const sumaSpan = document.createElement('span');
            sumaSpan.textContent = resultadosParciales[index];
            sumaBar.appendChild(sumaSpan);
            
            if (index === currentIndex - 1 && currentIndex > 0) {
                sumaBar.classList.add('current-sum');
            }
            
            pairContainer.appendChild(sumaBar);
        }
        
        mainContainer.appendChild(pairContainer);
    });
    
    numbersContainer.appendChild(mainContainer);
}

// ... (resto del código igual que antes)

        // Algoritmo de suma acumulativa con visualización
        async function visualSumaAcumulativa() {
            if (isRunning) return;
            isRunning = true;
            document.getElementById('startBtn').disabled = true;
            currentIndex = 0;
            sumaAcumulada = 0;
            resultadosParciales.length = 0;
            
            const stepInfo = document.getElementById('stepInfo');
            stepInfo.textContent = `Iniciando suma acumulativa...`;
            
            renderNumbers();
            await new Promise(resolve => setTimeout(resolve, delayTime));
            
            for (let i = 0; i < listaNumeros.length; i++) {
                currentIndex = i;
                
                // Paso 1: Mostrar número actual
                stepInfo.textContent = `Procesando número: ${listaNumeros[i]}`;
                renderNumbers(i);
                await new Promise(resolve => setTimeout(resolve, delayTime));
                
                // Paso 2: Realizar suma
                sumaAcumulada += listaNumeros[i];
                resultadosParciales.push(sumaAcumulada);
                
                // Paso 3: Mostrar resultado parcial
                stepInfo.textContent = `Suma hasta ahora: ${sumaAcumulada}`;
                renderNumbers(i);
                await new Promise(resolve => setTimeout(resolve, delayTime));
            }
            
            // Resultado final
            stepInfo.textContent = `Suma acumulativa final: ${sumaAcumulada}`;
            renderNumbers();
            
            isRunning = false;
            document.getElementById('startBtn').disabled = false;
        }

        // Función para reiniciar
        function reset() {
            if (isRunning) return;
            currentIndex = 0;
            sumaAcumulada = 0;
            resultadosParciales.length = 0;
            renderNumbers();
            document.getElementById('stepInfo').textContent = 'Presiona "Iniciar Suma" para comenzar';
        }

        // Event listeners
        document.getElementById('startBtn').addEventListener('click', visualSumaAcumulativa);
        document.getElementById('resetBtn').addEventListener('click', reset);
        document.getElementById('speed').addEventListener('input', function() {
            delayTime = 1100 - this.value;
        });

        // Explicación del algoritmo
        document.getElementById('algorithmInfo').innerHTML = `
            <h3>Suma Acumulativa Determinista</h3>
            <ol>
                <li>Inicia con suma = 0</li>
                <li>Recorre la lista en orden estricto</li>
                <li>Cada paso suma el elemento actual al acumulador</li>
                <li>Registra el resultado parcial</li>
                <li>Resultado final: suma total</li>
            </ol>
            <p><strong>Propiedad determinista:</strong> Flujo lineal donde cada paso depende exclusivamente del anterior.</p>
        `;

        // Inicializar
        renderNumbers();