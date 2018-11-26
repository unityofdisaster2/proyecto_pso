class Nodo{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}

class Arista{
    constructor(x1,y1,x2,y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

class Peso{
    constructor(peso,x,y){
        this.peso = peso;
        this.x = x;
        this.y = y;
    }
}


let aristas = [];
let vertices = [];
let coordenadas = [];
let pesos = [];
var  btn_vertice,btn_arista,bandera_arista,bandera_nodo;

function setup() {

  // create canvas
  canvas = createCanvas(710, 400);
  canvas.mousePressed(canvas_pressed);
  noLoop();
  createDiv("");

  btn_vertice = createButton('Crear Nodo');
  btn_vertice.position(0, 0);
  btn_vertice.mousePressed(dibuja_nodo);
  
  btn_arista = createButton('Dibuja Arista');
  btn_arista.position(btn_vertice.x + btn_vertice.width, 0);
  btn_arista.position(btn_vertice.x + btn_vertice.width, 0);
  btn_arista.mousePressed(dibuja_arista);

  input = createInput("ingrese peso");
  input.position(btn_arista.x + btn_arista.width,0);
  btn_iniciar = createButton("Iniciar");
  btn_iniciar.position(input.x + input.width,0);
  btn_iniciar.mousePressed(iniciar_algoritmo);


  btn_limpiar = createButton("Limpiar");
  btn_limpiar.position(btn_iniciar.x + btn_iniciar.width,0);
  btn_limpiar.mousePressed(borrar);
  
  //button.mousePressed(greet);





  textAlign(CENTER);
  textSize(20);
}

function borrar() {
    location.reload(); // remove whole sketch on mouse press
}


function iniciar_algoritmo(){
    if(aristas.length >=1 && vertices.length>=1){
        n = vertices.length;
        n_aristas = (n*(n-1))/2;
        if (aristas.length != n_aristas){
            alert("no se puede iniciar");
        }
        else{
            alert("iniciando");
        }
    }
    else{
        alert("no se puede iniciar");
    }
}

function dibuja_nodo(){
    bandera_nodo = true;
    bandera_arista = false;    
}

function dibuja_arista(){
    bandera_nodo = false;
    bandera_arista = true;
}

let clickuno = true;
let draw_a = true;
function canvas_pressed(){
    if(bandera_nodo){
        vertices.push(new Nodo(mouseX,mouseY,80,80));
    }
    else if(bandera_arista){
        if(clickuno){
            coordenadas.push(mouseX);
            coordenadas.push(mouseY);
            clickuno = false;
            //draw_a = false;
        }
        else{
            coordenadas.push(mouseX);
            coordenadas.push(mouseY);
            aristas.push(new Arista(coordenadas[0],coordenadas[1],coordenadas[2],coordenadas[3]));
            var c_aux;
            c_aux = genera_centros(coordenadas[0],coordenadas[1],coordenadas[2],coordenadas[3]);
            pesos.push(new Peso(input.value(),c_aux[0],c_aux[1]));
            c_aux = [];
            coordenadas = [];
            clickuno = true;
            //draw_a = true;
        }
        console.log(aristas);
        
    }
}

function genera_centros(x1,y1,x2,y2){
    let centros = [];
    console.log("coord",x1,x2);
    centros.push((x2+x1)/2);
    centros.push((y2+y1)/2);
    return centros;
}


function guarda_valores(){
    bandera_arista = false;
}

/*
function dibuja_nodo(){
    aristas.push(new Arista(mouseX,mouseY));
    if(cont==0){
        aristas.pop();
    }
    for(let i = 0; i<aristas.length;i++){
            ellipse(aristas[i].x,aristas[i].y,40,40);
    }
    alert("hola");
}
*/
let cont = 0;
function draw() {
    background(255);
    for(let i = 0; i<vertices.length;i++){
        ellipse(vertices[i].x,vertices[i].y,40,40);
    }
    if(draw_a){
        for(let i = 0; i< aristas.length; i++){
            line(aristas[i].x1,aristas[i].y1,aristas[i].x2,aristas[i].y2);
        }
    }
    for(let i = 0;i<pesos.length;i++){
        text(pesos[i].peso,pesos[i].x,pesos[i].y);
    }
    console.log(pesos);
  }



function mouseClicked(){
    redraw();
}





