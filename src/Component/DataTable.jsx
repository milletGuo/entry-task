import React from 'react';
import '../index.css';
import TableTools from './TableTools.jsx';
import DataList from './DataList.jsx';
import TablePagination from './TablePagination';
import EditData from './EditData';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',     // 控制弹窗的显示与隐藏
            status: '',          // 控制弹出窗口的状态
            index: 0,            // 需要编辑或删除的数据索引
            lists: [],           // 所有数据
            dataToShow: [],      // 需要展示的数据 
        }

        // 首次渲染清空localStorage
        localStorage.clear();
    }

    /**
     * 更新数据
     */
    updateData(data) {
        this.setState({ lists: JSON.parse(data) });
        this.showData(JSON.parse(data));
    }

    /**
     * 在表格中展示的数据
     */
    showData(data) {
        if (data.length > 5) {
            this.setState({ dataToShow: data.splice(0, 5) });
        } else {
            this.setState({ dataToShow: data });
        }
    }

    /**
     * 新建一条数据
     */
    addData() {
        this.setState({
            display: 'block',
            status: 'create',
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
        let dataLists = JSON.parse(localStorage.getItem('data'));
        dataLists.splice(index - 1, 1);
        localStorage.setItem('data', JSON.stringify(dataLists));
        this.setState({ dataToShow: dataLists });
        this.setState({ lists: dataLists });
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
                <TableTools create={this.addData.bind(this)} query={this.updateData.bind(this)} />
                <DataList lists={this.state.dataToShow} delData={this.delData.bind(this)} editData={this.editData.bind(this)} />
                <TablePagination data={this.state.lists} showData={this.showData.bind(this)} />
                <EditData display={this.state.display} status={this.state.status} index={this.state.index} close={this.closeDialog.bind(this)} submit={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default DataTable;