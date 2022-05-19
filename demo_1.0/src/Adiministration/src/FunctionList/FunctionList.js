import React ,{ Fragment }from 'react'

import { DatePicker, Divider, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

function FunctionList(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;

    const onFinishForm = (values) => {
        console.log('Success:', values);
        var form = {}
        form['功能列表']=values;
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
      name="功能列表"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' } }
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
     >
         <h1 style={{textAlign:'center',fontSize:30}}>委托测试软件功能列表</h1> 


         <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h3>
     <Form.Item name="软件名称"
      >
        <Input  style={{maxWidth:500} }  rules={[{ required: true, message: '请填写软件名称' }]}/>
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h3>
     <Form.Item
        name="版本号"
        rules={[{ required: true, message: '请填写版本号' }]}
      >
        <Input  style={{maxWidth:500}} rules={[{ required: true, message: '请填写版本号' }]}/>
      </Form.Item>

      <Form.List name="功能项目列表" layout='vertical' width={500}>
          {(fields, {add, remove})=>(<>
            {fields.map(({ key, name, ...restField }) => (
                <Fragment >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件功能</h4>
                    <Form.Item
                  {...restField}
                
                  name={[name,'软件功能项目']}
                  rules={[{ required: true, message: '请填写软件功能项目' }]}
                >
                  <Input style={{maxWidth:500}} placeholder="软件功能项目" />
                </Form.Item>
      <Form.List  name={[name, '子功能项目列表']} layout='vertical' width={500} >
        {(fieldsInside, { add:addInside, remove:removeInside }) => (
          <>
            {fieldsInside.map(({ key, name, ...restFieldInside }) => (
             <div>
               <h5 style={{ fontWeight: 'bolder', padding :'0px 50px' }}>软件子功能项目</h5>
               
                <Form.Item
                  {...restFieldInside}
                  name = {[name,'软件子功能项目']}
                  style={{ padding :'0px 50px'}}
                  rules={[{ required: true, message: '请填写软件子功能项目' }]}
                >
                  <Input style={{maxWidth:450}} placeholder="软件子功能项目" />
                </Form.Item>
        
                <h5 style={{ fontWeight: 'bolder',padding :'0px 50px', marginTop: 30 }}>功能说明</h5>
                <Form.Item
                  {...restFieldInside}
                  style={{ padding :'0px 50px'}}
                  name = {[name,'功能说明']}
                  rules={[{ required: true, message: '请填写功能说明' }]}
                >
                  <Input style={{maxWidth:450}} placeholder="功能说明" />
                </Form.Item>
                <FormItem style={{ padding :'0px 50px'}}>
                <Button 
                onClick={() => removeInside(name)} type='danger'>
                    删除该项目
                </Button>
                </FormItem>
                </div>
            ))}
            
            <Form.Item  style={{ padding :'0px 50px'}}>
              <Button  type="dashed" 
              
              style={{ padding :'0px 50px',width:450}}
               onClick={() => addInside()} icon={<PlusOutlined />}  >
                添加新项目
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Button onClick={() => remove(name)} type='danger'>
                    删除该功能
                </Button>
                </Fragment>       
            ))}
      <Form.Item>
              <Button  type="dashed"
              style={{ width:500, marginTop: 30 }}
               onClick={() => add()} icon={<PlusOutlined />}  >
                添加新功能
              </Button>
            </Form.Item>
           
      </>)}
      </Form.List>


      

      

      

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      </Form>
    )


}
export default FunctionList;