import React from 'react';
import '../index.css';

class TeacherInfo extends React.Component {

    /**
     * 处理表单内容改变事件
     * @param {object} event 事件对象
     */
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        let data = JSON.parse(JSON.stringify(this.props.teacherInfo));
        data[name] = value;
        this.props.formChange(data);
    }

    render() {
        const data = this.props.teacherInfo;
        return (
            <div style={{ display: this.props.display }} className="teacherDiv">
                <form>
                    <div>
                        <label>所教班级：</label>
                        <input type="text" name="grade" placeholder="请输入班级" autoComplete="off" value={data.grade} onChange={this.handleChange.bind(this)} />
                        {/* <span className={this.state.checkGradeInfo === '√' ? "verifySuccess" : "verifyFail"}>{this.state.checkGradeInfo}</span> */}
                    </div>
                    <div>
                        <label>班主任：</label>
                        <input type="radio" name="isMaster" value="是" checked={data.isMaster === "是" ? true : false} onChange={this.handleChange.bind(this)} />
                        <span>是</span>
                        <input type="radio" name="isMaster" value="否" checked={data.isMaster === "否" ? true : false} onChange={this.handleChange.bind(this)} />
                        <span>否</span>
                    </div>
                </form>
            </div>
        )
    }
}

export default TeacherInfo;