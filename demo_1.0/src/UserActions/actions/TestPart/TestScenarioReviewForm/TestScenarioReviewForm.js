import {React } from 'react'
import {Fragment} from 'react'
import { message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import { Table, Tag } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';


const { Column, ColumnGroup } = Table;

const columns =[
  {
    title:'职责',
    dataIndex:'duty',
  },
  {
    title:'评审意见',
    dataIndex:'opinion',
    render:(_, record,index) => (
      <Form.Item name={'opinion_'+index} initialValue={''}>
      <Input></Input>
      </Form.Item>
    ),
    
  },
  {
    title:'签字',
    dataIndex:'sign',
    render:(_, record,index) => (
      <Form.Item name={'sign_'+index} initialValue={''}>
      <Input></Input>
      </Form.Item>
    ),
  },
  {
    title:'日期',
    dataIndex:'date',
    render:(_, record,index) => (
      <Form.Item name={'date_'+index} initialValue={''}>
      <Input></Input>
      </Form.Item>
    ),
  },
  
]

const data=[
  {
    key:'2',
    content:'《测试方案》书写规范性',
  },
  {
    key:'3',
    content:'测试环境是否具有典型意义以及是否符合用户要求',
  },
  {
    key:'4',
    content:'测试内容的完整性，是否覆盖了整个系统',
  },
  {
    key:'5',
    content:'测试方法的选取是否合理',
  },
  {
    key:'6',
    content:'测试用例能否覆盖问题',
  },
  {
    key:'7',
    content:'输入、输出数据设计合理性',
  },
  {
    key:'8',
    content:'测试时间安排是否合理',
  },
  {
    key:'9',
    content:'测试人力资源安排是否合理',
  },
  

]

const data1=[
    {
        duty:'测试工程师',
    },
    {
        duty:'测试室负责人',
    },
    {
        duty:'质量负责人',
    },
    {
        duty:'技术负责人',
    },
    {
        duty:'监督人',
    }
]

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
function TestScenarioReviewForm(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;
  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/1" , {
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
            form['测试方案评审表'] = values
            SubmitForm(form)
          }
          console.log(data)
        })
    }
    else {
      fetch(REMOTE_SERVER+"/delegation/" + _state['PageInfo']['id'], {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'],
          'Authorization': _state['accessToken']
        },
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data != null) {
            form['基本信息'] = values;
            if (data['state'] === 'QUOTATION_MARKET') {
              SubmitForm(form, true);
            }
            else if (data['state'] === 'QUOTATION_USER_APPLICATION') {
              SubmitForm(form, false);
            }
            else {
              alert('状态有误！')
            }
          }
        })
    }
  };

  const SubmitForm = (_form, firstTime = false) => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/1" , {
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
      fetch(REMOTE_SERVER+"/offer/delegation/" + _state['PageInfo']['id'], {
        method: firstTime ? "POST" : "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'],
          'Authorization': _state['accessToken']
        },
        body: JSON.stringify(_form)
      })
        .then(res => {
          console.log(res)
          if ((res.status === 201 && firstTime === true) || (res.status === 200 && firstTime === false)) {
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
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: '请正确选择时间',
      },
    ],
  };


  return (
    <Form
        name="测试方案评审表"
        initialValues={{ remember: true }}
        style={{ padding: '20px 30px' }}
        autoComplete="false"
        onFinish={onFinishForm}
        onFinishFailed={onFinishFailed}
    >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>测试方案评审表</h1>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h5>
        <Form.Item
          name='软件名称'
          rules={[{ required: true, message: '请填写软件名称' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="软件名称" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h5>
        <Form.Item
          
          name='版本号'
          rules={[{ required: true, message: '请填写版本号' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="版本号" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>项目编号</h5>
        <Form.Item
          name='项目编号'
          rules={[{ required: true, message: '请填写项目编号' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="项目编号" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试类别</h5>
        <Form.Item
          name='测试类别'
          rules={[{ required: true, message: '请填写测试类别' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="测试类别" />
        </Form.Item>
        <Table dataSource={data} pagination={{pageSize:40}} bordered>
          <Column title='评审内容' dataIndex='content' key='content' width='30%'></Column>
          <ColumnGroup title='评审结论' dataIndex='conclusion' key='conclusion'>
              <Column title='通过' dataIndex='pass' key='pass'
                render={(_, record,index) => (
                  <Form.Item name={'pass_'+index} initialValue={false}>
                    <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={false}/>
                  </Form.Item>
                )}
              ></Column>
              <Column title='不通过及原因' dataIndex='fail' key='fail'
                render={(_, record,index) => (
                  <Form.Item name={'fail_reason_'+index} initialValue={''}>
                  <Input></Input>
                  </Form.Item>
                )}
              ></Column>
          </ColumnGroup>
      </Table>
      <Table dataSource={data1} columns={columns} pagination={{pageSize:40}} bordered></Table>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
    </Form>

      
      
    
  )


}
export default TestScenarioReviewForm;


