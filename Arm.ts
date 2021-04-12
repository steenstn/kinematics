class Arm {
    x: number;
    y: number;
    angle: number;
    length: number;
    width: number;
    parent: Arm;

    constructor(length: number, width: number = 3) {
        this.x = 0;
        this.y = 0;
        this.length = length;
        this.angle = 0;
        this.width = width;
    }

    getEndX() {
        return this.x + Math.cos(this.angle) * this.length
    }
    
    getEndY() {
        return this.y + Math.sin(this.angle) * this.length
    }

    lookAt(x:number, y:number) {
        this.angle = Math.atan2(y-this.y,x-this.x);
    }

    drag(x: number, y: number) {
        
        this.lookAt(x, y);
        this.x = x - this.length*Math.cos(this.angle);
        this.y = y - this.length*Math.sin(this.angle);
        if(this.parent != null) {
            this.parent.lookAt(this.x, this.y);
            this.parent.drag(this.x, this.y);
        }
    }

    
    render(context: any) {
      /*  context.strokeStyle="#000";
        context.lineWidth = this.width;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.getEndX(), this.getEndY());
        context.stroke();*/

    }
}
