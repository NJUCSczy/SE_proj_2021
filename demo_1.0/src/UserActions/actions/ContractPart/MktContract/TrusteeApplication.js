import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message, DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

/**
 * 
 * 受托方签署合同签章的界面
 * 
 */
function TrusteeApplication(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;

  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'], {
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
          if (data != null) {
            form = data
            form['测试合同']['签章'] = {}
            form['测试合同']['签章']['市场部签章'] = values
            SubmitForm(form)
          }
          console.log(data)
        })
    }
    else {
      SubmitForm(values);
    }
  };

  const SubmitForm = (_form) => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'], {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_form)
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            message.success({ content: "提交成功！", key: "upload" })
            GotoPage("ViewEntrust", _state)
          }
          else {
            message.error({ content: "提交失败！", key: "upload" })
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
    }
    else {
      fetch(REMOTE_SERVER + "/contract/"+ _state['PageInfo']['ContractID']+"/contractTable/partyB" , {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'][0],
          'Authorization': _state['accessToken']
        },
        body: JSON.stringify(_form)
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            message.success({ content: "提交成功！", key: "upload" })
            GotoPage("ViewEntrust", _state)
          }
          else {
            message.error({ content: "提交失败！", key: "upload" })
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('请正确填写！')
  };

  return (
    <Form
      name="软件测试委托合同签章(受托方)"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      labelCol={{ span: 10, flex: 'auto' }}
      wrapperCol={{ span: 20 }}
      layout='vertical'
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >
      <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试委托合同签章(受托方)</h1>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位全称</h3>
      <Form.Item
        name="单位全称"
        rules={[{ required: true, message: '请填写单位全称' }]}
      >
        <Input id = '单位全称'style={{ maxWidth: 500 }}  />
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>授权代表</h3>
      <Form.Item
        name="授权代表"
        rules={[{ required: true, message: '请填写授权代表' }]}
      >
        <Input id='授权代表' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
      <Form.Item
        name="联系人"
        rules={[{ required: true, message: '请填写联系人' }]}
      >
        <Input id='联系人' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>通讯地址</h3>
      <Form.Item
        name="通讯地址"
        rules={[{ required: true, message: '请填写通讯地址' }]}
      >
        <Input id='通讯地址' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
      <Form.Item
        name="邮编"
        rules={[{ required: true, message: '请填写邮编' }]}
      >
        <Input id='邮编' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>电话</h3>
      <Form.Item
        name="电话"
        rules={[{ required: true, message: '请填写电话' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入电话' }]}
      >
        <Input id='电话' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
      <Form.Item
        name="传真"
        rules={[{ required: true, message: '请填写传真' }]}
      >
        <Input id='传真' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行</h3>
      <Form.Item
      name='开户银行'
      rules={[{ required: true, message: '请填写开户银行' }]} 
      >
        <Input id='开户银行' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>户名</h3>
      <Form.Item
      name='户名'
      rules={[{ required: true, message: '请填写户名' }]}
      >
        <Input id='户名' style={{ maxWidth: 500 }}  />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号</h3>
      <Form.Item
      name='账号'
      rules={[{ required: true, message: '请填写账号' }]} 
      >
        <Input id='账号' style={{ maxWidth: 500 }} />
      </Form.Item>
      <Form.Item>
        <Button id='提交'type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )
}
export default TrusteeApplication;

TrusteeApplication.propTypes = {
  /** 用户状态 */
  _state: PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo: PropTypes.func,
  /** 切换界面方法 */
  GotoPage: PropTypes.func,
}