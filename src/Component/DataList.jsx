import React from 'react';
import '../index.css';

class DataList extends React.Component {
    constructor(props) {
        super(props);
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
                                <tr key={data.index} id={data.index}>
                                    <td>{data.name}</td>
                                    <td>{data.sex}</td>
                                    <td>{data.age}</td>
                                    <td>{data.role}</td>
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