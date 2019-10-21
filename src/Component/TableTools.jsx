import React from 'react';
import '../index.css';

class TableTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',       // 查询时输入的内容
        }
    }

    /**
     * 点击新建按钮打开新建数据窗口
     */
    onHandleCreateClick() {
        this.props.create("create", { name: '', sex: '男', age: '', role: '教师', grade: '', isMaster: '是', courses: '', });
    }

    /**
     * 处理表单内容改变事件
     * @param {Object}} event 事件对象
     */
    handleChange(event) {
        // 更新状态
        this.setState({
            name: event.target.value,
        })
    }

    /**
     * 处理查询按钮点击事件
     */
    onHandleQueryClick() {
        const dataLists = this.props.data.slice();
        let queryResult = dataLists.filter((item) => {
            return (item.name.indexOf(this.state.name) !== -1);
        });
        this.props.query("query", queryResult);
    }

    /**
     * Promise模拟Ajax请求
     * @param {string} url 请求的url
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
                    resolve(xhr.responseText)
                } else {
                    console.log("请求失败！");
                    reject("请求失败！");
                }
            }
        });
        return promise;
    }

    /**
     * 处理Promise请求事件
     */
    executeAjax() {
        this.promiseSimulateAjax("http://localhost:3000/#").then((resolve) => { console.log(resolve) }).catch();
    }

    render() {
        return (
            <div style={{ margin: "30px 20px" }}>
                <button className="create" onClick={this.onHandleCreateClick.bind(this)}>新建</button>
                <input className="qurey" type="text" name="name" placeholder="请输入姓名" autoComplete="off" onChange={this.handleChange.bind(this)} />
                <button className="queryBtn" onClick={this.onHandleQueryClick.bind(this)}>查询</button>
                <button className="simulateAjax" onClick={this.executeAjax.bind(this)}>Promise请求</button>
            </div>
        );
    }
}

export default TableTools;