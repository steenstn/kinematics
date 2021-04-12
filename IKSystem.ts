class IKSystem {
    x: number;
    y: number;
    private arms: Array<Arm> = [];
    private lastArm: Arm;
    private wantedX: number;
    private wantedY: number;
    private attractionX:number;
    private attractionY: number;
    private wantedTimer = Math.random()*10;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.wantedX = this.x;
        this.wantedY = this.y-100;
        this.attractionX = this.wantedX;
        this.attractionY = this.wantedY;
    }


    addArm(length: number, width: number) {
        let newArm = new Arm(length, width);
        this.arms.push(newArm)
        if(this.lastArm) {
            newArm.parent = this.lastArm;
            this.lastArm = newArm;
        } else {
            this.lastArm = newArm;
        }
        
    }

    attract(x: number, y: number) {
        let angle = Math.atan2(y-this.wantedY, x-this.wantedX);
        if(Main.distance(x,y,this.wantedX,this.wantedY)>9) {

            this.wantedX+=Math.cos(angle)*8;
            this.wantedY+=Math.sin(angle)*8;
        }
    }


    drag(x: number, y: number) {
        this.lastArm.drag(x, y);
    }

    idle() {
        if(Main.distance(this.attractionX,this.attractionY,this.wantedX,this.wantedY)>40) {

            let angle = Math.atan2(this.attractionY-this.wantedY, this.attractionX-this.wantedX);
            this.wantedX+=Math.cos(angle)*4;
            this.wantedY+=Math.sin(angle)*4;
    
        } 
        if(Main.distance(this.attractionX,this.attractionY,this.wantedX,this.wantedY)<5 || this.wantedTimer < 0) {
            let angle = Math.random()*Math.PI*2;
            this.attractionX = this.x+Math.cos(angle)*200;
            this.attractionY = this.y-200+Math.sin(angle)*200;
            this.wantedTimer=Math.random()*15;
        }
        this.wantedTimer--;
        
        this.reach();
    }
    reach() {
        this.drag(this.wantedX, this.wantedY);
        this.update();
    }

    reachForPoint(x: number, y: number) {
        this.drag(x, y);
        this.update();
    }

    update() {
        this.arms.forEach(arm => {
            if(arm.parent != null) {
                arm.x = arm.parent.getEndX();
                arm.y = arm.parent.getEndY();
            } else {
                arm.x = this.x;
                arm.y = this.y;
            }
        })
    }

    render(context: any) {
        let arm = this.arms[0]
        context.strokeStyle="#000";
        context.lineWidth = arm.width;
        context.lineJoin = 'round';
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(arm.getEndX(), arm.getEndY());
        for(let i=1; i<this.arms.length;i++) {
            arm = this.arms[i];
            
            context.lineWidth = arm.width;
            context.lineTo(arm.x, arm.y);
            context.lineTo(arm.getEndX(), arm.getEndY());
            
        context.stroke();
        }
        
        /*this.arms.forEach(arm => {
            arm.render(context);
        });*/
        //context.fillStyle = "#f00";
      //  context.fillRect(this.wantedX, this.wantedY,5,5);
    }
}