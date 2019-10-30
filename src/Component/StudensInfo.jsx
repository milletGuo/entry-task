import React from 'react';
import '../index.css';

class StudentInfo extends React.Component {

    /**
     * 处理表单内容改变事件
     * @param {Object} event 事件对象
     */
    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        let data = JSON.parse(JSON.stringify(this.props.studentInfo));
        let courses = data.courses ? data.courses.split(' ') : [];
        if (name === "courses") {
            let index = courses.indexOf(value);
            index === -1 ? courses.push(value) : courses.splice(index, 1);
            data[name] = courses.join(' ');
        } else {
            data[name] = value;
        }
        this.props.formChange(data);
    }

    render() {
        const data = this.props.studentInfo;
        const courses = data.courses ? data.courses.split(' ') : [];
        return (
            <div style={{ display: this.props.display }} className="studentDiv">
                <form>
                    <div>
                        <label>所在班级：</label>
                        <input type="text" name="grade" placeholder="请输入班级" autoComplete="off" value={data.grade} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div>
                        <label>所学课程：</label>
                        <input type="checkbox" name="courses" value="语文" checked={courses.indexOf("语文") !== -1} onChange={this.handleChange.bind(this)} />语文
                        <input type="checkbox" name="courses" value="数学" checked={courses.indexOf("数学") !== -1} onChange={this.handleChange.bind(this)} />数学
                        <input type="checkbox" name="courses" value="英语" checked={courses.indexOf("英语") !== -1} onChange={this.handleChange.bind(this)} />英语
                    </div>
                </form>
            </div>
        )
    }
}

export default StudentInfo;