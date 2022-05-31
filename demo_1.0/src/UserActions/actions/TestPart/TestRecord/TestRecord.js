import isMobile from 'is-mobile';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react'
import { message, DatePicker, TimePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestRecord.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { RangePicker } = DatePicker;

var _ = require('lodash');
var mobile = require('is-mobile');
/**
 * 测试记录   
 * 
 * 2   
 * 
 * 1 
 * 
 */

function TestRecord(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const OnFinish = (values) => {
    console.log(values)
  }
  return (
    <Form
      style={{ padding: "10px 10px 10px 10px" }}
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={OnFinish}
    >

      <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件测试记录(电子记录)</h1>

      <Form.List name="软件测试记录" layout='vertical' width={500}>
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
                  <Input id="测试分类" style={{ maxWidth: 500 }} placeholder="测试分类" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>序号</h5>
                <Form.Item
                  {...restField}
                  name={[name, '序号']}
                  rules={[{ required: true, message: '请填写序号' },
                  { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                >
                  <Input id="序号" style={{ maxWidth: 500 }} placeholder="序号" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例设计说明</h5>
                <Form.Item
                  {...restField}
                  name={[name, '测试用例设计说明']}
                  rules={[{ required: true, message: '请填写测试用例设计说明' }]}
                >
                  <Input.TextArea id="测试用例设计说明" placeholder="测试用例设计说明" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>与本测试用例有关的规约说明</h5>
                <Form.Item
                  {...restField}
                  name={[name, '与本测试用例有关的规约说明']}
                  rules={[{ required: true, message: '请填写与本测试用例有关的规约说明' }]}
                >
                  <Input.TextArea id="与本测试用例有关的规约说明" placeholder="与本测试用例有关的规约说明" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>前提条件</h5>
                <Form.Item
                  {...restField}
                  name={[name, '前提条件']}
                  rules={[{ required: true, message: '请填写前提条件' }]}
                >
                  <Input.TextArea id="前提条件" placeholder="前提条件" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例执行过程</h5>
                <Form.Item
                  {...restField}
                  name={[name, '测试用例执行过程']}
                  rules={[{ required: true, message: '请填写测试用例执行过程' }]}
                >
                  <Input.TextArea id="测试用例执行过程" placeholder="测试用例执行过程" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>预期的结果</h5>
                <Form.Item
                  {...restField}
                  name={[name, '预期的结果']}
                  rules={[{ required: true, message: '请填写预期的结果' }]}
                >
                  <Input.TextArea id="预期的结果" placeholder="预期的结果" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试用例设计者</h5>
                <Form.Item
                  {...restField}
                  name={[name, '测试用例设计者']}
                  rules={[{ required: true, message: '请填写测试用例设计者' }]}
                >
                  <Input id="测试用例设计者" style={{ maxWidth: 500 }} placeholder="测试用例设计者" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>实际结果</h5>
                <Form.Item
                  {...restField}
                  name={[name, '实际结果']}
                  rules={[{ required: true, message: '请填写实际结果' }]}
                >
                  <Input.TextArea id="实际结果" placeholder="实际结果" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>是否与预期结果一致</h5>
                <Form.Item
                  {...restField}
                  name={[name, '是否与预期结果一致']}
                  rules={[{ required: true, message: '请填写是否与预期结果一致' }]}
                >
                  <Input id="是否与预期结果一致" style={{ maxWidth: 500 }} placeholder="是否与预期结果一致" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>相关的BUG编号</h5>
                <Form.Item
                  {...restField}
                  name={[name, '相关的BUG编号']}
                  rules={[{ required: true, message: '请填写相关的BUG编号' }]}
                >
                  <Input id="相关的BUG编号" style={{ maxWidth: 500 }} placeholder="相关的BUG编号" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>用例执行者</h5>
                <Form.Item
                  {...restField}
                  name={[name, '用例执行者']}
                  rules={[{ required: true, message: '请填写用例执行者' }]}
                >
                  <Input id="用例执行者" style={{ maxWidth: 500 }} placeholder="用例执行者" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>执行测试时间</h5>
                <Form.Item
                  {...restField}
                  name={[name, '执行测试时间']}
                  rules={[{ required: true, message: '请填写执行测试时间' }]}
                >
                  <DatePicker id="执行测试时间" placeholder="执行测试时间" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>确认人</h5>
                <Form.Item
                  {...restField}
                  name={[name, '确认人']}
                  rules={[{ required: true, message: '请填写确认人' }]}
                >
                  <Input id="确认人" style={{ maxWidth: 500 }} placeholder="确认人" />
                </Form.Item>

                <Button onClick={() => remove(name)} type='danger'>
                  删除该软件测试记录
                </Button>
              </Fragment>
            ))}
            <Form.Item>
              <Button id="添加新软件测试记录" type="dashed"
                style={{ width: 500, marginTop: 30 }}
                onClick={() => add()} icon={<PlusOutlined />}  >
                添加新软件测试记录
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>


    </Form>
  );

}

export default TestRecord

TestRecord.propTypes = {
  /** 用户状态 */
  _state: PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo: PropTypes.func,
  /** 切换界面方法 */
  GotoPage: PropTypes.func
}