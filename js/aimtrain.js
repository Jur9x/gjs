//by jur9x

//konstanty
const inrskore = document.getElementById("skore");

//proměnné
var x, y;
let mainc;
let d;
let promena = 1;
let text = 1;
let skore = 0;
let skoreA = 0;
let oldskore = 0;
let timep = 0;

var start;
var end;
var time;

//center canvas
function centerCanvas() {
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

//třída kruhu
class Mainsp {
    constructor(x, y, p) {
        this.x = width / 2;
        this.y = height / 2;
        this.p = 160;
    }

    draw() {
        circle(this.x, this.y, this.p);
    }
}

//setup
function setup() {
    canvas = createCanvas(windowWidth / 1.2, windowHeight / 1.2);
    centerCanvas();
    canvas.parent("myCanvas");
    mainc = new Mainsp();
}

//main draw
function draw() {
    background(255);
    if (promena == 1) {
        fill("purple");
        mainc.draw();
        oldskore = skore;
    }
    if (promena == 0) {
        textSize(50);
        fill("black");
        canvas.text("Game over!", width / 2 - 140, 220);
        canvas.text(`Your score is ${oldskore}`, width / 2 - 170, 270);
        canvas.text("Click on purple circle to play again!", width / 2 - 380, 320);
        mainc.x = width / 2;
        mainc.y = height / 2;
        fill("purple");
        mainc.draw();
        inrskore.innerHTML = ``
    }
    if (timep == 1) {
        inrskore.innerHTML = `${skore} (${time} ms)`
    }
    if (skoreA == 1) {
        inrskore.innerHTML = `${skore}`
    }
    if (text == 1) {
        textSize(50);
        fill("black");
        canvas.text("Click on purple circle!", width / 2 - 240, 200);
    }
}

//reakce na kliknutí
function mousePressed() {
    if (skoreA == 1) {
        timep = 1;
        skoreA = 2;
    }
    if (skoreA == 0) {
        skoreA = 1;
    }
    text = 0;
    d = dist(mouseX, mouseY, mainc.x, mainc.y);
    if (promena == 0) {
        promena = 1;
        skore = 0;
    }
    if (d < mainc.p / 2) {
        end = new Date().getTime();
        time = end - start;
        console.log(time + " milisekund");
        mainc.x = random(0, width);
        mainc.y = random(0, height);
        skore++;
        start = new Date().getTime();
    } else {
        promena = 0;
        skoreA = 0;
        time = 0;
    }
}