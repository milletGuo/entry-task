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
            status: '',          // 控制弹出窗口的状态(新建、编辑)
            index: 0,            // 需要编辑或删除的数据索引
            lists: [],           // localStorage中的数据
            signal: false,       // 数据更新后是否存储至localStorage
            dataToShow: [],      // 需要展示的数据 
        }
    }

    /**
     * 更新数据
     * @param {string} data 需要更新的数据
     */
    updateData(data) {
        this.setState({ lists: data, signal: true });
        this.showData(data);
    }

    /**
     * 展示数据，可增加一个limit参数，表示限制每页展示条数，目前限制为5条
     * @param {string} data 在表格中展示的数据(每次展示5条)
     */
    showData(data) {
        // 创建数据的副本，此时tempDataList与data指向的不是同一地址
        let tempDataList = data.slice();
        if (tempDataList.length > 5) {
            this.setState({ dataToShow: tempDataList.splice(0, 5) });
        } else {
            this.setState({ dataToShow: tempDataList });
        }
    }

    /**
     * 新建一条数据，通过改变EditData组件的状态，执行相应逻辑
     */
    addData() {
        this.setState({
            display: 'block',
            status: 'create',
        });
    }

    /**
     * 编辑数据，通过改变EditData组件的状态，执行相应逻辑
     * @param {number} index 需要编辑的数据索引
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
     * @param {number} index 需要删除的数据索引
     */
    delData(index) {
        let dataLists = this.state.lists.slice();
        for (let i = 0; i < dataLists.length; i++) {
            if (index == dataLists[i].index) {
                dataLists.splice(i, 1);
            }
        }
        this.setState({ lists: dataLists, signal: true });
        this.showData(dataLists);
    }

    /**
     * 隐藏EditData组件
     */
    closeDialog() {
        this.setState({
            display: 'none',
        });
    }

    /**
     * 在组件挂载之后，加载localStorage中的数据
     */
    componentDidMount() {
        // 首次挂载加载localStorage中的数据
        if (localStorage.getItem('data') != null) {
            let tempData = JSON.parse(localStorage.getItem('data'));
            this.setState({
                lists: tempData
            });
            this.showData(tempData);
        }
    }

    /**
     * 组件更新完成后，将最新的数据存储至localStorage中
     * @param {json} prevProps 之前的参数
     * @param {json} prevState 之前的状态
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.state.signal) {
            localStorage.setItem('data', JSON.stringify(this.state.lists));
        }
    }

    render() {
        return (
            <div className="tableBox">
                <TableTools data={this.state.lists} create={this.addData.bind(this)} query={this.updateData.bind(this)} />
                <DataList lists={this.state.dataToShow} delData={this.delData.bind(this)} editData={this.editData.bind(this)} />
                <TablePagination data={this.state.lists} showData={this.showData.bind(this)} />
                <EditData display={this.state.display} data={this.state.lists} status={this.state.status} index={this.state.index} close={this.closeDialog.bind(this)} submit={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default DataTable;