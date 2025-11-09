const box = document.querySelector('.box');
const marc = document.querySelector('.marc');

const boxSize = box.getBoundingClientRect();
const marcSize = box.getBoundingClientRect();

console.log(boxSize, marcSize);

let x = 0;
let y = 0;
let paso = 2;

let keyChanges = [false/*w*/, false/*a*/, false/*s*/, false/*d*/];
let keyOrder = ['a','w','s','d',];
const moves = {
    'w':() => y -= paso,
    'a':() => x -= paso,
    's':() => y += paso,
    'd':() => x += paso
}

console.log(moves[1])

document.addEventListener('keydown', (event) => {
    if(event.key == 'w') {
        keyChanges[0] = true;
        //y -= paso esto es lo mismo que hacer esto y = y - paso
        console.log('estás pulsando la w')
    } else if(event.key == 'a') {
        keyChanges[1] = true;
        //x -= paso esto es lo mismo que hacer esto y = y - paso
        console.log('estás pulsando la a')
    } else if(event.key == 's') {
        keyChanges[2] = true;
        //y += paso esto es lo mismo que hacer esto y = y - paso
        console.log('estás pulsando la s')
    } else if(event.key == 'd') {
        keyChanges[3] = true;
        //x += paso esto es lo mismo que hacer esto y = y - paso
        console.log('estás pulsando la d')
    };

    if(keyChanges[0] && keyChanges[1]) {y -= paso; x -= paso;}
    else if(keyChanges[0] && keyChanges[3]) {y -= paso; x += paso;}
    else if(keyChanges[2] && keyChanges[1]) {y += paso; x -= paso;}
    else if(keyChanges[2] && keyChanges[3]) {y += paso; x += paso;}
    else {
        moves[event.key]();
    };
    
    box.style.transform = `translate(${x}px, ${y}px)`;
});

function updateMove() {
    for(i = 0; i < keyChanges.length; i++) {
        if(keyChanges[i] == true) {
            moves[keyOrder[i]]();
        };
    };
    box.style.transform = `translate(${x}px, ${y}px)`;
};

document.addEventListener('keyup', (event) => {
    // hacer una función que reitere en la lista de teclas para ver cuál están siendo presionadas y así ejecutar el movimiento en la que está siendo presionada
    console.log(`se ha dejado de presionar ${event.key}`)
    if(event.key == 'w') {
        keyChanges[0] = false;
    } else if (event.key == 'a') {
        keyChanges[1] = false;
    } else if (event.key == 's') {
        keyChanges[2] = false;
    } else if (event.key == 'd') {
        keyChanges[3] = false;
    }

    updateMove();
    console.log(keyChanges)
});
