// Designed by Eliezer Ladeira - 10/01/2021

// initial data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// events
// escolha das cores na paleta de cores
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

// functions
function colorClickEvent(e) {
    // identificando a cor clicada
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    // marcando a cor escolhida na paleta
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    // salva a posição atual do clique
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw) {
        // encontra a posição do mouse dentro do canvas, pagex retorna posição do mouse na tela
        //let pointX = e.pageX - screen.offSetLeft;
        //let pointY = e.pageY - screen.offSetTop;
        
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();                // começa a desenhar
    ctx.lineWidth = 5;              // largura da linha
    ctx.lineJoin = "round";         // formato da linha (bola)
    ctx.moveTo(mouseX, mouseY);     // move para a posição inicial
    ctx.lineTo(pointX, pointY);     // faça uma linha de início ao fim
    ctx.closePath();                // encerra o modo desenho
    ctx.strokeStyle = currentColor; // cor da linha
    ctx.stroke();                   // finaliza o processo

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    // seta a posição geral, zerando o cursor e o processo de desenho (2d)
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // limpa tudo (do início ao fim do canvas)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}