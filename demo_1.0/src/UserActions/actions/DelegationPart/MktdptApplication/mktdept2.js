import isMobile from 'is-mobile';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message, DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');

/**
 * 在用户接受报价后，市场部填写项目编号
 */
function MktdptApplicationStep2(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;


  const setDataByKey = (key, val) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[key] = val;
      console.log(newFormData)
      return newFormData;
    })

  }


  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (!USE_JSON_SERVER) {
      form['id'] = values['测试项目编号']
      SubmitForm(form)
    }
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
          form['市场部审核委托']['测试项目编号'] = values['测试项目编号']
          SubmitForm(form)
        }
        console.log(data)
      })
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
      fetch(REMOTE_SERVER+"/complete/delegation/" + _state['PageInfo']['id'], {
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
          if (res.status === 201 || res.status === 200) {
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
      style={{ padding: '20px 30px' }}
      layout='vertical'
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >
      <div><h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试项目编号</h2>
        <Form.Item
          name="测试项目编号"
          rules={[{ required: true, message: '请填写测试项目编号' }]}
        >
          <Input style={{ maxWidth: 500 }} />

        </Form.Item></div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )
}

export default MktdptApplicationStep2;

MktdptApplicationStep2.propTypes={
  /** 用户状态 */
  _state:PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo:PropTypes.func,
  /** 切换界面方法 */
  GotoPage:PropTypes.func
}