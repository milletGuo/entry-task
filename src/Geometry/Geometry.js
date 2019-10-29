// function Geometry() {
//     this.fillColor = "red";
//     this.strokeColor = "blue";
//     this.lineWidth = 3;
// }

// Geometry.prototype.clearCanvas = function (context, draw) {
//     context.clearRect(0, 0, draw.width, draw.height);
// }


class Geometry {
    constructor() {

        this.fillColor = "red";

        this.strokeColor = "blue";
        
        this.lineWidth = 3;
    }

    /**
     * 抽象方法，子类必须实现
     * @param {Object} context 
     */
    render(context) {
        throw new Error('Unimplemented abstract method.');
    }
}

export default Geometry;
