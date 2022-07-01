import {React } from 'react'
import {Fragment} from 'react'
import { message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import { Table, Tag } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

const { Column, ColumnGroup } = Table;
const sharedOnCell = (_, index) => {
  if (index === 0||index === 8||index===10) {
    return {
      colSpan: 0,
    };
  }

  return {};
};

const columns =[
  {
    title:'评审类别与评审项',
    dataIndex:'sort',
    // ellipsis:true,
    // onCell: (_, index) => ({
    //   colSpan: index === 0||8||10 ? 3 : 1,
    // }),
    onCell: (_,index) => {
      if(index===0||index===15){
        return{
          colSpan:4,
        };
      }
      if(index === 2||index===5||index===33){
        return {
          rowSpan: 3,
        };
      }
      if(index === 16){
        return {
          rowSpan: 11,
        };
      }
      if(index === 27||index === 30){
        return {
          rowSpan: 2,
        };
      }
      if(index === 3||index === 4||index === 6||index === 7||index === 34||index === 35||
        (index >= 17&&index<=26)||index === 28||index === 31){
        return {
          rowSpan:0,
        };
      }
      
    },
  },
  {
    title:'评审内容',
    dataIndex:'content',
    // ellipsis:true,
    onCell:(_,index) =>{
      if (index === 0||index === 15) {
        return {
          colSpan: 0,
        };
      }
    },
  },
  {
    title:'评审结果',
    dataIndex:'result',
    onCell:(_,index) =>{
      if (index === 0||index === 15) {
        return {
          colSpan: 0,
        };
      }
    },
    render:(_, record,index) => (
      <Form.Item name={'result_'+index} initialValue={''}>
      <Input></Input>
      </Form.Item>
    )
  },
  {
    title:'评审结果说明',
    dataIndex:'description',
    onCell:(_,index) =>{
        if (index === 0||index === 15) {
          return {
            colSpan: 0,
          };
        }
      },
      render:(_, record,index) => (
        <Form.Item name={'description_'+index} initialValue={''}>
        <Input></Input>
        </Form.Item>
      ),
    
  },
]

const data=[
  {
    key:'1',
    sort:'一、软件说明部分评审',
    content:'hahah',
  },
  {
    key:'2',
    sort:'1、可用性',
    content:'产品说明对于用户和潜在需方是可用的'
  },
  {
    key:'3',
    sort:'2、内容',
    content:'足够用于评价适用性'
  },
  {
    key:'4',
    sort:'2、内容',
    content:'排除内在的不一致'
  },
  {
    key:'5',
    sort:'2、内容',
    content:'可测试或可验证的'
  },
  {
    key:'6',
    sort:'3、标识和标示',
    content:'显示唯一标识'
  },
  {
    key:'7',
    sort:'3、标识和标示',
    content:'通过名称版本和日期指称'
  },
  {
    key:'8',
    sort:'3、标识和标示',
    content:'包含供方和至少一家经销商的名称和地址'
  },
  {
    key:'9',
    sort:'4、功能性陈述',
    content:'根据GB/T 25000.51-2010规范对软件的功能进行陈述'
  },
  {
    key:'10',
    sort:'5、可靠性陈述',
    content:'根据GB/T 25000.51-2010规范对软件的可靠性进行陈述'
  },
  {
    key:'11',
    sort:'6、易用性陈述',
    content:'根据GB/T 25000.51-2010规范对软件的易用性进行陈述'
  },
  {
    key:'12',
    sort:'7、效率陈述',
    content:'根据GB/T 25000.51-2010规范对软件的效率进行陈述'
  },
  {
    key:'13',
    sort:'8、维护性陈述',
    content:'根据GB/T 25000.51-2010规范对软件的维护性进行陈述'
  },
  {
    key:'14',
    sort:'9、可移植性陈述',
    content:'根据GB/T 25000.51-2010规范对软件的可移植性进行陈述'
  },
  {
    key:'15',
    sort:'10、使用质量陈述',
    content:'根据GB/T 25000.51-2010规范对软件的使用质量进行陈述'
  },
  {
    key:'16',
    sort:'二、软件文档集评审',
    content:'1'
  },
  {
    key:'17',
    sort:'1、完备性',
    content:'包含所有必需信息'
  },
  {
    key:'18',
    sort:'1、完备性',
    content:'包含产品说明中所有功能以及可调用功能的说明'
  },
  {
    key:'19',
    sort:'1、完备性',
    content:'包含可靠性特征及其操作'
  },
  {
    key:'20',
    sort:'1、完备性',
    content:'包含已处理的和可造成系统失效终止的差错和失效'
  },
  {
    key:'21',
    sort:'1、完备性',
    content:'必要的数据备份与恢复指南'
  },
  {
    key:'22',
    sort:'1、完备性',
    content:'所有关键功能的完备的细则信息和参考信息'
  },
  {
    key:'23',
    sort:'1、完备性',
    content:'陈述产品说明中所有限制'
  },
  {
    key:'24',
    sort:'1、完备性',
    content:'陈述最大最小磁盘空间'
  },
  {
    key:'25',
    sort:'1、完备性',
    content:'关于应用管理职能的所有必要信息'
  },
  {
    key:'26',
    sort:'1、完备性',
    content:'让用户验证是否完成应用管理职能的信息'
  },
  {
    key:'27',
    sort:'1、完备性',
    content:'文档集分若干部分，需给出完整标识'
  },
  {
    key:'28',
    sort:'2、正确性',
    content:'文档中所有的信息都是正确的。'
  },
  {
    key:'29',
    sort:'2、正确性',
    content:'没有歧义的信息。'
  },
  {
    key:'30',
    sort:'3、一致性',
    content:'文档集中的各文档不相互矛盾, 与产品说明也不矛盾. '
  },
  {
    key:'31',
    sort:'4、易理解性',
    content:'使用用户可理解的术语和文体。'
  },
  {
    key:'32',
    sort:'4、易理解性',
    content:'文档集为用户使用该软件提供必要的信息'
  },
  {
    key:'33',
    sort:'5、易学性',
    content:'为如何使用该软件提供了足够的信息'
  },
  {
    key:'34',
    sort:'6、可操作性',
    content:'电子文档可打印'
  },
  {
    key:'35',
    sort:'6、可操作性',
    content:'有目次(主题词列表)和索引'
  },
  {
    key:'36',
    sort:'6、可操作性',
    content:'不常用术语缩略语有定义'
  },

]

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
function SoftwareDocumentReviewForm(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;
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
            form['软件文档评审表'] = values
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
      fetch(REMOTE_SERVER+"/test/" + _state['PageInfo']['id']+"/test-doc/doc-evaluation", {
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


  return (
    <>
      <Form
        name="软件文档评审表"
        initialValues={{ remember: true }}
        style={{ padding: '20px 30px' }}
        autoComplete="false"
        onFinish={onFinishForm}
        onFinishFailed={onFinishFailed}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件文档评审表</h1>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h5>
        <Form.Item
          name='软件名称'
          rules={[{ required: true, message: '请填写软件名称' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="软件名称" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h5>
        <Form.Item
          
          name='版本号'
          rules={[{ required: true, message: '请填写版本号' }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="版本号" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位</h5>
        <Form.Item
          name='委托单位'
          rules={[{ }]}
        >
          <Input style={{ maxWidth: 500 }} placeholder="委托单位" defaultValue='高校评审组' disabled/>
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>评审人</h5>
        <Form.Item
          name='评审人'
          rules={[{ required: true, message: '请填写评审人' }]}
        >
          <Input style={{ maxWidth: 150 }} placeholder="评审人" />
        </Form.Item>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>评审完成时间</h5>
        <Form.Item name='评审完成时间' {...config}>
          <DatePicker />
        </Form.Item>

        <Table columns={columns} dataSource={data} pagination={{pageSize:40}} bordered/>

        <Form.Item
          name='检查人'
          label='检查人'
          rules={[{ required: true, message: '请填写检查人' }]}
        >
          <Input style={{ maxWidth: 150 }} placeholder="检查人" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>

    </>
    
  )


}
export default SoftwareDocumentReviewForm;


