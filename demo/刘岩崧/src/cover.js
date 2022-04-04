import React from "react"
import Home from "./first";
import ReactDOM from 'react-dom';
class BackG extends React.Component {//设置背景动图
    goBack (){
        window.history.go(-1);
    }
        render() {
             var styleDiv = {
                width:'100%',
                height:'70px',
            }
            var styleImg = {
                width:'100%',
                height:'700px',
            }

            return (
                <div style={styleDiv}>
                    {/* <ParticlesBg color="#ff0000" type = "polygon" bg ={true}/> */}
                    <a href="#" onClick={()=>this.goBack()} >
                        <img src={require('./images/Cover2.gif')} style={styleImg}/>
                    </a>
            
                </div>
            )
        }
    }
    class Entrance extends React.Component{//设置跳转按钮
        
        render(){
            var extrance={
                //border:"none",
                width:"500px",
                height:"150px",
                backgroundColor:"rgb(34, 39, 24)",
                color:"rgb(3, 205, 226)",
                fontSize:"40px",
                position:'relative',
                left:"50%",
                marginLeft:'-400px',
                marginTop:'50px',
        
            }
            var text={
                color:"rgb(213, 205, 226)",
                textDecoration:"none",
            }
          return(                //跳转至新闻界面window.open('about:blank').location.href="http://localhost:3000/first.html"
            <button style={extrance} onClick={()=>ReactDOM.render(<Home/>,document.getElementById('root'))}>
            <a href="#" style={text}>点我看女武神水鸟乱舞</a>
        </button>
          )
        }
        }
    class Cover extends React.Component{
        render () {
          return (
              <div>
                  <BackG></BackG>
                  <Entrance></Entrance>
              </div>
          )
        }
      }
      export default Cover;