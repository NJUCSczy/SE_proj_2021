
import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'
import Table2 from './Table2'
import { Checkbox, Row, Col } from 'antd';
import './Administration.css'
class Administration extends Component {
  state = {
    characters1: [
      {
        名字: 'Charlie',
        software: 'Janitor',
        /*测试类型:{
          "软件确认测试": 'dw ',
          "其它": 'cd',
          "成果/技术鉴定测试": 'gf',
          "专项资金验收测试": 'gr',
        },*/
        测试类型:["软件确认测试","专项资金验收测试"]
      },
    ],
    characters2: [
      /*{
        名字: 'Charlie1',
        software: 'Janitor1',
        测试类型:["软件确认测试","专项资金验收测试"]
      },*/
    ],
  }
  

  removeCharacter = (index) => {
    const {characters1} = this.state
    const {characters2} = this.state
  
    this.setState({
      characters1: characters1.filter((character, i) => {
        return i !== index
      }),
    })
  }

  acceptCharacter = (index) => {
    const {characters1} = this.state
    const {characters2} = this.state
  
    this.setState({
      characters1: characters1.filter((character, i) => {
        if(i==index){
          const chara=characters1[i]
          this.setState({
            characters2: [...this.state.characters2,characters1[i]]
          })
        }
        return i !== index
      }),
    })
  }

  handleSubmit = (character) => {
    this.setState({characters1: [...this.state.characters1, character]})
    var info={"委托单位(中文)":character["名字"],"软件名称":character["software"],"测试类型":character["测试类型"]}
      fetch("http://localhost:3005/characters1", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'token':'640'
        },
        body: JSON.stringify(info)
        
        //body: JSON.stringify({ '名字': characters1['名字'], 'software': characters1['software'] })
    })
      .then(res => {
          if(res.status===201){
              alert("提交成功！")
          }
          return res.json()
      })
      .then(data => {
          console.log(data)
      })
  }

  

  removeCharacter1 = (index) => {
    const {characters2} = this.state
  
    this.setState({
      characters2: characters2.filter((character, i) => {
        return i !== index
      }),
    })
  }


  

  render() {
    const { characters1 } = this.state;
    const { characters2 } = this.state;

    function onChange(checkedValues) {
      console.log('checked = ', checkedValues);
    }

    const getInfo=()=>{
      //端口以自己json-server的为准
      fetch("http://localhost:3005/characters1", {
          method: "GET",
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'token': '640'
          },
      })
          .then(res => {
              if(res.status===201){
                  alert("读取成功！")
              }
              return res.json()
          })
          .then(data => {
          //此处data即为读取到的数据，根据需要进行存储或其他操作
          this.setState({characters2: data})
          console.log(data)
          })
      }
  

    const NameTitleStyle = { fontSize:40 , fontWeight: 'bolder' ,textAlign:'center'}

    return (
      <div className="container">
        <h1 style = {NameTitleStyle} >委托管理</h1>
        <h2>委托信息填报情况</h2>
        <Table characterData={characters1} removeCharacter={this.removeCharacter} acceptCharacter={this.acceptCharacter}/>
        <h2>  </h2>
        <h2>添加新委托</h2>
        <Form handleSubmit={this.handleSubmit} />
        <h2>  </h2>
        <h2>已接受的委托(第二个表格来存放新接受的委托)</h2>
        <Table2 characterData={characters2} removeCharacter={this.removeCharacter1}/>
        <button onClick={getInfo}>获取信息</button>
      </div>
    )
  }
}

export default Administration
