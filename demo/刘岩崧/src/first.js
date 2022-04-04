import React from 'react'
import All from './All';
import ReactDOM from 'react-dom';
class Home extends React.Component{
    render(){return(
    <div id="container">
    <div id="header">
       
        <div id="title"><span>南京大学软件测试中心</span></div>
        <div id="login_or_register">
                <button onClick={()=>ReactDOM.render(<All/>,document.getElementById('root'))}>登录</button> | <a href="">注册</a>
        </div>

    </div>
    <div id="footer">
        <ul>
            <li><a href="#">首页</a></li>
            <li>机构概况</li>
            <li>客户服务</li>
            <li>友情链接</li>
            <li>关于我们</li>
            <li>联系方式</li>
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


    
</div>)
}
}
export default Home;