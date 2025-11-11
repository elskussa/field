const box = document.querySelector('.box');
const marc = document.querySelector('.marc');

const boxSize = box.getBoundingClientRect();
const marcSize = marc.getBoundingClientRect();
const maxAreaX = (marcSize.width - boxSize.width) / 2;
const maxAreaY = (marcSize.height - boxSize.height) / 2;

let x = 0;
let y = 0;
let step = 2;

let keyChanges = [false/*w*/, false/*a*/, false/*s*/, false/*d*/];

let lastTime = performance.now();

function gameLoop() {
    moveX = 0;
    moveY = 0;
    
    // Calcular movimiento basado en teclas presionadas
    if(keyChanges[0] && y > -maxAreaY) {moveY -= step} // w
    if(keyChanges[2] && y < maxAreaY) {moveY += step, console.log("estás moviendote a la dirección s")} // s
    if(keyChanges[1] && x > -maxAreaX) {moveX -= step, console.log("estás moviendote a la dirección a")} // a
    if(keyChanges[3] && x < maxAreaX) {moveX += step, console.log("estás moviendote a la dirección d")} // d
    
    // Normalizar movimiento diagonal
    if (moveX !== 0 && moveY !== 0) {
        moveX *= 0.7071;
        moveY *= 0.7071;
    };

    x += moveX;
    y += moveY;

    console.log(x)
    
    box.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(gameLoop);
}

// Iniciar el game loop
gameLoop();

document.addEventListener('keydown', (event) => {
    if(event.key == 'w') {keyChanges[0] = true; /*console.log('estás pulsando la w')*/ }
        else if(event.key == 'a') {keyChanges[1] = true; /*console.log('estás pulsando la a')*/ }
        else if(event.key == 's') {keyChanges[2] = true; /*console.log('estás pulsando la s')*/ }
        else if(event.key == 'd') {keyChanges[3] = true; /*console.log('estás pulsando la d')*/ }
});

document.addEventListener('keyup', (event) => {
    //console.log(`se ha dejado de presionar ${event.key}`)
    if(event.key == 'w') {keyChanges[0] = false;} 
    else if (event.key == 'a') {keyChanges[1] = false;}
    else if (event.key == 's') {keyChanges[2] = false;}
    else if (event.key == 'd') {keyChanges[3] = false;}
});
