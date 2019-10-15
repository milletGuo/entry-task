import React from 'react';
import '../index.css';

class TableTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        if (localStorage.getItem('data') != null) {
            data = JSON.parse(localStorage.getItem('data'));
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.indexOf(this.state.name) === -1) {
                data.splice(i--, 1);
            }
        }
        this.props.query(JSON.stringify(data));
    }

    /**
     * Promise模拟Ajax请求
     * @param {请求url} url 
     */
    promiseSimulateAjax(url) {
        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4) {
        //         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        //             console.log(xhr.responseText);
        //         } else {
        //             console.log("请求失败！");
        //         }
        //     }
        // }
        // xhr.open("get", "http://10.17.18.101:8003/datatp-server/order/goods/query?pageSize=8&pageNum=1", true);
        // xhr.send(null);
        const promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.send();
            xhr.onload = function () {
                if (this.status === 200) {
                    console.log(xhr.responseText);
                    resolve(xhr.responseText)
                } else {
                    console.log("请求失败！");
                    reject();
                }
            }
        });
        return promise;
    }

    executeAjax() {
        this.promiseSimulateAjax("http://10.17.18.101:8003/datatp-server/order/goods/query?pageSize=8&pageNum=1").then().catch();
    }

    render() {
        return (
            <div style={{ margin: "30px 20px" }}>
                <button className="create" onClick={this.onHandleCreateClick.bind(this)}>新建</button>
                <input className="qurey" type="text" name="name" placeholder="请输入姓名" onChange={this.handleChange.bind(this)} />
                <button className="queryBtn" onClick={this.onHandleQueryClick.bind(this)}>查询</button>
                <button className="simulateAjax" onClick={this.executeAjax.bind(this)}>Promise请求</button>
            </div>
        );
    }
}

export default TableTools;