function Polyline(points) {
    this.points = points;
}

Polyline.prototype.render = function (context) {
    context.beginPath();
    context.strokeStyle = "blue";
    const paths = this.points.slice();
    context.moveTo(paths[0].x, paths[0].y);
    for (let i = 0; i < paths.length; i++) {
        context.lineTo(paths[i].x, paths[i].y);
    }
    context.stroke();
}

export default Polyline;