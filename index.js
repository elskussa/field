const box = document.querySelector('.box');
const box2 = document.querySelector('.box2');
const marc = document.querySelector('.marc');
const boxSize = box.getBoundingClientRect();
const box2Size = box2.getBoundingClientRect();
const marcSize = marc.getBoundingClientRect();
const notices = document.querySelector('.notices');

let x = 0;
let y = 0;
let step = 2;

let dataGameJSON = '';

document.addEventListener('DOMContentLoaded', () => {

    const dataSaved = JSON.parse(localStorage.getItem('dataGame'))
    if(dataSaved && dataSaved.pos) {
        x = dataSaved.pos.posSavedX;
        y = dataSaved.pos.posSavedy;
        console.log('datos cargados')
    }

});

function saveData() {
    const data = {
        pos : {
            posSavedx : x,
            posSavedy : y
        }
    };
    dataGameJSON = JSON.stringify(data)
    localStorage.setItem('dataGame', dataGameJSON);
};

let keyChanges = [false/*w*/, false/*a*/, false/*s*/, false/*d*/];

function gameLoop() {

    const boxSizeProbe = box.getBoundingClientRect();
    const boxSize2Probe = box2.getBoundingClientRect();
    const marcSize2 = marc.getBoundingClientRect();
    const maxAreaX = (marcSize2.width - boxSizeProbe.width) / 2;
    const maxAreaY = (marcSize2.height - boxSizeProbe.height) / 2;

    let moveX = 0;
    let moveY = 0;
 
    if(localStorage.getItem('dataGame')) {
        let lastGameData = localStorage.getItem('dataGame');
        let GameData = JSON.parse(lastGameData)
        x = GameData.pos.posSavedx;
        y = GameData.pos.posSavedy;

    }
    
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

    //x += moveX;
    //y += moveY;

    //sistema de repulsión
    /*if(boxSizeProbe.right > boxSize2Probe.left && 
        boxSizeProbe.left < boxSize2Probe.right && 
        boxSizeProbe.top < boxSize2Probe.bottom && 
        boxSizeProbe.bottom > boxSize2Probe.top) {

        if(moveX > 0){//izquierda
            x -= 45;
        } if (moveX < 0 ){//derecha
            x += 45;
        } else if (moveY < 0) {//subiendo
            y +=45;
        } else if (moveY > 0) {//bajando
            y -= 45;
        }

    }*/

    if(boxSizeProbe.right + moveX > boxSize2Probe.left && 
        boxSizeProbe.left + moveX < boxSize2Probe.right && 
        boxSizeProbe.top + moveY < boxSize2Probe.bottom && 
        boxSizeProbe.bottom + moveY > boxSize2Probe.top) {
        console.log("colisionas");

    } else {
        x += moveX;
        y += moveY;
    }
    
    marc.style.transform = `translate(${-x}px, ${-y}px)`;
    saveData()
    requestAnimationFrame(gameLoop);
}

//iniciar el game loop
gameLoop();

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase()
    if(key === 'arrowup' || 'arrowleft' || 'arrowdown' || 'arrowright') {event.preventDefault()}
    if(key === 'w' || key === 'arrowup') {keyChanges[0] = true;}
    else if(key === 'a' || key === 'arrowleft') {keyChanges[1] = true;}
    else if(key === 's' || key === 'arrowdown') {keyChanges[2] = true;}
    else if(key === 'd' || key === 'arrowright') {keyChanges[3] = true;}
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase()
    if(key === 'arrowup' || 'arrowleft' || 'arrowdown' || 'arrowright') {event.preventDefault()}
    if(key === 'w' || key == 'arrowup') {keyChanges[0] = false;} 
    else if (key === 'a' || key === 'arrowleft') {keyChanges[1] = false;}
    else if (key === 's' || key === 'arrowdown') {keyChanges[2] = false;}
    else if (key === 'd' || key === 'arrowright') {keyChanges[3] = false;}
});
