class Sprite{
    constructor(speed,x,y,animation){
        this.x = x;
        this.y = y;
        this.animation =  animation;
        this.speed = speed;
        this.index = 0;
        this.len = this.animation.length;
    }
    animate(){
        this.index += this.speed;
        this.x += this.speed*5;
        this.y += this.speed*5;
        if(this.x > width){
            //asumiendo que todas las imagenes tengan la misma anchura
            this.x = -this.animation[0].width;
        }
        if(this.y > height){
            //asumiendo que todas las imagenes tengan la misma anchura
            this.y = -this.animation[0].width;
        }

    }
    show(){
        let index = floor(this.index) % this.len;
        image(animation[index],this.x,this.y);
    }
}
