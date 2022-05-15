import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TadultApplication.css'
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { useEffect, useState } from 'react';
import moment from 'moment';

var _ = require('lodash');

function TadultApplication (props){

  const { UpdateUserInfo, GotoPage,_state } = props;
  const [formData, setFormData] = useState({})
  const [entrustData, setEntrustData] = useState({ 'formData': null })
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
    var form={}
    form['TadultApplication']=values
    SubmitForm(form)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const SubmitForm = (_form) => {
    fetch("http://localhost:8000/test/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_form)
    })
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          alert("提交成功！")
          //navigate('/yjqtest', { state: { email: formData['email'], password: formData['password'] } })
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
  }

  return(
        <Form
        name="软件项目委托测试申请书(测试部)"
        initialValues={{ remember: true }}
        onFinish={onFinishForm}
        onFinishFailed={onFinishFailed}
        style={{ padding: '20px 30px' }}
        labelCol={{ span: 10, flex: 'auto' }}
        wrapperCol={{ span: 20 }}
        layout='vertical'
        autoComplete="false">
            
        <h1 style={{textAlign:'center',fontSize:30}}>软件项目委托测试申请书(测试部)</h1>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位性质</h2>
      <Form.Item
        name="密级"
        rules={[{ required: true, message: '请选择密级' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="无密级" style={{ lineHeight: '32px' }} >无密级</Radio>
          </Col>
          <Col span={30}>
            <Radio value="秘密" style={{ lineHeight: '32px' }}>秘密</Radio>
          </Col>
          <Col span={30}>
            <Radio value="机密" style={{ lineHeight: '32px' }}>机密</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>查杀病毒</h2>
      <Form.Item
        name='查杀病毒'
        rules={[{ required: true, message: '请填写查杀病毒' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="已完成" style={{ lineHeight: '32px' }}>
              已完成
            </Checkbox>
          </Col>
          <Checkbox value="未完成" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('查杀工具', e.target.checked)}>
            其他
          </Checkbox>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="查杀工具"
            rules={[{ required: (formData['查杀工具'] === true), message: '请填写查杀工具！' }]}
          >
            <Input style={{ padding: 0 }} disabled={formData['查杀工具'] != true} />
          </Form.Item>
        </Checkbox.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>材料检查</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试样品</h3>
      <Form.Item
        name={['材料检查', '测试样品']}
        rules={[{ required: true, message: '请选择测试样品' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="源代码" style={{ lineHeight: '32px' }}>
              源代码
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可执行文件" style={{ lineHeight: '32px' }}>
              可执行文件
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>需求文档</h3>
      <Form.Item
        name={['材料检查', '需求文档']}
        rules={[{ required: true, message: '请选择需求文档' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="项目计划任务书" style={{ lineHeight: '32px' }}>
            项目计划任务书
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="需求分析报告" style={{ lineHeight: '32px' }}>
              需求分析报告
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="合同" style={{ lineHeight: '32px' }}>
              合同
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>用户文档</h3>
      <Form.Item
        name={['材料检查', '用户文档']}
        rules={[{ required: true, message: '请选择用户文档' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="用户手册" style={{ lineHeight: '32px' }}>
            用户手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="用户指南" style={{ lineHeight: '32px' }}>
              用户指南
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>操作文档</h3>
      <Form.Item
        name={['材料检查', '操作文档']}
        rules={[{ required: true, message: '请选择操作文档' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="操作员手册" style={{ lineHeight: '32px' }}>
            操作员手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="安装手册" style={{ lineHeight: '32px' }}>
            安装手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="诊断手册" style={{ lineHeight: '32px' }}>
            诊断手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="支持手册" style={{ lineHeight: '32px' }}>
            支持手册
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>其它</h3>
      <Form.Item 
        name={["材料检查", "其它"]}
        >
          <Input  style={{maxWidth:500}}/>
        </Form.Item>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>确认意见</h2>
      <Form.Item
        name="确认意见"
        rules={[{ required: true, message: '请确认意见' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="材料不全" style={{ lineHeight: '32px' }} >测试所需材料不全，未达到受理条件。</Radio>
          </Col>
          <Col span={30}>
            <Radio value="可以测试" style={{ lineHeight: '32px' }}>属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
          </Col>
          <Col span={30}>
            <Radio value="不符合标准或者缺乏设备" style={{ lineHeight: '32px' }}>无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
          </Col>
          <Col span={30}>
            <Radio value="超出能力范围" style={{ lineHeight: '32px' }}>超出实验室能力和资质范围，无法完成检测。</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

        </Form>
  )

}


export default TadultApplication
