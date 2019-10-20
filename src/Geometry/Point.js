function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.getX = function () {
    return this.x;
};

Point.prototype.setX = function (x) {
    this.x = x;
}

Point.prototype.getY = function () {
    return this.y;
}

Point.prototype.setY = function (y) {
    this.y = y;
}

Point.prototype.render = function (context) {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
}

export default Point;