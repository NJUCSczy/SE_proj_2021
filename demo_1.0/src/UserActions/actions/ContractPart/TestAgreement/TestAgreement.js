import isMobile from 'is-mobile';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message, Typography, DatePicker, Form, InputNumber, Button, Input } from 'antd';
import './TestAgreement.css'
import { useState, useEffect } from 'react';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions';

const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');
var mobile = require('is-mobile');

/**
 * 
 * 市场部填写合同前半部分，并提出履行期限的界面
 * 
 */
function TestAgreement(props) {
  const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
  const userState = props._state
  const [formData, setFormData] = useState({})
  const [entrustData, setEntrustData] = useState({ '用户申请表': null, '报价单': null, 'formData': null })
  const { TextArea } = Input;

  const [trusteename, setTN] = useState("\__________");
  var ref = /^\s/;
  const handleChange = (value) => {
    if (ref.test(value) || value == "") setTN("\__________");
    else setTN(value);
  }


  const updateInfo = () => {
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
            setEntrustData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
              newData["用户申请表"] = data['用户申请表']
              newData["报价单"] = data['报价单']
              return newData
            })
          }
          console.log('update info', data)
        })
    }
    else {
      fetch(REMOTE_SERVER + "/delegation/" + _state['PageInfo']['id'], {
        method: "GET",
        mode: 'cors',
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
            setEntrustData(prev => {
              const newData = _.cloneDeep(prev)
              newData["用户申请表"] = data['applicationTable']
              newData['报价单'] = data['offerTableUnion']
              return newData
            })
          }
        })
    }
  };

  const SubmitForm = (_form) => {
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
      fetch(REMOTE_SERVER + "/contract/performanceTerm/partyB", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'][0],
          'Authorization': _state['accessToken'],
          'delegationId': _state['PageInfo']['id']
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
  }
  const onFinishForm = (values) => {
    console.log(entrustData)
    if (USE_JSON_SERVER) {
      var form = entrustData['formData']
      if (form === null)
        return
      form['测试合同'] = {}
      form['测试合同']['市场部部分'] = values
      form['测试合同']['履行期限接受情况'] = null
      SubmitForm(form)
    }
    else {
      SubmitForm(values)
    }
  }

  useEffect(() => {
    if (focusedData === undefined)
      updateInfo();
    else {
      setEntrustData(prev => {
        const newData = _.cloneDeep(prev)
        newData["用户申请表"] = focusedData["用户申请表"]
        newData["报价单"] = focusedData["报价单"]
        return newData
      })
    }
  }, []
  )
  // console.log(entrustData)
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('请正确填写！')
  };
  return (
    entrustData['用户申请表'] === null ? 'null' :
      (<Form
        style={{ padding: "10px 10px 10px 10px" }}
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinishForm}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ fontWeight: 'bolder', marginTop: 30, textAlign: 'center' }}>软件委托测试合同</h2>

        <Form.Item label="项目名称" name="项目名称" initialValue={entrustData["用户申请表"]["软件名称"]} rules={[{ required: true, message: '请填写项目名称' }]}>
          {/* <Input placeholder="请输入项目名称" style={{maxWidth:300}}/> */}
          <Input style={{ maxWidth: 300 }} defaultValue={entrustData["用户申请表"]["软件名称"]} />
        </Form.Item>

        <Form.Item label="委托方(甲方)" name="委托方(甲方)" initialValue={entrustData["用户申请表"]["委托单位(中文)"]} rules={[{ required: true, message: '请填写委托方' }]}>
          {/* <Input placeholder="请输入委托方" style={{maxWidth:180}}/> */}
          <Input style={{ maxWidth: 180 }} defaultValue={entrustData["用户申请表"]["委托单位(中文)"]} />
        </Form.Item>

        <Form.Item label="受托方(乙方)" name="受托方(乙方)" rules={[{ required: true, message: '请填写受托方' }]}>
          <Input id='受托方(乙方)' placeholder="请输入受托方" style={{ maxWidth: 180 }} onChange={(e) => { handleChange(e.target.value) }} />
        </Form.Item>

        <Form.Item
          label="签订地点" name="签订地点"
          rules={[{ required: true, message: '请填写签订地点' }]}
        >
          <Input id='签订地点' placeholder="请输入签订地点" style={{ maxWidth: 150 }} />
        </Form.Item>

        <Form.Item
          label="签订日期" name='签订日期'
          rules={[{ required: true, message: '请填写签订日期' }]}
        >
          <DatePicker id='签订日期' />
        </Form.Item>

        <Paragraph>
          &emsp;本合同由作为委托方的<strong>{entrustData["用户申请表"]["委托单位(中文)"]}(以下简称"甲方")</strong>与
          作为受托方的
          <strong>{trusteename}(以下简称"乙方")</strong>在平等自愿的基础上,依据《中华人民共和国合同法》有关规定就项目的执行,经友好协商后订立。
        </Paragraph>

        <h3>一.任务表述</h3>
        <Paragraph>
          &emsp;乙方按照国家软件质量测试标准和测试规范,完成甲方委托的软件<strong>{entrustData["用户申请表"]["软件名称"]}(下称受测软件)</strong>
          的质量特性<strong>{entrustData["用户申请表"]["需要测试的技术指标"]}</strong>进行测试,并出具相应的测试报告。
        </Paragraph>
        <h3>二.双方的主要义务</h3>
        <Paragraph> &emsp;1. 甲方的主要义务：</Paragraph>
        <Paragraph>&emsp;&emsp;(1)按照合同约定支付所有费用。</Paragraph>
        <Paragraph>&emsp;&emsp;(2)按照乙方要求以书面形式出具测试需求，包括测试子特性、测试软硬件环境等。</Paragraph>
        <Paragraph>&emsp;&emsp;(3)提供符合交付要求的受测软件产品及相关文档，包括软件功能列表、需求分析、设计文档、用户文档至乙方。</Paragraph>
        <Paragraph>&emsp;&emsp;(4)指派专人配合乙方测试工作，并提供必要的技术培训和技术协助。</Paragraph>

        <Paragraph>&emsp; 2. 乙方的主要义务：</Paragraph>
        <Paragraph>&emsp;&emsp;(1)设计测试用例，制定和实施产品测试方案。</Paragraph>
        <Paragraph>&emsp;&emsp;(2)在测试过程中，定期知会甲方受测软件在测试过程中出现的问题。</Paragraph>
        <Paragraph>&emsp;&emsp;(3)按期完成甲方委托的软件测试工作。</Paragraph>
        <Paragraph>&emsp;&emsp;(4)出具正式的测试报告。</Paragraph>

        <h3>三.履约地点</h3>
        <Paragraph>
          &emsp;由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因,需要在甲方所在地进行测试时,甲方应负担乙方现场测试人员的差旅和食宿费用。
        </Paragraph>

        <h3>四.合同价款</h3>
        <Form.Item label="本合同软件测试费用为人民币" labelCol={{ span: 6 }}>
          <Input style={{ maxWidth: 100 }} defaultValue={entrustData["报价单"]["基本信息"]['总计']} disabled={true} addonAfter="元" />
        </Form.Item>

        <h3>五.测试费用支付方式</h3>
        <Paragraph>&emsp;本合同签定后，十个工作日内甲方合同价款至乙方帐户。</Paragraph>

        <h3>六.履行的期限</h3>
        1.本次测试的履行期限为合同生效之日起&emsp;
        <Form.Item
          name="合同履行期限" noStyle
          rules={[{ required: true, message: '请填写合同履行期限' }]}
        >
          <Input id='履行期限'/*Number min={1} max={10000000}*/ style={{ width: 100 }} />
        </Form.Item>
        &emsp;个自然日内完成
        <Paragraph>&emsp;2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。</Paragraph>
        <Paragraph>&emsp;3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度,则乙方暂停测试并以书面形式通知甲方进行整改。在整个测试过程中,</Paragraph>
        <Form.Item
          label="整改次数限于" labelCol={{ span: 6 }} name="整改限制次数"
          rules={[{ required: true, message: '请填写整改限制次数' }]}>
          <Input id='整改次数上限' style={{ width: 100 }} addonAfter="次" />
        </Form.Item>
        <Form.Item label="每次不超过" labelCol={{ span: 6 }} name="一次整改限制的天数"
          rules={[{ required: true, message: '请填写整改限制的天数' }]}>
          <Input id='整改时间上限' style={{ width: 100 }} addonAfter="天" />
        </Form.Item>
        <Paragraph>&emsp;4.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任。</Paragraph>
        <Paragraph>&emsp;5.	如因乙方原因,导致测试进度延迟,则甲方可酌情提出赔偿要求,赔偿金额不超过甲方已付金额的50%。双方经协商一致后另行签订书面协议，作为本合同的补充。</Paragraph>

        <h3>七.资料的保密</h3>
        <Paragraph>&emsp;对于一方向另一方提供使用的秘密信息,另一方负有保密的责任,不得向任何第三方透露。为明确双方的保密义务,双方应签署《软件项目委托测试保密协议》,并保证切实遵守其中条款。</Paragraph>

        <h3>八.风险责任的承担</h3>
        <Paragraph>&emsp;乙方人员在本协议有效期间(包括可能的到甲方出差)发生人身意外或罹患疾病时由乙方负责处理。甲方人员在本协议有效期间(包括可能的到乙方出差)发生人身意外或罹患疾病时由甲方负责处理。</Paragraph>

        <h3>九.验收方法</h3>
        <Paragraph>&emsp;由乙方向甲方提交软件产品鉴定测试报告正本一份,甲方签收鉴定测试报告后,完成验收。</Paragraph>

        <h3>十.争议解决</h3>
        <Paragraph>&emsp;双方因履行本合同所发生的一切争议,应通过友好协商解决;如协商解决不成,就提交市级仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。</Paragraph>

        <h3>十一.其他</h3>
        <Paragraph>&emsp;本合同自双方授权代表签字盖章之日起生效,自受托方的主要义务履行完毕之日起终止。</Paragraph>
        <Paragraph>&emsp;本合同未尽事宜由双方协商解决。</Paragraph>
        <Paragraph>&emsp;本合同的正本一式肆份,双方各执两份,具有同等法律效力。</Paragraph>



        <Form.Item style={{ textAlign: 'center' }}>
          <Button id='提交' htmlType="submit">
            提交合同
          </Button>
        </Form.Item>
      </Form>)
  );

}

export default TestAgreement

TestAgreement.propTypes = {
  /** 用户状态 */
  _state: PropTypes.object,
  /** 更新用户状态方法 */
  UpdateUserInfo: PropTypes.func,
  /** 切换界面方法 */
  GotoPage: PropTypes.func,
  /** 报价单和用户申请表的数据，正常情况下为空。若为空则从后端读取；不为空的情况仅用于测试 */
  focusedData: PropTypes.object,
}