import React from 'react';
import '../index.css';

class TeacherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: '',
            isMaster: '是',
        }
    }

    /**
     * 处理表单内容改变事件
     * @param {object} event 事件对象
     */
    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        //   更新状态
        this.setState({
            [name]: value,
        });
    }

    /**
     * 组建更新后提交数据
     * @param {json} prevProps 之前的入参
     * @param {json} prevState 之前的状态
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.submitData("教师", this.state);
        }
    }

    /**
     * 入参发生改变时，更改表单内容
     * @param {json} newProps 新的入参
     */
    componentWillReceiveProps(newProps) {
        if (newProps.teacherInfo.grade !== this.state.grade && !(newProps.teacherInfo.grade === undefined)) {
            this.setState({
                grade: newProps.teacherInfo.grade,
                isMaster: newProps.teacherInfo.isMaster,
            });
        }
    }

    render() {
        return (
            <div style={{ display: this.props.display }} className="teacherDiv">
                <form>
                    <div>
                        <label>所教班级：</label>
                        <input type="text" name="grade" placeholder="请输入班级" value={this.state.grade} onChange={this.handleChange.bind(this)} />
                        <span className={this.state.checkGradeInfo === '√' ? "verifySuccess" : "verifyFail"}>{this.state.checkGradeInfo}</span>
                    </div>
                    <div>
                        <label>班主任：</label>
                        <input type="radio" name="isMaster" value="是" checked={this.state.isMaster === "是" ? true : false} onChange={this.handleChange.bind(this)} />
                        <span>是</span>
                        <input type="radio" name="isMaster" value="否" checked={this.state.isMaster === "否" ? true : false} onChange={this.handleChange.bind(this)} />
                        <span>否</span>
                    </div>
                </form>
            </div>
        )
    }
}

export default TeacherInfo;