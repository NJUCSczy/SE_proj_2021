import React from 'react'
import ReactDOM from 'react-dom';
import "./Home.css"
import { findDOMNode } from 'react-dom';
import Administration from "./Adiministration/Administration"
import UserApp from "./User/code/src/App"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"


class Home extends React.Component{
    handle(){
        const w=window.open("","App/Administration")
        //console.log("'w' constructed!\n")
        ReactDOM.render(<Administration/>,w.document)
        //console.log("React!!")
        
    }
    render(){
        return(
            <div id="container">
            <div id="header">
                <div id="title"><span>南京大学软件测试中心</span></div>
                <div id="login_or_register">
                        <a onClick={()=>(ReactDOM.render(<UserApp/>,document.getElementById('root')))}>登录</a> | <a href="">注册</a>
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
                <div id="left">maybe some photos...
                </div>

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

        )
    }
}
export default Home;