class Main {
    constructor(canvas, context) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.iks = [];
        this.canvas = canvas;
        this.context = context;
        this.init();
    }
    mouseMove(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
    init() {
        for (let i = 0; i < 4; i++) {
            let iks = new IKSystem(200 + 80 * i, this.canvas.height + 5);
            for (let a = 0; a < 6; a++) {
                iks.addArm(20, 10);
            }
            for (let a = 0; a < 10; a++) {
                iks.addArm(10, 8);
            }
            for (let a = 0; a < 10; a++) {
                iks.addArm(10, 6);
            }
            for (let a = 0; a < 6; a++) {
                iks.addArm(5, 4);
            }
            for (let a = 0; a < 6; a++) {
                iks.addArm(5, 2);
            }
            this.iks.push(iks);
        }
    }
    run() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.iks.forEach(iks => {
            if (Main.distance(this.mouseX, this.mouseY, iks.x, iks.y) < 450) {
                iks.attract(this.mouseX, this.mouseY);
                iks.reach();
            }
            else {
                iks.idle();
            }
            iks.render(this.context);
        });
    }
    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
