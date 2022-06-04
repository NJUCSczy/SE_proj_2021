import './ViewEntrust.css'
import React from 'react';
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';

import { DownOutlined, SmileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { USE_JSON_SERVER, REMOTE_SERVER, getStageByInfo, getStatusInfo, getStageByDelegationState, getStatusByDelegationState } from '../../../functions/functions';
var _ = require('lodash');

const { Panel } = Collapse;
const { Step } = Steps;

function ViewEntrust(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, 'stage': -1 })
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
                <h1>用户: {(entrustData['formData'] === null) ? null : USE_JSON_SERVER ? entrustData['formData']['userName'] : entrustData['formData']['usrBelonged']}</h1>
                <h1 style={{ marginLeft: 20 }}>当前状态:{' '}{USE_JSON_SERVER ? getStatusInfo(entrustData['formData']) : getStatusByDelegationState(entrustData['formData']['state'])}</h1>
                <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                    <Panel header={<h2>详细信息</h2>} key="1">
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
                        case 0: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('FunctionList')}>用户填写软件功能列表</Button>);
                        case 1: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('UserUploadFiles')}>用户上传软件文档</Button>);
                        case 2: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('UserUploadFiles')}>用户提交样品</Button>);
                        case 3: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TadultApplication')}>测试部人员审核</Button>);
                        case 4: case 6: case 10: case 15: return null;
                        case 5: case 7: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('MktdptApplicationStep1')}>市场部人员审核</Button>);
                        case 8: case 11: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('Quotation')}>发起议价</Button>);
                        case 9: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('QuotationFeedback')}>查看议价</Button>);
                        case 11: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('MktdptApplicationStep2')}>市场部完成申请表</Button>);
                        case 13: case 16: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestAgreement')}>市场部起草测试合同，拟定履行期限</Button>);
                        case 14: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('CheckTA')}>查看履行日期</Button>);
                        case 17: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TrusteeApplication')}>市场部填写签章</Button>);
                        case 18: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ClientApplication')}>客户填写签章</Button>);
                        case 19: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ConfidentialAgreementPartyB')}>市场部填写保密协议</Button>);
                        case 20: return (<Button type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('ConfidentialAgreementPartyA')}>客户填写保密协议</Button>);
                    }
                })()}
                <h1 style={{ marginTop: 60 }}>文件列表</h1>
                <div>
                    <h2 style={{ marginTop: 40 }}>软件项目委托测试申请书</h2>
                    <h3 style={{ marginTop: 20 }}>状态:{" "}{USE_JSON_SERVER ?
                        getStatusInfo(entrustData['formData'], '软件项目委托测试申请书') :
                        getStatusByDelegationState(entrustData['formData']['state'], '软件项目委托测试申请书')}</h3>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewApplication')}>查看</Button>
                </div>
                {(entrustData['stage'] >= 1) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>委托测试软件功能列表</h2>
                        <h3 style={{ marginTop: 20 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '委托测试软件功能列表') :
                            getStatusByDelegationState(entrustData['formData']['state'], '委托测试软件功能列表')}</h3>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewFunction')}>查看</Button>
                    </div>) : null
                }
                {(entrustData['stage'] >= 2 && !USE_JSON_SERVER) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>文档资料</h2>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewUserFiles')}>查看</Button>
                    </div>) : null
                }
                {(entrustData['stage'] >= 9) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>报价单</h2>
                        <h3 style={{ marginTop: 20 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '报价单') :
                            getStatusByDelegationState(entrustData['formData']['state'], '报价单')}</h3>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewQuotation')}>查看</Button>
                    </div>) : null
                }
                {(entrustData['stage'] >= 19) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>软件测试委托合同签章</h2>
                        <h3 style={{ marginTop: 20 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '软件委托测试合同') :
                            getStatusByDelegationState(entrustData['formData']['state'], '软件委托测试合同')}</h3>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewSignature')}>查看</Button>
                    </div>) : null
                }
                {(entrustData['stage'] >= 21) ?
                    (<div>
                        <h2 style={{ marginTop: 40 }}>保密协议</h2>
                        <h3 style={{ marginTop: 20 }}>状态:{" "}{USE_JSON_SERVER ?
                            getStatusInfo(entrustData['formData'], '保密协议') :
                            getStatusByDelegationState(entrustData['formData']['state'], '保密协议')}</h3>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewCfdtagreement')}>查看</Button>
                    </div>) : null
                }

            </div>)
    )
}
export default ViewEntrust