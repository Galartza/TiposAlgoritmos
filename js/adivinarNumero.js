       // Configuración inicial
       let numeroSecreto = 6;
       let intentosRealizados = 0;
       let intentos = [];
       let isRunning = false;
       
       // Generar los números del 1 al 10
       function generateNumberGrid() {
           const numberGrid = document.getElementById('numberGrid');
           numberGrid.innerHTML = '';
           
           for (let i = 1; i <= 10; i++) {
               const numberElement = document.createElement('div');
               numberElement.className = 'number';
               numberElement.textContent = i;
               numberElement.id = `number-${i}`;
               numberGrid.appendChild(numberElement);
           }
       }
       
       // Función para adivinar el número con visualización
       async function visualGuessNumber() {
           if (isRunning) return;
           
           isRunning = true;
           document.getElementById('startBtn').disabled = true;
           intentosRealizados = 0;
           intentos = [];
           
           const statusMessage = document.getElementById('statusMessage');
           const attemptLog = document.getElementById('attemptLog');
           attemptLog.innerHTML = '';
           
           // Ocultar el número secreto al inicio
           document.getElementById('secretNumberDisplay').textContent = '?';
           
           // Resetear colores de los números
           generateNumberGrid();
           
           let intento;
           do {
               intento = Math.floor(Math.random() * 10) + 1;
               intentosRealizados++;
               intentos.push(intento);
               
               // Mostrar intento en el log
               const attemptEntry = document.createElement('div');
               attemptEntry.textContent = `Intento ${intentosRealizados}: probando con el número ${intento}`;
               attemptLog.appendChild(attemptEntry);
               attemptLog.scrollTop = attemptLog.scrollHeight;
               
               // Resaltar el número intentado
               const numberElement = document.getElementById(`number-${intento}`);
               numberElement.classList.add('tried');
               
               statusMessage.innerHTML = `Intento <span class="attempt-count">${intentosRealizados}</span>: Probando con el número <strong>${intento}</strong>`;
               
               // Esperar un momento para que se vea la animación
               await new Promise(resolve => setTimeout(resolve, 800));
               
               // Si no es el correcto, quitar el resaltado después de un tiempo
               if (intento !== numeroSecreto) {
                   await new Promise(resolve => setTimeout(resolve, 300));
                   numberElement.classList.remove('tried');
               }
               
           } while (intento !== numeroSecreto);
           
           // Mostrar el número correcto
           document.getElementById('secretNumberDisplay').textContent = numeroSecreto;
           const correctNumber = document.getElementById(`number-${numeroSecreto}`);
           correctNumber.classList.add('correct');
           
           statusMessage.innerHTML = `¡Adivinado! El número secreto era <strong>${numeroSecreto}</strong> y se adivinó en <span class="attempt-count">${intentosRealizados}</span> intentos.`;
           
           isRunning = false;
           document.getElementById('startBtn').disabled = false;
       }
       
       // Función para reiniciar
       function reset() {
           isRunning = false;
           document.getElementById('secretNumberDisplay').textContent = '?';
           document.getElementById('statusMessage').textContent = 'Presiona "Iniciar Adivinación" para comenzar';
           document.getElementById('attemptLog').innerHTML = '';
           document.getElementById('startBtn').disabled = false;
           generateNumberGrid();
       }
       
       // Event listeners
       document.getElementById('startBtn').addEventListener('click', visualGuessNumber);
       document.getElementById('resetBtn').addEventListener('click', reset);
       
       // Cambiar el número secreto (opcional)
       function setSecretNumber() {
           const newNumber = prompt("Ingresa un nuevo número secreto (1-10):", numeroSecreto);
           if (newNumber && !isNaN(newNumber) && newNumber >= 1 && newNumber <= 10) {
               numeroSecreto = parseInt(newNumber);
               reset();
           }
       }
       
       // Inicializar
       generateNumberGrid();
       // Descomenta la siguiente línea si quieres permitir cambiar el número secreto
       // document.getElementById('secretNumberDisplay').addEventListener('click', setSecretNumber);