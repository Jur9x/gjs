//by jur9x

//konstanty
const inrskore = document.getElementById("skore");
const inrstart = document.getElementById("start");
const inrtxt = document.getElementById("txt");
const newY = 28;

//proměnné
let canvas, phb;
let spid = 2;
let counter = 0;
let skore = 0;
let promena = 0;
let newX = 300;
let active_coords1 = 201;
let active_coords2 = 799;
let text = 1;
let direction = "true";

//horní obdelník
class kostka {
    constructor(x) {
        this.x = (width / 2);
    }

    draw() {
        push();
        rect((this.x - (newX / 2)), ((height / 2) - 28), newX, newY);
        pop();
    }
}

//pohyb horního obdelníku
function movink() {
    if (direction == "false") {
        phb.x = phb.x - spid;
    }
    if (direction == "true") {
        phb.x = phb.x + spid;
    }
    if (phb.x >= width - 150) {
        direction = "false";
    }
    if (phb.x <= 150) {
        direction = "true";
    }
}

//center canvas
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

//setup
function setup() {
    canvas = createCanvas(1000, 300);
    centerCanvas();
    canvas.parent("myCanvas");
    phb = new kostka();
}

//main draw
function draw() {
    background(255);
    if (promena == 0) {
        fill("purple");
        rect((width / 2) - newX / 2, (height / 2), newX, 28);
        phb.draw();
        movink();
        oldskore = skore;
    }
    if (text == 1) {
        textSize(50);
        fill("black");
        canvas.text("Click to play!", width / 2 - 150, 50);
    }
    if (promena == 1) {
        inrskore.innerHTML = ``
        textSize(50);
        fill("black");
        canvas.text("Click to play again!", width / 2 - 210, 50);
        canvas.text(`Your score is ${oldskore}`, width / 2 - 170, 100);
    }
}

//reakce na kliknutí
function mousePressed() {
    text = 0
    if (promena == 1) {
        promena = 0;
        skore = -1;
    }
    if (phb.x < active_coords1 || phb.x > active_coords2) {
        moving = "false";
        promena = 1;
        game_end();
        console.log("ne");
    } else {
        if (phb.x == 500) {
            console.log("nice")
        } else if (phb.x < 500) {
            newX = newX - (500 - phb.x);
        } else if (phb.x > 500) {
            newX = newX - (phb.x - 500);
        }
        //skore
        skore++;
        //nové souřadky
        active_coords1 = 501 - newX;
        active_coords2 = 499 + newX;
        //zápis skore
        inrskore.innerHTML = `${skore}`;
        //speechange
        counter++;
        spid = counter * 2;
    }
}

//funkce konce hry
function game_end() {
    phb.x = 500;
    spid = 2;
    counter = 0;
    oldX = 0;
    newX = 300;
    active_coords1 = 201;
    active_coords2 = 799;
    moving = "true";
    direction = "true";
}