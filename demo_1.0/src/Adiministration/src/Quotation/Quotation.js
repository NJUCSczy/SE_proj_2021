import React ,{ Fragment }from 'react'

import { DatePicker, Divider, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
function Quotation(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;

    const onFinishForm = (values) => {
        console.log('Success:', values);
        var form = {}
        form['报价单']=values;
        SubmitForm(form);
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
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert('请正确填写！')
      };
  
   

  
    return(
        <Form
      name="报价单"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
     >
          <h1 style={{textAlign:'center',fontSize:30}}>报价单</h1>
          <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>户名：南京大学</h4>
          <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行：中国工商银行股份有限公司南京汉口路分理处</h4>
          <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号：4301011309001041656</h4>
    
    
    <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h4>
     <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>
      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>以下金额单位： 元</h4>


      <Form.List name="项目列表" layout='vertical' width={500}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
             <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
               <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>项目</h5>
                <Form.Item
                  {...restField}
                  name={[name, '项目']}
                  rules={[{ required: true, message: '请填写项目名' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="项目" />
                </Form.Item>
        
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>分项</h5>
                <Form.Item
                  {...restField}
                  name={[name, '分项']}
                  rules={[{ required: true, message: '请填写分项' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="分项" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>单价</h5>
                <Form.Item
                  {...restField}
                  name={[name, '单价']}
                  rules={[{ required: true, message: '请填写单价' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="单价" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>说明</h5>
                <Form.Item
                  {...restField}
                  name={[name, '说明']}
                  rules={[{ required: true, message: '请填写说明' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="说明" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>行合计</h5>
                <Form.Item
                  {...restField}
                  name={[name, '行合计']}
                  rules={[{ required: true, message: '请填写行合计' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="行合计" />
                </Form.Item>
                <Button onClick={() => remove(name)} type='danger'>
                    删除该项目
                </Button>
                </Fragment>
            ))}
            <Form.Item>
              <Button  type="dashed"
              style={{ width:500, marginTop: 30 }}
               onClick={() => add()} icon={<PlusOutlined />}  >
                添加新项目
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>小计</h4>
     <Form.Item
        name="小计"
        rules={[{ required: true, message: '请填写小计' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>税率（8%）</h4>
     <Form.Item
        name="税率(8%)"
        rules={[{ required: true, message: '请填写税率' }]}
      >
        <Input  style={{maxWidth:500}}/>
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>总计</h4>
     <Form.Item
        name="总计"
        rules={[{ required: true, message: '请填写总计' }]}
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
export default Quotation;
