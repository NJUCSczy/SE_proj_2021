import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestReport.css'
import { useEffect,useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import moment from 'moment';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

const { Title, Paragraph, Text, Link } = Typography;
const { RangePicker } = DatePicker;

var _ = require('lodash');
var mobile = require('is-mobile');

function TestReport(props){
    const { UpdateUserInfo, GotoPage, _state,focusedData } = props;
    const [formData, setFormData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件测试报告': null })
    const { Option } = Select;
    const { TextArea } = Input;


    const updateInfo = () => {
      if (!USE_JSON_SERVER) {
        fetch(REMOTE_SERVER + "/test/"+_state['PageInfo']['id']+"/test-doc/test-report", {
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
              if (res.status != 200) {
                  alert('查询软件测试报告失败！')
                  return null
              }
              return res.json()
          })
          .then(data => {
              console.log('hh')
              console.log(data)
              if (data != null) {
                setEntrustData(prev => {
                      const newData = _.cloneDeep(prev)
                      newData['软件测试报告'] = data
                      return newData
                  })
              }
          })
      }
  }

  useEffect(() => {
    console.log('hhhh')
    updateInfo();
  }, []
  )


    const onFinishForm = (values) => {
      console.log('Success:', values);
      if(!USE_JSON_SERVER){
        fetch(REMOTE_SERVER + "/test/projects/" + _state['PageInfo']['id'], {
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
                  if (data['state'] === 'TEST_DOC_TEST_REPORT') {
                    SubmitForm(values, true);
                  }
                  else if (data['state'] === 'TEST_REPORT_DENIED' || data['state'] === 'TEST_DOC_WORK_DENIED') {
                    ApplyForm(values);
                    //SubmitForm(values, false);
                  }
                  else {
                    alert('状态有误！')
                  }
                }
            })
      }
      else{
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
              form['软件测试报告']=values
              SubmitForm(form)
            }
            console.log(data)
          })
      }
     
    };

    const ApplyForm = (_form) =>{
      fetch(REMOTE_SERVER+"/test/"+_state['PageInfo']['id']+"/apply-report-evaluation", {
        method: "PUT",
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
          console.log("apply")
          console.log(res)
          if (res.status === 200) {
            message.success({content:"申请重新审核成功！",key:"upload"})
            GotoPage("ViewProject",_state)
          }
          else{
            message.error({content:"申请重新审核失败！",key:"upload"})
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
    }

    const SubmitForm = (_form, firstTime = false) => {
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
            GotoPage("ViewProject",_state)
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
        fetch(REMOTE_SERVER+"/test/"+_state['PageInfo']['id']+"/test-doc/test-report", {
          method:  "POST",
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
            console.log("post")
            console.log(res)
            if (res.status === 200) {
              message.success({content:"提交成功！",key:"upload"})
              GotoPage("ViewProject",_state)
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
        entrustData['软件测试报告'] != null || USE_JSON_SERVER  ?(
          <Form
          style={{padding:"10px 10px 10px 10px"}}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          initialValues={USE_JSON_SERVER?{ remember: true }:{
           remember: true ,
          "硬件环境":entrustData['软件测试报告']['硬件环境'],
          "软件环境":entrustData['软件测试报告']['软件环境'],
          "测试依据":entrustData['软件测试报告']['测试依据'],
          "参考资料":entrustData['软件测试报告']['参考资料'],
          "功能性测试":entrustData['软件测试报告']['功能性测试'],
          "效率测试":entrustData['软件测试报告']['效率测试'],
          "可移植性测试":entrustData['软件测试报告']['可移植性测试'],
          "易用性测试":entrustData['软件测试报告']['易用性测试'],
          "可靠性测试":entrustData['软件测试报告']['可靠性测试'],
          "可维护性测试":entrustData['软件测试报告']['可维护性测试']}}
          autoComplete="off"
          onFinish={onFinishForm}
        >

          <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试报告</h1>

          <Form.Item
            label="报告编号"
            name="报告编号"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入报告编号' }]:
            entrustData['软件测试报告']['报告编号']===null?  
            [{ required: true, message: '请输入报告编号' }] : [{required:false}]}
            // initialValues={{'no':USE_JSON_SERVER?null:entrustData['软件测试报告']['报告编号']}}
          >
            <Input name='no' defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['报告编号']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="软件名称"
            name="软件名称"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['软件名称']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="版本号"
            name="版本号"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['版本号']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="总委托单位"
            name="总委托单位"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['总委托单位']} style={{maxWidth:200}}/>
          </Form.Item>


          <Form.Item
            label="测试类别"
            name="测试类别"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试类别' }]:
            entrustData['软件测试报告']['测试类别']===null?  [{ required: true, message: '请输入测试类别' }]: null}
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试类别']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="报告日期"
            name="报告日期"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入报告日期' }]:
            entrustData['软件测试报告']['报告日期']===null?  [{ required: true, message: '请输入报告日期' }]: null}
          >
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['报告日期']===null? null: moment((entrustData['软件测试报告']['报告日期']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Title level={4}>声明</Title>

          <Paragraph>
          1、本测试报告仅适用于本报告明确指出的委托单位的被测样品及版本。
          </Paragraph>

          <Paragraph>
          2、本测试报告是本实验室对所测样品进行科学、客观测试的结果，为被测样品提供第三方独立、客观、公正的重要判定依据，也为最终用户选择产品提供参考和帮助。
          </Paragraph>

          <Paragraph>
          3、未经本实验室书面批准，不得复制本报告中的内容（全文复制除外），以免误导他人（尤其是用户）对被测样品做出不准确的评价。
          </Paragraph>

          <Paragraph>
          4、在任何情况下，若需引用本测试报告中的结果或数据都应保持其本来的意义，在使用时务必要保持其完整，不得擅自进行增加、修改、伪造，并应征得本实验室同意。
          </Paragraph>

          <Paragraph>
          5、本测试报告不得拷贝或复制作为广告材料使用。
          </Paragraph>

          <Paragraph>
          6、当被测样品出现版本更新或其它任何改变时，本测试结果不再适用，涉及到的任何技术、模块（或子系统）甚至整个软件都必须按要求进行必要的备案或重新测试，更不能出现将本测试结果应用于低于被测样品版本的情况。
          </Paragraph>

          <Paragraph>
          7、本报告无主测人员、审核人员、批准人员（授权签字人）签字无效。
          </Paragraph>

          <Paragraph>
          8、本报告无本实验室章、涂改均无效。 
          </Paragraph>

          <Title level={3}>测试报告正文</Title>

          <Form.Item
            label="委托单位"
            name="委托单位"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['委托单位']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="样品名称"
            name="样品名称"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['样品名称']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="版本/型号"
            name="版本/型号"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入版本/型号' }]:
            entrustData['软件测试报告']['版本/型号']===null? [{ required: true, message: '请输入版本/型号' }]: null}
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['版本/型号']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="来样日期"
            name="来样日期"
          >
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['来样日期']===null? null: moment((entrustData['软件测试报告']['来样日期']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Form.Item
            label="测试类型"
            name="测试类型"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试类型']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item 
            name="测试开始时间" 
            label="测试开始时间" 
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试开始时间' }]:
            entrustData['软件测试报告']['测试开始时间']===null? [{ required: true, message: '请输入测试开始时间' }]: null}
          >  
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['测试开始时间']===null? null: moment((entrustData['软件测试报告']['测试开始时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Form.Item 
            name="测试结束时间" 
            label="测试结束时间"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试结束时间' }]:
            entrustData['软件测试报告']['测试结束时间']===null? [{ required: true, message: '请输入测试结束时间' }]: null} 
          >  
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['测试结束时间']===null? null: moment((entrustData['软件测试报告']['测试结束时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Form.Item
            label="样品状态"
            name="样品状态"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['样品状态']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="总测试依据"
            name="总测试依据"
          >
            <Input.TextArea defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['总测试依据']}/>
          </Form.Item>

          <Form.Item
            label="样品清单"
            name="样品清单"
          >
            <Input.TextArea defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['样品清单']}/>
          </Form.Item>

          <Form.Item
            label="测试结论"
            name="测试结论"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试结论' }]:
            entrustData['软件测试报告']['测试结论']===null?  [{ required: true, message: '请输入测试结论' }]: null} 
          >
            <Input.TextArea defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试结论']}/>
          </Form.Item>

          <Form.Item
            label="主测人"
            name="主测人"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入主测人' }]:
            entrustData['软件测试报告']['主测人']===null? [{ required: true, message: '请输入主测人' }] : null} 
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['主测人']} style={{maxWidth:200}}/>      
          </Form.Item>

          <Form.Item
            label="主测人日期"
            name="主测人日期"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入主测人日期' }]:
            entrustData['软件测试报告']['主测人日期']===null? [{ required: true, message: '请输入主测人日期' }] : null} 
          >
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['主测人日期']===null? null: moment((entrustData['软件测试报告']['主测人日期']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Form.Item
            label="审核人"
            name="审核人"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入审核人' }]:
            entrustData['软件测试报告']['审核人']===null? [{ required: true, message: '请输入审核人' }] : null} 
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['审核人']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="审核人日期"
            name="审核人日期"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入审核人日期' }]:
            entrustData['软件测试报告']['审核人日期']===null? [{ required: true, message: '请输入审核人日期' }] : null} 
          >
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['审核人日期']===null? null: moment((entrustData['软件测试报告']['审核人日期']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Form.Item
            label="批准人"
            name="批准人"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入批准人' }]:
            entrustData['软件测试报告']['批准人']===null? [{ required: true, message: '请输入批准人' }] : null} 
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['批准人']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="批准人日期"
            name="批准人日期"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入批准人日期' }]:
            entrustData['软件测试报告']['批准人日期']===null? [{ required: true, message: '请输入批准人日期' }] : null} 
          >
            <DatePicker defaultValue={USE_JSON_SERVER? null: entrustData['软件测试报告']['批准人日期']===null? null: moment((entrustData['软件测试报告']['批准人日期']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Form.Item>

          <Title level={4}>委托单位联系方式</Title>

          <Form.Item
            label="电话"
            name="电话"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['电话']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="传真"
            name="传真"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['传真']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="地址"
            name="地址"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['地址']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="邮编"
            name="邮编"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['邮编']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="联系人"
            name="联系人"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['联系人']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="Email"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['Email']} style={{maxWidth:200}}/>
          </Form.Item>

          <Title level={4}>测试单位联系方式</Title>

          <Form.Item
            label="单位地址"
            name="测试单位单位地址"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位单位地址']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="单位邮政编码"
            name="测试单位邮政编码"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位邮政编码']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="测试单位电话"
            name="测试单位电话"
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位电话']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="测试单位传真"
            name="测试单位传真"
            
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位传真']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="测试单位网址"
            name="测试单位网址"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试单位网址' }]:
            entrustData['软件测试报告']['测试单位网址']===null? [{ required: true, message: '请输入测试单位网址' }] : null} 
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位网址']} style={{maxWidth:200}}/>
          </Form.Item>

          <Form.Item
            label="测试单位E-mail"
            name="测试单位Email"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试单位E-mail' }]:
            entrustData['软件测试报告']['测试单位Email']===null? [{ required: true, message: '请输入测试单位E-mail' }] : null} 
          >
            <Input defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试单位Email']} style={{maxWidth:200}}/>
          </Form.Item>


          <Title level={4}>一、测试环境</Title>
          <Title level={5}>硬件环境</Title>
          <Paragraph>
          本次测试中使用到的硬件环境如下：
          </Paragraph>

          <Form.List name="硬件环境" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>硬件类别</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '硬件类别']}
                      rules={[{ required: true, message: '请填写硬件类别' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="硬件类别" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>分项</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '硬件名称']}
                      rules={[{ required: true, message: '请填写硬件名称' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="硬件名称" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>配置</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '配置']}
                      rules={[{ required: true, message: '请填写配置' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="配置" />
                    </Form.Item>                

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>数量</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '数量']}
                      rules={[{ required: true, message: '请填写数量' },
                      { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入整数' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="数量" />
                    </Form.Item>
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该硬件环境
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新硬件环境"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新硬件环境
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>软件环境</Title>
          <Paragraph>
          本次测试中使用到的软件环境如下：
          </Paragraph>

          <Form.List name="软件环境" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件类别</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '软件类别']}
                      rules={[{ required: true, message: '请选择软件类别' }]}
                    >
                      <Radio.Group >
                        <Col span={30} >
                          <Radio id="软件环境_软件类别_操作系统" value="操作系统" style={{ lineHeight: '32px' }} >操作系统</Radio>
                        </Col>
                        <Col span={30}>
                          <Radio id="软件环境_软件类别_软件"  value="软件" style={{ lineHeight: '32px' }}>软件</Radio>
                        </Col>
                        <Col span={30}>
                          <Radio id="软件环境_软件类别_辅助工具"  value="辅助工具" style={{ lineHeight: '32px' }}>辅助工具</Radio>
                        </Col>
                        <Col span={30}>
                          <Radio id="软件环境_软件类别_开发工具"  value="开发工具" style={{ lineHeight: '32px' }}>开发工具</Radio>
                        </Col>
                        <Col span={30}>
                          <Radio id="软件环境_软件类别_被测试样品"  value="被测试样品" style={{ lineHeight: '32px' }}>被测试样品</Radio>
                        </Col>
                        <Col span={30}>
                          <Radio id="软件环境_软件类别_其他"  value="其他" style={{ lineHeight: '32px' }}>其他</Radio>
                        </Col>
                      </Radio.Group>
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '软件名称']}
                      rules={[{ required: true, message: '请填写软件名称' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="软件名称" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '版本']}
                      rules={[{ required: true, message: '请填写版本' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="版本" />
                    </Form.Item>                
                  
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该软件环境
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新软件环境"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新软件环境
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>网络环境</Title>
          <Form.Item
            label="网络环境"
            name="网络环境"
          >
            <Input.TextArea defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['网络环境']}/>
          </Form.Item>

          <Title level={4}>二、测试依据和参考资料</Title>
          <Title level={5}>测试依据</Title>

          <Form.List name="测试依据" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试依据</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试依据分项']}
                      rules={[{ required: true, message: '请填写测试依据分项' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试依据分项" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该测试依据分项
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新测试依据分项"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新测试依据分项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>参考资料</Title>

          <Form.List name="参考资料" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>参考资料</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '参考资料分项']}
                      rules={[{ required: true, message: '请填写参考资料分项' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="参考资料分项" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该参考资料分项
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id = "添加新参考资料分项"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新参考资料分项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={4}>三、测试内容</Title>
          <Title level={5}>功能性测试</Title>

          <Form.List name="功能性测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>功能模块</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '功能模块']}
                      rules={[{ required: true, message: '请填写功能模块' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="功能模块" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>功能要求</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '功能要求']}
                      rules={[{ required: true, message: '请填写功能要求' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="功能要求" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该功能性测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新功能性测试"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新功能性测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>效率测试</Title>

          <Form.List name="效率测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试特性</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试特性']}
                      rules={[{ required: true, message: '请填写测试特性' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试特性" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试说明']}
                      rules={[{ required: true, message: '请填写测试说明' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该效率测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新效率测试"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新效率测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>可移植性测试</Title>

          <Form.List name="可移植性测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试特性</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试特性']}
                      rules={[{ required: true, message: '请填写测试特性' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试特性" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试说明']}
                      rules={[{ required: true, message: '请填写测试说明' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该可移植性测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed" id="添加新可移植性测试"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新可移植性测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>易用性测试</Title>

          <Form.List name="易用性测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试特性</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试特性']}
                      rules={[{ required: true, message: '请填写测试特性' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试特性" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试说明']}
                      rules={[{ required: true, message: '请填写测试说明' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该易用性测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新易用性测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>可靠性测试</Title>

          <Form.List name="可靠性测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试特性</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试特性']}
                      rules={[{ required: true, message: '请填写测试特性' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试特性" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试说明']}
                      rules={[{ required: true, message: '请填写测试说明' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该可靠性测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新可靠性测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={5}>可维护性测试</Title>

          <Form.List name="可维护性测试" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试特性</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试特性']}
                      rules={[{ required: true, message: '请填写测试特性' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试特性" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试说明</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试说明']}
                      rules={[{ required: true, message: '请填写测试说明' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试说明" />
                    </Form.Item>

                    <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试结果</h5>
                    <Form.Item
                      {...restField}
                      name={[name, '测试结果']}
                      rules={[{ required: true, message: '请填写测试结果' }]}
                    >
                      <Input style={{ maxWidth: 500 }} placeholder="测试结果" />
                    </Form.Item>
                                          
                    <Button onClick={() => remove(name)} type='danger'>
                      删除该可维护性测试
                    </Button>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button type="dashed"
                    style={{ width: 500, marginTop: 30 }}
                    onClick={() => add()} icon={<PlusOutlined />}  >
                    添加新可维护性测试
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Title level={4}>四、测试执行记录</Title>

          <Form.Item
            label="测试执行记录"
            name="测试执行记录"
            rules={USE_JSON_SERVER? [{ required: true, message: '请输入测试执行记录' }]:
            entrustData['软件测试报告']['测试执行记录']===null? [{ required: true, message: '请输入测试执行记录' }] : null} 
          >
            <Input.TextArea defaultValue={USE_JSON_SERVER?null:entrustData['软件测试报告']['测试执行记录']}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button id="提交" type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>


        </Form>
        ):null
        
      );
}

export default TestReport