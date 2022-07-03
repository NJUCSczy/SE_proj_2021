import {React, Fragment } from 'react'
import PropTypes from 'prop-types';
import { message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
/**
 * 1
 * 
 * 2
 * 
 * 3
 * 
 */
function QuestionList(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;
  const [formValue,setFormValue]=useState(0);
  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'] , {
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
            form['软件测试问题清单'] = values
            SubmitForm(form)
          }
          console.log(data)
        })
    }
    else {
      return SubmitForm(values)
    }
  };

  const SubmitForm = (_form, firstTime = false) => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/"+ _state['PageInfo']['id'] , {
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
            GotoPage("ViewProject", _state)
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
      fetch(REMOTE_SERVER+"/test/" + _state['PageInfo']['id']+"/test-doc/buglist", {
        method: firstTime ? "POST" : "POST",
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
          if ((res.status === 201 && firstTime === true) || (res.status === 200 && firstTime === false)) {
            message.success({ content: "提交成功！", key: "upload" })
            GotoPage("ViewProject", _state)
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
  const increase =() =>{
    formValue+=1;
    return formValue;
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

  // var formValue=1;
  // const onClickNew = () => {
  //   formValue+=1;
  // }

  return (
    <Form
      name="软件测试问题清单"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >
      <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试问题清单</h1>

      <Form.List name="项目列表" layout='vertical' width={500}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>序号</h5>
                <Form.Item
                  {...restField}
                  name={[name, '序号']}
                  rules={[{ }]}
                >
                  <InputNumber style={{ maxWidth: 100 }} defaultValue={formValue} readOnly={true} disabled={true}/>
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>问题（缺陷）简要描述</h5>
                <Form.Item
                  {...restField}
                  name={[name, '问题(缺陷)简要描述']}
                  rules={[{ required: true, message: '请填写问题（缺陷）简要描述' }]}
                >
                  <Input.TextArea style={{ maxWidth: 500 }} placeholder="问题(缺陷)简要描述" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>对应需求条目</h5>
                <Form.Item
                  {...restField}
                  name={[name, '对应需求条目']}
                  rules={[{ required: true, message: '请填写对应需求条目' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="对应需求条目" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现缺陷的初始条件</h5>
                <Form.Item
                  {...restField}
                  name={[name, '发现缺陷的初始条件']}
                  rules={[{ required: true, message: '请填写发现缺陷的初始条件' }]}
                >
                  <Input.TextArea style={{ maxWidth: 500 }} placeholder="发现缺陷的初始条件" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现缺陷用例及具体操作路径（要具体）</h5>
                <Form.Item
                  {...restField}
                  name={[name, '发现缺陷用例及具体操作路径（要具体）']}
                  rules={[{ required: true, message: '请填写发现缺陷用例及具体操作路径' }]}
                >
                  <Input.TextArea style={{ maxWidth: 500 }} placeholder="发现缺陷用例及具体操作路径（要具体）" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>关联用例</h5>
                <Form.Item
                  {...restField}
                  name={[name, '关联用例']}
                  rules={[{ required: true, message: '请填写关联用例' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="关联用例" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现时间</h5>
                {/* <Form.Item
                  {...restField}
                  name={[name, '发现时间']}
                  rules={[{ required: true, message: '请填写发现时间' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="发现时间" />
                </Form.Item> */}
                <Form.Item name={[name, '时间']}  label="DatePicker" {...config}>
                  <DatePicker showTime />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>责任人</h5>
                <Form.Item
                  {...restField}
                  name={[name, '责任人']}
                  rules={[{ required: true, message: '请填写责任人' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="责任人" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>修改建议</h5>
                <Form.Item
                  {...restField}
                  name={[name, '修改建议']}
                  rules={[{ required: true, message: '请填写修改建议' }]}
                >
                  <Input.TextArea style={{ maxWidth: 500 }} placeholder="修改建议" />
                </Form.Item>
                <Button onClick={() => {remove(name);setFormValue(formValue-1)}} type='danger'>
                  删除该项目
                </Button>
              </Fragment>
            ))}
            <Form.Item>
              <Button type="dashed"
                style={{ width: 500, marginTop: 30 }}
                onClick={() => {add();setFormValue(formValue+1)}} icon={<PlusOutlined />}  >
                添加新项目
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )


}
export default QuestionList;

// export default QuestionList;
QuestionList.propTypes={
  /** 用户状态 */
  _state:PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo:PropTypes.func,
  /** 切换界面方法 */
  GotoPage:PropTypes.func
}
