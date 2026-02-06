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

        case "1-3": // Dia 4, Questão 2 (Nerve Lag)
            renderNerveLagGame();
            break; 

        case "4-3": // Dia 7, Questão 4 (Índice começa em 0)
            renderTimeCapsule();
            break;

        case "0-3": // Dia 3, Questão 2
        renderFocusDrift();
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
                (currentDayIndex < 4 ? 
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
                <strong>Nota Honesta:</strong> If your B12 is blocked by N₂O, these nutrients will not be absorbed effectively until the chemical blockage is removed.
            </div>
            
            <button class="secondary-btn" onclick="proceedToNextStep()">Continue</button>
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
        <small>Potencial Neural Repair: ${food.repair}%</small>
        
    `;
}

// Renderização do Simulador de Lag
function renderNerveLagGame() {
    appContainer.innerHTML = `
        <section class="fade-in">
            <h3>Nerve Signal Test</h3>
            <p class="intro-text">Tap the circle as quickly as possible when it turns GREEN..</p>
            
            <div id="signal-test" class="signal-circle" onclick="runNormalTest()">GO!</div>
            
            <div id="lag-results" class="lag-results-box" style="display:none;">
                <p id="normal-time"></p>
                <p id="lag-time" style="color:var(--error-red); font-weight:bold;"></p>
                <p id="lag-explanation" style="font-size:0.85rem; margin-top:10px;"></p>
            </div>

            <div id="game-nav" style="display:none; margin-top:20px;">
                <button class="primary-btn" onclick="proceedToNextStep()">Continue</button>
            </div>
        </section>
    `;
}

// Fase 1: Teste de Reflexo Normal
function runNormalTest() {
    const circle = document.getElementById('signal-test');
    circle.onclick = null; // Evitar múltiplos cliques
    circle.innerText = "Wait...";
    circle.style.backgroundColor = "#E5E5EA";

    const waitTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
        circle.style.backgroundColor = "var(--success-green)";
        circle.innerText = "Now!";
        const start = Date.now();

        circle.onclick = () => {
            const reaction = Date.now() - start;
            document.getElementById('lag-results').style.display = 'block';
            document.getElementById('normal-time').innerText = `Signal without Myelin: ${reaction}ms`;
            
            // Iniciar Fase 2 após breve pausa
            circle.innerText = "Ready...";
            circle.onclick = null;
            setTimeout(() => runLagTest(reaction), 1500);
        };
    }, waitTime);
}

// Fase 2: Teste com Atraso (Simulação de Desmielinização)
function runLagTest(originalReaction) {
    const circle = document.getElementById('signal-test');
    circle.style.backgroundColor = "#E5E5EA";
    circle.innerText = "Wait...";

    const waitTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
        circle.style.backgroundColor = "var(--success-green)";
        circle.innerText = "Now!";
        const start = Date.now();

        circle.onclick = () => {
            // Adicionamos um LAG artificial de 500ms a 800ms
            const simulatedLag = 650; 
            const totalTime = (Date.now() - start) + simulatedLag;
            
            document.getElementById('lag-time').innerText = `Sinal without Myelin (Lag): ${totalTime}ms`;
            document.getElementById('lag-explanation').innerHTML = `
                The lack of B12 caused a <strong>delay of ${simulatedLag}ms</strong>. 
                Your nerves have lost their insulation, slowing down the signal.
            `;
            
            circle.innerText = "SLOW";
            circle.style.backgroundColor = "var(--oxidized-grey)";
            document.getElementById('game-nav').style.display = 'block';
        };
    }, waitTime);
}

function renderTimeCapsule() {
    appContainer.innerHTML = `
        <section class="fade-in">
            <h2>The Time Capsule</h2>
            <p class="intro-text">Write a commitment to your future self. How will you protect your neural health starting today?</p>
            
            <textarea id="capsule-text" placeholder="Ex: I'm going to take a 3-month break and focus on my nutrition...." 
                style="width: 100%; height: 120px; padding: 10px; border-radius: 10px; border: 1px solid #ddd; font-family: inherit; margin-bottom: 15px;"></textarea>

            <button class="primary-btn" onclick="sealCapsule()">Seal the Commitment</button>
        </section>
    `;
}

function sealCapsule() {
    const text = document.getElementById('capsule-text').value;
    if (text.trim() === "") {
        alert("Please write your commitment before sealing it.");
        return;
    }

    // Guardamos o texto para mostrar no final ou apenas validamos a ação
   appContainer.innerHTML = `
    <section class="fade-in" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
        <h2>Commitment Sealed!</h2>
        <p>This is a contract with yourself. Your health is your greatest asset.</p>
        
        <div style="background: #fdf6e3; border: 1px dashed #d3af37; padding: 15px; margin: 20px 0; font-style: italic; color: #5d4037;">
            "${text}"
        </div>

        <p style="font-size: 0.8rem; color: var(--oxidized-grey);">Take a screenshot so you don't forget it.</p>
        
        <button class="primary-btn" onclick="showFinalPrize()">Claim Final Prize</button>
    </section>
`;
}

let driftRounds = 0;
const totalDriftRounds = 3;

function renderFocusDrift() {
    const colors = [
        { name: "RED", hex: "#FF3B30" },
        { name: "BLUE", hex: "#007AFF" },
        { name: "GREEN", hex: "#34C759" },
        { name: "YELLOW", hex: "#FFCC00" }
    ];

    // 1. A cor REAL das letras (A que o utilizador deve escolher)
    const letterColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 2. O que o texto diz (Ex: diz "RED", mas a cor da letra é Azul)
    const wordWritten = colors[Math.floor(Math.random() * colors.length)];
    
    // 3. A cor do fundo da moldura (Igual ao que está escrito para confundir)
    const bgFrameColor = wordWritten.hex;

    appContainer.innerHTML = `
        <section class="fade-in" style="text-align: center;">
            <h3>Mental Fog Test</h3>
            <p class="intro-text">Match the <strong>COLOR OF THE LETTERS</strong>!</p>
            
            <div id="drift-container" style="
                background-color: ${bgFrameColor}; 
                padding: 40px; 
                margin: 20px auto; 
                border-radius: 20px;
                width: 80%;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transition: all 0.2s;">
                
                <span style="
                    font-size: 3.5rem; 
                    font-weight: 900; 
                    color: ${letterColor.hex};
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                    ${wordWritten.name}
                </span>
            </div>

            <div class="options-grid">
                ${colors.map(c => `
                    <button class="option-btn" onclick="checkFocus('${c.hex}', '${letterColor.hex}')">
                        ${c.name}
                    </button>
                `).join('')}
            </div>
            <p style="margin-top: 20px; font-size: 0.8rem; color: var(--oxidized-grey);">Round ${driftRounds + 1} of ${totalDriftRounds}</p>
        </section>
    `;
}

function checkFocus(selectedHex, correctHex) {
    if (selectedHex === correctHex) {
        driftRounds++;
        if (driftRounds < totalDriftRounds) {
            renderFocusDrift();
        } else {
            showDriftResult(true);
        }
    } else {
        showDriftResult(false);
    }
}

function showDriftResult(success) {
    driftRounds = 0; // Reset para a próxima vez
    appContainer.innerHTML = `
        <section class="fade-in" style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">${success ? '🎯' : '🌫️'}</div>
            <h2>${success ? 'Focus Maintained!' : 'Brain Fog Detected!'}</h2>
            <p>${success ? 
                'Your neural pathways are communicating sharply.' : 
                'It’s harder than it looks, right? Lack of B12 can make this mental processing even slower.'}</p>
            
            <button class="primary-btn" onclick="proceedToNextStep()">Continue Quiz</button>
        </section>
    `;
}