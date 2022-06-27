import './ViewEntrust.css'
import React from 'react';
import { Descriptions, Select, Button, Dropdown, Steps, Space, Collapse, Row, Col, } from 'antd';

import { DownOutlined, SmileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { USE_JSON_SERVER, REMOTE_SERVER, getStageByInfo, getStatusInfo, getStageByDelegationState, getStatusByDelegationState } from '../../../functions/functions';
var _ = require('lodash');

const { Panel } = Collapse;
const { Step } = Steps;


function ViewEntrust(props) {
    const { Option } = Select;
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [fileData, setfileData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, 'stage': -1 })

    const filelist =(values)=>{
        setfileData(prev => {
          const newfileData = _.cloneDeep(prev)
          const filename=['软件项目委托测试申请书','委托测试软件功能列表','文档资料','报价单','软件测试委托合同签章','保密协议']
          filename.map(item =>(newfileData[item] = false))
          values.map(item => (newfileData[item] = true))
          console.log(newfileData)
          return newfileData;
        })
        
        console.log(`selected ${values}`);
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
                            newData['stage'] = getStageByInfo(data);
                            return newData
                        })
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
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData["formData"] = data
                            newData['stage'] = getStageByDelegationState(data['state']);
                            return newData
                        })
                    }
                })
        }
    }
    useEffect(() => {
        updateInfo();
    }, []
    )

    const ChangePage = (pageName) => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage(pageName, _state))
    }

    return (
        (entrustData['formData'] === null) ? null :
            (<div style={{ padding: 30 }}>
                <Descriptions bordered title="委托基本信息" layout="vertical" style={{ marginLeft: 20 , marginRight: 20}}>
                    <Descriptions.Item label="委托编号">{(entrustData['formData'] === null) ? null : USE_JSON_SERVER ? entrustData['formData']['id'] : entrustData['formData']['delegationId']}</Descriptions.Item>
                    <Descriptions.Item label="用户">{(entrustData['formData'] === null) ? null : USE_JSON_SERVER ? entrustData['formData']['userName'] : entrustData['formData']['usrBelonged']}</Descriptions.Item>
                    <Descriptions.Item label="当前状态">{USE_JSON_SERVER ? getStatusInfo(entrustData['formData']) : getStatusByDelegationState(entrustData['formData']['state'])}</Descriptions.Item>
                </Descriptions>
                <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                    <Panel header={<h3>详细信息</h3>} key="1">
                        <p>
                            <Steps direction="vertical">
                                <Step title='用户提交申请表'
                                    description={entrustData['stage'] < 0 ? '状态有误' : '已完成'}
                                    status={entrustData['stage'] < 0 ? 'error' : 'finish'} />
                                <Step title='用户提交软件功能列表'
                                    description={entrustData['stage'] < 1 ? '等待用户提交' : '已完成'}
                                    status={entrustData['stage'] < 1 ? 'wait' : 'finish'} />
                                <Step title='用户提交软件文档'
                                    description={entrustData['stage'] < 1 ? null :
                                        entrustData['stage'] < 2 ? '等待用户提交' : '已完成'}
                                    status={entrustData['stage'] < 1 ? 'wait' :
                                        entrustData['stage'] < 2 ? 'process' : 'finish'} />
                                <Step title='用户提交样品'
                                    description={entrustData['stage'] < 2 ? null :
                                        entrustData['stage'] < 3 ? '等待用户提交' : '已完成'}
                                    status={entrustData['stage'] < 2 ? 'wait' :
                                        entrustData['stage'] < 3 ? 'process' : 'finish'} />
                                <Step title='测试部审核'
                                    description={entrustData['stage'] < 3 ? null :
                                        entrustData['stage'] === 3 ? '审核中' :
                                            entrustData['stage'] === 4 ? '驳回' : '通过'}
                                    status={entrustData['stage'] < 3 ? 'wait' :
                                        entrustData['stage'] === 3 ? 'process' :
                                            entrustData['stage'] === 4 ? 'error' : 'finish'} />
                                <Step title='市场部审核'
                                    description={entrustData['stage'] < 5 ? null :
                                        entrustData['stage'] === 5 ? '审核中' :
                                            entrustData['stage'] === 6 ? '不受理' :
                                                entrustData['stage'] === 7 ? '需进一步审理' : '通过'}
                                    status={entrustData['stage'] < 5 ? 'wait' :
                                        entrustData['stage'] === 5 ? 'process' :
                                            entrustData['stage'] === 6 ? 'error' :
                                                entrustData['stage'] === 7 ? 'process' : 'finish'} />
                                <Step title='议价'
                                    description={entrustData['stage'] < 8 ? null :
                                        entrustData['stage'] === 8 ? '等待市场部发起议价' :
                                            entrustData['stage'] === 9 ? '市场部已发起议价，等待用户回复' :
                                                entrustData['stage'] === 10 ? '用户不接受议价，委托结束' :
                                                    entrustData['stage'] === 11 ? '用户申请再议价' : '用户已接受议价'}
                                    status={entrustData['stage'] < 8 ? 'wait' :
                                        entrustData['stage'] === 10 ? 'error' :
                                            entrustData['stage'] >= 12 ? 'finish' : 'process'} />
                                <Step title='完成测试申请书'
                                    description={entrustData['stage'] < 12 ? null :
                                        entrustData['stage'] === 12 ? '等待市场部完成测试申请书' : '已完成'}
                                    status={entrustData['stage'] < 12 ? 'wait' :
                                        entrustData['stage'] === 12 ? 'process' : 'finish'} />
                                <Step title='确定履行期限'
                                    description={entrustData['stage'] < 13 ? null :
                                        entrustData['stage'] === 13 ? '等待市场部拟写测试合同，并提出履行期限' :
                                            entrustData['stage'] === 14 ? '市场部已提出履行期限，等待客户回复' :
                                                entrustData['stage'] === 15 ? '客户不接受履行期限，委托中止' :
                                                    entrustData['stage'] === 16 ? '客户针对履行期限申请再议' : '客户已接受'}
                                    status={entrustData['stage'] < 13 ? 'wait' :
                                        entrustData['stage'] === 15 ? 'error' :
                                            entrustData['stage'] >= 17 ? 'finish' : 'process'} />
                                <Step title='完成测试合同'
                                    description={entrustData['stage'] < 17 ? null :
                                        entrustData['stage'] === 17 ? '等待市场部填写测试合同受托人签章' :
                                            entrustData['stage'] === 18 ? '等待客户填写测试合同委托人签章' : '已完成'}
                                    status={entrustData['stage'] < 17 ? 'wait' :
                                        entrustData['stage'] >= 19 ? 'finish' : 'process'} />
                                <Step title='签署保密协议'
                                    description={entrustData['stage'] < 19 ? null :
                                        entrustData['stage'] === 19 ? '等待市场部起草保密协议' :
                                            entrustData['stage'] === 20 ? '等待用户签署保密协议' : '已完成'}
                                    status={entrustData['stage'] < 19 ? 'wait' :
                                        entrustData['stage'] >= 21 ? 'finish' : 'process'} />
                                <Step title='委托完成'
                                    status={entrustData['stage'] >= 21 ? 'finish' : 'wait'} />
                            </Steps>
                        </p>
                    </Panel>
                </Collapse>
                {(() => {
                    switch (entrustData['stage']) {
                        case 0: return (<Button id='填写软件功能列表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('FunctionList')}>填写软件功能列表</Button>);
                        case 1: return (<Button id='上传软件文档' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('UserUploadFiles')}>上传软件文档</Button>);
                        case 2: return (<Button id='提交样品' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('UserUploadSample')}>提交样品</Button>);
                        case 3: return (<Button id='测试部审核' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TadultApplication')}>测试部审核</Button>);
                        case 4: case 6: case 10: case 15: return null;
                        case 5: case 7: return (<Button id='市场部审核' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('MktdptApplicationStep1')}>市场部审核</Button>);
                        case 8: case 11: return (<Button id='发起议价' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('Quotation')}>发起议价</Button>);
                        case 9: return (<Button id='查看议价' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('QuotationFeedback')}>查看议价</Button>);
                        case 12: return (<Button id='完成申请表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('MktdptApplicationStep2')}>完成申请表</Button>);
                        case 13: case 16: return (<Button id='起草测试合同，拟定履行期限' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestAgreement')}>起草测试合同，拟定履行期限</Button>);
                        case 14: return (<Button id='查看履行日期' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('CheckTA')}>查看履行日期</Button>);
                        case 17: return (<Button id='市场部填写签章' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TrusteeApplication')}>市场部填写签章</Button>);
                        case 18: return (<Button id='客户填写签章' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ClientApplication')}>客户填写签章</Button>);
                        case 19: return (<Button id='市场部填写保密协议' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ConfidentialAgreementPartyB')}>市场部填写保密协议</Button>);
                        case 20: return (<Button id='客户填写保密协议' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ConfidentialAgreementPartyA')}>客户填写保密协议</Button>);
                    }
                })()}
                <h1 style={{ marginTop: 60 }}>文件列表</h1>
                <Select id="文件列表" mode="multiple" allowClear style={{ width: 200 }} onChange={filelist}>
                <Option id="软件项目委托测试申请书" value="软件项目委托测试申请书" style={{ lineHeight: '32px' }} >软件项目委托测试申请书</Option>
                {(entrustData['stage'] >= 1)?
                    (<Option id="委托测试软件功能列表" value="委托测试软件功能列表" style={{ lineHeight: '32px' }}>委托测试软件功能列表</Option>):null
                }
                {(entrustData['stage'] >= 2 && !USE_JSON_SERVER) ?
                    (<Option id="文档资料" value="文档资料" style={{ lineHeight: '32px' }} >文档资料</Option>) : null
                }
                {(entrustData['stage'] >= 9) ?
                    (<Option id="报价单" value="报价单" style={{ lineHeight: '32px' }} >报价单</Option>) : null
                }
                {(entrustData['stage'] >= 14) ?
                    (<Option id="软件测试委托合同签章" value="软件测试委托合同签章" style={{ lineHeight: '32px' }} >软件测试委托合同签章</Option>) : null
                }
                {(entrustData['stage'] >= 20) ?
                    (<Option id="保密协议" value="保密协议" style={{ lineHeight: '32px' }} >保密协议</Option>) : null
                }
                </Select>
                {(fileData['软件项目委托测试申请书']===true)?(
                <div>
                    <h2 style={{ marginTop: 40 }}>软件项目委托测试申请书</h2>
                    <Descriptions
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >

                    <Descriptions.Item>
                    <h4 style={{ marginTop: 10 }}>状态:{" "}{USE_JSON_SERVER ?
                                getStatusInfo(entrustData['formData'], '软件项目委托测试申请书') :
                                getStatusByDelegationState(entrustData['formData']['state'], '软件项目委托测试申请书')}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item>
                    <Button type="primary"  onClick={() => ChangePage('ViewApplication')}>查看</Button>
                    </Descriptions.Item>
                        
                    </Descriptions>
                    
                </div>):null}
                
                {(fileData['委托测试软件功能列表']===true) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>委托测试软件功能列表</h2>
                        <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                        <Descriptions.Item>
                        <h4 style={{ marginTop: 10 }}>状态:{" "}{USE_JSON_SERVER ?
                                getStatusInfo(entrustData['formData'], '委托测试软件功能列表') :
                                getStatusByDelegationState(entrustData['formData']['state'], '委托测试软件功能列表')}</h4>
                        </Descriptions.Item>

                        <Descriptions.Item>
                        <Button type="primary"  onClick={() => ChangePage('ViewFunction')}>查看</Button>
                        </Descriptions.Item>
                            
                        </Descriptions>
                        
                        
                    </div>) : null
                }
                {(fileData['文档资料']===true) ?
                    (<div>
                        
                        <h2 >文档资料</h2>
                        <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                        <Descriptions.Item>
                        <Button type="primary"  onClick={() => ChangePage('ViewUserFiles')}>查看</Button>
                        </Descriptions.Item>
                            
                        </Descriptions>
                        
                    </div>) : null
                }
                {(fileData['报价单']===true) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>报价单</h2>
                        <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                        <Descriptions.Item>
                        <h4 style={{ marginTop: 10 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '报价单') :
                            getStatusByDelegationState(entrustData['formData']['state'], '报价单')}</h4>
                        </Descriptions.Item>

                        <Descriptions.Item>
                        <Button type="primary"  onClick={() => ChangePage('ViewQuotation')}>查看</Button>
                        </Descriptions.Item>
                            
                        </Descriptions>
                    </div>) : null
                }
                {(fileData['软件测试委托合同签章']===true) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>软件测试委托合同签章</h2>
                        <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                        <Descriptions.Item>
                        <h4 style={{ marginTop: 10 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '软件委托测试合同') :
                            getStatusByDelegationState(entrustData['formData']['state'], '软件委托测试合同')}</h4>
                        </Descriptions.Item>

                        <Descriptions.Item>
                        <Button type="primary"  onClick={() => ChangePage('ViewSignature')}>查看</Button>
                        </Descriptions.Item>
                            
                        </Descriptions>   
                    </div>) : null
                }
                {(fileData['保密协议']===true) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>保密协议</h2>
                        <Descriptions
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                        <Descriptions.Item>
                        <h4 style={{ marginTop: 10 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '保密协议') :
                            getStatusByDelegationState(entrustData['formData']['state'], '保密协议')}</h4>
                        </Descriptions.Item>

                        <Descriptions.Item>
                        <Button type="primary"  onClick={() => ChangePage('ViewCfdtagreement')}>查看</Button>
                        </Descriptions.Item>
                            
                        </Descriptions>  
                    </div>) : null
                }

            </div>)
    )
}
export default ViewEntrust