import isMobile from 'is-mobile';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message, DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TadultApplication.css'
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');

/**
 * 测试部审核用户申请表的界面
 */
function TadultApplication(props) {

  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;


  const setDataByKey = (key, val) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[key] = val;
      console.log(val)
      return newFormData;
    })

  }

  const onFinishForm = (values) => {
    console.log('Success:', values);
    if (!USE_JSON_SERVER) {
      return SubmitForm(values);
    }
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
          form['测试部审核委托'] = values
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
      fetch(REMOTE_SERVER+"/audit/delegation/test/" + _state['PageInfo']['id'], {
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
      name="软件项目委托测试申请书(测试部)"
      initialValues={{ remember: true }}
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
      style={{ padding: '20px 30px' }}
      labelCol={{ span: 10, flex: 'auto' }}
      wrapperCol={{ span: 20 }}
      layout='vertical'
      autoComplete="false">

      <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试申请书(测试部)</h1>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>密级</h2>
      <Form.Item
        name="密级"
        rules={[{ required: true, message: '请选择密级' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio id='密级_无密级' value="无密级" style={{ lineHeight: '32px' }} >无密级</Radio>
          </Col>
          <Col span={30}>
            <Radio id='密级_秘密' value="秘密" style={{ lineHeight: '32px' }}>秘密</Radio>
          </Col>
          <Col span={30}>
            <Radio id='密级_机密' value="机密" style={{ lineHeight: '32px' }}>机密</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>查杀病毒</h2>
      <Form.Item
        name='查杀病毒'
        rules={[{ required: true, message: '请填写查杀病毒' }]}
      >
        <Radio.Group >
          <Col span={30}>
            <Radio id='查杀病毒_已完成' value="已完成" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('查杀工具', false)}>
              已完成
            </Radio>
          </Col>
          <Radio id='查杀病毒_未完成' value="未完成" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('查杀工具', e.target.checked)}>
            无法完成
          </Radio>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="查杀工具"
            rules={[{ required: (formData['查杀工具'] === true), message: '请填写查杀工具！' }]}
          >
            <Input id='查杀工具' style={{ padding: 0 }} disabled={formData['查杀工具'] != true} placeholder='查杀工具'/>
          </Form.Item>
        </Radio.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>材料检查</h2>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试样品</h3>
      <Form.Item
        name={['材料检查', '测试样品']}
        rules={[{ required: true, message: '请选择测试样品' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox id='材料检查_测试样品_源代码' value="源代码" style={{ lineHeight: '32px' }}>
              源代码
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_测试样品_可执行文件' value="可执行文件" style={{ lineHeight: '32px' }}>
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
            <Checkbox id='材料检查_需求文档_项目计划任务书' value="项目计划任务书" style={{ lineHeight: '32px' }}>
              项目计划任务书
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_需求文档_需求分析报告' value="需求分析报告" style={{ lineHeight: '32px' }}>
              需求分析报告
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_需求文档_合同' value="合同" style={{ lineHeight: '32px' }}>
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
            <Checkbox id='材料检查_用户文档_用户手册' value="用户手册" style={{ lineHeight: '32px' }}>
              用户手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_用户文档_用户指南' value="用户指南" style={{ lineHeight: '32px' }}>
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
            <Checkbox id='材料检查_操作文档_操作员手册' value="操作员手册" style={{ lineHeight: '32px' }}>
              操作员手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_操作文档_安装手册' value="安装手册" style={{ lineHeight: '32px' }}>
              安装手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_操作文档_诊断手册' value="诊断手册" style={{ lineHeight: '32px' }}>
              诊断手册
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox id='材料检查_操作文档_支持手册' value="支持手册" style={{ lineHeight: '32px' }}>
              支持手册
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>其它</h3>
      <Form.Item
        name={["材料检查", "其它"]}
      >
        <Input id='材料检查_其他' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>确认意见</h2>
      <Form.Item
        name="确认意见"
        rules={[{ required: true, message: '请确认意见' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio id='确认意见_材料不全' value="材料不全" style={{ lineHeight: '32px' }} >测试所需材料不全，未达到受理条件。</Radio>
          </Col>
          <Col span={30}>
            <Radio id='确认意见_可以测试' value="可以测试" style={{ lineHeight: '32px' }}>属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
          </Col>
          <Col span={30}>
            <Radio id='确认意见_不符合标准或者缺乏设备' value="不符合标准或者缺乏设备" style={{ lineHeight: '32px' }}>无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
          </Col>
          <Col span={30}>
            <Radio id='确认意见_超出能力范围' value="超出能力范围" style={{ lineHeight: '32px' }}>超出实验室能力和资质范围，无法完成检测。</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button id='提交' type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )

}


export default TadultApplication

TadultApplication.propTypes={
  /** 用户状态 */
  _state:PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo:PropTypes.func,
  /** 切换界面方法 */
  GotoPage:PropTypes.func,
}
