
import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'
import Table2 from './Table2'
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
    characters1: [
      {
        name: 'Charlie',
        software: 'Janitor',
      },
    ],
    characters2: [
      {
        name: 'Charlie1',
        software: 'Janitor1',
      },
      {
        name: 'Mac1',
        software: 'Bouncer1',
      },
      {
        name: 'Dee1',
        software: 'Aspring actress1',
      },
      {
        name: 'Dennis1',
        software: 'Bartender1',
      },
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
    /*
    this.setState({
      characters2: characters2.filter((character, i) => {
        return i == index
      }),
    })
    this.setState({
      characters2: [...this.state.characters2, characters1.filter((character, i) => {
        return i !== index
      }),]
    })*/
  }

  acceptCharacter = (index) => {
    const {characters1} = this.state
    const {characters2} = this.state
  
    this.setState({
      characters1: characters1.filter((character, i) => {
        return i !== index
      }),
    })
    this.setState({
      characters2: [...this.state.characters2, characters1.filter((character, i) => {
        return i !== index
      }),]
    })
  }

  handleSubmit = (character) => {
    this.setState({characters1: [...this.state.characters1, character]})
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

    return (
      <div className="container">
        <h1>委托管理</h1>
        <h2>委托信息填报情况</h2>
        <Table characterData={characters1} removeCharacter={this.removeCharacter} acceptCharacter={this.acceptCharacter}/>
        <h2>  </h2>
        <h2>添加新委托</h2>
        <Form handleSubmit={this.handleSubmit} />
        <h2>  </h2>
        <h2>已接受的委托(第二个表格来存放新接受的委托)</h2>
        <Table2 characterData={characters2} removeCharacter={this.removeCharacter1}/>
      </div>
    )
  }
}

export default App
