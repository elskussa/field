//se declaran los elementos de el DOM
const box = document.querySelector('.box');
const box2 = document.querySelector('.box2');
const marc = document.querySelector('.marc');
const marcSize = marc.getBoundingClientRect();
const notices = document.querySelector('.notices');
const square = document.querySelectorAll('.square');
console.log(marcSize);

//se declaran coordenadas de los ejes y cantidad de pasos
let x = 0;
let y = 0;
let step = 2;

//se declara la variable que va a guardar los datos de el mundo
let dataGameJSON = '';

let grassCounter = 0;
let treeCounter = 0;
let tileCounter = 0;

let entities = {
    box: box2,
    grass: [],
    bush: [],
    tree: [],
    collidable: [],

    createGrass() {

        const grassElement = document.createElement('div');
        grassElement.className = `grass${grassCounter}`;
        grassElement.style.height = '100%';
        grassElement.style.width = '100%';
        grassElement.style.backgroundColor = 'rgba(0, 226, 75, 1)';
        grassElement.style.display = 'flex';
        grassElement.style.justifyContent = 'center';
        grassElement.style.alignItems = 'center';
        
        grassCounter++;
        document.querySelector(`.tile-${tileCounter}`).appendChild(grassElement);
        tileCounter++;
        this.grass.push(grassElement);
    },

    createTree() {
        const treeElement = document.createElement('div');
        treeElement.className = `tree${treeCounter}`;
        treeElement.style.height = '100%';
        treeElement.style.width = '100%';
        treeElement.style.backgroundColor = 'brown';
        treeElement.style.display = 'flex';
        treeElement.style.justifyContent = 'center';
        treeElement.style.alignItems = 'center';
        treeElement.style.zIndex = '1'

        treeCounter++;
        document.querySelector('.grass149').appendChild(treeElement)
        this.collidable.push(treeElement);
        this.tree.push(treeElement);
    },
};
//entities.collidable.push(entities.box)

document.addEventListener('DOMContentLoaded', () => {
    //aquí se cargan los datos de el mundo
    mapConstruction()
    const dataSaved = JSON.parse(localStorage.getItem('dataGame'))
    
    if(dataSaved && dataSaved.pos) {
        x = dataSaved.pos.posSavedX;
        y = dataSaved.pos.posSavedy;
        console.log('datos cargados');

    }

});

//función que guarda los datos de forma continua
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

function mapConstruction() {
    let tileIndex = 0;
    let squareIndex = 4;
    for(s=0; s < squareIndex; s++) {
        for(i = 0; i < 49; i++) {
            const tile = document.createElement('div');
            tile.className = `tile-${tileIndex}`;
            tile.style.height = '55px';
            tile.style.width = '55px';
            //tile.style.border = '1px solid gray'; esto añade tamaño al tile, lo que ocasiona que se desborde del marc
            //tile.style.outline = '1px solid gray';
            tile.style.border = 'none';
            tile.style.outline = 'none';
            tile.style.display = 'flex';
            tile.style.justifyContent = 'center';
            tile.style.alignItems = 'center';

            square[s].appendChild(tile)
            tileIndex++;
            entities.createGrass()
        };
    };
    const box2Tile = document.querySelector('.grass0');
    box2Tile.appendChild(box2)
    entities.createTree()

};

function colliding(box, movex, movey) {
    const collidList = entities.collidable;
    for (i = 0; i < collidList.length; i++) {
        const collidableObject = collidList[i];
        const rect = collidableObject.getBoundingClientRect();

        const isColliding = 
        box.right + (movex + 2) > rect.left && 
        box.left + (movex - 2) < rect.right && 
        box.top + (movey - 2) < rect.bottom && 
        box.bottom + (movey + 2) > rect.top

        if(isColliding) return true;
    }
    return false;
}


let keyChanges = [false/*w*/, false/*a*/, false/*s*/, false/*d*/];

//función que actualiza los datos por cada frame
function gameLoop() {

    const boxSize = box.getBoundingClientRect();
    const box2Size = box2.getBoundingClientRect();
    const marcSize2 = marc.getBoundingClientRect();
    const maxAreaX = (marcSize2.width - boxSize.width) / 2;
    const maxAreaY = (marcSize2.height - boxSize.height) / 2;

    let moveX = 0;
    let moveY = 0;
 
    if(localStorage.getItem('dataGame')) {
        let lastGameData = localStorage.getItem('dataGame');
        let GameData = JSON.parse(lastGameData)
        x = GameData.pos.posSavedx;
        y = GameData.pos.posSavedy;

    };
    
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

    const collision = colliding(boxSize, moveX, moveY);
    
    //costante de colisión
    /*const collid = 
        boxSizeProbe.right + (moveX + 2) > boxSize2Probe.left && 
        boxSizeProbe.left + (moveX -2) < boxSize2Probe.right && 
        boxSizeProbe.top + (moveY - 2) < boxSize2Probe.bottom && 
        boxSizeProbe.bottom + (moveY + 2) > boxSize2Probe.top;

    if(collision) { // hay que hacer ostro sistema diferente, que funcione igual pero con rebote, no sirve este
        notices.style.display = 'block';
        console.log("colisionas");
        //aquí se puede meter un if el cual te permita moverte unos px más para así se quede activo el "colision" y poder acceder a inventario si lo hay
    } else {
        notices.style.display = 'none';
        notices.innerHTML = 'presiona E para acceder al inventario'
        x += moveX;
        y += moveY;

    };*/

    if(collision) {
        notices.style.display = 'block';
        console.log("colisionas");
        notices.innerHTML = 'presiona E para acceder al inventario'
        //x += moveX;
        //y += moveY;
    } else {
        notices.style.display = 'none';
        x += moveX;
        y += moveY;
    }
    
    marc.style.transform = `translate(${-x}px, ${-y}px)`;
    saveData()
    requestAnimationFrame(gameLoop);

};

//iniciar el game loop
gameLoop();

//evento que detecta si una tecla ha sido presionada
document.addEventListener('keydown', (event) => {

    const key = event.key.toLowerCase();
    if(key === 'arrowup' ||
        'arrowleft' ||
        'arrowdown' ||
        'arrowright'
    ) {
        event.preventDefault();
    };

    if(key === 'w' || key === 'arrowup') {keyChanges[0] = true;}
    else if(key === 'a' || key === 'arrowleft') {keyChanges[1] = true;}
    else if(key === 's' || key === 'arrowdown') {keyChanges[2] = true;}
    else if(key === 'd' || key === 'arrowright') {keyChanges[3] = true;};

});

//evento que detecta si una tecla ha dejado de ser presionada
document.addEventListener('keyup', (event) => {

    const key = event.key.toLowerCase();
    if(key === 'arrowup' ||
        'arrowleft' ||
        'arrowdown' ||
        'arrowright'
    ) {
        event.preventDefault();
    };

    if(key === 'w' || key == 'arrowup') {keyChanges[0] = false;} 
    else if (key === 'a' || key === 'arrowleft') {keyChanges[1] = false;}
    else if (key === 's' || key === 'arrowdown') {keyChanges[2] = false;}
    else if (key === 'd' || key === 'arrowright') {keyChanges[3] = false;};

});
