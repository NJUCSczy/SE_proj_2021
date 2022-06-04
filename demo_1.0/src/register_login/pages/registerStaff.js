import React, { Component } from 'react'
import { useState } from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../UserActions/functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');


function RegisterStaffPage(props) {
  const { _state, UpdateUserInfo, GotoPage } = props;
  const [formData, setFormData] = useState({})

  const OnFinishForm = (values) => {
    console.log('success', values)
    if (!USE_JSON_SERVER)
      HandleRegister({ 'username': values['账号'], email: values['E-mail'], password: values['密码'], role: [values['身份']] })
  }

  const HandleRegister = (_info) => {
    console.log(_info)
    console.log(_state)
    fetch(REMOTE_SERVER + "/register/admin", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'accessToken': _state['accessToken'],
        'tokenType': _state['tokenType'],
        //'usrName': _state['userName'],
        //'usrID': _state['userID'],
        //'usrRole': _state['userRole'][0],
        'Authorization': _state['accessToken']
      },
      body: JSON.stringify(_info)
    })
      .then(res => {
        console.log(formData)
        if (res.status === 200) {
          message.success({ content: '注册成功！', key: "register" })
          GotoPage("Login")
        } else {
          message.error({ content: '注册失败', key: "register" })
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>注册工作人员账号</h1>
      <Form
        style={{ padding: '20px 30px' }}
        onFinish={OnFinishForm}
      >
        <h2>工作人员身份</h2>
        <Form.Item
          name={'身份'}
          rules={[{ required: true, message: '请选择工作人员身份' }]}>
          <Radio.Group>
            <Radio value={'mod_test'}>
              测试部人员
            </Radio>
            <Radio value={'mod_market'}>
              市场部人员
            </Radio>
            <Radio value={'mod_qlty'}>
              质检部人员
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name={'E-mail'} label={'E-mai'}
          rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input style={{ maxWidth: 300 }} />
        </Form.Item>

        <Form.Item
          name={'账号'} label={'账号'}
          rules={[{ required: true, message: '请输入账号' }]}>
          <Input style={{ maxWidth: 300 }} />
        </Form.Item>

        <Form.Item
          name={'密码'} label={'密码'}
          rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password style={{ maxWidth: 300 }} />
        </Form.Item>

        <Form.Item>
          <Button id="提交用户申请表" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default RegisterStaffPage