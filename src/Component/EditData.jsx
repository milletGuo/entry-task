import React from 'react';
import '../index.css';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudensInfo';

// 用于标记表格的每一行
let i = 0;

class EditData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sex: '男',
            age: '',
            role: '教师',
            checkNameInfo: '请输入2~6位中文',
            checkAgeInfo: '请输入正确的年龄',
            teacherDiv: 'block',
            studentDiv: 'none',
            teacherInfo: {},
            studentInfo: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 处理表单内容改变事件
     * @param {事件信息} event 
     */
    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        //  更新状态
        this.setState({
            [name]: value
        }, () => {
            switch (name) {
                case 'name':
                    this.checkName(this.state.name);
                    break;
                case "age":
                    this.checkAge(this.state.age);
                    break;
                case 'role':
                    if (this.state.role === "教师") {
                        this.setState({
                            teacherDiv: 'block',
                            studentDiv: 'none',
                        });
                    } else {
                        this.setState({
                            teacherDiv: 'none',
                            studentDiv: 'block',
                        });
                    }
                    break;
                default:
            }
        });

        // this.setState({
        //     [name]: value
        // });
        // switch (name) {
        //     case 'name':
        //         this.checkName(this.state.name);
        //         break;
        //     case "age":
        //         this.checkAge(this.state.age);
        //         break;
        //     case 'role':
        //         if (this.state.role === "教师") {
        //             this.setState({
        //                 teacherDiv: 'block',
        //                 studentDiv: 'none',
        //             });
        //         } else {
        //             this.setState({
        //                 teacherDiv: 'none',
        //                 studentDiv: 'block',
        //             });
        //         }
        //         break;
        //     default:
        // }
    }

    /**
     * 用于更新角色信息
     * @param {角色} role 
     * @param {角色信息} data 
     */
    updateData(role, data) {
        switch (role) {
            case "教师":
                this.setState({
                    teacherInfo: data,
                });
                break;
            case "学生":
                this.setState({
                    studentInfo: data,
                });
                break;
            default:
        }
    }

    /**
     * 表单校验-姓名
     * @param {姓名} name 
     */
    checkName(name) {
        let reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!reg.test(name) || name == '') {
            this.setState({ checkNameInfo: '请输入2~6位中文' });
            return false;
        } else {
            this.setState({ checkNameInfo: '√' });
            return true;
        }
    }

    /**
     * 表单校验-年龄
     * @param {年龄} age 
     */
    checkAge(age) {
        let reg = /^[1-9]{0,3}$/;
        if (!reg.test(age) || age == '') {
            this.setState({ checkAgeInfo: '请输入正确的年龄' });
            return false;
        } else {
            this.setState({ checkAgeInfo: '√' });
            return true;
        }
    }

    /**
     * 提交表单
     */
    handleSubmit() {
        if (!(this.checkName(this.state.name) && this.checkAge(this.state.age))) {
            alert('你的输入有误，请按要求输入后再提交');
            return;
        }
        // localStorage中获取数据
        let dataLists = [];
        if (localStorage.getItem('data') != null) {
            dataLists = JSON.parse(localStorage.getItem('data'));
        }
        switch (this.props.status) {
            case 'create':
                if (this.state.role === "教师") {
                    dataLists.push({
                        index: ++i, name: this.state.name, sex: this.state.sex, age: this.state.age,
                        grade: this.state.teacherInfo.grade, isMaster: this.state.teacherInfo.isMaster,
                        courses: '',
                        role: this.state.role
                    });
                } else {
                    dataLists.push({
                        index: ++i, name: this.state.name, sex: this.state.sex, age: this.state.age,
                        grade: this.state.studentInfo.grade, isMaster: '',
                        courses: this.state.studentInfo.courses,
                        role: this.state.role
                    });
                }
                localStorage.setItem('data', JSON.stringify(dataLists));
                this.props.submit(JSON.stringify(dataLists));
                break;
            case 'edit':
                for (let i = 0; i < dataLists.length; i++) {
                    if (this.props.index == dataLists[i].index) {
                        if (this.state.role === "教师") {
                            dataLists[i].isMaster = this.state.teacherInfo.isMaster ? this.state.teacherInfo.isMaster : '';
                        } else {
                            dataLists[i].courses = this.state.studentInfo.courses ? this.state.studentInfo.courses : '';
                        }
                        dataLists[i].name = this.state.name;
                        dataLists[i].sex = this.state.sex;
                        dataLists[i].age = this.state.age;
                        dataLists[i].grade = this.state.teacherInfo.grade;
                        dataLists[i].role = this.state.role;
                    }
                }
                localStorage.setItem('data', JSON.stringify(dataLists));
                this.props.submit(JSON.stringify(dataLists));
                break;
            default:
        }
        this.props.close();
    }

    render() {
        return (
            <div className="layer" style={{ display: this.props.display }}>
                <div className="layer-title">
                    <span>编辑数据</span>
                    <span></span>
                </div>
                <form className="layer-content">
                    <div>
                        <label>姓名：</label>
                        <input type="text" name="name" placeholder="请输入姓名" value={this.state.name} onChange={this.handleChange.bind(this)} />
                        <span className={this.state.checkNameInfo === '√' ? "verifySuccess" : "verifyFail"}>{this.state.checkNameInfo}</span>
                    </div>
                    <div>
                        <label>性别：</label>
                        <select name="sex" value={this.state.sex} onChange={this.handleChange.bind(this)} >
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </div>
                    <div>
                        <label>年龄：</label>
                        <input type="text" name="age" placeholder="请输入年龄" value={this.state.age} onChange={this.handleChange.bind(this)} />
                        <span className={this.state.checkAgeInfo === '√' ? "verifySuccess" : "verifyFail"}>{this.state.checkAgeInfo}</span>
                    </div>
                    <div>
                        <label>角色：</label>
                        <select name="role" value={this.state.role} onChange={this.handleChange.bind(this)}>
                            <option value="教师">教师</option>
                            <option value="学生">学生</option>
                        </select>
                    </div>
                </form>
                <TeacherInfo display={this.state.teacherDiv} submitData={this.updateData.bind(this)} />
                <StudentInfo display={this.state.studentDiv} submitData={this.updateData.bind(this)} />
                <div><button className="submit" onClick={this.handleSubmit}>确定</button></div>
            </div>
        );
    }
}

export default EditData;