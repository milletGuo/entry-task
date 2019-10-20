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
            display: 'none',     // 控制编辑组件的显示与隐藏
            status: '',          // 控制编辑组件的状态(新建、编辑)
            disabled: false,     // 删除、编辑按钮是否可用
            dataLists: [],       // localStorage中的数据
            signal: false,       // 状态更新后是否存储数据 
            dataToShow: [],
            data: {              // 传递给编辑组件的数据
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
     * @param {Object} data 
     */
    handleFormChange(data) {
        this.setState({ data: data, });
    }

    /**
     * 新建一条数据
     * @param {json} data 
     */
    addData(data) {
        const dataLists = this.state.dataLists.slice();
        let index = this.findMaxIndex(dataLists);
        index++;
        dataLists.push({
            index: index, name: data.name, sex: data.sex, age: data.age, role: data.role,
            grade: data.grade,
            isMaster: data.isMaster,
            courses: data.courses,
        });
        this.setState({ dataLists: dataLists, signal: true });
        this.showData(dataLists);
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
        this.setState({ dataLists: dataLists, signal: true });
        this.showData(dataLists);
    }

    /**
     * 编辑数据
     * @param {json} data 
     */
    editData(data) {
        let dataLists = this.state.dataLists.map((item) => {
            if (data.index === item.index) {
                item = data;
            }
            return item;
        });
        this.setState({ dataLists: dataLists, signal: true });
        this.showData(dataLists);
    }

    /**
     * 查询数据
     * @param {string} name 查询条件
     */
    queryData(name) {
        let dataToShow = this.state.dataLists.filter((item) => {
            return (item.name.indexOf(name) !== -1);
        });
        this.setState({ dataLists: dataToShow, signal: false });
        this.showData(dataToShow);
    }

    /**
     * 显示EditData组件
     * @param {string} status 组件状态(新建，编辑)
     * @param {json} data  需要编辑的数据，新建时数据为空
     */
    openDialog(status, data) {
        this.setState({
            display: 'block',
            status: status,
            data: data,
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
            data: { name: '', sex: '男', age: '', role: '教师', grade: '', isMaster: '是', courses: '', },
            disabled: false,
        });
    }

    /**
     * 找出数据索引的最大值
     * @param {Object []} data 需要查找的数据
     * @returns {Number} 传入数据的最大索引
     */
    findMaxIndex(data) {
        let dataLists = [];
        data.forEach(function (item) {
            dataLists.push(item.index);
        });
        if (dataLists.length === 0) {
            return 0;
        } else {
            return Math.max.apply(null, dataLists);
        }
    }

    /**
     * 展示数据，可增加一个limit参数，表示限制每页展示条数，目前限制为5条
     * @param {json []} data 传入的数据
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
     * @param {json []} data 需要更新的数据
     */
    updateData(data) {
        if (this.state.status === "create") {
            this.addData(data);
        } else {
            this.editData(data);
        }
    }

    /**
     * 在组件挂载之后，加载localStorage中的数据
     */
    componentDidMount() {
        // 首次挂载加载localStorage中的数据
        if (localStorage.getItem('data') != null) {
            let tempData = JSON.parse(localStorage.getItem('data'));
            this.setState({ dataLists: tempData, });
            this.showData(tempData);
        }
    }

    /**
     * 组件更新完成后，将最新的数据存储至localStorage中
     * @param {Object} prevProps 之前的参数
     * @param {Object} prevState 之前的状态
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.state.signal) {
            localStorage.setItem('data', JSON.stringify(this.state.dataLists));
        }
    }

    render() {
        return (
            <div className="tableBox">
                <TableTools create={this.openDialog.bind(this)} query={this.queryData.bind(this)} />
                <DataList dataToShow={this.state.dataToShow} delData={this.delData.bind(this)} editData={this.openDialog.bind(this)} disabled={this.state.disabled} />
                <TablePagination data={this.state.dataLists} showData={this.showData.bind(this)} />
                <EditData display={this.state.display} data={this.state.data} close={this.closeDialog.bind(this)} formChange={this.handleFormChange.bind(this)} submit={this.updateData.bind(this)} />
                <CanvasDemo />
            </div>
        );
    }
}

export default DataTable;