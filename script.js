document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start-btn');
    const resetButton = document.getElementById('reset-btn');
    const messageDisplay = document.getElementById('message');
    
    let score = 0;
    let time = 30;
    let timer;
    let gameActive = false;
    let characterInterval;
    
    // Criar os buracos
    for (let i = 0; i < 12; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        
        // Adicionar personagem aleatório
        const character = document.createElement('div');
        const rand = Math.random();
        
        if (rand < 0.6) {
            character.classList.add('ralph');
        } else if (rand < 0.8) {
            character.classList.add('felix');
        } else {
            character.classList.add('vanellope');
        }
        
        hole.appendChild(character);
        gameBoard.appendChild(hole);
        
        // Adicionar evento de clique
        hole.addEventListener('click', () => {
            if (!gameActive) return;
            
            if (character.classList.contains('up')) {
                if (character.classList.contains('ralph')) {
                    // Acertou o Ralph
                    score += 10;
                    scoreDisplay.textContent = score;
                    messageDisplay.textContent = "+10 pontos! Ralph acertado!";
                    
                    // Efeito visual de acerto
                    hole.style.backgroundColor = "#4CAF50";
                    setTimeout(() => {
                        hole.style.backgroundColor = "#5C4033";
                    }, 200);
                } else {
                    // Errou - clicou em Felix ou Vanellope
                    score -= 5;
                    scoreDisplay.textContent = score;
                    if (character.classList.contains('felix')) {
                        messageDisplay.textContent = "-5 pontos! Era o Felix!";
                    } else {
                        messageDisplay.textContent = "-5 pontos! Era a Vanellope!";
                    }
                    
                    // Efeito visual de erro
                    hole.style.backgroundColor = "#F44336";
                    setTimeout(() => {
                        hole.style.backgroundColor = "#5C4033";
                    }, 200);
                }
                
                // Esconder o personagem
                character.classList.remove('up');
            }
        });
    }
    
    // Função para mostrar personagens aleatoriamente
    function showCharacter() {
        if (!gameActive) return;
        
        const holes = document.querySelectorAll('.hole');
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        const character = randomHole.querySelector('div');
        
        character.classList.add('up');
        
        setTimeout(() => {
            if (character.classList.contains('up')) {
                character.classList.remove('up');
            }
        }, 1000);
    }
    
    // Iniciar jogo
    startButton.addEventListener('click', () => {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        time = 30;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;
        messageDisplay.textContent = "Jogo iniciado! Clique no Ralph!";
        
        // Iniciar o timer
        timer = setInterval(() => {
            time--;
            timeDisplay.textContent = time;
            
            if (time <= 0) {
                endGame();
            }
        }, 1000);
        
        // Mostrar personagens a cada 800ms
        characterInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(characterInterval);
                return;
            }
            showCharacter();
        }, 800);
    });
    
    // Reiniciar jogo
    resetButton.addEventListener('click', () => {
        clearInterval(timer);
        clearInterval(characterInterval);
        gameActive = false;
        score = 0;
        time = 30;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;
        messageDisplay.textContent = "Jogo reiniciado. Clique em Iniciar!";
        
        // Esconder todos os personagens
        document.querySelectorAll('.ralph, .felix, .vanellope').forEach(char => {
            char.classList.remove('up');
        });
    });
    
    // Finalizar jogo
    function endGame() {
        clearInterval(timer);
        clearInterval(characterInterval);
        gameActive = false;
        
        let message = `Fim de jogo! Sua pontuação: ${score}. `;
        if (score >= 100) {
            message += "Incrível! Você é um expert no Detona Ralph!";
        } else if (score >= 50) {
            message += "Bom trabalho! Continue praticando!";
        } else {
            message += "Continue tentando, você vai melhorar!";
        }
        
        messageDisplay.textContent = message;
        
        // Esconder todos os personagens
        document.querySelectorAll('.ralph, .felix, .vanellope').forEach(char => {
            char.classList.remove('up');
        });
    }
});