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
     * @param {number} dataIndex 行索引
     */
    onMouseEnter(dataIndex) {
        this.setState({
            isSelect: dataIndex,
        });
    }

    /**
     * 鼠标移出
     * @param {number} dataIndex 行索引
     */
    onMouseLeave(dataIndex) {
        this.setState({
            isSelect: 0,
        });
    }

    /**
     * 处理删除数据事件
     * @param {number} dataIndex 数据索引
     */
    onHandleDelClick(dataIndex) {
        this.props.delData(dataIndex);
    }

    /**
     * 处理编辑数据事件
     * @param {number} dataIndex 数据索引
     */
    onHandleEditClick(dataIndex) {
        let data = [];
        data = this.props.dataToShow.filter((item) => { return dataIndex === item.index });
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
                                <tr className={this.state.isSelect === data.index ? "enter" : "leave"} key={data.index} id={data.index} onMouseEnter={this.onMouseEnter.bind(this, data.index)} onMouseLeave={this.onMouseLeave.bind(this, data.index)} >
                                    <td data-index={data.index}>{data.name}</td>
                                    <td data-index={data.index}>{data.sex}</td>
                                    <td data-index={data.index}>{data.age}</td>
                                    <td data-index={data.index}>{data.grade}</td>
                                    <td data-index={data.index}>{data.isMaster}</td>
                                    <td data-index={data.index}>{data.courses}</td>
                                    <td data-index={data.index}>{data.role}</td>
                                    <td>
                                        <div className="operation">
                                            <button onClick={this.onHandleEditClick.bind(this, data.index)} data-index={data.index} disabled={this.props.disabled}>编辑</button>
                                            <button onClick={this.onHandleDelClick.bind(this, data.index)} data-index={data.index} disabled={this.props.disabled}>删除</button>
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