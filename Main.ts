class Main {
    private context: any;
    private canvas: any;
    private mouseX = 0;
    private mouseY = 0;
    private arms: Array<Arm> = []
    private numArms = 40;
    private iks1: IKSystem;
    private iks2: IKSystem;
    private iks: Array<IKSystem> = [];

    constructor(canvas: any, context: any) {
        this.canvas = canvas;
        this.context = context;
        this.init();
    }

    mouseMove(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }

    private init() {
        for(let i = 0; i < 4; i++) {
            let iks = new IKSystem(200+80*i,this.canvas.height+5)
            iks.addArm(60,10);
            iks.addArm(60,10);
            iks.addArm(60,5);
            iks.addArm(50,5);
            iks.addArm(40,3);
            iks.addArm(40,2);
            this.iks.push(iks);
        }
        
        /*
        for(let i = 0; i < this.numArms; i++) {
            this.arms.push(new Arm(0,0,10,50))
        }
        
        for(let i = 0; i<this.numArms - 1; i++) {
            this.arms[i].parent = this.arms[i+1];
        }
        */
    }

    run() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.iks.forEach(iks => {

            if(Main.distance(this.mouseX,this.mouseY,iks.x, iks.y)< 400) {
                iks.attract(this.mouseX, this.mouseY);
                iks.reach();
            } else {
                iks.idle();
            }
                
            iks.render(this.context);
        })
/*
        this.iks2.attract(this.mouseX, this.mouseY);
        this.iks2.reach();
        this.iks2.render(this.context);*/

    }

    static distance(x1: number, y1: number, x2: number, y2:number) {
        return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    }
}