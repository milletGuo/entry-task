import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

class TableTools extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * 点击新建按钮打开新建数据窗口
     */
    onHandleClick() {
        this.props.create();
    }

    render() {
        return (
            <div style={{ margin: "30px 20px" }}>
                <button className="create" onClick={this.onHandleClick.bind(this)}>新建</button>
                <input className="qurey" type="text" name="name" placeholder="请输入姓名" />
            </div>
        );
    }
}

export default TableTools;