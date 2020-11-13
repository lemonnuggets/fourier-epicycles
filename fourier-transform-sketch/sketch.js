let time = 0;
let scale = 0.5;
let signal = [];
let fourierTransform = [];
let trail = [];
let dt;
let coords;
function dft(signal){
    let N = signal.length;
    let results = [];
    for(let k = 0; k < N; k++){
        let sum = new Complex(0, 0);
        for(let n = 0; n < N; n++){
            let phi = TWO_PI * k * n / N;
            let c = new Complex(cos(phi), -sin(phi));
            sum = sum.add(signal[n].mult(c));
        }
        sum.re /= N;
        sum.im /= N;
        let freq = k;
        let phase = sum.getPhase();
        let amp = sum.getMagnitude();
        results.push({num: sum, freq, phase, amp});
    }
    return results;
}
function epicycles(x, y, rotation, fourier, time){
    fourier.sort((a, b) => b.amp - a.amp);
    let prevX = x;
    let prevY = y;
    let prevRotation = rotation;
    for(let i = 0; i < fourier.length; i++){
        let radius = fourier[i].amp;
        let freq = fourier[i].freq;
        let angle = freq * time + prevRotation + fourier[i].phase;
        // prevRotation = angle;
        let currentX = prevX + radius * cos(angle);
        let currentY = prevY + radius * sin(angle);
        push();
        noFill();
        ellipse(prevX, prevY, 2 * radius);
        line(prevX, prevY, currentX, currentY);
        pop();
        prevX = currentX;
        prevY = currentY;
    }
    return {x: prevX, y: prevY};
}
function keyPressed(){
    if(key == 'p' || key == 'P'){
        time = 0;
        trail = [];
        loop();
    }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    time = 0;
    trail = [];
    loop();
}
function preload(){
    // replace assets/new-final.json with location to the coords
    savedData = loadJSON('assets/new-final.json');
}
function setup() {
    createCanvas(windowWidth - 10, windowHeight - 16);    
    // for(let i = 0; i < 300; i++){
    //     // signal.push(new Complex(random(-100, 100), random(-100, 100)))
    //     signal.push(new Complex(noise(i / 100) * 1000 - 500, noise(i / 100 + 100) * 1000 - 500))
    //     // signal.push(new Complex())
    // }
    let coords = savedData.coords;
    coords.forEach(coord => {
        signal.push(new Complex(coord.x * scale, coord.y * scale))
    });
    fourierTransform = dft(signal);
    dt = TWO_PI / fourierTransform.length;
}

function draw() {
    background(51);
    if(time > TWO_PI){
        noLoop();
        // time = 0;
        // trail = [];
    }
    trail.push(epicycles(width / 2, height / 2, 0, fourierTransform, time));
    push();
    noFill();
    stroke(255);
    beginShape();
    for(let i = 0; i < trail.length; i++){
        vertex(trail[i].x, trail[i].y);
    }
    endShape();
    pop();
    time += dt;
}