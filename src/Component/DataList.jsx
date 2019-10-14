import React from 'react';
import '../index.css';

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: 0,
            enter: "enter",
            leave: "leave",
        }
    }

    /**
     * 鼠标移入
     */
    onMouseEnter(event) {
        this.setState({
            isSelect: event.target.getAttribute("data-index"),
        });
    }

    /**
     * 鼠标移出
     */
    onMouseLeave(event) {
        this.setState({
            isSelect: event.target.getAttribute("data-index"),
        });
    }

    /**
     * 删除按钮监听
     */
    onHandleDelClick(event) {
        this.props.delData(event.target.getAttribute("data-index"));
    }

    /**
     * 编辑按钮监听
     */
    onHandleEditClick(event) {
        this.props.editData(event.target.getAttribute("data-index"));
    }

    render() {
        return (
            <table className="tableContent">
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>角色</th>
                        <th>操作</th>
                    </tr>
                    {
                        this.props.lists.map((data) => {
                            return (
                                <tr className={this.state.isSelect == data.index ? this.state.enter : this.state.leave} key={data.index} id={data.index} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} >
                                    <td data-index={data.index}>{data.name}</td>
                                    <td data-index={data.index}>{data.sex}</td>
                                    <td data-index={data.index}>{data.age}</td>
                                    <td data-index={data.index}>{data.role}</td>
                                    <td>
                                        <div className="operation">
                                            <button onClick={this.onHandleEditClick.bind(this)} data-index={data.index}>编辑</button>
                                            <button onClick={this.onHandleDelClick.bind(this)} data-index={data.index}>删除</button>
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