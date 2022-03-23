import React, {Component} from 'react'
import Form from './Form'
import InputArea from './InputArea'
import Radio from './Radio'

class App extends Component {
    state={
        characters : [
        {
          name: 'Charlie',
          job: 'Janitor',
        },
        {
          name: 'Mac',
          job: 'Bouncer',
        },
        {
          name: 'Dee',
          job: 'Aspring actress',
        },
        {
          name: 'Dennis',
          job: 'Bartender',
        },
      ]
    }


    handleSubmit = (character) => {
        this.setState({characters: [...this.state.characters, character]})
    }

    removeCharacter = (index) => {
        const {characters} = this.state
      
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index
          }),
        })
      }
  render() {
    const { characters } = this.state
    const NameTitleStyle = { fontSize:40 , fontWeight: 'bolder' ,textAlign:'center'}
    const NormalStyle = {  fontSize:20 ,fontWeight: 'normal',textAlign:'left'}
    const TitleStyle1 = {  fontSize:25 ,fontWeight: 'bolder',textAlign:'left'}
    const TitleStyle2 = {  fontSize:20 ,fontWeight: 'bolder',textAlign:'left'}


  return (
    
    <div className="container">
      <h1 style = {NameTitleStyle} >软件项目委托测试申请书</h1>
      <h1 style = {NormalStyle}>请用√选择：○——单选；  □——多选。</h1>
      <InputArea TitleStyle={TitleStyle1} InputStyle={NormalStyle} TitleInfo="软件名称" TitleIdentifier="rjmc" />
      <InputArea TitleStyle={TitleStyle1} InputStyle={NormalStyle} TitleInfo="版本号" TitleIdentifier="bbh" />
      <Radio TitleStyle={TitleStyle1} RadioStyle={NormalStyle} TitleInfo="单位性质" RadioInfo={[{info:"内资企业"},{info:"外(合)资企业"},{info:"科研院校"},{info:"政府事业团体"},{info:"其它"}]} Name="dwxz"/>

    </div>
  )
  }
}

export default App