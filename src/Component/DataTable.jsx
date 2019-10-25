import React from 'react';
import '../index.css';
import TableTools from './TableTools.jsx';
import DataList from './DataList.jsx';
import TablePagination from './TablePagination';
import EditData from './EditData';
import CanvasDemo from './CanvasDemo'

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',        // 控制编辑组件的显示与隐藏
            status: '',             // 控制编辑组件的状态(新建、编辑)
            disabled: false,        // 删除、编辑按钮是否可用
            dataLists: [],          // localStorage中的数据
            dataToShow: [],         // 需要在表格中展示的数据
            queryResult: [],        // 查询结果数据
            dataToEdit: {           // 传递给编辑组件的数据
                name: '',
                sex: '男',
                age: '',
                role: '教师',
                grade: '',
                isMaster: '是',
                courses: '',
            },
        }
    }

    /**
     * 处理表单数据改变事件
     * @param {Object} data 表单数据
     */
    handleFormChange(data) {
        this.setState({ dataToEdit: data, });
    }

    /**
     * 删除一条数据
     * @param {number} index 需要删除的数据索引
     */
    delData(index) {
        const dataLists = this.state.dataLists.slice();
        for (let i = 0; i < dataLists.length; i++) {
            if (index === dataLists[i].index) {
                dataLists.splice(i, 1);
            }
        }
        this.setState({ dataLists: dataLists,queryResult: dataLists });
        this.showData(dataLists);
    }

    /**
     * 显示EditData组件
     * @param {string} status 组件状态(新建，编辑)
     * @param {Object} data  需要新建或编辑的数据
     */
    openDialog(status, data) {
        this.setState({
            display: 'block',
            status: status,
            dataToEdit: data,
            disabled: true,
        });
    }

    /**
     * 隐藏EditData组件
     */
    closeDialog() {
        this.setState({
            display: 'none',
            status: "",
            dataToEdit: { name: '', sex: '男', age: '', role: '教师', grade: '', isMaster: '是', courses: '', },
            disabled: false,
        });
    }

    /**
     * 展示数据
     * @param {any []} data 传入的数据
     */
    showData(data) {
        let dataToShow = data.slice();
        if (data.length > 5) {
            dataToShow = data.filter((item, index) => {
                return index < 5;
            });
            this.setState({ dataToShow: dataToShow });
        } else {
            this.setState({ dataToShow: dataToShow });
        }
    }

    /**
     * 更新数据(表单提交后执行)
     * @param {any []} data 需要更新的数据
     */
    updateData(status, data) {
        if (status === "query") {
            this.setState({ queryResult: data });
        } else {
            this.setState({ dataLists: data, queryResult: data });
        }
        this.showData(data);
    }

    /**
     * 在组件挂载之后，加载localStorage中的数据
     */
    componentDidMount() {
        // 首次挂载加载localStorage中的数据
        if (localStorage.getItem('data') != null) {
            let tempData = JSON.parse(localStorage.getItem('data'));
            this.setState({ dataLists: tempData, queryResult: tempData });
            this.showData(tempData);
        }
    }

    /**
     * 组件更新完成后，将最新的数据存储至localStorage中
     * @param {Object} prevProps 之前的参数
     * @param {Object} prevState 之前的状态
     */
    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('data', JSON.stringify(this.state.dataLists));
    }

    render() {
        return (
            <div className="tableBox">
                <TableTools data={this.state.dataLists} create={this.openDialog.bind(this)} query={this.updateData.bind(this)} />
                <DataList dataToShow={this.state.dataToShow} delData={this.delData.bind(this)} editData={this.openDialog.bind(this)} disabled={this.state.disabled} />
                <TablePagination data={this.state.queryResult} showData={this.showData.bind(this)} />
                <EditData display={this.state.display} dataToEdit={this.state.dataToEdit} data={this.state.dataLists} status={this.state.status} close={this.closeDialog.bind(this)} formChange={this.handleFormChange.bind(this)} submit={this.updateData.bind(this)} />
                <CanvasDemo />
            </div>
        );
    }
}

export default DataTable;