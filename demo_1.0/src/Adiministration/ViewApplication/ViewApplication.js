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
      name="软件项目委托测试申请书"

      >申请 </Form>
  )
}


export default ViewApplication