import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';

var _ = require('lodash');
var mobile = require('is-mobile');

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
    fetch("http://localhost:8000/forms/"+ _state['PageInfo']['id'], {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_form)
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert("提交成功！")
          //navigate('/yjqtest', { state: { email: formData['email'], password: formData['password'] } })
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
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