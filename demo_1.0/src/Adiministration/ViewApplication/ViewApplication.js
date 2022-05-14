import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewApplication.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';

var _ = require('lodash');

function ViewApplication(props){
  const userState = props._state
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;

  const GetForm =() => {
    fetch("http://localhost:8000/forms/1", {
        method: "POST",
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
    console.log(res)
    if (res.status === 201) {
        alert("提交成功！")
    }
    return res.json()
    })
    .then(data => {
    setFormData(prev => {
        const newFormData = _.cloneDeep(prev)
        newFormData["userApplication"] = data
        console.log(newFormData)
        return newFormData
        })
    console.log(data)
    })
  }


  return(
      <Form
      name="软件项目委托测试申请书">
          <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="软件确认测试" style={{ lineHeight: '32px' }}>
              软件确认测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="成果/技术鉴定测试" style={{ lineHeight: '32px' }}>
              成果/技术鉴定测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="专项资金验收测试" style={{ lineHeight: '32px' }}>
              专项资金验收测试
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} >
            其他
          </Checkbox>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="测试类型(其他)"
            rules={[{ required: (formData['测试类型(其他)'] === true), message: '请填写其他测试类型名称！' }]}
          >
            <Input style={{ padding: 0 }} disabled={formData['测试类型(其他)'] != true} />
          </Form.Item>
        </Checkbox.Group> 
      </Form>
  )
}


export default ViewApplication