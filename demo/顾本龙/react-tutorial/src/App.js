
import React, {Component} from 'react'
import Table from './Table'
/*
class App extends Component {
  render() {
    return (
      <div className="container">
         <h1>Hello, React!</h1>
        <Table />
        <h1>    </h1>
      </div>
    )
  }
}*/
class App extends Component {
  state = {
    characters: [
      {
        name: 'Charlie',
        software: 'Janitor',
      },
      {
        name: 'Mac',
        software: 'Bouncer',
      },
      {
        name: 'Dee',
        software: 'Aspring actress',
      },
      {
        name: 'Dennis',
        software: 'Bartender',
      },
    ],
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
    const { characters } = this.state;

    return (
      <div className="container">
        <h1>委托管理</h1>
        <h2>委托信息填报情况</h2>
        <Table characterData={characters} removeCharacter={this.removeCharacter}/>
        <h2>  </h2>
        <h2>添加新委托</h2>
        <h3>Name: </h3>
        <h3>Software:  </h3>
        <h3>Add(button)</h3>
        <h2>  </h2>
        <h2>已接受的委托(第二个表格来存放新接受的委托)</h2>
      </div>
    )
  }
}

export default App
