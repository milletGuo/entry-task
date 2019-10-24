import Geometry from './Geometry';

// function Point(x, y) {
//     // 继承父类的属性
//     Geometry.call(this);
//     this.x = ((typeof x) === "number") ? x : 0;
//     this.y = ((typeof y) === "number") ? y : 0;
// }

// // 继承父类的原型
// let subType = Object.create(Geometry.prototype);
// subType.constructor = "Point";
// Point.prototype = subType;

// Point.prototype.render = function (context) {
//     context.beginPath();
//     context.fillStyle = this.fillColor;
//     context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
//     context.fill();
// }

class Point extends Geometry {
    constructor(x, y) {
        super();
        this.x = ((typeof x) === "number") ? x : Math.round(Math.random() * 990 + 5);
        this.y = ((typeof y) === "number") ? y : Math.round(Math.random() * 530 + 5);
    }

    /**
     * 绘制点
     * @param {Object} context 绘图对象
     */
    render(context) {
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillColor;
        context.fill();
    }
}

export default Point;