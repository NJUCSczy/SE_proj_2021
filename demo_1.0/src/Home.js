import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import "./Home.css";
import Administration from "./Adiministration/Administration"


class Home extends React.Component{
    handle(){
        const w=window.open("","App/Administration")
        //console.log("'w' constructed!\n")
        ReactDOM.render(<Administration/>,w.document)
        //console.log("React!!")
    }

    render(){
        return(
            <div>
                <div id="container">
                    <div id="header">
                        <div id="title"><span>南京大学软件测试中心</span></div>
                        <div id="login_or_register">
                            <Link to="/login">登录</Link> | <Link to="/user/add">注册</Link>
                        </div>
                    </div>
                    <div id="footer">
                        <ul>
                            <li><a href="#">首页</a></li>
                            <li><a href="#">机构信息</a></li>
                            <li><a href="#">资质信息</a></li>
                            <li><a href="#">政策法规</a></li>
                            <li><a href="#">业务信息</a></li>
                            <li><a href="#">新闻资讯</a></li>
                            <li><a href="#">友情链接</a></li>
                            <li><button onClick={this.handle}>提交申请</button></li>
                            <li><a href="#">联系我们</a></li>
                        </ul>
                    </div>
                    <div class="nav"></div>
                    <div id="main">
                        <div id="left">maybe some photos...</div>
                        <div id="vertical_nav"></div>
                        <div id="right">
                            <div id="article_one" class="right_article">
                                <span><a href="#" target="_blank">公告一</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_two" class="right_article">
                            <span><a href="#">公告二</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_three" class="right_article">
                                <span><a href="#">公告三</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_four"class="right_article">
                                <span><a href="#">公告四</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;