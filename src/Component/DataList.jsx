import React from 'react';
import '../index.css';

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: 0,            // 是否选中当前行
        }
    }

    /**
     * 鼠标移入
     * @param {object} event 事件对象
     */
    onMouseEnter(event) {
        this.setState({
            isSelect: parseInt(event.target.getAttribute("data-index")),
        });
    }

    /**
     * 鼠标移出
     * @param {object} event 事件对象
     */
    onMouseLeave(event) {
        this.setState({
            isSelect: parseInt(event.target.getAttribute("data-index")),
        });
    }

    /**
     * 处理删除数据事件
     * @param {object} event 事件对象
     */
    onHandleDelClick(event) {
        this.props.delData(parseInt(event.target.getAttribute("data-index")));
    }

    /**
     * 处理编辑数据事件
     * @param {object} event 事件对象
     */
    onHandleEditClick(event) {
        let index = parseInt(event.target.getAttribute("data-index"));
        let data = [];
        data = this.props.dataToShow.filter((item) => { return index === item.index });
        this.props.editData("edit", data[0]);
    }

    render() {
        return (
            <table className="tableContent">
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>班级</th>
                        <th>是否为班主任</th>
                        <th>课程</th>
                        <th>角色</th>
                        <th>操作</th>
                    </tr>
                    {
                        this.props.dataToShow.map((data) => {
                            return (
                                <tr className={this.state.isSelect === data.index ? "enter" : "leave"} key={data.index} id={data.index} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} >
                                    <td data-index={data.index}>{data.name}</td>
                                    <td data-index={data.index}>{data.sex}</td>
                                    <td data-index={data.index}>{data.age}</td>
                                    <td data-index={data.index}>{data.grade}</td>
                                    <td data-index={data.index}>{data.isMaster}</td>
                                    <td data-index={data.index}>{data.courses}</td>
                                    <td data-index={data.index}>{data.role}</td>
                                    <td>
                                        <div className="operation">
                                            <button onClick={this.onHandleEditClick.bind(this)} data-index={data.index} disabled={this.props.disabled}>编辑</button>
                                            <button onClick={this.onHandleDelClick.bind(this)} data-index={data.index} disabled={this.props.disabled}>删除</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default DataList;