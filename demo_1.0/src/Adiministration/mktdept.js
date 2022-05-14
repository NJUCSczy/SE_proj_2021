import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './SubmitApplication.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';

var _ = require('lodash');
var mobile = require('is-mobile');

function MktdptApplication(props){
    const userState = props._state
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

    return(
        <Form
        style={{ padding: '20px 30px' }}
        layout='vertical'>
        <Form.Item
        name="市场部受理意见"
        rules={[{ required: true, message: '请确认是否受理申请' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="受理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理','受理')}>受理</Radio>
          </Col>
          <Col span={30}>
            <Radio value="不受理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理','不受理')}>不受理</Radio>
          </Col>
          <Col span={30}>
            <Radio value="需进一步审理" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('是否受理','需进一步审理')}>需进一步审理</Radio>
          </Col>
        </Radio.Group>
        
        {(formData['是否受理']==='受理')?(
        <div><h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试项目编号</h2>
        <Form.Item
            name="测试项目编号"
            rules={[{ required: true, message: '请填写测试项目编号' }]}
        >
            <Input  style={{maxWidth:500}}/>
        
        </Form.Item></div>):null
        }
        </Form.Item>
        {(formData['是否受理']==='受理')?(<div><h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部备注</h2>
        <Form.Item
            name="市场部备注"
            rules={[{ required: true, message: '请填写市场部备注' }]}
        >
            <TextArea rows={5}  style={{maxWidth:700}}></TextArea>
        </Form.Item></div>):null}
        
    
      </Form>
    )
}

export default MktdptApplication;