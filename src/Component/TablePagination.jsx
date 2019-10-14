import React from 'react';
import '../index.css';

class TablePagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPageNum: 1,                  // 当前页码
            pageNum: 0,                      // 总页数
            pageNumStatus: 'unChoose',       // 页码状态
            pageInput: ''                    // 输入的页码
        }
    }

    componentWillReceiveProps(nextProps) {
        let pageNum = parseInt(nextProps.data.length / 5);
        if (0 != nextProps.data.length % 5) {
            pageNum += 1;
        }
        this.setState({
            pageNum: pageNum,
        });
        this.renderPageHtml();
    }

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
        this.setState({
            currPageNum: this.state.currPageNum -= 1,
        });
        this.showCurrentPage(this.state.currPageNum);
    }

    /**
     * 显示下一页
     */
    nextLink() {
        this.setState({
            currPageNum: this.state.currPageNum += 1,
        });
        this.showCurrentPage(this.state.currPageNum);
    };

    /**
     * 显示最后一页
     */
    lastLink() {
        this.setState({
            currPageNum: this.state.pageNum,
        });
        this.showCurrentPage(this.state.currPageNum);
    }

    /**
     * 显示当前页
     */
    showCurrentPage(currPageNum) {
        let dataLists = [];
        if (localStorage.getItem('data') != null) {
            dataLists = JSON.parse(localStorage.getItem('data'));
        }
        if (currPageNum !== this.state.pageNum) {
            this.props.showData(dataLists.splice((currPageNum - 1) * 5, 5));
        } else {
            this.props.showData(dataLists.splice((currPageNum - 1) * 5, dataLists.length - (currPageNum - 1) * 5));
        }
    }

    /**
     * 选中某一页
     */
    choosePage(event) {
        this.setState({
            currPageNum: event.target.getAttribute("data-number"),
        });
        this.showCurrentPage(this.state.currPageNum);
    }

    /**
     * 跳转到某一页
     */
    skipTo() {
        if (this.state.pageInput.trim() == '') {
            alert("请输入页码");
        } else {
            this.setState({
                currPageNum: this.state.pageInput,
            });
            this.showCurrentPage(this.state.pageInput);
        }
    }

    /**
     * 渲染页码html
     */
    renderPageHtml() {
        let html = '';
        for (let i = 0; i < this.state.pageNum; i++) {
            html += "<a href='#' class=" + (this.state.pageNumStatus) + " data-number=" + (i + 1) + " onClick=" + this.choosePage.bind(this) + ">" + (i + 1) + "</a>";
        }
        return { __html: html };
    }

    render() {
        return (
            <div className="tablePageBox">
                <div style={{ float: 'right', padding: '0px 20px' }}>
                    <button onClick={this.preText.bind(this)}>上一页</button>
                    <div className="pageNumDiv" dangerouslySetInnerHTML={this.renderPageHtml()} />
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