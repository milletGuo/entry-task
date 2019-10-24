import Geometry from './Geometry';
import { createRings } from './tool.js';

// function Polygon(rings) {
//     // 继承父类的属性
//     Geometry.call(this);
//     this.rings = (rings instanceof Array) ? rings : [];
// }

// // 继承父类的方法
// Polygon.prototype = new Geometry();

// Polygon.prototype.render = function (context) {
//     context.beginPath();
//     context.fillStyle = this.fillColor;
//     const rings = this.rings.slice();
//     context.moveTo(rings[0].x, rings[0].y);
//     for (let i = 1; i < rings.length; i++) {
//         context.lineTo(rings[i].x, rings[i].y);
//     }
//     context.fill();
// }

class Polygon extends Geometry {
    constructor(rings) {
        super();
        this.rings = (rings instanceof Array) ? rings : createRings();
    }

    /**
     * 绘制多边形
     * @param {Object} context 绘图对象
     */
    render(context) {
        context.beginPath();
        context.moveTo(this.rings[0].x, this.rings[0].y);
        for (let i = 1; i < this.rings.length; i++) {
            context.lineTo(this.rings[i].x, this.rings[i].y);
        }
        context.closePath();
        context.fillStyle = "rgba(0,0,255,0.2)";
        context.fill();
    }
}

export default Polygon;