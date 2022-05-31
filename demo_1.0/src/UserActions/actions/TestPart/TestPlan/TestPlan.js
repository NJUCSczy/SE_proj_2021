<<<<<<< HEAD:demo_1.0/src/UserActions/actions/TestPart/TestPlan/TestPlan.js
import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message, DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestPlan.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');
var mobile = require('is-mobile');

function TestPlan(props){
    const { UpdateUserInfo, GotoPage, _state } = props;
    const OnFinish = (values) => {
      console.log(values)
    }

      return(
        <Form
          style={{padding:"10px 10px 10px 10px"}}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={OnFinish}
        >

          <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件测试方案</h1>
          
          <Form.Item
            label="版本号"
            name="版本号"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>
        
          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>文档修改记录</h2>

          <Form.Item
            label="版本号"
            name="版本号"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="日期"
            name="日期"
            rules={[{ required: true, message: '请输入日期' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="A-添加，M-修改，D-删除"
            name="AMD"
            rules={[{ required: true, message: '请输入AMD' }]}
            >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="修订者"
            name="修订者"
            rules={[{ required: true, message: '请输入修订者' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="说明"
            name="说明"
            rules={[{ required: true, message: '请输入说明' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>1.引言</h2>

          <Form.Item
            label="1.1标识"
            name="1.1标识"
            rules={[{ required: true, message: '请输入标识' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.2系统概述"
            name="1.2系统概述"
            rules={[{ required: true, message: '请输入系统概述' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.3文档概述"
            name="1.3文档概述"
            rules={[{ required: true, message: '请输入文档概述' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.4基线"
            name="1.4基线"
            rules={[{ required: true, message: '请输入基线' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>2.引用</h2>

          <Paragraph>
          《计算机软件文档编制规范》GB/T 8567－2006。
          </Paragraph>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>3.软件测试环境</h2>

          <Form.Item
            label="3.1硬件"
            name="3.1硬件"
            rules={[{ required: true, message: '请输入硬件' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.2软件"
            name="3.2软件"
            rules={[{ required: true, message: '请输入软件' }]}
          >
            <Input.TextArea/>
          </Form.Item>
          
          <Form.Item
            label="3.3其他"
            name="3.3其他"
            rules={[{ required: true, message: '请输入其他' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.4参与组织"
            name="3.4参与组织"
            rules={[{ required: true, message: '请输入参与组织' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.5人员"
            name="3.5人员"
            rules={[{ required: true, message: '请输入人员' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>4.计划</h2>

          <Paragraph>
          本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
          </Paragraph>

          <Form.Item
            label="4.1总体设计"
            name="4.1总体设计"
            rules={[{ required: true, message: '请输入总体设计' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.1测试级别"
            name="4.1.1测试级别"
            rules={[{ required: true, message: '请输入测试级别' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.2测试类别"
            name="4.1.2测试类别"
            rules={[{ required: true, message: '请输入测试类别' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.3一般测试条件"
            name="4.1.3一般测试条件"
            rules={[{ required: true, message: '请输入一般测试条件' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.2计划执行的测试"
            name="4.2计划执行的测试"
            rules={[{ required: true, message: '请输入计划执行的测试' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.3测试用例"
            name="4.3测试用例"
            rules={[{ required: true, message: '请输入测试用例' }]}
          >
            <Input.TextArea/>
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
            name="制定测试计划工作量"
            rules={[{ required: true, message: '请输入制定测试计划工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="制定测试计划开始时间"
            name="制定测试计划开始时间"
            rules={[{ required: true, message: '请输入制定测试计划开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="制定测试计划结束时间"
            name="制定测试计划结束时间"
            rules={[{ required: true, message: '请输入制定测试计划结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="设计测试工作量"
            name="设计测试工作量"
            rules={[{ required: true, message: '请输入设计测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="设计测试开始时间"
            name="设计测试开始时间"
            rules={[{ required: true, message: '请输入设计测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="制定设计测试结束时间"
            name="制定设计测试结束时间"
            rules={[{ required: true, message: '请输入设计测试结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="执行测试工作量"
            name="执行测试工作量"
            rules={[{ required: true, message: '请输入执行测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="执行测试开始时间"
            name="执行测试开始时间"
            rules={[{ required: true, message: '请输入执行测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="执行设计测试结束时间"
            name="执行设计测试结束时间"
            rules={[{ required: true, message: '请输入执行测试结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="评估测试工作量"
            name="评估测试工作量"
            rules={[{ required: true, message: '请输入评估测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="评估测试开始时间"
            name="评估测试开始时间"
            rules={[{ required: true, message: '请输入评估测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="评估设计测试结束时间"
            name="评估设计测试结束时间"
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
            <Input.TextArea/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
      
        </Form>
      );
}

=======
import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message, DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestPlan.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');
var mobile = require('is-mobile');

function TestPlan(props){
    const { UpdateUserInfo, GotoPage, _state } = props;

      return(
        <Form
          style={{padding:"10px 10px 10px 10px"}}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >

          <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件测试方案</h1>
          
          <Form.Item
            label="版本号"
            name="版本号"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>
        
          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>文档修改记录</h2>

          <Form.Item
            label="版本号"
            name="版本号"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="日期"
            name="日期"
            rules={[{ required: true, message: '请输入日期' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="A-添加，M-修改，D-删除"
            name="AMD"
            rules={[{ required: true, message: '请输入AMD' }]}
            >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="修订者"
            name="修订者"
            rules={[{ required: true, message: '请输入修订者' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="说明"
            name="说明"
            rules={[{ required: true, message: '请输入说明' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>1.引言</h2>

          <Form.Item
            label="1.1标识"
            name="1.1标识"
            rules={[{ required: true, message: '请输入标识' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.2系统概述"
            name="1.2系统概述"
            rules={[{ required: true, message: '请输入系统概述' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.3文档概述"
            name="1.3文档概述"
            rules={[{ required: true, message: '请输入文档概述' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="1.4基线"
            name="1.4基线"
            rules={[{ required: true, message: '请输入基线' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>2.引用</h2>

          <Paragraph>
          《计算机软件文档编制规范》GB/T 8567－2006。
          </Paragraph>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>3.软件测试环境</h2>

          <Form.Item
            label="3.1硬件"
            name="3.1硬件"
            rules={[{ required: true, message: '请输入硬件' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.2软件"
            name="3.2软件"
            rules={[{ required: true, message: '请输入软件' }]}
          >
            <Input.TextArea/>
          </Form.Item>
          
          <Form.Item
            label="3.3其他"
            name="3.3其他"
            rules={[{ required: true, message: '请输入其他' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.4参与组织"
            name="3.4参与组织"
            rules={[{ required: true, message: '请输入参与组织' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="3.5人员"
            name="3.5人员"
            rules={[{ required: true, message: '请输入人员' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>4.计划</h2>

          <Paragraph>
          本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
          </Paragraph>

          <Form.Item
            label="4.1总体设计"
            name="4.1总体设计"
            rules={[{ required: true, message: '请输入总体设计' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.1测试级别"
            name="4.1.1测试级别"
            rules={[{ required: true, message: '请输入测试级别' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.2测试类别"
            name="4.1.2测试类别"
            rules={[{ required: true, message: '请输入测试类别' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.1.3一般测试条件"
            name="4.1.3一般测试条件"
            rules={[{ required: true, message: '请输入一般测试条件' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.2计划执行的测试"
            name="4.2计划执行的测试"
            rules={[{ required: true, message: '请输入计划执行的测试' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="4.3测试用例"
            name="4.3测试用例"
            rules={[{ required: true, message: '请输入测试用例' }]}
          >
            <Input.TextArea/>
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
            name="制定测试计划工作量"
            rules={[{ required: true, message: '请输入制定测试计划工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="制定测试计划开始时间"
            name="制定测试计划开始时间"
            rules={[{ required: true, message: '请输入制定测试计划开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="制定测试计划结束时间"
            name="制定测试计划结束时间"
            rules={[{ required: true, message: '请输入制定测试计划结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="设计测试工作量"
            name="设计测试工作量"
            rules={[{ required: true, message: '请输入设计测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="设计测试开始时间"
            name="设计测试开始时间"
            rules={[{ required: true, message: '请输入设计测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="制定设计测试结束时间"
            name="制定设计测试结束时间"
            rules={[{ required: true, message: '请输入设计测试结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="执行测试工作量"
            name="执行测试工作量"
            rules={[{ required: true, message: '请输入执行测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="执行测试开始时间"
            name="执行测试开始时间"
            rules={[{ required: true, message: '请输入执行测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="执行设计测试结束时间"
            name="执行设计测试结束时间"
            rules={[{ required: true, message: '请输入执行测试结束时间' }]}
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            label="评估测试工作量"
            name="评估测试工作量"
            rules={[{ required: true, message: '请输入评估测试工作量' }]}
          >
            <Input style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="评估测试开始时间"
            name="评估测试开始时间"
            rules={[{ required: true, message: '请输入评估测试开始时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="评估设计测试结束时间"
            name="评估设计测试结束时间"
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
            <Input.TextArea/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
      
        </Form>
      );
}

>>>>>>> 7af5bd2d2a204808bd4e5e2c14c940eb4633ec16:demo_1.0/src/UserActions/actions/ViewFilesPart/TestPlan/TestPlan.js
export default TestPlan