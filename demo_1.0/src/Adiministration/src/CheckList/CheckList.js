import React ,{ Fragment }from 'react'
import isMobile from 'is-mobile';

import {DatePicker, message, Divider,Tag,Table, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';

import FormItem from 'antd/lib/form/FormItem';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../functions/functions';
import type { ColumnsType } from 'antd/lib/table';
function CheckList(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({})
    const { Option } = Select;
    const { TextArea } = Input;
    const mobile = require('is-mobile');

   

interface DataType {
  key: number;
  name: string;
  content: string;

}

const columns: ColumnsType<DataType> = [
  /*{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width:50,
    render: text => <span>{text}</span>,
  },*/
  {
    title: '检查内容',
    dataIndex: 'name',
    key: 'name',
    width:100,
    render: text => <span >{text}</span>,
  },
  {
    title: '内容描述',
    dataIndex: 'content',
    key: 'content',
    render: text => <span>{text}</span>,
  },
  {
    title: '检查结果',
    key: 'action',
    width:100,
    render: (_, record) => (
        <>
        <Switch checkedChildren="正确" unCheckedChildren="有误" defaultChecked />
        <br />
        </>
    ),
  },
];

const data: DataType[] = [
    {
      key: 1,
      name: '报告编号',
      content: '检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉）。',
    },
    {
      key: 2,
      name: '页码',
      content: '检查页码与总页数是否正确（报告首页与每页页眉）。',
    },
    {
      key: 3,
      name: '软件名称',
      content: '是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）。',
    },
    {
      key: 4,
      name: '版本号',
      content: '是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。',
    },
    {
      key: 5,
      name: '委托单位',
      content: '是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。',
    },
    {
      key: 6,
      name: '完成日期',
      content: '是否前后一致（共二处，包括首页、报告页页末）。',
    },
    {
      key: 7,
      name: '委托单位地址',
      content: '是否和确认单一致（共一处，报告页）。',
    },
    {
      key: 8,
      name: '序号',
      content: '附件二、附件三中的序号是否正确、连续。',
    },
    {
      key: 9,
      name: '测试样品',
      content: '样品名称是否正确，数量是否正确。',
    },
    {
      key: 10,
      name: '软、硬件列表',
      content: '列表是否完整（如打印机），用途描述是否合理正确。',
    },
    {
      key: 11.1,
      name: '错别字',
      content: '报告中是否还有错别字。',
    },
    {
      key: 11.2,
      name: '测试样品',
      content: '报告的语句是否通顺合理；每个功能描述结束后是否都有句号。',
    },
    {
      key: 11.3,
      name: '格式',
      content: '报告的格式是否美观，字体是否一致，表格大小是否一致。（如无特殊情况请尽量不要将报告页中的表格分为2页。）',
    },
    {
      key: 12,
      name: '用户文档测试报告',
      content: '语句是否通顺，是否准确描述用户的文档。',
    },
  ];


    return( <Form
        name="测试报告检查表"
        initialValues={{ remember: true }}
        style={{ padding: mobile()?'20px 5px': '20px 30px' }}
        labelCol={{ span: 10, flex: 'auto' }}
        wrapperCol={{ span: 20 }}
        layout='vertical'
        >
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h3>
     <Form.Item
     name="软件名称"
     rules={[{ required: true, message: '请填写软件名称' }]}
      >
        <Input  style={{maxWidth:500} } />
      </Form.Item>
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位</h3>
     <Form.Item
     name="委托单位"
     rules={[{ required: true, message: '请填写委托单位' }]}
      >
        <Input  style={{maxWidth:500} } />
      </Form.Item>

      <Table columns={columns} dataSource={data} />
      <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>检查人</h3>
     <Form.Item
     name="检查人"
     rules={[{ required: true, message: '请填写检查人' }]}
      >
        <Input  style={{maxWidth:500} } />
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>日期</h3>
      <Form.Item
        name={['日期']}
        rules={[{ required: true, message: '请填写日期' }]}
      >
        <DatePicker />
      </Form.Item>
      </Form.Item>
        </Form>
    )




}

export default CheckList;