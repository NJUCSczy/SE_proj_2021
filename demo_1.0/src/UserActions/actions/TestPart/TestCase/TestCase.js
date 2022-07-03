import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestCase.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

const { Title, Paragraph, Text, Link } = Typography;
const { RangePicker } = DatePicker;

var _ = require('lodash');
var mobile = require('is-mobile');

function TestCase(props){
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;

    const OnFinishForm = (values) => {
      console.log('Success:', values);
      if(!USE_JSON_SERVER){
        return SubmitForm(values)
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
            form['测试用例电子记录']=values
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
      else{
        fetch(REMOTE_SERVER+"/test/"+_state['PageInfo']['id']+"/test-doc/test-case", {
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
    }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
      alert('请正确填写！')
    };

    return(
        <Form
          style={{padding:"10px 10px 10px 10px"}}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={OnFinishForm}
        >

          <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例(电子记录)</h1>

          <Form.List name="测试用例" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试分类</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试分类']}
                      rules={[{ required: true, message: '请填写测试分类' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试分类" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>ID</h5>
                    <Form.Item
                      {...restField}
                      name={[name, 'ID']}
                      rules={[{ required: true, message: '请填写ID' },
                      { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="ID" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例设计说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试用例设计说明']}
                      rules={[{ required: true, message: '请填写测试用例设计说明' }]}
                    >
                      <Input.TextArea placeholder="测试用例设计说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>与本测试用例有关的规约说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '与本测试用例有关的规约说明']}
                      rules={[{ required: true, message: '请填写与本测试用例有关的规约说明' }]}
                    >
                      <Input.TextArea placeholder="与本测试用例有关的规约说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>预期的结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '预期的结果']}
                      rules={[{ required: true, message: '请填写预期的结果' }]}
                    >
                      <Input.TextArea placeholder="预期的结果" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例设计者</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试用例设计者']}
                      rules={[{ required: true, message: '请填写测试用例设计者' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试用例设计者" />
                    </Form.Item>                

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试时间</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试时间']}
                      rules={[{ required: true, message: '请填写测试时间' }]}
                    >
                      <DatePicker placeholder="测试时间" />
                    </Form.Item>

                    <Button id='删除该测试用例' onClick={() => remove(name)} type='danger'>
                      删除该测试用例
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button id='添加新测试用例' type="dashed"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新测试用例
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button id='提交' type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>


        </Form>
    );

}

export default TestCase