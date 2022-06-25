import React ,{ Fragment }from 'react'
import PropTypes from 'prop-types';
import { Collapse,message, Divider, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

/**
 * 用户提交《委托测试软件功能列表》的界面  
 */
function FunctionList(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;
    const { Panel } = Collapse;

    const onFinishForm = (values) => {
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
            form['委托测试软件功能列表']=values
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
              GotoPage("ViewEntrust",_state)
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
          fetch(REMOTE_SERVER+"/delegation/"+_state['PageInfo']['id']+"/functionTable", {
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
            GotoPage("ViewEntrust",_state)
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
      rules={[{ required: true, message: '请填写软件名称' }]}>
        <Input id='软件名称' style={{maxWidth:500} }  />
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h3>
      <Form.Item
        name="版本号"
        rules={[{ required: true, message: '请填写版本号' }]}>
        <Input id='版本号' style={{maxWidth:500}} />
      </Form.Item>

      <Form.List name="功能项目列表" layout='vertical' width={500}
      rules={[{ required: true, message: '请添加功能项目列表' }]}>
        {(fields, {add, remove})=>(<>
          {fields.map(({ key, name, ...restField }) => (
            <Fragment>
              <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件功能</h4>
              <Form.Item {...restField} name={[name,'软件功能项目']} rules={[{ required: true, message: '请填写软件功能项目' }]}>
                <Input id='软件功能' style={{maxWidth:500}} placeholder="软件功能项目" />
              </Form.Item>
              <Collapse  bordered={false} ghost>
                  <Panel header="软件子功能列表" key="1">
                    <Form.List  name={[name, '子功能项目列表']} layout='vertical' width={500} >
                      {(fieldsInside, { add:addInside, remove:removeInside }) => ( <>
                        {fieldsInside.map(({ key, name, ...restFieldInside }) => (
                        <div>
                          <h5 style={{ fontWeight: 'bolder', padding :'0px 50px' }}>软件子功能项目</h5>
                          <Form.Item {...restFieldInside}
                            name = {[name,'软件子功能项目']}
                            style={{ padding :'0px 50px'}}
                            rules={[{ required: true, message: '请填写软件子功能项目' }]}>
                              <Input id='软件子功能项目' style={{maxWidth:450}} placeholder="软件子功能项目" />
                          </Form.Item>
                          <h5 style={{ fontWeight: 'bolder',padding :'0px 50px', marginTop: 30 }}>功能说明</h5>
                          <Form.Item {...restFieldInside}
                            style={{ padding :'0px 50px'}}
                            name = {[name,'功能说明']}
                            rules={[{ required: true, message: '请填写功能说明' }]}>
                              <Input id='功能说明' style={{maxWidth:450}} placeholder="功能说明" />
                          </Form.Item>
                          <FormItem style={{ padding :'0px 50px'}}>
                            <Button onClick={() => removeInside(name)} type='danger'>
                              删除该项目
                            </Button>
                          </FormItem>
                        </div>
                        ))}
                      <Form.Item  style={{ padding :'0px 50px'}}>
                        <Button id='添加新项目' type="dashed" style={{ padding :'0px 50px',width:450}} onClick={() => addInside()} icon={<PlusOutlined />}  >
                          添加新项目
                        </Button>
                      </Form.Item>
                      </>
                      )}
                    </Form.List>
                  </Panel>
              </Collapse>
              

              <Button onClick={() => remove(name)} type='danger'>
                  删除该功能
              </Button>
            </Fragment>
          ))}
          <Form.Item>
            <Button id='添加新功能' type="dashed" style={{ width:500, marginTop: 30 }} onClick={() => add()} icon={<PlusOutlined />}  >
              添加新功能
            </Button>
          </Form.Item>
        </>)}
      </Form.List>

      <Form.Item>
        <Button id='提交按钮' type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
export default FunctionList;

FunctionList.propTypes={
  /** 用户状态 */
  _state:PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo:PropTypes.func,
  /** 切换界面方法 */
  GotoPage:PropTypes.func
}