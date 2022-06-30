import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message,DatePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ConfidentialAgreementPartyA.css'
import { useState,useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');
var mobile = require('is-mobile');

function ConfidentialAgreementPartyA(props){
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })

  const updateInfo = (values) => {
    console.log('Success:', values);
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
          setEntrustData(prev => {
            const newData = _.cloneDeep(prev)
            newData["formData"] = data
            return newData
        })
        }
        console.log('update info',data)
      })
  };

  const SubmitForm = (_form) => {
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
  const onFinishForm=(values)=>{
    var form=entrustData['formData']
    if(form===null)
      return
    form['保密协议']['用户部分']=values
    SubmitForm(form)
  }

  useEffect(() => {
    updateInfo();
}, []
)
// console.log(entrustData)
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('请正确填写！')
  };
      
        return (
          entrustData['formData'] === null ? null :(
            <Form
              style={{padding:"10px 10px 10px 10px"}}
              name="basic"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishForm}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件项目委托测试保密协议</h2>
              
              <Paragraph>
              委托方
              </Paragraph>

              <Form.Item
                //name="username"
                rules={[{ required: true, message: '请输入委托方' }]}
              >
              <Input style={{maxWidth:300}} disabled={true} defaultValue={(entrustData['formData'] === null ? 'null' : entrustData['formData']['保密协议']['市场部部分']['委托方'])}/>

              </Form.Item>

              <Paragraph>
              （以下简称“甲方”）与南京大学计算机软件新技术国家重点实验室（简称“乙方”）在签订《
              </Paragraph>

              <Form.Item
                //name="project"
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input style={{maxWidth:300}} disabled={true} defaultValue={(entrustData['formData'] === null ? 'null' : entrustData['formData']['保密协议']['市场部部分']['项目名'])}/>
              </Form.Item>

              <Paragraph>
              软件项目委托测试》委托合同的前提下，为保证双方的合法权利，经协双方达成如下保密协议：
              </Paragraph>

              <Paragraph>
              1、甲方 不得向第三方透露在合作期间获得和知晓的乙方（包括其分支机构）的商业秘密和其他有关的保密信息。商业秘密包括技术秘密和经营秘密，其中技术秘密包括计算机软件、数据库、技术报告、测试报告、检测报告、实验数据、测试结果、操作手册、技术文档、相关的函电等。经营秘密包括但不限于双方洽谈的情况、签署的任何文件，包括合同、协议、备忘录等文件中所包含的一切信息、定价政策、设备资源、人力资源信息等。
              </Paragraph>

              <Paragraph>
              2、乙方负有对甲方委托测试的软件保密的责任，保密内容包括：软件产品代码、软件可执行程序、测试报告、测试结果、操作手册、技术文档、用户手册等。
              </Paragraph>

              <Paragraph>
              3、未经对方书面同意，任何一方不得在双方合作目的之外使用或向第三方透露对方的任何商业秘密，不管这些商业秘密是口头的或是书面的，还是以磁盘、胶片或电子邮件等形式存在的。
              </Paragraph>

              <Paragraph>
              4、在对方公司内活动时，应尊重对方有关保密的管理规定，听从接待人员的安排和引导。未经允许不得进入对方实验室、办公室内受控的工作环境，与对方技术人员进行的交流，仅限于合作项目有关的内容。
              </Paragraph>

              <Paragraph>
              5、如果一方违反上述条款，另一方有权根据违反的程度以及造成的损害采取以下措施：
                （1）终止双方的合作；
                （2）要求赔偿因失密造成的损失。
                在采取上述措施之前，一方将给予违约的另一方合理的在先通知。 
              </Paragraph>

              <Paragraph>
              6、负有保密义务的双方，如果涉密人因本方无法控制的原因(如擅自离职)造成由涉密人有意泄密，其相应的民事和法律责任由当事人承担。
              </Paragraph>

              <Paragraph>
              7、与本协议有关的任何争议，双方应通过友好协商解决。如协商不成，任何一方可将此争议提交南京市仲裁委员会进行仲裁。仲裁裁决是终局的，对双方均有约束力。
              </Paragraph>

              <Paragraph>
              8、本协议作为委托测试合同的附件，一式两份，双方各执一份，与合同具有同等法律效力。
              </Paragraph>

              <Paragraph>
              本协议自双方授权代表签字盖章之日起生效，但有效期不限于合同有效期。
              </Paragraph>

              <Form.Item
                label="甲方"
                name="甲方"
                rules={[{ required: true, message: '请输入甲方' }]}
              >
                <Input style={{maxWidth:300}}/>
              </Form.Item>

              <Form.Item
                label="法人代表"
                name="法人代表"
                rules={[{ required: true, message: '请输入法人代表' }]}
              >
                <Input style={{maxWidth:300}}/>
              </Form.Item>

            
             <Form.Item
                label="日期"
                name='日期'
                rules={[{ required: true, message: '请填写日期' }]}
              >
                <DatePicker />
             </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button id='提交' type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>)
          );

      
      
}

export default ConfidentialAgreementPartyA