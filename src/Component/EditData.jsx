import React from 'react';
import '../index.css';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudensInfo';

class EditData extends React.Component {

    /**
     * 处理表单内容改变事件
     * @param {Object} event 事件对象
     */
    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        let data = JSON.parse(JSON.stringify(this.props.dataToEdit));
        if (value === "教师") {
            data.isMaster = "是"
        }
        data[name] = value;
        this.props.formChange(data);
    }

    /**
     * 处理教师或学生组件表单数据改变事件
     * @param {Object} data 表单数据
     */
    handleFormChange(data) {
        let dataProps = JSON.parse(JSON.stringify(this.props.dataToEdit));
        if (dataProps.role === "教师") {
            dataProps.grade = data.grade;
            dataProps.isMaster = data.isMaster;
        } else {
            dataProps.grade = data.grade;
            dataProps.courses = data.courses;
        }
        this.props.formChange(dataProps);
    }

    /**
     * 处理表单提交事件
     */
    handleSubmit() {
        // 从入参中获取数据
        let data = this.props.dataToEdit;
        if (!(this.checkName(data.name) && this.checkAge(data.age))) {
            alert('你的输入有误，请按要求输入后再提交');
            return;
        }
        if (data.role === "教师") {
            data = {
                index: data.index, name: data.name, sex: data.sex, age: data.age,
                role: data.role, grade: data.grade,
                isMaster: data.isMaster,
                courses: '',
            };
        } else {
            data = {
                index: data.index, name: data.name, sex: data.sex, age: data.age,
                role: data.role, grade: data.grade,
                isMaster: '',
                courses: data.courses,
            };
        }
        // 更新dataLists中的数据
        let dataLists = this.props.data.slice();
        if (this.props.status === "create") {
            let index = this.findMaxIndex(dataLists);
            index++;
            dataLists.push({
                index: index, name: data.name, sex: data.sex, age: data.age, role: data.role,
                grade: data.grade,
                isMaster: data.isMaster,
                courses: data.courses,
            });
            this.props.submit("create", dataLists);
        } else {
            dataLists = dataLists.map((item) => {
                if (data.index === item.index) {
                    item = data;
                }
                return item;
            });
            this.props.submit("edit", dataLists);
        }
        this.props.close();
    }

    /**
     * 表单校验-姓名
     * @param {string} name 
     */
    checkName(name) {
        let reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!reg.test(name) || name === '') {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 表单校验-年龄
     * @param {string} age 
     */
    checkAge(age) {
        let reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
        if (!reg.test(age) || age === '') {
            return false;
        } else {
            return true;
        }
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

    render() {
        let data = this.props.dataToEdit;
        switch (data.role) {
            case "教师":
                data = {
                    name: data.name, sex: data.sex, age: data.age, role: data.role,
                    teacherDiv: 'block',
                    studentDiv: 'none',
                    teacherInfo: { grade: data.grade ? data.grade : "", isMaster: data.isMaster ? data.isMaster : "是", },
                    studentInfo: { grade: "", courses: "", }
                };
                break;
            case "学生":
                data = {
                    name: data.name, sex: data.sex, age: data.age, role: data.role,
                    teacherDiv: 'none',
                    studentDiv: 'block',
                    teacherInfo: { grade: "", isMaster: "是", },
                    studentInfo: { grade: data.grade ? data.grade : "", courses: data.courses ? data.courses : "", }
                };
                break;
            default:
        }
        const checkNameInfo = this.checkName(data.name) ? '√' : '请输入2~4位中文';
        const checkAgeInfo = this.checkAge(data.age) ? '√' : '请输入正确的年龄';

        return (
            <div className="layer" style={{ display: this.props.display }}>
                <div className="layer-title">
                    <span>{this.props.status === "create" ? "新建" : "编辑"}数据</span>
                    <span className="close" onClick={this.props.close.bind(this)}>&Chi;</span>
                </div>
                <form className="layer-content">
                    <div>
                        <label>姓名：</label>
                        <input type="text" name="name" placeholder="请输入姓名" autoComplete="off" value={data.name} onChange={this.handleChange.bind(this)} />
                        <span className={checkNameInfo === '√' ? "verifySuccess" : "verifyFail"}>{checkNameInfo}</span>
                    </div>
                    <div>
                        <label>性别：</label>
                        <select name="sex" value={data.sex} onChange={this.handleChange.bind(this)} >
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </div>
                    <div>
                        <label>年龄：</label>
                        <input type="text" name="age" placeholder="请输入年龄" autoComplete="off" value={data.age} onChange={this.handleChange.bind(this)} />
                        <span className={checkAgeInfo === '√' ? "verifySuccess" : "verifyFail"}>{checkAgeInfo}</span>
                    </div>
                    <div>
                        <label>角色：</label>
                        <select name="role" value={data.role} onChange={this.handleChange.bind(this)}>
                            <option value="教师">教师</option>
                            <option value="学生">学生</option>
                        </select>
                    </div>
                </form>
                <TeacherInfo display={data.teacherDiv} formChange={this.handleFormChange.bind(this)} teacherInfo={data.teacherInfo} />
                <StudentInfo display={data.studentDiv} formChange={this.handleFormChange.bind(this)} studentInfo={data.studentInfo} />
                <div><button className="submit" onClick={this.handleSubmit.bind(this)}>确定</button></div>
            </div>
        );
    }
}

export default EditData;