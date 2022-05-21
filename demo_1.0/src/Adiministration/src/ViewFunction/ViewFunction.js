import React, { Component, Fragment } from 'react'
import { DatePicker, Divider, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewFunction.css'
import { getStageByInfo, getStatusInfo } from '../../functions/functions'
import { useEffect, useState } from 'react';
import moment from 'moment';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

var _ = require('lodash');


function ViewFunction (props){
  const { UpdateUserInfo, GotoPage,_state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })
  const { Option } = Select;
  const { TextArea } = Input;

  const updateInfo = () => {
    fetch("http://localhost:8000/forms/"+ _state['PageInfo']['id'], {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
          console.log(data)
            if (data != null) {
                setEntrustData(prev => {
                    const newData = _.cloneDeep(prev)
                    newData["formData"] = data
                    return newData
                })
            }
        })
}
useEffect(() => {
    updateInfo();
}, []
)


  return(
    entrustData['formData'] === null ? null:(
      <Form style={{  minHeight: 380 }}
        name="委托测试软件功能列表"
        initialValues={{"项目列表":entrustData['formData']['委托测试软件功能列表']['功能项目列表']}}
      >
        <h1 style={{textAlign:'center',fontSize:30}}>委托测试软件功能列表</h1>
        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>&emsp;软件名称</h4>
        <Input  style={{maxWidth:250}} disabled defaultValue={entrustData['formData']['委托测试软件功能列表']['软件名称']}/>
        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>&emsp;版本号</h4>
        <Input  style={{maxWidth:250}} disabled defaultValue={entrustData['formData']['委托测试软件功能列表']['版本号']}/>
        <Form.List name="项目列表" layout='vertical' width={500}>
          {(fields, {add, remove})=>(<>
            {fields.map(({ key, name, ...restField }) => (
              <Fragment>
                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件功能</h4>
                <Form.Item {...restField} name={[name,'软件功能项目']}>
                  <Input style={{maxWidth:250}} disabled placeholder="软件功能项目" />
                </Form.Item>
                <Form.List  name={[name, '子功能项目列表']} layout='vertical' width={500} >
                  {(fieldsInside, { add:addInside, remove:removeInside }) => ( <>
                    {fieldsInside.map(({ key, name, ...restFieldInside }) => (
                      <div>
                        <h5 style={{ fontWeight: 'bolder', padding :'0px 50px' }}>软件子功能项目</h5>
                        <Form.Item {...restFieldInside}
                          name = {[name,'软件子功能项目']}
                          style={{ padding :'0px 50px'}}>
                          <Input style={{maxWidth:250}} disabled placeholder="软件子功能项目" />
                        </Form.Item>
                        <h5 style={{ fontWeight: 'bolder',padding :'0px 50px', marginTop: 30 }}>功能说明</h5>
                        <Form.Item {...restFieldInside}
                        style={{ padding :'0px 50px'}}
                        name = {[name,'功能说明']}>
                          <Input type="textarea" rows={4} style={{maxWidth:450}} disabled placeholder="功能说明" />
                        </Form.Item>
                      </div>
                    ))}</>
                  )}
                </Form.List>
              </Fragment>
            ))}</>
          )}
        </Form.List>
        <br/>
        <br/>
      </Form>
    )
  )
}



export default ViewFunction