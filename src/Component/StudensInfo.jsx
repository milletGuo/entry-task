import React from 'react';
import '../index.css';

class StudentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: '',
            course: [],
        }
    }

    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        if (name === "course") {
            let items = this.state.course.slice();
            let index = items.indexOf(value);
            index === -1 ? items.push(value) : items.splice(index, 1);
            this.setState({ course: items });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    /**
   * 组建更新后调用，方法中包含之前的入参和之前的状态
   * @param {*} prevProps 
   * @param {*} prevState 
   */
    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state) {
            let courseStr = '';
            for (let i = 0; i < this.state.course.length; i++) {
                courseStr += this.state.course[i];
                courseStr += ' ';
            }
            let data = { grade: this.state.grade, courses: courseStr };
            this.props.submitData("学生", data);
        }
    }

    render() {
        return (
            <div style={{ display: this.props.display }} className="studentDiv">
                <form>
                    <div>
                        <label>所在班级：</label>
                        <input type="text" name="grade" placeholder="请输入班级" value={this.state.grade} onChange={this.handleChange.bind(this)} />
                        <span className={this.state.checkGradeInfo === '√' ? "verifySuccess" : "verifyFail"}>{this.state.checkGradeInfo}</span>
                    </div>
                    <div>
                        <label>所学课程：</label>
                        <input type="checkbox" name="course" value="语文" onChange={this.handleChange.bind(this)} />语文
                <input type="checkbox" name="course" value="数学" onChange={this.handleChange.bind(this)} />数学
                <input type="checkbox" name="course" value="英语" onChange={this.handleChange.bind(this)} />英语
              </div>
                </form>
            </div>
        )
    }
}

export default StudentInfo;