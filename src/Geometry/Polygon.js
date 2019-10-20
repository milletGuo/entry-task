function Polygon(rings) {
    this.rings = (rings instanceof Array) ? rings : [];
}

Polygon.prototype.render = function (context) {
    context.beginPath();
    context.fillStyle = "rgba(255,0,0,0.5)";
    const rings = this.rings.slice();
    context.moveTo(rings[0].x, rings[0].y);
    for (let i = 1; i < rings.length; i++) {
        context.lineTo(rings[i].x, rings[i].y);
    }
    context.fill();
    context.closePath();
}

export default Polygon;