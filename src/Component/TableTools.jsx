import React from 'react';
import '../index.css';

class TableTools extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            name: '',
        }
    }

    /**
     * 点击新建按钮打开新建数据窗口
     */
    onHandleCreateClick() {
        this.props.create();
    }

    /**
     * 获取查询输入框的值
     */
    handleChange(event) {
        //   更新状态
        this.setState({
            name: event.target.value,
        })
    }

    /**
     * 点击按钮进行查询
     */
    onHandleQueryClick() {
        let data = [];
        data = JSON.parse(localStorage.getItem('data'));
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.indexOf(this.state.name) === -1) {
                data.splice(i--, 1);
            }
        }
        this.props.query(JSON.stringify(data));
    }

    render() {
        return (
            <div style={{ margin: "30px 20px" }}>
                <button className="create" onClick={this.onHandleCreateClick.bind(this)}>新建</button>
                <input className="qurey" type="text" name="name" placeholder="请输入姓名" onChange={this.handleChange.bind(this)}/>
                <button className="queryBtn" onClick={this.onHandleQueryClick.bind(this)}>查询</button>
            </div>
        );
    }
}

export default TableTools;