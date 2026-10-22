document.addEventListener('DOMContentLoaded', function() {
    const closeB = document.querySelectorAll('.close');
    //Buttons
    const machine = document.querySelector('img.Machine');
    const RPS = document.querySelector('.RPS');
    const PAC = document.querySelector('.PAC');
    const BALL = document.querySelector('.BALL');
    //Modals
    const homeScreen = document.getElementById('homeScreen'); 
    const RPScreen = document.getElementById('RPScreen');
    const PACScreen = document.getElementById('PACScreen');
    const BALLScreen = document.getElementById('BALLScreen');

    function showModal(modalPlease) {
        modalPlease.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    function hideModal(modalPlease) {
        modalPlease.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    window.addEventListener('message', function(event) {
        if (event.data === 'closeRPSModal') {
            hideModal(RPScreen);
            showModal(homeScreen);
        }
        else if (event.data === 'closePACModal') {
            hideModal(PACScreen);
            showModal(homeScreen);
        }
        else if (event.data === 'closeBALLModal') {
            hideModal(BALLScreen);
            showModal(homeScreen);
        }
    });

    if (machine) {
        machine.onclick = function() {
            showModal(homeScreen);
        };
    }

    if (RPS) {
        RPS.onclick = function() {
            if (homeScreen){hideModal(homeScreen);}
            if (RPScreen){showModal(RPScreen);}
        };
    }
    if (PAC){
        PAC.onclick = function() {
            if (homeScreen){hideModal(homeScreen);}
            if (PACScreen){showModal(PACScreen);}
        };
    }
    if (BALL){
        BALL.onclick = function() {
            if (homeScreen){hideModal(homeScreen);}
            if (BALLScreen){showModal(BALLScreen);}
        };
    }

    closeB.forEach(function(x) {
        x.onclick = function() {
            const parentModal = this.closest('.modal');
            if (parentModal) {
                hideModal(parentModal);
                if (parentModal.id === 'RPScreen' || parentModal.id === 'PACScreen' || parentModal.id === 'BALLScreen') {
                    showModal(homeScreen);
                }
            }
        };
    });
});

    //RPS
    if (document.body.classList.contains('RPSetUp')){
    const resultPopCorn = document.querySelector('.PopCornContainer');
    const okayButton = document.querySelector('.gotIt');
    const okayContainer = document.querySelector('.RulesContainer');
    const finalCompScore = document.querySelector('.computer');
    const finalTie = document.querySelector('.tie');
    const finalUserScore = document.querySelector('.user');
    resultPopCorn.style.visibility = 'hidden';
    //RPS
    const countdown = document.querySelector('#countdownText');
    const ComputerMoves = document.querySelector('.ActionMoves1');
    const ActionMoves = document.querySelector('.ActionMoves2');
    //Moves
    const rockhand = document.querySelector('.rock');
    const paperhand = document.querySelector('.paper');
    const scissors2 = document.querySelector('.scissors');

    const userScreen = document.querySelector('#playerScreen');
    const compScreen = document.querySelector('#computerScreen');
    const replayButton = document.querySelector('.round');
    const acceptButton = document.querySelector('.accept'); 
    let playerMadeMove = false;
    let countdownTimer = null;
    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;
    let currentRound = 0;
    const maxRounds = 5;

    ComputerMoves.style.visibility = 'hidden';
    ActionMoves.style.visibility = 'hidden'; 
    
function startCountdown() {
    currentRound++;
    playerMadeMove = false; 
    toggleButtons(false); 
    userScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
    userScreen.style.boxShadow = 'none';
    compScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
    compScreen.style.boxShadow = 'none';
    ActionMoves.style.visibility = 'hidden'; 
    ComputerMoves.style.visibility = 'hidden';

    countdown.textContent = 'Rock';
    setTimeout(() => {
        countdown.textContent = 'Paper';
        setTimeout(() => {
            countdown.textContent = 'Scissors';
            setTimeout(() => {
                countdown.textContent = '...and SHOOT!';
                toggleButtons(true); 
                countdownTimer = setTimeout(() => {
                    if (!playerMadeMove) {
                        timeOut();
                    }
                }, 2000);
            }, 700); 
        }, 700);
    }, 700);
}

function timeOut() {
    toggleButtons(false);
    countdown.textContent = "Time's Up! You lose.";
    computerScore++;
    userScreen.style.backgroundColor = 'rgb(240, 92, 92)';
    compScreen.style.backgroundColor = 'rgb(90, 236, 90)';
    userScreen.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, .30), inset 20px 0 60px rgba(238, 130, 238, .30), inset -20px 0 60px rgba(0, 255, 255, .30), inset 20px 0 300px rgba(238, 130, 238, .30), inset -20px 0 300px rgba(0, 255, 255, .30), 0 0 50px rgba(255, 255, 255, .30), -10px 0 60px rgba(238, 130, 238, .45), 10px 0 60px rgba(0, 255, 255, .30)';
    compScreen.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, .30), inset 20px 0 60px rgba(238, 130, 238, .30), inset -20px 0 60px rgba(0, 255, 255, .30), inset 20px 0 300px rgba(238, 130, 238, .30), inset -20px 0 300px rgba(0, 255, 255, .30), 0 0 50px rgba(255, 255, 255, .30), -10px 0 60px rgba(238, 130, 238, .45), 10px 0 60px rgba(0, 255, 255, .30)';
    setTimeout(() => {
        countdown.textContent = '...'; 
        userScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
        compScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
         if (currentRound < maxRounds) {
            startCountdown();
        } else {
            endGame(computerScore, tieScore, playerScore);
        }
    }, 2500); 
}

function handlePlayerMove(userMove) {
    if (!playerMadeMove) {
        playerMadeMove = true; 
        clearTimeout(countdownTimer); 
        toggleButtons(false); 
        countdown.textContent = ''; 

        userScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
        compScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
        ActionMoves.style.visibility = 'hidden';
        ComputerMoves.style.visibility = 'hidden';

        UpdateTV(userMove, ActionMoves);

        const computerMove = getComputerMove();
        UpdateTV(computerMove, ComputerMoves); 
        postOutcome(userMove, computerMove); 
    }
}

function getComputerMove() {
        const moves = ['rockhand', 'paperhand', 'scissors2'];
        const num = Math.floor(Math.random() * moves.length);
        return moves[num];
}

function UpdateTV(fileName, ActionMoves) {
        ActionMoves.style.visibility = 'visible'; 
        ActionMoves.src = fileName + ".png";
}

    if (rockhand) {
    rockhand.addEventListener('click', function() {
        handlePlayerMove('rockhand');
    });
    }
    if (paperhand) {
    paperhand.addEventListener('click', function() {
        handlePlayerMove('paperhand');
    });
    }
    if (scissors2) {
    scissors2.addEventListener('click', function() {
        handlePlayerMove('scissors2');
    });
    }

const winningCombos = {'rockhand': 'scissors2', 'paperhand': 'rockhand', 'scissors2': 'paperhand'};
const userButtons = [rockhand, paperhand, scissors2];

function toggleButtons(ok) { 
    userButtons.forEach(button => {
        if (button) { 
            if (ok) {
                button.classList.remove('disabled'); 
            } else {
                button.classList.add('disabled'); 
            }
        }
    });
}

function getWinner(userMove, computerMove) {
    if (userMove === computerMove) 
        return 1; 
    if (winningCombos[userMove] === computerMove) 
        return 2; 
     return 0;
}

function postOutcome(userMove, computerMove) {
    const result = getWinner(userMove, computerMove);
    setTimeout(() => {
        if (result === 1) {
            userScreen.style.backgroundColor = 'rgb(235, 225, 87)';
            compScreen.style.backgroundColor = 'rgb(235, 225, 87)';
            tieScore++;
        } else if (result === 2) {
            userScreen.style.backgroundColor = 'rgb(90, 236, 90)';
            compScreen.style.backgroundColor = 'rgb(240, 92, 92)';
            playerScore++;
        } else { 
            userScreen.style.backgroundColor = 'rgb(240, 92, 92)';
            compScreen.style.backgroundColor = 'rgb(90, 236, 90)';
            computerScore++;
        }
            userScreen.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, .30), inset 20px 0 60px rgba(238, 130, 238, .30), inset -20px 0 60px rgba(0, 255, 255, .30), inset 20px 0 300px rgba(238, 130, 238, .30), inset -20px 0 300px rgba(0, 255, 255, .30), 0 0 50px rgba(255, 255, 255, .30), -10px 0 60px rgba(238, 130, 238, .45), 10px 0 60px rgba(0, 255, 255, .30)';
            compScreen.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, .30), inset 20px 0 60px rgba(238, 130, 238, .30), inset -20px 0 60px rgba(0, 255, 255, .30), inset 20px 0 300px rgba(238, 130, 238, .30), inset -20px 0 300px rgba(0, 255, 255, .30), 0 0 50px rgba(255, 255, 255, .30), -10px 0 60px rgba(238, 130, 238, .45), 10px 0 60px rgba(0, 255, 255, .30)';
        setTimeout(() => {
            userScreen.style.boxShadow = 'none';
            compScreen.style.boxShadow = 'none';

            userScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
            compScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';

            ActionMoves.style.visibility = 'hidden';
            ComputerMoves.style.visibility = 'hidden';
            countdown.textContent = ''; 
            toggleButtons(true); 
            if (currentRound < maxRounds) {
            startCountdown(); 
            } else {
            endGame(computerScore, tieScore, playerScore); 
            }
        }, 1500); 

    }, 1000);
}

function endGame(computerScore, tieScore, playerScore) {
    toggleButtons(false); 
    countdown.textContent = "Game Over!"; 
    ActionMoves.style.visibility = 'hidden';
    ComputerMoves.style.visibility = 'hidden';
    userScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
    compScreen.style.backgroundColor = 'rgb(156, 149, 149, 0.6)';
    resultPopCorn.style.visibility = 'visible';
    finalCompScore.textContent = computerScore;
    finalTie.textContent = tieScore;
    finalUserScore.textContent = playerScore;
    acceptButton.addEventListener('click', function(){
        reset();
        window.parent.postMessage('closeRPSModal', '*');
    });
    replayButton.addEventListener('click', function() {
        resultPopCorn.style.visibility = 'hidden';
        currentRound = 0; 

    startCountdown(); 
    });
}

    if (okayButton) {
        okayButton.addEventListener('click', function() {
        okayContainer.style.visibility = 'hidden';
        startCountdown(); 
    });
    }
function reset(){
    playerMadeMove = false;
    countdownTimer = null;
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    currentRound = 0;
    resultPopCorn.style.visibility = 'hidden';
}
    }

    //PACMAN
    if (document.body.classList.contains('PAC')){
    const resultPopCorn = document.querySelector('.PopCornContainer');
    const okayButton = document.querySelector('.gotIt');
    const okayContainer = document.querySelector('.RulesContainer');
    const finalUserScore = document.querySelector('.score');
    const replayButton = document.querySelector('.round');
    const acceptButton = document.querySelector('.accept'); 
    resultPopCorn.style.visibility = 'hidden';

    let Map;
    const row = 21;
    const col = 19;
    const tile = 20; 
    const width = col * tile;
    const height = row * tile;
    let context;
//bread
let brick;
let bluePigeon;
let pinkPigeon;
let orangePigeon;
let purplePigeon;
let toast; 

const BluePrint = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     T     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const crumbs = new Set();
const pigeons = new Set();
let bread; 

const directions = ['U', 'D', 'L', 'R'];
let score = 0;
let lives = 1;
let gameOver = false;

function load(){
    brick = new Image();
    bluePigeon = new Image();
    pinkPigeon = new Image();
    orangePigeon = new Image();
    purplePigeon = new Image();
    toast = new Image();

    brick.src = "./brick.png";
    bluePigeon.src = "./bluebird.png";
    pinkPigeon.src = "./pinkbird.png";
    orangePigeon.src = "./orangebird.png";
    purplePigeon.src = './purplebird.png';
    toast.src = './toast.png';
}

function loadMap(){
    walls.clear();
    crumbs.clear();
    pigeons.clear();

    for (let i = 0; i < row; i++)
    {
        for (let j = 0; j < col; j++){
            const r = BluePrint[i];
            const marker = r[j];

            const x = j * tile;
            const y = i * tile;
            if (marker == 'X'){
                const wall = new Block(brick, x, y, tile, tile);
                walls.add(wall);
            }
            else if (marker == 'b'){
                const pigeon = new Block(bluePigeon, x, y, tile, tile);
                pigeons.add(pigeon);
            }
            else if (marker == 'r'){
                const pigeon = new Block(pinkPigeon, x, y, tile, tile);
                pigeons.add(pigeon);
            }
            else if (marker == 'o'){
                const pigeon = new Block(orangePigeon, x, y, tile, tile);
                pigeons.add(pigeon);
            }
            else if (marker == 'p'){
                const pigeon = new Block(purplePigeon, x, y, tile, tile);
                pigeons.add(pigeon);
            }
            else if (marker == 'T'){
                bread = new Block(toast, x, y, tile, tile);
            }
            else if (marker == ' '){
                const crumb = new Block(null, x+10, y+10, 4, 4);
                crumbs.add(crumb);
            }
        }
    }
}

function draw(){
    context.clearRect(0,0,Map.width, Map.height);
    context.drawImage(bread.image, bread.x, bread.y, bread.width, bread.height);
    for (let pigeon of pigeons){
        context.drawImage(pigeon.image, pigeon.x, pigeon.y, pigeon.width, pigeon.height);
    }
    for (let brick of walls){
        context.drawImage(brick.image, brick.x, brick.y, brick.width, brick.height);
    }
    context.fillStyle = "#F9DDB0";
    for (let crumb of crumbs){
        context.fillRect(crumb.x, crumb.y, crumb.width, crumb.height);
    }
    context.font="18px sans-serif";
    if (gameOver){
        context.fillText("Game Over: " + String(score), tile/2, tile/2);
    }
    else {
        context.fillText("x" + String(lives) + " " + String(score), tile/2, tile/2);
    }
}

function move(){
    bread.x += bread.velocityX;
    bread.y += bread.velocityY;
    for (let brick of walls){
        if (collision(bread, brick)){
            bread.x -= bread.velocityX;
            bread.y -= bread.velocityY;
            break;
        }
    }
    if (bread.x + bread.width < 0){
             bread.x = (col - 1) * tile;
        }
    else if (bread.x > col * tile) {
             bread.x = 0;
        }
         
    for(let pigeon of pigeons){
        if (pigeon.y == tile *9 && pigeon.direction != 'U' && pigeon.direction !='D')
    {
        pigeon.updateDirection('U');
    }       
        pigeon.x += pigeon.velocityX;
        pigeon.y += pigeon.velocityY;
        if ((pigeon.x < 0)){
            pigeon.x = (col - 1) * tile;
        }
        else if (pigeon.x > col * tile) {
            pigeon.x = 0;
        }
        for (let brick of walls){
            if (collision(pigeon, brick)){
                pigeon.x -= pigeon.velocityX;
                pigeon.y -= pigeon.velocityY;
                const newDirection = directions[Math.floor(Math.random()*4)];
                pigeon.updateDirection(newDirection);
            }
        }
        if (collision(pigeon, bread)){
            lives -=1;
            resetPosition();
            if (lives == 0){
                gameOver = true;
                return;
            }
        }
    }
    let crumbAbsorbed = null;
    for (let crumb of crumbs){
        if (collision(bread, crumb)){
            crumbAbsorbed = crumb;
            score+=10;
            break;
        }
    }
    crumbs.delete(crumbAbsorbed);
    if (crumbs.size == 0){
        loadMap();
        resetPosition();
    }
}

function moveToast(t){
    if (t.code == "ArrowUp" || t.code == "KeyW"){
        bread.updateDirection('U');
    }
    else if (t.code == "ArrowDown" || t.code == "KeyS"){
        bread.updateDirection('D');
    }
    else if (t.code == "ArrowLeft" || t.code == "KeyA"){
        bread.updateDirection('L');
    }
    else if (t.code == "ArrowRight" || t.code == "KeyD"){
        bread.updateDirection('R');
    }
}
function resetPosition(){
    bread.reset();
    bread.velocityX = 0;
    bread.velocityY = 0;
    for (let pigeon of pigeons){
        pigeon.reset();
        const newDireciton = directions[Math.floor(Math.random()*4)];
        pigeon.updateDirection(newDireciton);
    }
}

class Block {
    constructor(image, x, y, width, height){
        this.image = image;
        this.x = x;
        this.y =y;
        this.width = width;
        this.height=height;
        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX= 0;
        this.velocityY=0;
    }
    updateDirection(direction){
        const previous = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;
        for (let brick of walls){
            if (collision(this, brick)){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = previous;
                this.updateVelocity();
                return;
            }
        }
    }
    updateVelocity(){
        if (this.direction == 'U'){
            this.velocityX =0;
            this.velocityY = -tile/4;
        }
        else if (this.direction == 'D'){
            this.velocityX=0;
            this.velocityY=tile/4;
        }
        else if (this.direction == 'L'){
            this.velocityX=-tile/4;
            this.velocityY=0;
        }
        else if (this.direction =='R'){
            this.velocityX = tile/4;
            this.velocityY=0;
        }
    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }
}

function collision(a,b){
    return a.x < b.x + b.width && 
    a.x + a.width > b.x && 
    a.y < b.y + b.height && 
    a.y + a.height> b.y;
}

function update(){
    if (gameOver){
        finalUserScore.textContent = score;
        resultPopCorn.style.visibility = 'visible';

        acceptButton.addEventListener('click', function(){
        window.parent.postMessage('closePACModal', '*');
        });
        replayButton.addEventListener('click', function() {
        resultPopCorn.style.visibility = 'hidden';
        score = 0;
        lives = 3;
        gameOver = false;
        gameReady();
        });

        return;
    }
    move();
    draw();
    setTimeout(update, 50);
}
function gameReady() {
    Map = document.getElementById('Map');
    Map.width = width;
    Map.height = height;
    context = Map.getContext("2d");
    load();
    loadMap();
    for (let pigeon of pigeons){
        const newDirection = directions[Math.floor(Math.random()*4)];
        pigeon.updateDirection(newDirection);
    }
    update();
    document.addEventListener("keyup", moveToast);
}

if (okayButton) {
        okayButton.addEventListener('click', function() {
        okayContainer.style.visibility = 'hidden';
        gameReady(); 
    });
    }
    }

    //DODGEBALL
    if (document.body.classList.contains('BALL')){
        const resultPopCorn = document.querySelector('.PopCornContainer');
        const okayButton = document.querySelector('.gotIt');
        const okayContainer = document.querySelector('.RulesContainer');
        const finalUserScore = document.querySelector('.score');
        const replayButton = document.querySelector('.round');
        const acceptButton = document.querySelector('.accept'); 

        let canvas, ctx;
        let score = 0;
        let gameRunning = false;
        let player = {
         x: 150,
         y: 150,
         radius: 12,
         color: '#16eed1',
         speed: 5,
         dx: 0,
         dy: 0
        };

    let enemyBalls = [];
    const maxEnemies = 5;

    //Initialize Canvas and Start
    function initBallGame() {
    canvas = document.getElementById('BallMap');
    canvas.width = 400;
    canvas.height = 400;
    ctx = canvas.getContext('2d');

    resetGame();
    gameRunning = true;
    loop();
    }

    function resetGame() {
    score = 0;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    //Enemy Balls
    enemyBalls = [];
    for (let i = 0; i < maxEnemies; i++) {
        enemyBalls.push({
            x: Math.random() * (canvas.width - 20) + 10,
            y: Math.random() * (canvas.height - 20) + 10,
            radius: 10 + Math.random() * 8,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            color: '#1e35b4'
        });
    }
    }

    //Keyboard Controls
    window.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -player.speed;
    if (e.key === 'ArrowRight' || e.key === 'd') player.dx = player.speed;
    if (e.key === 'ArrowUp' || e.key === 'w') player.dy = -player.speed;
    if (e.key === 'ArrowDown' || e.key === 's') player.dy = player.speed;
    });

    window.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'a', 'ArrowRight', 'd'].includes(e.key)) player.dx = 0;
    if (['ArrowUp', 'w', 'ArrowDown', 's'].includes(e.key)) player.dy = 0;
    });

    function update() {
    if (!gameRunning) return;

    player.x += player.dx;
    player.y += player.dy;
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
    enemyBalls.forEach(ball => {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.speedX *= -1;
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.speedY *= -1;

        const dist = Math.hypot(player.x - ball.x, player.y - ball.y);
        if (dist < player.radius + ball.radius) {
            gameRunning = false;
        }
    });

    score++;
    }

    function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    enemyBalls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });

    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";
    ctx.fillText("Score: " + Math.floor(score / 10), 15, 25);
    }

    //Main Loop
    function loop() {
    if (!gameRunning) {
        finalUserScore.textContent = Math.floor(score / 10);
        resultPopCorn.style.visibility = 'visible';
        return;
    }
    update();
    draw();
    requestAnimationFrame(loop);
    }

    if (okayButton) {
    okayButton.addEventListener('click', function() {
        okayContainer.style.visibility = 'hidden';
        initBallGame();
    });
    }

    if (replayButton) {
    replayButton.addEventListener('click', function() {
        resultPopCorn.style.visibility = 'hidden';
        initBallGame();
    });
    }
    if (acceptButton) {
    acceptButton.addEventListener('click', function() {
        window.parent.postMessage('closeBALLModal', '*');
    });
    }
    }
   

