import React from 'react';
import '../index.css';
import TableTools from './TableTools.jsx';
import DataList from './DataList.jsx';
import EditData from './EditData';

let index = 0;

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',     // 控制弹窗的显示与隐藏
            status: '',          // 控制弹出窗口的状态
            index: 0,            // 需要编辑或删除的数据索引
            lists: [],           // 控制表格中的数据
        }

        // 首次渲染清空localStorage
        localStorage.clear();
    }

    /**
     * 更新数据
     */
    updateData(data) {
        this.state.lists = [];  // 每次更新前将数据清空
        const lists = this.state.lists;
        for (let i = 0; i < JSON.parse(data).length; i++) {
            lists.push(JSON.parse(data)[i]);
        }
        this.setState({ lists: lists });
    }

    /**
     * 新建一条数据
     */
    addData() {
        this.setState({
            display: 'block',
            status: 'create',
            index: index++,
        });
    }

    /**
    * 编辑数据
    */
    editData(index) {
        this.setState({
            display: 'block',
            status: 'edit',
            index: index,
        });
    }

    /**
     * 删除一条数据
     */
    delData(index) {
        let arr = JSON.parse(localStorage.getItem('data'));
        arr.splice(index-1,1);
        localStorage.setItem('data', JSON.stringify(arr));
        this.setState({ lists: arr });
    }

    /**
     * 关闭对话框
     */
    closeDialog() {
        this.setState({
            display: 'none',
        });
    }

    render() {
        return (
            <div className="tableBox">
                <TableTools create={this.addData.bind(this)} query={this.updateData.bind(this)}/>
                <DataList lists={this.state.lists} delData={this.delData.bind(this)} editData={this.editData.bind(this)} />
                <EditData display={this.state.display} status={this.state.status} index={this.state.index} close={this.closeDialog.bind(this)} submit={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default DataTable;