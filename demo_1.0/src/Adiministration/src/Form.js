import React, {Component} from 'react'
import { Checkbox, Row, Col } from 'antd';
import { Input } from 'antd';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            名字: '',
            software: '',
            测试类型:[]
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }


    onFormSubmit = (event) => {
        event.preventDefault();
        const { 测试类型 } =this.state;
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
        this.setState({
            ["测试类型"] : 测试类型
        });
    }

    onChange = (checkedValues) => {
        this.setState({
            ["测试类型"] : checkedValues
        });
    }

    render() {
        const { 名字, software,测试类型} = this.state; 
        
        
      
        return (
            <form onSubmit={this.onFormSubmit}>
                <label for="名字">单位名称(中文)</label>
                <input 
                    type="text" 
                    name="名字" 
                    id="名字"
                    value={名字} 
                    onChange={this.handleChange} />
                <label for="software">软件名称</label>
                <input 
                    type="text" 
                    name="software" 
                    id="software"
                    value={software} 
                    onChange={this.handleChange} />
                    
                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} defaultValue={[]}>
                <Row>
                    <Col span={8}>
                    <Checkbox  value="软件确认测试" >软件确认测试</Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox value="成果/技术鉴定测试">成果/技术鉴定测试</Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox value="专项资金验收测试">专项资金验收测试</Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox value="其它">其它<Input placeholder="Basic usage"/></Checkbox>
                    </Col>
                </Row>
                </Checkbox.Group>
                
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;