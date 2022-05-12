import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './SubmitApplication.css'
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';

var _ = require('lodash');
var mobile = require('is-mobile');

function SubmitApplication(props) {
  const userState = props._state
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;

  const setDataByKey = (key, val) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[key] = val;
      console.log(newFormData)
      return newFormData;
    })

  }


  const onFormChange = (form) => {
    setFormData(prev => {
      return form;
    })
    console.log(form)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: '20px 30px' }}
      labelCol={{ span: 10, flex: 'auto' }}
      wrapperCol={{ span: 20 }}
      layout='vertical'

      autoComplete="false">

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试类型</h2>
      <Form.Item
        name='测试类型'
        rules={[{ required: true, message: '请选择测试类型' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="软件确认测试" style={{ lineHeight: '32px' }}>
              软件确认测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="成果/技术鉴定测试" style={{ lineHeight: '32px' }}>
              成果/技术鉴定测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="专项资金验收测试" style={{ lineHeight: '32px' }}>
              专项资金验收测试
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('测试类型(其他)', e.target.checked)}>
            其他
          </Checkbox>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="测试类型(其他)"
            rules={[{ required: (formData['测试类型(其他)'] === true), message: '请填写其他测试类型名称！' }]}
          >
            <Input style={{ padding: 0 }} disabled={formData['测试类型(其他)'] != true} />
          </Form.Item>
        </Checkbox.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h2>
      <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >

        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h2>
      <Form.Item
        name="版本号"
        rules={[{ required: true, message: '请填写版本号' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位(中文)</h2>
      <Form.Item
        name="委托单位(中文)"
        rules={[{ required: true, message: '请填写委托单位名称(中文)' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位(英文)</h2>
      <Form.Item
        name="委托单位(英文)"
        rules={[{ required: true, message: '请填写委托单位名称(英文)' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>开发单位</h2>
      <Form.Item
        name="开发单位"
        rules={[{ required: true, message: '请填写开发单位' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位性质</h2>
      <Form.Item
        name="单位性质"
        rules={[{ required: true, message: '请选择单位性质' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="内资企业" style={{ lineHeight: '32px' }} >内资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="外(合)资企业" style={{ lineHeight: '32px' }}>外(合)资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="港澳台(合)资企业" style={{ lineHeight: '32px' }}>港澳台(合)资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="科研院校" style={{ lineHeight: '32px' }}>科研院校</Radio></Col>
          <Col span={30}>
            <Radio value="政府事业团体" style={{ lineHeight: '32px' }}>政府事业团体</Radio></Col>
          <Col span={30}>
            <Radio value="其他" style={{ lineHeight: '32px' }}>其他</Radio></Col>
        </Radio.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件用户对象描述</h2>
      <Form.Item
        name="软件用户对象描述"
        rules={[{ required: true, message: '请填写软件用户对象描述' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>主要功能及用途简介(限300字)</h2>
      <Form.Item
        name="主要功能及用途简介(限300字)"
        rules={[{ required: true, message: '请填写主要功能及用途' }]}
      >
        <TextArea rows={5} showCount maxLength={300}></TextArea>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试依据</h2>
      <Form.Item
        name='测试依据'
        rules={[{ required: true, message: '请选择测试依据' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="GB/T 25000.51-2010" style={{ lineHeight: '32px' }}>
              GB/T 25000.51-2010
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="GB/T 16260.1-2006" style={{ lineHeight: '32px' }}>
              GB/T 16260.1-2006
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="NST-03-WI12-2011" style={{ lineHeight: '32px' }}>
              NST-03-WI12-2011
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="NST-03-WI13-2011" style={{ lineHeight: '32px' }}>
              NST-03-WI13-2011
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('测试依据(其他)', e.target.checked)}>
            其他
          </Checkbox>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="测试依据(其他)"
            rules={[{ required: (formData['测试依据(其他)'] === true), message: '请输入其他测试依据名称！' }]}
          >
            <Input style={{ padding: 0 }} disabled={formData['测试依据(其他)'] != true} />
          </Form.Item>
        </Checkbox.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>需要测试的技术指标</h2>
      <Form.Item
        name='需要测试的技术指标'
        rules={[{ required: true, message: '请填写需要测试的技术指标' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="功能性" style={{ lineHeight: '32px' }}>
              功能性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可靠性" style={{ lineHeight: '32px' }}>
              可靠性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="易用性" style={{ lineHeight: '32px' }}>
              易用性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="效率" style={{ lineHeight: '32px' }}>
              效率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可维护性" style={{ lineHeight: '32px' }}>
              可维护性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可移植性" style={{ lineHeight: '32px' }}>
              可移植性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码覆盖度" style={{ lineHeight: '32px' }}>
              代码覆盖度
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="缺陷检测率" style={{ lineHeight: '32px' }}>
              缺陷检测率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码风格符合度" style={{ lineHeight: '32px' }}>
              代码风格符合度
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码不符合项检测率" style={{ lineHeight: '32px' }}>
              代码不符合项检测率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="产品说明要求" style={{ lineHeight: '32px' }}>
              产品说明要求
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="用户文档集要求" style={{ lineHeight: '32px' }}>
              用户文档集要求
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('需要测试的技术指标(其他)', e.target.checked)}>
            其他
          </Checkbox>
          <Form.Item
            style={{ paddingLeft: 20 }}
            name="需要测试的技术指标(其他)"
            rules={[{ required: (formData['需要测试的技术指标(其他)'] === true), message: '请输入其他测试依据名称！' }]}
          >
            <Input style={{ padding: 0 }} disabled={formData['需要测试的技术指标(其他)'] != true} />
          </Form.Item>
        </Checkbox.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件规模</h2>
      <Form.Item
        name='软件规模'
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if ((formData.hasOwnProperty("功能数(到最后一级菜单)") && formData["功能数(到最后一级菜单)"] != '')
                || (formData.hasOwnProperty("功能点数") && formData["功能点数"] != '')
                || (formData.hasOwnProperty("代码行数(不包括注释行、空行)") && formData["代码行数(不包括注释行、空行)"] != '')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请填写至少一项软件规模指标！'));
            },
          }),
        ]}
        validateTrigger
      >
        <div style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>（以下三项请至少选填一项）</div><br></br>
        <h4 style={{ fontWeight: 'bolder' }}>功能数（到最后一级菜单）</h4>
        <Form.Item name={["软件规模", "功能数(到最后一级菜单)"]}>
          <Input onChange={(e) => setDataByKey("功能数(到最后一级菜单)", e.target.value)} />
        </Form.Item>
        <h4 style={{ fontWeight: 'bolder' }}>功能点数</h4>
        <Form.Item name={["软件规模", "功能点数"]}>
          <Input onChange={(e) => setDataByKey("功能点数", e.target.value)} />
        </Form.Item>
        <h4 style={{ fontWeight: 'bolder' }}>代码行数(不包括注释行、空行)</h4>
        <Form.Item name={["软件规模", "代码行数(不包括注释行、空行)"]}>
          <Input onChange={(e) => setDataByKey("代码行数(不包括注释行、空行)", e.target.value)} />
        </Form.Item>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件类型(单选)</h2>
      <Form.Item
        name="软件类型"
        rules={[{ required: true, message: '请选择软件类型' }]}
      >
        <Radio.Group >
          <h4 style={{ fontWeight: 'bolder' }}>系统软件</h4>
          <Col span={30} >
            <Radio value={['系统软件', '操作系统']} style={{ lineHeight: '32px' }} >操作系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['系统软件', '中文处理系统']} style={{ lineHeight: '32px' }}>中文处理系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['系统软件', '网络系统']} style={{ lineHeight: '32px' }}>网络系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['系统软件', '嵌入式操作系统']} style={{ lineHeight: '32px' }}>嵌入式操作系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['系统软件', '其他']} style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>支持软件</h4>
          <Col span={30} >
            <Radio value={['支持软件', '程序设计语言']} style={{ lineHeight: '32px' }} >程序设计语言</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['支持软件', '数据库系统设计']} style={{ lineHeight: '32px' }}>数据库系统设计</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['支持软件', '工具软件']} style={{ lineHeight: '32px' }}>工具软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['支持软件', '网络通信软件']} style={{ lineHeight: '32px' }}>网络通信软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['支持软件', '中间件']} style={{ lineHeight: '32px' }}>中间件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['支持软件', '其他']} style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>应用软件</h4>
          <Col span={30} >
            <Radio value={['应用软件', '行业管理软件']} style={{ lineHeight: '32px' }} >行业管理软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '办公软件']} style={{ lineHeight: '32px' }}>办公软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '模式识别软件']} style={{ lineHeight: '32px' }}>模式识别软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '图形图像软件']} style={{ lineHeight: '32px' }}>图形图像软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '控制软件']} style={{ lineHeight: '32px' }}>控制软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '网络应用软件']} style={{ lineHeight: '32px' }}>网络应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '信息管理软件']} style={{ lineHeight: '32px' }}>信息管理软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '数据库管理应用软件']} style={{ lineHeight: '32px' }}>数据库管理应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '安全与保密软件']} style={{ lineHeight: '32px' }}>安全与保密软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '嵌入式应用软件']} style={{ lineHeight: '32px' }}>嵌入式应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '教育软件']} style={{ lineHeight: '32px' }}>教育软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '游戏软件']} style={{ lineHeight: '32px' }}>游戏软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value={['应用软件', '其他']} style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>其他</h4>
          <Col span={30} >
            <Radio value={['其他', '其他']} style={{ lineHeight: '32px' }} >其他</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>


      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>运行环境</h2>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>客户端</h3>
      <h4 style={{ fontWeight: 'bolder' }}>操作系统</h4>
      <Form.Item
        name={['运行环境', '客户端', '操作系统']}
        rules={[{ required: true, message: '请选择操作系统' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="Windows" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-Windows', e.target.checked)}>
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['运行环境', '客户端', '操作系统-Windows版本']}
                rules={[{ required: (formData['运行环境-客户端-操作系统-Windows'] === true), message: '请填写Windows版本' }]}
              >
                <Input addonBefore='Windows' addonAfter='(版本)' style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-Windows'] != true} />
              </Form.Item>
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="Linux" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-Linux', e.target.checked)}>
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['运行环境', '客户端', '操作系统-Linux版本']}
                rules={[{ required: (formData['运行环境-客户端-操作系统-Windows'] === true), message: '请填写Linux版本' }]}
              >
                <Input addonBefore="Linux" addonAfter='(版本)' style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-Linux'] != true} />
              </Form.Item>
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-客户端-操作系统-其他', e.target.checked)}>
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['运行环境', '客户端', '操作系统-其他']}
                rules={[{ required: (formData['运行环境-客户端-操作系统-其他'] === true), message: '请填写内容' }]}
              >
                <Input addonBefore="其他" style={{ padding: 0 }} disabled={formData['运行环境-客户端-操作系统-其他'] != true} />
              </Form.Item>
            </Checkbox>
          </Col>

        </Checkbox.Group>
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>内存要求</h4>
      <Form.Item
        name={['运行环境', '客户端', '内存要求']}
        rules={[{ required: true, message: '请填写内存要求' }]}
      >
        <Input addonAfter='MB' />
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他要求</h4>
      <Form.Item
        name={['运行环境', '客户端', '其他要求']}
      >
        <TextArea rows={2} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>服务器端</h3>
      <h4 style={{ fontWeight: 'bolder', marginTop: 0 }}>硬件</h4>
      <h5 style={{ fontWeight: 'bolder'}}>架构</h5>
      <Form.Item
        name={['运行环境', '服务器端', '硬件','架构']}
        rules={[{ required: true, message: '请选择架构' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="PC服务器" style={{ lineHeight: '32px' }} >PC服务器</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="UNIX/Linux服务器" style={{ lineHeight: '32px' }} >UNIX/Linux服务器</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('运行环境-服务器端-硬件-架构-其他', e.target.checked)}>
              其他
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['运行环境', '服务器端', '硬件','架构-其他']}
                rules={[{ required: (formData['运行环境-服务器端-硬件-架构-其他'] === true), message: '请填写内容' }]}
              >
                <Input style={{ padding: 0 }} disabled={formData['运行环境-服务器端-硬件-架构-其他'] != true} />
              </Form.Item>
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>内存要求</h5>
      <Form.Item
        name={['运行环境', '服务器端', '硬件','内存要求']}
        rules={[{ required: true, message: '请填写内存要求' }]}
      >
        <Input addonAfter='MB' />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>硬盘要求</h5>
      <Form.Item
        name={['运行环境', '服务器端', '硬件','硬盘要求']}
        rules={[{ required: true, message: '请填写硬盘要求' }]}
      >
        <Input addonAfter='MB' />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他要求</h5>
      <Form.Item
        name={['运行环境', '服务器端', '硬件','其他要求']}
      >
        <TextArea rows={2} />
      </Form.Item>

      <h4 style={{ fontWeight: 'bolder', marginTop: 60 }}>软件</h4>
      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>操作系统</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','操作系统']}
        rules={[{ required: true, message: '请填写操作系统' }]}
      >
        <Input />
      </Form.Item>
      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','版本']}
        rules={[{ required: true, message: '请填写版本' }]}
      >
        <Input />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>编程语言</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','编程语言']}
        rules={[{ required: true, message: '请填写编程语言' }]}
      >
        <Input />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>构架</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','架构']}
        rules={[{ required: true, message: '请选择架构' }]}
      >
        <Checkbox.Group >
          <Col span={30}>
            <Checkbox value="C/S" style={{ lineHeight: '32px' }} >C/S</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="B/S" style={{ lineHeight: '32px' }} >B/S</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} >
              其他
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>数据库</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','数据库']}
        rules={[{ required: true, message: '请填写数据库' }]}
      >
        <Input />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>中间件</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','中间件']}
        rules={[{ required: true, message: '请填写中间件' }]}
      >
        <Input />
      </Form.Item>

      <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他支撑软件</h5>
      <Form.Item
        name={['运行环境', '服务器端', '软件','其他支撑软件']}
      >
        <TextArea rows={3} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>网络环境</h3>
      <Form.Item
        name={['运行环境', '网络环境']}
        rules={[{ required: true, message: '请填写网络环境' }]}
      >
        <Input />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>样品和数量</h2>
      <h3 style={{ fontWeight: 'bolder', marginTop: 0 }}>软件介质</h3>
      <Form.Item
        name={['样品和数量','软件介质']}
        rules={[{ required: true, message: '请选择软件介质' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="光盘" style={{ lineHeight: '32px' }} >光盘</Radio>
          </Col>
          <Col span={30}>
            <Radio value="U盘" style={{ lineHeight: '32px' }}>U盘</Radio>
          </Col>
          <Col span={30}>
          <Radio value="其他" style={{ lineHeight: '32px' }} onChange={(e) => setDataByKey('样品和数量-软件介质-其他', e.target.checked)}>
              其他
              <Form.Item
                style={{ paddingLeft: 0 }}
                name={['样品和数量', '软件介质(其他)']}
                rules={[{ required: (formData['样品和数量-软件介质-其他'] === true), message: '请填写内容' }]}
              >
                <Input style={{ padding: 0 }} disabled={formData['样品和数量-软件介质-其他'] != true} />
              </Form.Item>
            </Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>文档资料</h3>
      <Form.Item
        name={['样品和数量', '文档资料']}
      >
        <TextArea rows={3} />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>提交的样品(硬拷贝资料、硬件)五年保存期满后</h3>
      <Form.Item
        name={['样品和数量','提交的样品(硬拷贝资料、硬件)五年保存期满后']}
        rules={[{ required: true, message: '请选择期望' }]}
      >
        <Radio.Group >
          <Col span={30} >
            <Radio value="由本实验室销毁 " style={{ lineHeight: '32px' }} >由本实验室销毁 </Radio>
          </Col>
          <Col span={30}>
            <Radio value="退还给我们" style={{ lineHeight: '32px' }}>退还给我们</Radio>
          </Col>
        </Radio.Group>
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>希望测试完成时间</h2>
      <Form.Item
        name={['希望测试完成时间']}
        rules={[{ required: true, message: '请填写希望测试完成的时间' }]}
      >
        <DatePicker />
      </Form.Item>

      <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位信息</h2>
      <h3 style={{ fontWeight: 'bolder', marginTop: 0 }}>电话</h3>
      <Form.Item
        name={['委托单位信息', '电话']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
      <Form.Item
        name={['委托单位信息', '传真']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>地址</h3>
      <Form.Item
        name={['委托单位信息', '地址']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
      <Form.Item
        name={['委托单位信息', '邮编']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
      <Form.Item
        name={['委托单位信息', '联系人']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>手机</h3>
      <Form.Item
        name={['委托单位信息', '手机']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>E-mail</h3>
      <Form.Item
        name={['委托单位信息', 'E-mail']}
      >
        <Input />
      </Form.Item>

      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>网址</h3>
      <Form.Item
        name={['委托单位信息', '网址']}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>

  )
}


export default SubmitApplication
