let animation = []
let sprite_data;
let sprite_frames;

let ants = [];

function preload(){
    //sprite_frames = loadImage("../imgs/ant.png");
    sprite_data = loadJSON("../imgs/cuadros_hormiga.json");
    sprite_frames = loadImage("../imgs/ant.png");
}


//var x = [0,64,128,192];
//var x = [0,256,256*2,256*3,256*4,256*5,256*6];

function setup() {
    createCanvas(640, 480);
    let frames = sprite_data.frames;
    for(let i = 0; i<frames.length;i++){
        let pos = frames[i].position;
        let img = sprite_frames.get(pos.x,pos.y, pos.w,pos.h);
        animation.push(img);
        //animation.push(sprite_frames.get(pos,0,64,64));
        //animation.push(sprite_frames.get(pos,0,256,256));
    }
    for(let i =0; i<100;i++){
        ants[i] = new Sprite(random(0.1,1),100,i*100,animation);
    }
    console.log(ants);  
}


function draw() {
    background(255);
    for(let ant of ants){
        ant.show();
        ant.animate();
    }

}

