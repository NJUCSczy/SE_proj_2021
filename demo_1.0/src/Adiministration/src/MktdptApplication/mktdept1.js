import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';

var _ = require('lodash');
var mobile = require('is-mobile');

function MktdptApplicationStep1(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;

  let isAccepted = false;
  let notAccepted = false;
  let needfurtherdiscuss = false;

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
          form['市场部审核委托'] = values
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
      <Form.Item
        name="市场部受理意见"
        rules={[{ required: true, message: '请确认是否受理申请' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="受理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '受理')}>受理</Radio>
          </Col>
          <Col span={30}>
            <Radio value="不受理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '不受理')}>不受理</Radio>
          </Col>
          <Col span={30}>
            <Radio value="需进一步审理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '需进一步审理')}>需进一步审理</Radio>
          </Col>
        </Radio.Group>
        </Form.Item>
      
      {(formData['是否受理'] === '受理') ? (<div><h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部备注</h2>
        <Form.Item
          name="市场部备注"
          rules={[{ required: true, message: '请填写市场部备注' }]}
        >
          <TextArea rows={5} style={{ maxWidth: 700 }}></TextArea>
        </Form.Item></div>) : null}
      {
        (formData['是否受理'] === '需进一步审理') ? (
          <div>
            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>进一步审理方向及原因</h2>
            <Form.Item
              name="进一步审理方向及原因"
              rules={[{ required: true, message: '请填写进一步审理方向及原因，暂无请填“无”' }]}
            >
              <TextArea rows={5} style={{ maxWidth: 700 }}></TextArea>
            </Form.Item>
          </div>
        ) : null
      }

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )
}

export default MktdptApplicationStep1;