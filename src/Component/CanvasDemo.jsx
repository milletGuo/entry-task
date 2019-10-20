import React from 'react';
import '../index.css';
import Point from '../Geometry/Point';
import Polyline from '../Geometry/Polyline';
import Polygon from '../Geometry/Polygon'

class CanvasDemo extends React.Component {

    handleClick() {
        let draw = document.getElementById("draw");
        let context = draw.getContext("2d");
        context.clearRect(0, 0, draw.width, draw.height);
        let points = [];
        for (let i = 0; i < 5; i++) {
            let x = Math.round(Math.random() * 530 + 5);
            let y = Math.round(Math.random() * 530 + 5);
            let point = new Point(x, y);
            points.push(point);
        }
        
        points.push(points[0]);

        // 画点
        points.forEach((data) => {
            data.render(context);
        });

        // 画折线
        let polyline = new Polyline(points);
        polyline.render(context);

        // 画面
        let polygon = new Polygon(points);
        polygon.render(context);
    }


    render() {
        return (
            <div className="canvasDiv">
                <canvas id="draw" className="canvas" width="540" height="540"></canvas>
                <button className="refresh" onClick={this.handleClick.bind(this)}>刷新</button>
            </div>
        );
    }
}

export default CanvasDemo;