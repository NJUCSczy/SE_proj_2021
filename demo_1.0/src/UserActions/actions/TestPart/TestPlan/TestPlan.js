import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { message, DatePicker, TimePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestPlan.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions';

const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');
var mobile = require('is-mobile');

function TestPlan(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;

  const onFinishForm = (values) => {
    console.log('Success:', values);
    if (!USE_JSON_SERVER) {
      fetch(REMOTE_SERVER + "/test/projects/" + _state['PageInfo']['id'], {
        method: "GET",
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
      })
          .then(res => {
              return res.json()
          })
          .then(data => {
              console.log(data)
              if (data != null) {
                if (data['state'] === 'TEST_SCHEME') {
                  SubmitForm(values, true);
                }
                else if (data['state'] === 'AUDIT_QUALITY_DENIED') {
                  SubmitForm(values, false);
                }
                else {
                  alert('状态有误！')
                }
              }
          })
    }
    else{
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
            form['软件测试方案'] = values
            SubmitForm(form)
          }
          console.log(data)
        })
    }
    
  };

  const SubmitForm = (_form, firstTime = false) => {
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
          GotoPage("ViewProject",_state)
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
      fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id'] + "/test-scheme", {
        method: firstTime ? "POST" : "PUT",
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
            message.success({content:"提交成功！",key:"upload"})
            GotoPage("ViewProject",_state)
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
      style={{ padding: "10px 10px 10px 10px" }}
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >

      <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件测试方案</h1>

      <Form.Item
        label="版本号"
        name="版本号"
        rules={[{ required: true, message: '请输入版本号' }]}
      >
        <Input style={{ maxWidth: 200 }} />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>文档修改记录</h2>

      <Form.List name="文档修改记录" layout='vertical' width={500}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h5>
                <Form.Item
                  {...restField}
                  name={[name, '版本号']}
                  rules={[{ required: true, message: '请填写版本号' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="版本号" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>日期</h5>
                <Form.Item
                  {...restField}
                  name={[name, '日期']}
                  rules={[{ required: true, message: '请填写日期' }]}
                >
                  <DatePicker placeholder="日期" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>A-添加，M-修改，D-删除</h5>
                <Form.Item
                  {...restField}
                  name={[name, 'AMD']}
                  rules={[{ pattern: new RegExp(/^(a|m|d|A|M|D)\d*$/, "g"), message: '请填写AMD' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="A-添加,M-修改,D-删除" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>修订者</h5>
                <Form.Item
                  {...restField}
                  name={[name, '修订者']}
                  rules={[{ required: true, message: '请填写修订者' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="修订者" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>说明</h5>
                <Form.Item
                  {...restField}
                  name={[name, '说明']}
                  rules={[{ required: true, message: '请填写说明' }]}
                >
                  <Input.TextArea placeholder="说明" />
                </Form.Item>

                <Button id='删除该文档修改记录' onClick={() => remove(name)} type='danger'>
                  删除该文档修改记录
                </Button>
              </Fragment>
            ))}
            <Form.Item>
              <Button type="dashed" id='添加新文档修改记录'
                style={{ width: 500, marginTop: 30 }}
                onClick={() => add()} icon={<PlusOutlined />}  >
                添加新文档修改记录
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>1.引言</h2>

      <Form.Item
        label="1.1标识"
        name="标识"
        rules={[{ required: true, message: '请输入标识' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="1.2系统概述"
        name="系统概述"
        rules={[{ required: true, message: '请输入系统概述' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="1.3文档概述"
        name="文档概述"
        rules={[{ required: true, message: '请输入文档概述' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="1.4基线"
        name="基线"
        rules={[{ required: true, message: '请输入基线' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>2.引用</h2>

      <Paragraph>
        《计算机软件文档编制规范》GB/T 8567－2006。
      </Paragraph>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>3.软件测试环境</h2>

      <Form.Item
        label="3.1硬件"
        name="硬件"
        rules={[{ required: true, message: '请输入硬件' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="3.2软件"
        name="软件"
        rules={[{ required: true, message: '请输入软件' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="3.3其他"
        name="其他"
        rules={[{ required: true, message: '请输入其他' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="3.4参与组织"
        name="参与组织"
        rules={[{ required: true, message: '请输入参与组织' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="3.5人员"
        name="人员"
        rules={[{ required: true, message: '请输入人员' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>4.计划</h2>

      <Paragraph>
        本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
      </Paragraph>

      <Form.Item
        label="4.1总体设计"
        name="总体设计"
        rules={[{ required: true, message: '请输入总体设计' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="4.1.1测试级别"
        name="测试级别"
        rules={[{ required: true, message: '请输入测试级别' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="4.1.2测试类别"
        name="测试类别"
        rules={[{ required: true, message: '请输入测试类别' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="4.1.3一般测试条件"
        name="一般测试条件"
        rules={[{ required: true, message: '请输入一般测试条件' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="4.2计划执行的测试"
        name="计划执行的测试"
        rules={[{ required: true, message: '请输入计划执行的测试' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="4.3测试用例"
        name="测试用例"
        rules={[{ required: true, message: '请输入测试用例' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>5.测试进度表</h2>

      <Paragraph>
        此项目主要分为：业务测试和文档审查两部分的工作。两部分的工作可以并行完成。测试方为完成本方案所述的测试所需时间大约为XX个工作日，如测试需求产生变更会导致测试时间的变化。
      </Paragraph>

      <Paragraph>
        下表大致估计了本次测试各个阶段所需工作量及起止时间。
      </Paragraph>


      <Form.Item
        label="制定测试计划工作量"
        name={["测试进度表", "制定测试计划", "工作量"]}
        rules={[{ required: true, message: '请输入制定测试计划工作量' }]}
      >
        <Input style={{ maxWidth: 200 }} />
      </Form.Item>

      <Form.Item
        label="制定测试计划开始时间"
        name={["测试进度表", "制定测试计划", "开始时间"]}
        rules={[{ required: true, message: '请输入制定测试计划开始时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="制定测试计划结束时间"
        name={["测试进度表", "制定测试计划", "结束时间"]}
        rules={[{ required: true, message: '请输入制定测试计划结束时间' }]}
      >
        <DatePicker />
      </Form.Item>


      <Form.Item
        label="设计测试工作量"
        name={["测试进度表", "设计测试", "工作量"]}
        rules={[{ required: true, message: '请输入设计测试工作量' }]}
      >
        <Input style={{ maxWidth: 200 }} />
      </Form.Item>

      <Form.Item
        label="设计测试开始时间"
        name={["测试进度表", "设计测试", "开始时间"]}
        rules={[{ required: true, message: '请输入设计测试开始时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="制定设计测试结束时间"
        name={["测试进度表", "设计测试", "结束时间"]}
        rules={[{ required: true, message: '请输入设计测试结束时间' }]}
      >
        <DatePicker />
      </Form.Item>


      <Form.Item
        label="执行测试工作量"
        name={["测试进度表", "执行测试", "工作量"]}
        rules={[{ required: true, message: '请输入执行测试工作量' }]}
      >
        <Input style={{ maxWidth: 200 }} />
      </Form.Item>

      <Form.Item
        label="执行测试开始时间"
        name={["测试进度表", "执行测试", "开始时间"]}
        rules={[{ required: true, message: '请输入执行测试开始时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="执行设计测试结束时间"
        name={["测试进度表", "执行测试", "结束时间"]}
        rules={[{ required: true, message: '请输入执行测试结束时间' }]}
      >
        <DatePicker />
      </Form.Item>


      <Form.Item
        label="评估测试工作量"
        name={["测试进度表", "评估测试", "工作量"]}
        rules={[{ required: true, message: '请输入评估测试工作量' }]}
      >
        <Input style={{ maxWidth: 200 }} />
      </Form.Item>

      <Form.Item
        label="评估测试开始时间"
        name={["测试进度表", "评估测试", "开始时间"]}
        rules={[{ required: true, message: '请输入评估测试开始时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="评估设计测试结束时间"
        name={["测试进度表", "评估测试", "结束时间"]}
        rules={[{ required: true, message: '请输入评估测试结束时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>6.需求的可追踪性</h2>

      <Form.Item
        label="需求的可追踪性"
        name="需求的可追踪性"
        rules={[{ required: true, message: '请输入需求的可追踪性' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button id='提交' type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  );
}

export default TestPlan