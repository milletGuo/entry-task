import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import TableTools from './TableTools.jsx';
import DataList from './DataList.jsx';
import OperateDialog from './OperateDialog';

let i=0;

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',     // 控制弹窗的显示与隐藏
            lists: [],           // 控制表格中的数据
        }
    }

    /**
     * 打开对话框
     */
    openDialog() {
        this.setState({
            display: 'block',
        });
    }

    /**
     * 关闭对话框
     */
    closeDialog() {
        this.setState({
            display: 'none',
        });
    }

    /**
     * 向表格中添加一行数据
     */
    addData(data) {
        this.state.lists = [];
        const lists=this.state.lists;
        for (let i = 0; i < JSON.parse(data).length;i++) {
            lists.push(JSON.parse(data)[i]);
        }
        this.setState({lists:this.state.lists});
    }

    render() {
        return (
            <div className="tableBox">
                <TableTools create={this.openDialog.bind(this)} />
                <DataList lists={this.state.lists}/>
                <OperateDialog display={this.state.display} close={this.closeDialog.bind(this)} submit={this.addData.bind(this)}/>
            </div>
        );
    }
}

export default DataTable;