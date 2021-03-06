import isMobile from 'is-mobile';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message,DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');

/**
 * 市场部审核用户申请表的界面
 */
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
    if(!USE_JSON_SERVER){
      form['result']=values['市场部受理意见']
      if(values.hasOwnProperty('市场部备注')){
        form['info']=values['市场部备注']
      }
      else if(values.hasOwnProperty('进一步审理方向及原因')){
        form['info']=values['进一步审理方向及原因']
      }
      return SubmitForm(form)
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
          form['市场部审核委托'] = values
          SubmitForm(form)
        }
        console.log(data)
      })
  };

  const SubmitForm = (_form) => {
    if(USE_JSON_SERVER){
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
          message.success({content:"提交成功！",key:"upload"})
          GotoPage("ViewEntrust",_state)
        }
        else{
          message.error({content:"提交失败！",key:"upload"})
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
    }
    else{
      fetch(REMOTE_SERVER+"/audit/delegation/market/" + _state['PageInfo']['id'], {
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
            <Radio id='市场部受理意见_受理' value={USE_JSON_SERVER?"受理":"可以测试"} style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '受理')}>受理</Radio>
          </Col>
          <Col span={30}>
            <Radio id='市场部受理意见_不受理' value="不受理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '不受理')}>不受理</Radio>
          </Col>
          <Col span={30}>
            <Radio id='市场部受理意见_需进一步审理' value="需进一步审理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理', '需进一步审理')}>需进一步审理</Radio>
          </Col>
        </Radio.Group>
        </Form.Item>
      
      {(formData['是否受理'] === '受理') ? (<div><h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部备注</h2>
        <Form.Item
          name="市场部备注"
          rules={[{ required: true, message: '请填写市场部备注' }]}
        >
          <TextArea id='市场部备注' rows={5} style={{ maxWidth: 700 }}></TextArea>
        </Form.Item></div>) : null}
      {
        (formData['是否受理'] === '需进一步审理') ? (
          <div>
            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>进一步审理方向及原因</h2>
            <Form.Item
              name="进一步审理方向及原因"
              rules={[{ required: true, message: '请填写进一步审理方向及原因，暂无请填“无”' }]}
            >
              <TextArea id='进一步审理方向及原因' rows={5} style={{ maxWidth: 700 }}></TextArea>
            </Form.Item>
          </div>
        ) : null
      }

      <Form.Item>
        <Button id='提交' type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )
}

export default MktdptApplicationStep1;

MktdptApplicationStep1.propTypes={
  /** 用户状态 */
  _state:PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo:PropTypes.func,
  /** 切换界面方法 */
  GotoPage:PropTypes.func
}