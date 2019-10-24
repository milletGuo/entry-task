import Geometry from './Geometry';
import { createPaths } from './tool.js';

// function Polyline(paths) {
//     Geometry.call(this);
//     this.paths = (paths instanceof Array) ? paths : [];
// }

// Polyline.prototype.render = function (context) {
//     context.beginPath();
//     context.strokeStyle = this.strokeColor;
//     context.lineWidth = this.lineWidth;
//     const paths = this.paths.slice();
//     context.moveTo(paths[0].x, paths[0].y);
//     for (let i = 1; i < paths.length; i++) {
//         context.lineTo(paths[i].x, paths[i].y);
//     }
//     context.stroke();
// }

class Polyline extends Geometry {
    constructor(paths) {
        super();
        this.paths = (paths instanceof Array) ? paths : createPaths();
    }

    /**
     * 绘制折线
     * @param {Object} context 绘图对象
     */
    render(context) {
        context.beginPath();
        context.moveTo(this.paths[0].x, this.paths[0].y);
        for (let i = 1; i < this.paths.length; i++) {
            context.lineTo(this.paths[i].x, this.paths[i].y);
        }
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.lineWidth;
        context.stroke();
    }
}

export default Polyline;