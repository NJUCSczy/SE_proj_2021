import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Collapse, message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions';
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

/**
 * 市场部填写报价单的界面
 */
function Quotation(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;
  const { Panel } = Collapse;

  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (USE_JSON_SERVER) {
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
            form['报价单'] = {}
            form['报价单']['基本信息'] = values
            form['报价单']['用户反馈'] = null
            SubmitForm(form)
          }
          console.log(data)
        })
    }
    else {
      fetch(REMOTE_SERVER + "/delegation/" + _state['PageInfo']['id'], {
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
      fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'], {
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
      fetch(REMOTE_SERVER + "/offer/delegation/" + _state['PageInfo']['id'], {
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

  return (
    <Form
      name="报价单"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >
      <h1 style={{ textAlign: 'center', fontSize: 30 }}>报价单</h1>
      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>户名：南京大学</h4>
      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行：中国工商银行股份有限公司南京汉口路分理处</h4>
      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号：4301011309001041656</h4>


      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h4>
      <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >
        <Input id='软件名称' style={{ maxWidth: 500 }} />
      </Form.Item>

      <Form.List name="项目列表" layout='vertical' width={500}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <Collapse bordered={false} ghost>
                  <Panel key="1">
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>项目</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '项目']}
                      rules={[{ required: true, message: '请填写项目名' }]}
                    >
                      <Input id='项目' style={{ maxWidth: 500 }} placeholder="项目" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>分项</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '分项']}
                      rules={[{ required: true, message: '请填写分项' }]}
                    >
                      <Input id='分项' style={{ maxWidth: 500 }} placeholder="分项" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>单价</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '单价']}
                      rules={[{ required: true, message: '请填写单价' },
                      { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                    >
                      <Input id='单价' style={{ maxWidth: 500 }} placeholder="单价" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '说明']}
                      rules={[{ required: true, message: '请填写说明' }]}
                    >
                      <Input id='说明' style={{ maxWidth: 500 }} placeholder="说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>行合计</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '行合计']}
                      rules={[{ required: true, message: '请填写行合计' },
                      { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                    >
                      <Input id='行合计' style={{ maxWidth: 500 }} placeholder="行合计" />
                    </Form.Item>
                    <Button id='删除该项目' onClick={() => remove(name)} type='danger'>
                      删除该项目
                    </Button>
                  </Panel>
                </Collapse>


              </Fragment>
            ))}
            <Form.Item>
              <Button type="dashed" id='添加新项目'
                style={{ width: 500, marginTop: 30 }}
                onClick={() => add()} icon={<PlusOutlined />}  >
                添加新项目
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>以下金额单位： 元</h3>
      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>小计</h4>
      <Form.Item
        name="小计"
        rules={[{ required: true, message: '请填写小计' },
        { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
      >
        <Input id='小计' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>税率(8%)</h4>
      <Form.Item
        name="税率(8%)"
        rules={[{ required: true, message: '请填写税率' },
        { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
      >
        <Input id='税率' style={{ maxWidth: 500 }} />
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>总计</h4>
      <Form.Item
        name="总计"
        rules={[{ required: true, message: '请填写总计' },
        { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
      >
        <Input id='总计' style={{ maxWidth: 500 }} />
      </Form.Item>

      <Form.Item>
        <Button id='提交' type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>

    </Form>
  )


}
export default Quotation;

Quotation.propTypes = {
  /** 用户状态 */
  _state: PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo: PropTypes.func,
  /** 切换界面方法 */
  GotoPage: PropTypes.func
}