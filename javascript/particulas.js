class Grafo{
    constructor(cantidad_vertices){
        this.aristas = {};
        this.vertices = new Set();
        this.cantidad_vertices = cantidad_vertices;
    }
    existeArista(origen,destino){
        let temp = new Array(origen,destino);
        if(temp in this.aristas){
            return true;
        }
        else{
            return false;
        }
    }
    obtenerVertices(){
        return this.cantidad_vertices;
    }
    agregarAristas(origen,destino,costo){
        let temp = new Array(origen,destino);
        if(!this.existeArista(origen,destino)){
            this.aristas[temp] = costo;
            this.vertices.add(origen);
            this.vertices.add(destino);
        }
    }

    
    mostrarGrafo(){
        console.log("mostrando grafo:");   
        for(var arista in this.aristas){
            let comma = arista.indexOf(",");
            let temp_sl1 = arista.slice(0,comma);
            let temp_sl2 = arista.slice(comma+1,arista.length);
            console.log(temp_sl1," ligado con ",temp_sl2,"con un costo de: ",this.aristas[arista]);
        }
    }

    obtenerCosto(ruta){
        let costo_total = 0;
        for(let i =0 ; i<this.cantidad_vertices -1;i++){
            costo_total += this.aristas[new Array(ruta[i],ruta[i+1])];
        }
        costo_total += this.aristas[new Array(ruta[this.cantidad_vertices-1],ruta[0])];
        return costo_total;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    obtenerRutasAleatorias(tamano_maximo){
        let rutas_aleatorias  = [];
        let lista_vertices = Array.from(this.vertices);
        let vertice_inicial = lista_vertices[Math.floor(Math.random()*lista_vertices.length)];
        if(vertice_inicial in lista_vertices == false){
            console.log("error");
            return 0;
        }
        let filtro = lista_vertices.filter(valor => valor != vertice_inicial);
        lista_vertices = filtro;
        lista_vertices.reverse();
        lista_vertices.push(vertice_inicial);
        lista_vertices.reverse();
        for(let i = 0; i<tamano_maximo;i++){
            let list_temp = lista_vertices.slice(1,lista_vertices.length);
            list_temp = this.shuffle(list_temp);
            list_temp.reverse();
            list_temp.push(vertice_inicial);
            list_temp.reverse();
            if(list_temp in rutas_aleatorias == false){
                rutas_aleatorias.push(list_temp);
            }
        }
        return rutas_aleatorias;
    }
}


class GrafoCompleto extends Grafo{
    generar(){
        for(let i = 0; i<this.cantidad_vertices;i++){
            for(let j = 0; j<this.cantidad_vertices;j++){
                if(i != j){
                    let costo = Math.floor(Math.random() * (10 - 1) + 1);
                    this.agregarAristas(i,j,costo);
                }
            }
        }
    }
}



class Particula{
    constructor(solucion,costo){
        this.solucion = solucion;
        this.mejorp = solucion;
        this.costo_solucion_actual = costo;
        this.costo_solucion_mejorp = costo;
        this.velocidad = [];
    }

    setMejorP(nueva_mejor ){
        this.mejorp = nueva_mejor ;
    }

    obtenerMejorP(){
        return this.mejorp;
    }

    setVelocidad(nueva_velocidad){
        this.velocidad = nueva_velocidad;
    }

    obtenerVelocidad(){
        return this.velocidad;
    }

    setSolucionActual(solucion){
        this.solucion = solucion;
    }

    obtenerSolucionActual(){
        return this.solucion;
    }

    setCostoMejorP(costo){
        this.costo_solucion_mejorp = costo;
    }

    obtenerCostoMejorP(){
        return this.costo_solucion_mejorp;
    }

    setCostoSolucionActual(costo){
        this.costo_solucion_actual = costo;
    }

    obtenerCostoSolucionActual(){
        return this.costo_solucion_actual;
    }

    reiniciarVelocidad(){
        let tamanio = this.velocidad.length;
        let i = 0;
        while(i<tamanio){this.velocidad.pop();i+=1;}
    }
}


class PSO{
    constructor(graph,iteraciones,poblacion,beta,alfa){
        this.graph = graph;
        this.iteraciones = iteraciones;
        this.poblacion = poblacion;
        this.particulas = [];
        this.beta = beta;
        this.alfa = alfa;
        let soluciones = this.graph.obtenerRutasAleatorias(poblacion);

        if (soluciones.length == 0){
            print("Poblacion vacia, intente de nuevo");
        }
        else{

        }
        for(let solucion of soluciones){
            let costo = graph.obtenerCosto(solucion);
            let particula = new Particula(solucion,costo);
            this.particulas.push(particula);
        }
        console.log(this.particulas);
        this.poblacion = this.particulas.length;
    }

    setMejorGlobal(nuevo_global){
        this.mejor_global = nuevo_global;
    }

    obtenerMejorGlobal(){
        return this.mejor_global;
    }

    mostrarParticulas(){
        console.log("mostrando particulas...");
        for(let particula of this.particulas){
            console.log("mejorp: ",particula.obtenerMejorP()," costo pbest: ",particula.obtenerCostoMejorP()," solucion actual: ",particula.obtenerSolucionActual()," costo de solucion actual: ",particula.obtenerCostoSolucionActual());
        }
    }

    minimo(partic){
        let min = 10000000000;
        let temp_part;
        for(let part of partic){
            let costo = part.obtenerCostoMejorP();
            //console.log(costo);
            if(costo < min){
                min = costo;
                temp_part = part;
            }
        }
        return temp_part;
    }
    ejecutar(){
        for(let t =0;t<this.iteraciones;t++){
            this.mejor_global = this.minimo(this.particulas);
            for(let particula of this.particulas){
                particula.reiniciarVelocidad();
                let velocidad_temporal = [];
                let solucion_mejor_global = Array.from(this.mejor_global.obtenerMejorP());
                let solucion_mejorp = Array.from(particula.obtenerMejorP());
                let solucion_particula_actual = Array.from(particula.obtenerSolucionActual());
                
                for(let i = 0; i<this.graph.obtenerVertices();i++){
                    if(solucion_particula_actual[i] != solucion_mejorp[i]){
                        let operador_intercambio = [i,solucion_mejorp.indexOf(solucion_particula_actual[i]),this.alfa];
                        velocidad_temporal.push(operador_intercambio);
                        let aux = solucion_mejorp[operador_intercambio[0]];
                        solucion_mejorp[operador_intercambio[0]] = solucion_mejorp[operador_intercambio[1]];
                        solucion_mejorp[operador_intercambio[1]] = aux;

                    }
                }

                for (let i = 0; i < this.graph.obtenerVertices(); i++) {
                    if(solucion_particula_actual[i] != solucion_mejor_global[i]){
                        let operador_intercambio = [i,solucion_mejor_global.indexOf(solucion_particula_actual[i]),this.beta];
                        velocidad_temporal.push(operador_intercambio);
                        let aux = solucion_mejor_global[operador_intercambio[0]];
                        solucion_mejor_global[operador_intercambio[0]] = solucion_mejor_global[operador_intercambio[1]];
                        solucion_mejor_global[operador_intercambio[1]] = aux;
                        
                    }
                }
                
                particula.setVelocidad(velocidad_temporal);
                for(let operadores of velocidad_temporal){
                    if (Math.random() <= operadores[2]){
                        let aux = solucion_particula_actual[operadores[0]];
                        solucion_particula_actual[operadores[0]] = solucion_particula_actual[operadores[1]];
                        solucion_particula_actual[operadores[1]] = aux;
                    }
                }
                particula.setSolucionActual(solucion_particula_actual);
                let costo_current = this.graph.obtenerCosto(solucion_particula_actual);
                particula.setCostoSolucionActual(costo_current);
                
                
                if (costo_current < particula.obtenerCostoMejorP()){
                    particula.setMejorP(solucion_particula_actual);
                    particula.setCostoMejorP(costo_current);
                }
            }
        }
    }
}






g = new Grafo(4);
g.agregarAristas(0, 1, 9)
g.agregarAristas(1, 0, 9)
g.agregarAristas(0, 2, 10)
g.agregarAristas(2, 0, 10)
g.agregarAristas(0, 3, 2)
g.agregarAristas(3, 0, 2)

g.agregarAristas(1, 2, 5)
g.agregarAristas(2, 1, 5)
g.agregarAristas(1, 3, 7)
g.agregarAristas(3, 1, 7)

g.agregarAristas(3, 2, 6)
g.agregarAristas(2, 3, 6)

pso = new PSO(g,100,10,1,0.9);
pso.ejecutar();
pso.mostrarParticulas();
//g1.mostrarGrafo();
//console.log(g1.aristas);
console.log("mejor global: ",pso.obtenerMejorGlobal().obtenerMejorP()," costo: ",pso.obtenerMejorGlobal().obtenerCostoMejorP())

