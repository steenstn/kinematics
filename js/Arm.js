class Arm {
    constructor(length, width = 3) {
        this.x = 0;
        this.y = 0;
        this.length = length;
        this.angle = 0;
        this.width = width;
    }
    getEndX() {
        return this.x + Math.cos(this.angle) * this.length;
    }
    getEndY() {
        return this.y + Math.sin(this.angle) * this.length;
    }
    lookAt(x, y) {
        this.angle = Math.atan2(y - this.y, x - this.x);
    }
    drag(x, y) {
        this.lookAt(x, y);
        this.x = x - this.length * Math.cos(this.angle);
        this.y = y - this.length * Math.sin(this.angle);
        if (this.parent != null) {
            this.parent.lookAt(this.x, this.y);
            this.parent.drag(this.x, this.y);
        }
    }
    render(context) {
    }
}
