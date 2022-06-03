import isMobile from 'is-mobile';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Descriptions,message,DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './SubmitApplication.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
import { attachTypeApi } from 'antd/lib/message';

var _ = require('lodash');
var mobile = require('is-mobile');

/**
 * 用户提交申请表的界面，采用自适应布局，包含单选、多选、输入框等多种表单组件   
 * 
 * 在用户完成填写且必填项全部完成后，可以点击提交   
 * 
 * 提交后的表单会发送给后端 
 * 
 */
function SubmitApplication(props) {
  const userState = props._state
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const [testData, setTestData] = useState({})
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

  const test =(value,key)=>{
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[key] = false;
      value.map(item => (item==="其他"?
      newFormData[key] = true:
      null))
      console.log(newFormData)
      return newFormData;
    })
    
    console.log(`selected ${value}`);
  }

  const choosetype =(value)=>{
    setTestData(prev => {
      const newTestData = _.cloneDeep(prev)
      newTestData["系统软件"] = false;
      newTestData["支持软件"] = false;
      newTestData["应用软件"] = false;
      newTestData["其他"] = false;
      newTestData[value] = true;
      console.log(newTestData)
      return newTestData;
    })
    console.log(`selected ${value}`);
  }


  const SubmitForm = (_form) => {
    console.log(_form)
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_form)
      })
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            message.success({content:"提交成功！",key:"upload"})
            GotoPage("ViewEntrustList",_state)
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
    else {
      fetch(REMOTE_SERVER+"/delegation/applicationTable", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': userState['accessToken'],
          'tokenType': userState['tokenType'],
          'usrName': userState['userName'],
          'usrID': userState['userID'],
          'usrRole': userState['userRole'],
          'Authorization': userState['accessToken']
        },
        body: JSON.stringify(_form)
      })
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            message.success({content:"提交成功！",key:"upload"})
            GotoPage("ViewEntrustList",_state)
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
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinishForm = (values) => {
    var form = {}
    console.log('Success:', values);
    if (USE_JSON_SERVER) {
      form['用户申请表'] = values
      form['userID'] = userState['userID']
      form['userName'] = userState['userName']
      SubmitForm(form)
    }else{
      form['applicationTable'] = values
      SubmitForm(form)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('请正确填写！')
  };

  return (
    <Form
      name="软件项目委托测试申请书"
      initialValues={{ remember: true }}
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
      style={{ padding: '20px 30px' }}
      labelCol={{ span: 10, flex: 'auto' }}
      wrapperCol={{ span: 20 }}
      layout='vertical'
      autoComplete="false">
      <Descriptions
      title={<h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试申请书</h1>}
      layout='vertical'
      
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="测试类型" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name='测试类型'
        rules={[{ required: true, message: '请选择测试类型' }]}
      >
        <Select id="测试类型_下拉栏" mode="multiple" allowClear style={{ width: 160 }} onChange={(e) => {test(e,'测试类型(其他)')}}>
          <Option id="测试类型_软件确认测试" value="软件确认测试" style={{ lineHeight: '32px' }}>软件确认测试</Option>
          <Option id="测试类型_成果/技术鉴定测试" value="成果/技术鉴定测试" style={{ lineHeight: '32px' }}>成果/技术鉴定测试</Option>
          <Option id="测试类型_专项资金验收测试" value="专项资金验收测试" style={{ lineHeight: '32px' }}>专项资金验收测试</Option>
          <Option id="测试类型_其他" value="其他" style={{ lineHeight: '32px' }} >其他</Option>
          
        </Select>
        
      </Form.Item>
      <Form.Item
        style={{ paddingLeft: 20 }}
        name="测试类型(其他)"
        rules={[{ required: (formData['测试类型(其他)'] === true), message: '请填写其他测试类型名称！' }]}
      >
        {formData['测试类型(其他)'] != true? null:(
           <Input id="测试类型(其他)" style={{ padding: 0 }} disabled={formData['测试类型(其他)'] != true} />
        )}
        
      </Form.Item>
      
      </Descriptions.Item>

      <Descriptions.Item label="软件名称"  style={{ fontWeight: 'bolder', marginTop: 10 }} span={2}>
      <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >

        <Input id="软件名称" style={{ maxWidth: 500 }} bordered={true}/>
      </Form.Item>
      </Descriptions.Item>

     

      <Descriptions.Item label="版本号" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="版本号"
        rules={[{ required: true, message: '请填写版本号' }]}
      >

        <Input id="版本号" style={{ maxWidth: 500 }} bordered={true}/>
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="委托单位(中文)" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="委托单位(中文)"
        rules={[{ required: true, message: '请填写委托单位名称(中文)' }]}
      >
        <Input id="委托单位(中文)" style={{ maxWidth: 500 }} />
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="委托单位(英文)" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="委托单位(英文)"
        rules={[{ required: true, message: '请填写委托单位名称(英文)' }]}
      >
        <Input id="委托单位(英文)" style={{ maxWidth: 500 }} />
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="开发单位" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="开发单位"
        rules={[{ required: true, message: '请填写开发单位' }]}
      >
        <Input id="开发单位" style={{ maxWidth: 500 }} />
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="单位性质" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="单位性质"
        rules={[{ required: true, message: '请选择单位性质' }]}
      >
        <Select id="单位性质_下拉栏" style={{ width: 160 }}>
          <Option id="单位性质_内资企业" value="内资企业" style={{ lineHeight: '32px' }}>内资企业</Option>
          <Option id="单位性质_外(合)资企业" value="外(合)资企业" style={{ lineHeight: '32px' }}>外(合)资企业</Option>
          <Option id="单位性质_港澳台(合)资企业" value="港澳台(合)资企业" style={{ lineHeight: '32px' }}>港澳台(合)资企业</Option>
          <Option id="单位性质_科研院校" value="科研院校" style={{ lineHeight: '32px' }}>科研院校</Option>
          <Option id="单位性质_政府事业团体" value="政府事业团体" style={{ lineHeight: '32px' }}>政府事业团队</Option>
          <Option id="单位性质_其他" value="其他" style={{ lineHeight: '32px' }}>其他</Option>
        </Select>

      </Form.Item>
      
      </Descriptions.Item>

      

      

    </Descriptions>

    <Divider />

    <Descriptions 
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    layout='vertical'
    >
      <Descriptions.Item label="软件用户对象描述" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="软件用户对象描述"
        rules={[{ required: true, message: '请填写软件用户对象描述' }]}
      >
        <TextArea id="软件用户对象描述" rows={5} style={{ maxWidth: 700 }}></TextArea>
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="主要功能及用途简介(限300字)" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name="主要功能及用途简介(限300字)"
        rules={[{ required: true, message: '请填写主要功能及用途' }]}
      >
        <TextArea id="主要功能及用途简介" rows={5} showCount maxLength={300} style={{ maxWidth: 700 }}></TextArea>
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="测试依据" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      
      <Form.Item
        name='测试依据'
        rules={[{ required: true, message: '请选择测试依据' }]}
      >
        <Select id="测试依据_下拉栏" mode="multiple" allowClear style={{ width: 160 }} onChange={(e) => {test(e,'测试依据(其他)')}}>
        <Option id="测试依据_GB/T 25000.51-2010" value="GB/T 25000.51-2010" style={{ lineHeight: '32px' }}>GB/T 25000.51-2010</Option>
        <Option id="测试依据_GB/T 16260.1-2006" value="GB/T 16260.1-2006" style={{ lineHeight: '32px' }}>GB/T 16260.1-2006</Option>
        <Option id="测试依据_NST-03-WI12-2011" value="NST-03-WI12-2011" style={{ lineHeight: '32px' }}>NST-03-WI12-2011</Option>
        <Option id="测试依据_NST-03-WI13-2011" value="NST-03-WI13-2011" style={{ lineHeight: '32px' }}>NST-03-WI13-2011</Option>
        <Option id="测试依据_其他" value="其他" style={{ lineHeight: '32px' }}>其他</Option>
        </Select>
        
        </Form.Item>
        <Form.Item
          style={{ paddingLeft: 20 }}
          name="测试依据(其他)"
          rules={[{ required: (formData['测试依据(其他)'] === true), message: '请输入其他测试依据名称！' }]}
        >
          {formData['测试依据(其他)'] != true? null:(
           <Input id="测试依据(其他)" style={{ padding: 0 }} disabled={formData['测试依据(其他)'] != true} />
          )}
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="需要测试的技术指标" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name='需要测试的技术指标'
        rules={[{ required: true, message: '请填写需要测试的技术指标' }]}
      >
        <Select id="需要测试的技术指标_下拉栏" mode="multiple" allowClear style={{ width: 160 }} onChange={(e) => {test(e,'需要测试的技术指标(其他)')}}>
          <Option id="需要测试的技术指标_功能性" value="功能性" style={{ lineHeight: '32px' }}>功能性</Option>
          <Option id="需要测试的技术指标_可靠性" value="可靠性" style={{ lineHeight: '32px' }}>可靠性</Option>
          <Option id="需要测试的技术指标_易用性" value="易用性" style={{ lineHeight: '32px' }}>易用性</Option>
          <Option id="需要测试的技术指标_效率" value="效率" style={{ lineHeight: '32px' }}>效率</Option>
          <Option id="需要测试的技术指标_可维护性" value="可维护性" style={{ lineHeight: '32px' }}>可维护性</Option>
          <Option id="需要测试的技术指标_可移植性" value="可移植性" style={{ lineHeight: '32px' }}>可移植性</Option>
          <Option id="需要测试的技术指标_代码覆盖度" value="代码覆盖度" style={{ lineHeight: '32px' }}>代码覆盖度</Option>
          <Option id="需要测试的技术指标_缺陷检测率" value="缺陷检测率" style={{ lineHeight: '32px' }}>缺陷检测率</Option>
          <Option id="需要测试的技术指标_代码风格符合度" value="代码风格符合度" style={{ lineHeight: '32px' }}>代码风格符合度</Option>
          <Option id="需要测试的技术指标_代码不符合项检测率" value="代码不符合项检测率" style={{ lineHeight: '32px' }}>代码不符合项检测率</Option>
          <Option id="需要测试的技术指标_产品说明要求" value="产品说明要求" style={{ lineHeight: '32px' }}>产品说明要求</Option>
          <Option id="需要测试的技术指标_用户文档集要求" value="用户文档集要求" style={{ lineHeight: '32px' }}>用户文档集要求</Option>
          <Option id="需要测试的技术指标_其他" value="其他" style={{ lineHeight: '32px' }}>其他</Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{ paddingLeft: 20 }}
        name="需要测试的技术指标(其他)"
        rules={[{ required: (formData['需要测试的技术指标(其他)'] === true), message: '请输入其他测试依据名称！' }]}
      >
        {formData['需要测试的技术指标(其他)'] != true? null:(
           <Input id="需要测试的技术指标(其他)" style={{ padding: 0 }} disabled={formData['需要测试的技术指标(其他)'] != true} />
        )}
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="软件规模" style={{ fontWeight: 'bolder', marginTop: 10 }}>
      <Form.Item
        name='软件规模'
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if ((formData.hasOwnProperty("功能数(到最后一级菜单)") && formData["功能数(到最后一级菜单)"] != '')
                || (formData.hasOwnProperty("功能点数") && formData["功能点数"] != '')
                || (formData.hasOwnProperty("代码行数(不包括注释行、空行)") && formData["代码行数(不包括注释行、空行)"] != '')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请填写至少一项软件规模指标！'));
            },
          }),
        ]}
        validateTrigger
      >
        <div style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>（以下三项请至少选填一项）</div><br></br>
        <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical'>
        <Descriptions.Item label="功能数(到最后一级菜单)" style={{ fontWeight: 'bolder', marginTop: 10 }}>
        <Form.Item
          name={["软件规模", "功能数(到最后一级菜单)"]}
          rules={[{ pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入功能数' }]}
        >
          <Input id="软件规模_功能数" onChange={(e) => setDataByKey("功能数(到最后一级菜单)", e.target.value)} style={{ maxWidth: 300 }} />
        </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="功能点数" style={{ fontWeight: 'bolder', marginTop: 10 }}>
        <Form.Item
          name={["软件规模", "功能点数"]}
          rules={[{ pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入功能点数' }]}
        >
          <Input id="软件规模_功能点数" onChange={(e) => setDataByKey("功能点数", e.target.value)} style={{ maxWidth: 300 }} />
        </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="代码行数(不包括注释行、空行)" style={{ fontWeight: 'bolder', marginTop: 10 }}>
        <Form.Item
          name={["软件规模", "代码行数(不包括注释行、空行)"]}
          rules={[{ pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入代码行数' }]}
        >
          <Input id="软件规模_代码行数" onChange={(e) => setDataByKey("代码行数(不包括注释行、空行)", e.target.value)} style={{ maxWidth: 300 }} />
        </Form.Item>
        </Descriptions.Item>
        </Descriptions>
      </Form.Item>
      </Descriptions.Item>

    </Descriptions>

    <Descriptions
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    layout='vertical'>
      <Descriptions.Item label="软件类型(单选)">
      <Select id="软件类型_下拉栏1" style={{ width: 160 }} onChange={choosetype}>
        <Option id="软件类型_系统软件" value="系统软件" style={{ lineHeight: '48px' }} >系统软件</Option>
        <Option id="软件类型_支持软件" value="支持软件" style={{ lineHeight: '48px' }} >支持软件</Option>
        <Option id="软件类型_应用软件" value="应用软件" style={{ lineHeight: '48px' }} >应用软件</Option>
        <Option id="软件类型_其他" value="其他" style={{ lineHeight: '48px' }} >其他</Option>
        </Select>
      <Form.Item
        name="软件类型"
        rules={[{ required: true, message: '请选择软件类型' }]}
      >
        
        <Select  id="软件类型_下拉栏2" style={{ width: 160 }}>
          {testData["系统软件"]===true?(
          <>
          <Option id="软件类型_系统软件_操作系统" value="系统软件-操作系统" style={{ lineHeight: '32px' }} >操作系统</Option>
            <Option id="软件类型_系统软件_中文处理系统" value="系统软件-中文处理系统" style={{ lineHeight: '32px' }}>中文处理系统</Option>
            <Option id="软件类型_系统软件_网络系统" value="系统软件-网络系统" style={{ lineHeight: '32px' }}>网络系统</Option>
            <Option id="软件类型_系统软件_嵌入式操作系统" value="系统软件-嵌入式操作系统" style={{ lineHeight: '32px' }}>嵌入式操作系统</Option>
            <Option id="软件类型_系统软件_其他" value="系统软件-其他" style={{ lineHeight: '32px' }}>其他</Option>
          </>
          ):null}

          {testData["支持软件"]===true?(
          <>
          <Option id="软件类型_支持软件_程序设计语言" value="支持软件-程序设计语言" style={{ lineHeight: '32px' }} >程序设计语言</Option>
          <Option id="软件类型_支持软件_数据库系统设计" value="支持软件-数据库系统设计" style={{ lineHeight: '32px' }}>数据库系统设计</Option>
          <Option id="软件类型_支持软件_工具软件" value="支持软件-工具软件" style={{ lineHeight: '32px' }}>工具软件</Option>
          <Option id="软件类型_支持软件_网络通信软件" value="支持软件-网络通信软件" style={{ lineHeight: '32px' }}>网络通信软件</Option>
          <Option id="软件类型_支持软件_中间件" value="支持软件-中间件" style={{ lineHeight: '32px' }}>中间件</Option>
          <Option id="软件类型_支持软件_其他" value="支持软件-其他" style={{ lineHeight: '32px' }}>其他</Option>
          </>
          ):null}

          {testData["应用软件"]===true?(
          <>
          <Option id="软件类型_应用软件_行业管理软件" value="应用软件-行业管理软件" style={{ lineHeight: '32px' }} >行业管理软件</Option>
          <Option id="软件类型_应用软件_办公软件" value="应用软件-办公软件" style={{ lineHeight: '32px' }}>办公软件</Option>
          <Option id="软件类型_应用软件_模式识别软件" value="应用软件-模式识别软件" style={{ lineHeight: '32px' }}>模式识别软件</Option>
          <Option id="软件类型_应用软件_图形图像软件" value="应用软件-图形图像软件" style={{ lineHeight: '32px' }}>图形图像软件</Option>
          <Option id="软件类型_应用软件_控制软件" value="应用软件-控制软件" style={{ lineHeight: '32px' }}>控制软件</Option>
          <Option id="软件类型_应用软件_网络应用软件" value="应用软件-网络应用软件" style={{ lineHeight: '32px' }}>网络应用软件</Option>
          <Option id="软件类型_应用软件_信息管理软件" value="应用软件-信息管理软件" style={{ lineHeight: '32px' }}>信息管理软件</Option>
          <Option id="软件类型_应用软件_数据库管理应用软件" value="应用软件-数据库管理应用软件" style={{ lineHeight: '32px' }}>数据库管理应用软件</Option>
          <Option id="软件类型_应用软件_安全与保密软件" value="应用软件-安全与保密软件" style={{ lineHeight: '32px' }}>安全与保密软件</Option>
          <Option id="软件类型_应用软件_嵌入式应用软件" value="应用软件-嵌入式应用软件" style={{ lineHeight: '32px' }}>嵌入式应用软件</Option>
          <Option id="软件类型_应用软件_教育软件" value="应用软件-教育软件" style={{ lineHeight: '32px' }}>教育软件</Option>
          <Option id="软件类型_应用软件_游戏软件" value="应用软件-游戏软件" style={{ lineHeight: '32px' }}>游戏软件</Option>
          <Option id="软件类型_应用软件_其他" value="应用软件-其他" style={{ lineHeight: '32px' }}>其他</Option>
          </>
          ):null}

          {testData["其他"]===true?(
          <>
          <Option id="软件类型_其他_其他" value="其他-其他" style={{ lineHeight: '32px' }} >其他</Option>
          </>
          ):null}         
        </Select>
      </Form.Item>
      </Descriptions.Item>
      

    </Descriptions>

    <Divider />


    <Descriptions
    title={<h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>运行环境</h2>}
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    
    layout='vertical'>
       <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>客户端</h3>} style={{ fontWeight: 'bolder', marginTop: 10 }} >
         <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          
          layout='vertical'>
            <Descriptions.Item label="操作系统" style={{ fontWeight: 'bolder', marginTop: 10 }}>
            <Form.Item
              name={['运行环境', '客户端', '操作系统']}
              rules={[{ required: true, message: '请选择操作系统' }]}
            >
              <Checkbox.Group >
                <Col span={30}>
                  <Checkbox id="运行环境_客户端_操作系统_Windows" value="Windows" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-Windows', e.target.checked)}>
                    <Form.Item
                      style={{ paddingLeft: 0 }}
                      name={['运行环境', '客户端', '操作系统-Windows版本']}
                      rules={[{ required: (formData['运行环境-客户端-操作系统-Windows'] === true), message: '请填写Windows版本' }]}
                    >
                      <Input id="运行环境_客户端_操作系统_Windows版本" addonBefore='Windows' addonAfter='(版本)' style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-Windows'] != true} />
                    </Form.Item>
                  </Checkbox>
                </Col>
                <Col span={30}>
                  <Checkbox id="运行环境_客户端_操作系统_Linux" value="Linux" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-Linux', e.target.checked)}>
                    <Form.Item
                      style={{ paddingLeft: 0 }}
                      name={['运行环境', '客户端', '操作系统-Linux版本']}
                      rules={[{ required: (formData['运行环境', '客户端', '操作系统-Linux版本'] === true), message: '请填写Linux版本' }]}
                    >
                      <Input id="运行环境_客户端_操作系统_Linux版本" addonBefore="Linux" addonAfter='(版本)' style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-Linux'] != true} />
                    </Form.Item>
                  </Checkbox>
                </Col>
                <Col span={30}>
                  <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-其他', e.target.checked)}>
                    <Form.Item
                      style={{ paddingLeft: 0 }}
                      name={['运行环境', '客户端', '操作系统-其他']}
                      rules={[{ required: (formData['运行环境-客户端-操作系统-其他'] === true), message: '请填写内容' }]}
                    >
                      <Input addonBefore="其他" style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-其他'] != true} />
                    </Form.Item>
                  </Checkbox>
                </Col>

              </Checkbox.Group>
            </Form.Item>
            </Descriptions.Item>

            <Descriptions.Item label="内存要求" style={{ fontWeight: 'bolder', marginTop: 10 }}>
            <Form.Item
              name={['运行环境', '客户端', '内存要求']}
              rules={[{ required: true, message: '请填写内存要求' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入整数' }]}
            >
              <Input id="运行环境_客户端_内存要求" addonAfter='MB' style={{ maxWidth: 300 }} />
            </Form.Item>
            </Descriptions.Item>

            <Descriptions.Item label="其他要求" style={{ fontWeight: 'bolder', marginTop: 10 }}>
            <Form.Item
              name={['运行环境', '客户端', '其他要求']}
            >
              <TextArea id="运行环境_客户端_其他要求" rows={3} style={{ maxWidth: 700 }} />
            </Form.Item>
            </Descriptions.Item>
          </Descriptions>
       </Descriptions.Item>

       
    </Descriptions>

    <Descriptions 
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    
    layout='vertical'>
    <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>服务器端</h3>}  >
          <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical' >
            <Descriptions.Item label="硬件" >
              <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical' >
                <Descriptions.Item label="架构" >
                  <Form.Item
                    name={['运行环境', '服务器端', '硬件', '架构']}
                    rules={[{ required: true, message: '请选择架构' }]}
                  >
                    <Select id="运行环境_服务器端_硬件_架构_下拉栏"  mode="multiple" allowClear style={{ width: 160 }} onChange={(e) => {test(e,'运行环境-服务器端-硬件-架构-其他')}}>
                      <Option id="运行环境_服务器端_硬件_架构_PC服务器" value="PC服务器" style={{ lineHeight: '32px' }} >PC服务器</Option>
                      <Option id="运行环境_服务器端_硬件_架构_UNIX/Linux服务器" value="UNIX/Linux服务器" style={{ lineHeight: '32px' }} >UNIX/Linux服务器</Option>
                      <Option id="运行环境_服务器端_硬件_架构_其他" value="其他" style={{ lineHeight: '32px' }}>其他</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ paddingLeft: 20 }}
                    name={['运行环境', '服务器端', '硬件', '架构-其他']}
                    rules={[{ required: (formData['运行环境-服务器端-硬件-架构-其他'] === true), message: '请填写内容' }]}
                  >
                    {formData['运行环境-服务器端-硬件-架构-其他'] != true? null:(
                      <Input id="运行环境_服务器端_硬件_架构_其他" style={{ padding: 0 }} disabled={formData['运行环境-服务器端-硬件-架构-其他'] != true} />
                    )}
                  </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="内存要求" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '硬件', '内存要求']}
                  rules={[{ required: true, message: '请填写内存要求' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                >
                  <Input id="运行环境_服务器端_硬件_内存要求" addonAfter='MB' style={{ maxWidth: 300 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="硬盘要求" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '硬件', '硬盘要求']}
                  rules={[{ required: true, message: '请填写硬盘要求' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入整数' }]}
                >
                  <Input id="运行环境_服务器端_硬件_硬盘要求" addonAfter='MB' style={{ maxWidth: 300 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="其他要求" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '硬件', '其他要求']}
                >
                  <TextArea id="运行环境_服务器端_硬件_其他要求" rows={3} style={{ maxWidth: 700 }} />
                </Form.Item>
                </Descriptions.Item>

              </Descriptions>

            </Descriptions.Item>

            


          </Descriptions>

          
       </Descriptions.Item>
       

    </Descriptions>

    <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical' >
            <Descriptions.Item label="软件" style={{ fontWeight: 'bolder', marginTop: 10 }}>
              <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} layout='vertical' >
                <Descriptions.Item label="操作系统" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '操作系统']}
                  rules={[{ required: true, message: '请填写操作系统' }]}
                >
                  <Input id="运行环境_服务器端_软件_操作系统" style={{ maxWidth: 500 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="版本" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '版本']}
                  rules={[{ required: true, message: '请填写版本' }]}
                >
                  <Input id="运行环境_服务器端_软件_版本" style={{ maxWidth: 500 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="编程语言" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '编程语言']}
                  rules={[{ required: true, message: '请填写编程语言' }]}
                >
                  <Input id="运行环境_服务器端_软件_编程语言" style={{ maxWidth: 500 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="架构" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '架构']}
                  rules={[{ required: true, message: '请选择架构' }]}
                >
                  <Select id="运行环境_服务器端_软件_架构_下拉栏" mode="multiple" allowClear style={{ width: 80 }}>
                    <Option id="运行环境_服务器端_软件_架构_C/S" value="C/S" style={{ lineHeight: '32px' }} >C/S</Option>
                    <Option id="运行环境_服务器端_软件_架构_B/S" value="B/S" style={{ lineHeight: '32px' }} >B/S</Option>
                    <Option id="运行环境_服务器端_软件_架构_其他" value="其他" style={{ lineHeight: '32px' }} >其他</Option>
                  </Select>
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="数据库" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '数据库']}
                  rules={[{ required: true, message: '请填写数据库' }]}
                >
                  <Input id="运行环境_服务器端_软件_数据库" style={{ maxWidth: 500 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="中间件" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '中间件']}
                  rules={[{ required: true, message: '请填写中间件' }]}
                >
                  <Input id="运行环境_服务器端_软件_中间件" style={{ maxWidth: 500 }} />
                </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="其他支撑软件" style={{ fontWeight: 'bolder', marginTop: 10 }}>
                <Form.Item
                  name={['运行环境', '服务器端', '软件', '其他支撑软件']}
                >
                  <TextArea id="运行环境_服务器端_软件_其他支撑软件" rows={3} style={{ maxWidth: 700 }} />
                </Form.Item>
                </Descriptions.Item>

              </Descriptions>

            </Descriptions.Item>
          </Descriptions>

    <Descriptions 
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    
    layout='vertical'
    >
      <Descriptions.Item 
      label={<h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>网络环境</h3>} 
      
      style={{ fontWeight: 'bolder', marginTop: 10 }} >
      <Form.Item
        name={['运行环境', '网络环境']}
        rules={[{ required: true, message: '请填写网络环境' }]}
      >
        <Input id="运行环境_网络环境" style={{ maxWidth: 500 }} />
      </Form.Item>
      </Descriptions.Item>
    </Descriptions>

    <Divider />

    <Descriptions 
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    layout='vertical'
    title={<h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>样品和数量</h2>}
    >
      <Descriptions.Item label="软件介质"  >
      <Form.Item
        name={['样品和数量', '软件介质']}
        rules={[{ required: true, message: '请选择软件介质' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio id="样品和数量_软件介质_光盘" value="光盘" style={{ lineHeight: '32px' }} >光盘</Radio>
          </Col>
          <Col span={30}>
            <Radio id="样品和数量_软件介质_U盘" value="U盘" style={{ lineHeight: '32px' }}>U盘</Radio>
          </Col>
          <Col span={30}>
            <Radio id="样品和数量_软件介质_其他" value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('样品和数量-软件介质-其他', e.target.checked)}>
              其他
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['样品和数量', '软件介质(其他)']}
                rules={[{ required: (formData['样品和数量-软件介质-其他'] === true), message: '请填写内容' }]}
              >
                <Input id="样品和数量_软件介质(其他)" style={{ padding: 0 }} disabled={formData['样品和数量-软件介质-其他'] != true} />
              </Form.Item>
            </Radio>
          </Col>
        </Radio.Group>
      </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="提交的样品(硬拷贝资料、硬件)五年保存期满后"  >
      <Form.Item
        name={['样品和数量', '提交的样品(硬拷贝资料、硬件)五年保存期满后']}
        rules={[{ required: true, message: '请选择期望' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio id="样品和数量_提交的样品_由本实验室销毁" value="由本实验室销毁 " style={{ lineHeight: '32px' }} >由本实验室销毁 </Radio>
          </Col>
          <Col span={30}>
            <Radio id="样品和数量_提交的样品_退还给我们" value="退还给我们" style={{ lineHeight: '32px' }}>退还给我们</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>
      </Descriptions.Item>

      

    </Descriptions>

    <Divider />

    <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>希望测试完成时间</h2>
    <Form.Item
      name={['希望测试完成时间']}
      rules={[{ required: true, message: '请填写希望测试完成的时间' }]}
    >
      <DatePicker id="希望测试完成时间" />
    </Form.Item>

    <Divider />

    <Descriptions
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    
    title={<h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位信息</h2>}
    >
      <Descriptions.Item label="电话" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '电话']}
          rules={[{ required: true, message: '请填写电话' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入电话' }]}
        >
          <Input id="委托单位信息_电话" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="传真" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '传真']}
          rules={[{ required: true, message: '请填写传真' }]}
        >
          <Input id="委托单位信息_传真" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="地址" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '地址']}
          rules={[{ required: true, message: '请填写地址' }]}
        >
          <Input id="委托单位信息_地址" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="邮编" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '邮编']}
          rules={[{ required: true, message: '请填写邮编' }]}
        >
          <Input id="委托单位信息_邮编" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="联系人" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '联系人']}
          rules={[{ required: true, message: '请填写联系人' }]}
        >
          <Input id="委托单位信息_联系人" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="手机" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '手机']}
          rules={[{ required: true, message: '请填写手机号' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请正确输入手机号' }]}
        >
          <Input id="委托单位信息_手机" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="E-mail" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', 'E-mail']}
          rules={[{ required: true, message: '请填写E-mail' }]}
        >
          <Input id="委托单位信息_email" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

      <Descriptions.Item label="网址" style={{ fontWeight: 'bolder', marginTop: 10 }} >
        <Form.Item
          name={['委托单位信息', '网址']}
          rules={[{ required: true, message: '请填写网址' }]}
        >
          <Input id="委托单位信息_网址" style={{ maxWidth: 500 }} />
        </Form.Item>
      </Descriptions.Item>

    </Descriptions>

      <Form.Item>
        <Button id="提交用户申请表" type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>

  )
}


export default SubmitApplication

SubmitApplication.propTypes={
    /** 用户状态 */
    _state:PropTypes.object,
    /** 更新用户状态方法 */
    UpdateUserInfo:PropTypes.func,
    /** 切换界面方法 */
    GotoPage:PropTypes.func
}

