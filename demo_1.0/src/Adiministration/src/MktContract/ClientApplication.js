import React, { Component } from 'react'
import { DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';

function ClientApplication(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;

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
            form['测试合同']['签章']['委托人签章']=values
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

    return(
    <Form
      name="软件测试委托合同签章(委托方)"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      labelCol={{ span: 10, flex: 'auto' }}
      wrapperCol={{ span: 20 }}
      layout='vertical'
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
      >
     <h1 style={{textAlign:'center',fontSize:30}}>软件测试委托合同签章(委托方)</h1>

     <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位全称</h3>
     <Form.Item
        name="单位全称"
        rules={[{ required: true, message: '请填写单位全称' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>授权代表</h3>
     <Form.Item
        name="授权代表"
        rules={[{ required: true, message: '请填写授权代表' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>签章时间</h3>
      <Form.Item
        name={['签章时间']}
        rules={[{ required: true, message: '请填写签章时间' }]}
      >
        <DatePicker />
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
      <Form.Item
        name="联系人"
        rules={[{ required: true, message: '请填写联系人' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>通讯地址</h3>
      <Form.Item
        name="通讯地址"
        rules={[{ required: true, message: '请填写通讯地址' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>电话</h3>
      <Form.Item
        name="电话"
        rules={[{ required: true, message: '请填写电话' },{pattern: new RegExp(/^[1-9]\d*$/, "g"),message:'请正确输入电话'}]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
      <Form.Item
        name="传真"
        rules={[{ required: true, message: '请填写传真' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>
      
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行</h3>
      <Form.Item
        name="开户银行"
        rules={[{ required: true, message: '请填写开户银行' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号</h3>
      <Form.Item
        name="账号"
        rules={[{ required: true, message: '请填写账号' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
      <Form.Item
        name="邮编"
        rules={[{ required: true, message: '请填写邮编' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      </Form>

    )
}
export default ClientApplication;