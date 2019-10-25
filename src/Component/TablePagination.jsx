import React from 'react';
import '../index.css';

class TablePagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPageNum: 1,                   // 当前页码
            pageCount: 0,                     // 总页数
            pageInput: '',                    // 输入的页码
            pageArray: [],                    // 页码数组
        }
    }

    /**
     * 组建更新后，根据入参是否发生变化，设置总页数及页码数组
     * @param {Object} prevProps 
     * @param {Object} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            // 获取总页数
            let pageCount = parseInt(this.props.data.length / 5);
            if (0 !== this.props.data.length % 5) {
                pageCount += 1;
            }
            // 获取页码数组
            let pageArray = [];
            for (let i = 0; i < pageCount; i++) {
                pageArray.push((i + 1));
            }
            this.setState({
                currPageNum: 1,
                pageCount: pageCount,
                pageArray: pageArray,
            });
        }
    }

    /**
     * 处理页码输入变化事件
     * @param {Object} event 事件对象
     */
    handleChange(event) {
        this.setState({
            pageInput: event.target.value
        })
    }

    /**
     * 显示首页
     */
    firstPage() {
        this.showCurrentPage(1);
    }

    /**
     * 显示前一页
     */
    preText() {
        if (this.state.currPageNum === 1) {
            alert("当前已经是第一页");
            return;
        }
        let currPageNum = this.state.currPageNum;
        currPageNum -= 1;
        this.setState({
            currPageNum: currPageNum,
        });
        this.showCurrentPage(currPageNum);
    }

    /**
     * 显示下一页
     */
    nextLink() {
        if (this.state.currPageNum === this.state.pageCount) {
            alert("当前已经是最后一页");
            return;
        }
        let currPageNum = this.state.currPageNum;
        currPageNum += 1;
        this.setState({
            currPageNum: currPageNum,
        });
        this.showCurrentPage(currPageNum);
    };

    /**
     * 显示最后一页
     */
    lastLink() {
        this.setState({
            currPageNum: this.state.pageCount,
        });
        this.showCurrentPage(this.state.pageCount);
    }

    /**
     * 显示当前页
     * @param {number} currPageNum 当前页码
     */
    showCurrentPage(currPageNum) {
        let dataLists = this.props.data.slice();
        if (currPageNum !== this.state.pageCount) {
            this.props.showData(dataLists.splice((currPageNum - 1) * 5, 5));
        } else {
            this.props.showData(dataLists.splice((currPageNum - 1) * 5, dataLists.length - (currPageNum - 1) * 5));
        }
    }

    /**
     * 处理页码点击事件
     * @param {number} pageNum 页码
     */
    choosePage(pageNum) {
        this.setState({
            currPageNum: pageNum,
        });
        this.showCurrentPage(pageNum);
    }

    /**
     * 跳转到某一页
     */
    skipTo() {
        if (this.state.pageInput.trim() === '') {
            alert("请输入页码");
            return;
        } else {
            let currPageNum = parseInt(this.state.pageInput);
            this.setState({
                currPageNum: currPageNum,
            });
            this.showCurrentPage(currPageNum);
        }
    }

    render() {
        return (
            <div className="tablePageBox">
                <div style={{ float: 'right', padding: '0px 20px' }}>
                    <button onClick={this.preText.bind(this)}>上一页</button>
                    {
                        this.state.pageArray.map((data) => {
                            return <button className={this.state.currPageNum === data ? "choose" : "unChoose"} key={data} data-number={data} onClick={this.choosePage.bind(this, data)}>{data}</button>
                        })
                    }
                    <button onClick={this.nextLink.bind(this)}>下一页</button>
                    <span style={{ margin: '0px 10px' }}>
                        到第<input className="pageInput" type="text" onChange={this.handleChange.bind(this)} />页
                    <button style={{ margin: '0px 10px' }} onClick={this.skipTo.bind(this)}>确定</button>
                    </span>
                    <span>共{this.props.data.length}条</span>
                </div>
            </div>
        );
    }
}

export default TablePagination;