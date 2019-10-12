import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

// 用于标记表格的每一行
let i = 0;

class OperateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'block',
            name: '',
            sex: '',
            age: '',
            role: '',
            data:[],
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // 读取输入的值
        const name = event.target.name;
        const value = event.target.value;
        //   更新状态
        this.setState({
            [name]: value
        })
    }

    /**点击确定创建新的数据 */
    handleSubmit() {
        const data=this.state.data;
        data.push({index:++i,name:this.state.name,sex:this.state.sex,age:this.state.age,role:this.state.role});
        localStorage.setItem('data',JSON.stringify(data));
        this.props.submit(JSON.stringify(data));
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
                        <input type="text" name="name" placeholder="请输入姓名" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>性别：</label>
                        <input type="text" name="sex" placeholder="请输入性别" value={this.state.sex} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>年龄：</label>
                        <input type="text" name="age" placeholder="请输入年龄" value={this.state.age} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>角色：</label>
                        <input type="text" name="role" placeholder="请输入角色" value={this.state.role} onChange={this.handleChange}/>
                    </div>
                </form>
                <div><button className="submit" onClick={this.handleSubmit}>确定</button></div>
            </div>
        );
    }
}

export default OperateDialog;