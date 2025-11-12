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

        /*for(i = 0; i < keyChanges.length; i++) {
            keyChanges[i] = false;
        }*/
        //console.log(`estos son tus últimos pasos ${lastStep}`)
        if(lastStep.length < 2 && counterColision < 1) {
            lastStep.push(x,y);
            counterColision ++;
            console.log(counterColision);
            console.log(lastStep);
            x = lastStep[0]
            y = lastStep[1]
            console.log(lastStep)
        }

        if(x < 0 && counterColision == 1) {
            box.style.transform = `translate(${x-=200}px, ${y-=200}px)`;
            console.log("para la izquierda")
        }

        console.log("estás chocando");
        console.log(lastStep)

    } else {
        box.style.transform = `translate(${x}px, ${y}px)`;
    };
    
    requestAnimationFrame(gameLoop);
}
