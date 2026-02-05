// Estado da Aplicação
let currentDayIndex = 0;
let currentScore = 0;
let currentQuestionIndex = 0;

// Referências aos elementos do HTML
const appContainer = document.getElementById('app-container');

// Função para iniciar a App (chamada pelo botão no index.html)
function startApp() {
    renderDayIntro();
}

// 1. Renderiza a introdução do dia
function renderDayIntro() {
    const dayData = quizData[currentDayIndex];
    appContainer.innerHTML = `
        <section class="fade-in">
            <h2>${dayData.title}</h2>
            <p class="intro-text">${dayData.intro}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${(currentDayIndex / 7) * 100}%"></div>
            </div>
            <button class="primary-btn" onclick="startQuiz()">Start Daily Quiz</button>
        </section>
    `;
}

// 2. Inicia o Quiz do dia atual
function startQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    renderQuestion();
}

// 3. Renderiza uma pergunta individual
function renderQuestion() {
    const dayData = quizData[currentDayIndex];
    const questionData = dayData.questions[currentQuestionIndex];

    appContainer.innerHTML = `
        <section class="fade-in">
            <span class="question-counter">Question ${currentQuestionIndex + 1} of 4</span>
            <h3 class="question-text">${questionData.q}</h3>
            <div class="options-grid">
                ${questionData.options.map((option, index) => `
                    <button class="option-btn" onclick="handleAnswer(${index})">${option}</button>
                `).join('')}
            </div>
        </section>
    `;
}

function handleAnswer(selectedIndex) {
    const dayData = quizData[currentDayIndex];
    const questionData = dayData.questions[currentQuestionIndex];

    // 1. Verificar se a resposta está correta
    if (selectedIndex === questionData.correct) {
        currentScore++;
    }

    // 2. Criar uma chave única para identificar o momento (Dia-Questão)
    // Nota: currentDayIndex 1 = Dia 2 | currentQuestionIndex 1 = Questão 2
    const currentMoment = `${currentDayIndex}-${currentQuestionIndex}`;

    // 3. Gerir Atividades Especiais
    switch (currentMoment) {
        case "3-3": // Dia 2, Questão 2 (Oxidation/N2O)
            renderFuelingScreen(); 
            break;

        case "1-1": // Dia 4, Questão 2 (Nerve Lag)
            renderNerveLagGame();
            break; 

        // Podes adicionar mais casos facilmente aqui:
        // case "2-3": renderOutraAtividade(); break;

        default:
            // Se não houver atividade especial, segue o fluxo normal
            proceedToNextStep();
            break;
    }
}

function proceedToNextStep() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 4) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

// 5. Mostra o resultado do dia e valida os 75%
function showQuizResult() {
    const passed = (currentScore / 4) >= 0.75;
    
    appContainer.innerHTML = `
        <section class="fade-in">
            <h2>Day ${currentDayIndex + 1} Results</h2>
            <div class="result-circle ${passed ? 'success' : 'fail'}">
                ${currentScore}/4
            </div>
            <p>${passed ? 'Excellent! You’ve mastered today’s topics.' : 'Not quite enough. Review the materials and try again.'}</p>
            
            ${passed ? 
                (currentDayIndex < 6 ? 
                    `<button class="primary-btn" onclick="nextDay()">Continue to Next Day</button>` : 
                    `<button class="primary-btn" onclick="showFinalPrize()">Claim Your Prize!</button>`) 
                : 
                `<button class="secondary-btn" onclick="renderDayIntro()">Retry Day ${currentDayIndex + 1}</button>`
            }
        </section>
    `;
}

// 6. Avança para o dia seguinte
function nextDay() {
    currentDayIndex++;
    renderDayIntro();
}

// 7. Ecrã final de prémio
function showFinalPrize() {
    appContainer.innerHTML = `
        <section class="fade-in result-screen">
            <h1 class="winner-title">CONGRATULATIONS!</h1>
            <p>You are now <strong>100% B-AWARE</strong>.</p>
            <div class="prize-badge">🏆</div>
            <p>Show this screen to your workshop leader to claim your healthy reward.</p>
            <button class="secondary-btn" onclick="location.reload()">Reset Week</button>
        </section>
    `;
}

function renderFuelingScreen() {
    appContainer.innerHTML = `
        <section class="fade-in">
            <h2>Fueling & Repair</h2>
            <p class="intro-text">Clica nos alimentos para ver o potencial de reparo da tua mielina.</p>
            
            <div class="food-grid">
                ${foodData.map((food, index) => `
                    <div class="food-card" onclick="showFoodDetail(${index})">
                        <span class="food-icon">${food.icon}</span>
                        <span class="food-name">${food.name}</span>
                    </div>
                `).join('')}
            </div>

            <div id="food-detail" class="food-detail-box" style="display:none;">
                </div>

            <div class="disclaimer-box">
                <strong>Nota Honesta:</strong> Se a tua B12 estiver bloqueada pelo N₂O, estes nutrientes não serão absorvidos eficazmente até o bloqueio químico passar.
            </div>
            
            <button class="secondary-btn" onclick="renderDayIntro()">Voltar ao Plano</button>
            <button class="secondary-btn" onclick="proceedToNextStep()">Próximo dia</button>
        </section>
    `;
}

function showFoodDetail(index) {
    const food = foodData[index];
    const detailBox = document.getElementById('food-detail');
    detailBox.style.display = 'block';
    detailBox.innerHTML = `
        <h3>${food.name}</h3>
        <p>${food.info}</p>
        <div class="repair-bar-bg">
            <div class="repair-bar-fill" style="width: ${food.repair}%"></div>
        </div>
        <small>Potencial de Reparo Neural: ${food.repair}%</small>
        
    `;
}

// Renderização do Simulador de Lag
function renderNerveLagGame() {
    appContainer.innerHTML = `
        <section class="fade-in">
            <h3>Nerve Signal Test</h3>
            <p class="intro-text">Toca no círculo o mais rápido possível quando ele ficar VERDE.</p>
            
            <div id="signal-test" class="signal-circle" onclick="runNormalTest()">INICIAR</div>
            
            <div id="lag-results" class="lag-results-box" style="display:none;">
                <p id="normal-time"></p>
                <p id="lag-time" style="color:var(--error-red); font-weight:bold;"></p>
                <p id="lag-explanation" style="font-size:0.85rem; margin-top:10px;"></p>
            </div>

            <div id="game-nav" style="display:none; margin-top:20px;">
                <button class="primary-btn" onclick="advanceQuiz()">Continuar Quiz</button>
            </div>
        </section>
    `;
}

// Fase 1: Teste de Reflexo Normal
function runNormalTest() {
    const circle = document.getElementById('signal-test');
    circle.onclick = null; // Evitar múltiplos cliques
    circle.innerText = "Espera...";
    circle.style.backgroundColor = "#E5E5EA";

    const waitTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
        circle.style.backgroundColor = "var(--success-green)";
        circle.innerText = "AGORA!";
        const start = Date.now();

        circle.onclick = () => {
            const reaction = Date.now() - start;
            document.getElementById('lag-results').style.display = 'block';
            document.getElementById('normal-time').innerText = `Sinal com Mielina: ${reaction}ms`;
            
            // Iniciar Fase 2 após breve pausa
            circle.innerText = "Preparar...";
            circle.onclick = null;
            setTimeout(() => runLagTest(reaction), 1500);
        };
    }, waitTime);
}

// Fase 2: Teste com Atraso (Simulação de Desmielinização)
function runLagTest(originalReaction) {
    const circle = document.getElementById('signal-test');
    circle.style.backgroundColor = "#E5E5EA";
    circle.innerText = "Espera...";

    const waitTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
        circle.style.backgroundColor = "var(--success-green)";
        circle.innerText = "AGORA!";
        const start = Date.now();

        circle.onclick = () => {
            // Adicionamos um LAG artificial de 500ms a 800ms
            const simulatedLag = 650; 
            const totalTime = (Date.now() - start) + simulatedLag;
            
            document.getElementById('lag-time').innerText = `Sinal sem Mielina (Lag): ${totalTime}ms`;
            document.getElementById('lag-explanation').innerHTML = `
                A falta de B12 causou um <strong>atraso de ${simulatedLag}ms</strong>. 
                Os teus nervos perderam a isolação, tornando o sinal lento.
            `;
            
            circle.innerText = "LENTO";
            circle.style.backgroundColor = "var(--oxidized-grey)";
            document.getElementById('game-nav').style.display = 'block';
        };
    }, waitTime);
}