const box = document.querySelector('.box');
const box2 = document.querySelector('.box2');
const marc = document.querySelector('.marc');
const boxSize = box.getBoundingClientRect();
const box2Size = box2.getBoundingClientRect();
const marcSize = marc.getBoundingClientRect();
const maxAreaX = (marcSize.width - boxSize.width) / 2;
const maxAreaY = (marcSize.height - boxSize.height) / 2;

let x = 0;
let y = 0;
let step = 2;

let keyChanges = [false/*w*/, false/*a*/, false/*s*/, false/*d*/];

let lastTime = performance.now();


let lastStep = [];
let counterColision = 0;

function gameLoop() {
    let moveX = 0;
    let moveY = 0;
    
    //calcular movimiento basado en teclas presionadas
    if(keyChanges[0] && y > -maxAreaY) {moveY -= step} // w
    if(keyChanges[2] && y < maxAreaY) {moveY += step} // s
    if(keyChanges[1] && x > -maxAreaX) {moveX -= step} // a
    if(keyChanges[3] && x < maxAreaX) {moveX += step} // d
    
    //normalizar movimiento diagonal
    if (moveX !== 0 && moveY !== 0) {
        moveX *= 0.7071;
        moveY *= 0.7071;
    };

    x += moveX;
    y += moveY;

    const boxSizeProbe = box.getBoundingClientRect();
    //console.log(boxSizeProbe.left)
    const boxSize2Probe = box2.getBoundingClientRect();
    //console.log(boxSize2Probe.right)
    if(boxSizeProbe.right > boxSize2Probe.left && 
        boxSizeProbe.left < boxSize2Probe.right && 
        boxSizeProbe.top < boxSize2Probe.bottom && 
        boxSizeProbe.bottom > boxSize2Probe.top) {
        x = lastStep[0]
        y = lastStep[1]
        /*for(i = 0; i < keyChanges.length; i++) {
            keyChanges[i] = false;
        }*/
        //console.log(`estos son tus últimos pasos ${lastStep}`)
        if(lastStep.length < 2 && counterColision < 1) {
            lastStep.push(x,y);
            counterColision ++;
            console.log(counterColision);
            console.log(lastStep);
            console.log(lastStep)
        }

        if(x < 0) {
            x -= 20;
            console.log("para la izquierda")
        } else if (x > 0) {
            x +=20;
        }

        console.log("estás chocando");
        console.log(lastStep)

        box.style.transform = `translate(${x}px, ${y}px)`;

    } else {
        box.style.transform = `translate(${x}px, ${y}px)`;
    };
    
    requestAnimationFrame(gameLoop);
}

//iniciar el game loop
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
