let bg;
let coords = [];
let hist = [];

function preload(){
    bg = loadImage('assets/bg.jpg');
    savedData = loadJSON('assets/savedData.json');
}

function mousePressed(){
    if(mouseButton == LEFT){
        coords.push({x: mouseX - width / 2, y: mouseY - height / 2});
        print(coords);
        hist = [];
    }
}

function keyPressed(){
    if(key == 'u' || key == 'U'){
        hist.push(coords.pop());
    }else if(key == 'r' || key == 'R'){
        if(hist.length > 0){
            coords.push(hist.pop());
        }
    }else if(key == 's' || key == 'S'){
        saveJSON({coords}, 'savedData.json');
    }
}

function setup() {
    createCanvas(bg.width, bg.height);    
    let oldCoords = savedData.coords; 
    oldCoords.forEach(coord => {
        coords.push(coord);
    })
}

function draw() {
    background(bg);
    
    noFill();
    stroke(255);
    if(coords.length > 0){
        beginShape();
        coords.forEach(coord => {
            vertex(coord.x + width / 2, coord.y + height /2);
            ellipse(coord.x + width /  2, coord.y + height /2, 2)
        });
        vertex(coords[0].x + width / 2, coords[0].y + height / 2)
        endShape();
    }
}