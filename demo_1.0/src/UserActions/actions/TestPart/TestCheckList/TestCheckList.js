import React, { Fragment } from 'react'

import { message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useState } from 'react';
import { Table, Tag } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

// const { Column, ColumnGroup } = Table;
const sharedOnCell = (_, index) => {
  if (index === 1||index === 8) {
    return {
      colSpan: 0,
    };
  }

  return {};
};

const colomns =[
  {
    title:'工作(项目)流程',
    dataIndex:'process',
    onCell: (_, index) => ({
      colSpan: index === 0||8||10 ? 3 : 1,
    }),
  },
  {
    title:'可预见问题及注意事项',
    dataIndex:'caution',
    onCell:sharedOnCell,
  },
  {
    title:'确认',
    dataIndex:'confirm',
    onCell:sharedOnCell,
    width:100,
    render: (_, record) => (
        <>
        <Switch checkedChildren="正确" unCheckedChildren="有误" defaultChecked />
        <br />
        </>
    ),
  }
]

const data=[
  {
    key:'1',
    process:'一、前期指导工作',
    caution:'hahah',
  },
  {
    key:'2',
    process:'1、接受委托单位委托测试申请',
    caution:'1、为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项。'
  },
  {
    key:'3',
    process:'1、接受委托单位委托测试申请',
    caution:'2、建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程；'
  },
  {
    key:'4',
    process:'1、接受委托单位委托测试申请',
    caution:'3、根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。'
  },
  {
    key:'5',
    process:'2、填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料；',
    caution:'1、确保委托方应填内容正确、完备；纸质材料已盖公章；'
  },
  {
    key:'6',
    process:'2、填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料；',
    caution:'2、明确委托方按《软件项目委托测试提交材料》提交材料。'
  },
  {
    key:'7',
    process:'3、签订《软件项目委托测试合同》、《软件项目委托测试保密协议》',
    caution:'1、合同及保密协议内容、数量符合要求；'
  },
  {
    key:'8',
    process:'3、签订《软件项目委托测试合同》、《软件项目委托测试保密协议》',
    caution:'2、合同编号方式符合要求；'
  },
  {
    key:'9',
    process:'二、对委托测试软件的可测状态进行评估',
    caution:'2、合同编号方式符合要求；'
  },
  {
    key:'10',
    process:'4、对委托测试软件的可测状态进行评估',
    caution:'实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估，若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。'
  },
  {
    key:'11',
    process:'三、实施测试',
    caution:'2、合同编号方式符合要求；'
  },
  {
    key:'12',
    process:'5、编制测试方案',
    caution:'1、测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。'
  },
  {
    key:'13',
    process:'5、编制测试方案',
    caution:'2、委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。'
  },
  {
    key:'14',
    process:'5、编制测试方案',
    caution:'3、软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。'
  },
  {
    key:'15',
    process:'5、编制测试方案',
    caution:'4、资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）；软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。'
  },
  {
    key:'16',
    process:'5、编制测试方案',
    caution:'5、参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。'
  },
  {
    key:'17',
    process:'6、搭建测试环境',
    caution:'1、实验室按照委托方提供的委托测试软件运行环境搭建测试环境；'
  },
  {
    key:'18',
    process:'7、实施测试',
    caution:'1、测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面，对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。'
  },
  {
    key:'19',
    process:'7、实施测试',
    caution:'2、对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。'
  },
]

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
function TestCheckList(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({})
  const { Option } = Select;
  const { TextArea } = Input;
  const [formValue,setFormValue]=React.useState(0);
  const onFinishForm = (values) => {
    console.log('Success:', values);
    var form = {}
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/1" , {
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
      fetch(REMOTE_SERVER+"/delegation/" + _state['PageInfo']['id'], {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'],
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
      fetch("http://localhost:8000/forms/1" , {
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
      fetch(REMOTE_SERVER+"/offer/delegation/" + _state['PageInfo']['id'], {
        method: firstTime ? "POST" : "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'],
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


  return (
    <Form
      name="软件测试问题清单"
      initialValues={{ remember: true }}
      style={{ padding: '20px 30px' }}
      autoComplete="false"
      onFinish={onFinishForm}
      onFinishFailed={onFinishFailed}
    >
      <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试工作检查表</h1>
      <Form.List name="项目列表" layout='vertical' width={500}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h5>
                <Form.Item
                  {...restField}
                  name={[name, '软件名称']}
                  rules={[{ required: true, message: '请填写软件名称' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="软件名称" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h5>
                <Form.Item
                  {...restField}
                  name={[name, '版本号']}
                  rules={[{ required: true, message: '请填写版本号' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="版本号" />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>申报单位</h5>
                <Form.Item
                  {...restField}
                  name={[name, '申报单位']}
                  rules={[{ required: true, message: '请填写申报单位' }]}
                >
                  <Input style={{ maxWidth: 500 }} placeholder="申报单位" />
                </Form.Item>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>起始时间</h5>
                <Form.Item name={[name, '起始时间']} {...config}>
                  <DatePicker />
                </Form.Item>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>预计完成时间</h5>
                <Form.Item name={[name, '预计完成时间']} {...config}>
                  <DatePicker />
                </Form.Item>

                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>主测人</h5>
                <Form.Item
                  {...restField}
                  name={[name, '主测人']}
                  rules={[{ required: true, message: '请填写主测人' }]}
                >
                  <Input style={{ maxWidth: 150 }} placeholder="主测人" />
                </Form.Item>
                <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>实际完成时间</h5>
                <Form.Item name={[name, '实际完成时间']} {...config}>
                  <DatePicker />
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
                
                <Form.Item name={[name, '时间']} label="DatePicker" {...config}>
                  <DatePicker />
                </Form.Item>
              </Fragment>
            ))}
            
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
export default TestCheckList;


