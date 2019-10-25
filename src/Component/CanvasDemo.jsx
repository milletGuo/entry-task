import React from 'react';
import '../index.css';
import Point from '../Geometry/Point';
import Polyline from '../Geometry/Polyline';
import Polygon from '../Geometry/Polygon';

class CanvasDemo extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    /**
     * 处理刷新按钮点击事件
     */
    handleClick() {
        let draw = this.myRef.current;
        let context;
        if (draw.getContext) {
            context = draw.getContext("2d");
        } else {
            alert("浏览器不支持2D绘图！！！");
            return;
        }
        
        // 清除画布区域
        context.clearRect(0, 0, draw.width, draw.height);

        // 存储几何要素
        let geometrys = [];         

        // 产生几何要素(点、线、面)
        for (let i = 0; i < 5; i++) {
            geometrys.push(new Point());
            geometrys.push(new Polyline());
            geometrys.push(new Polygon());
        }

        // 在画布上绘制几何要素
        for (let i = 0; i < geometrys.length; i++) {
            geometrys[i].render(context);
        }
    }

    render() {
        return (
            <div className="canvasDiv">
                <canvas className="canvas" ref={this.myRef} width="1000" height="540"></canvas>
                <button className="refresh" onClick={this.handleClick.bind(this)}>刷新</button>
            </div>
        );
    }
}

export default CanvasDemo;