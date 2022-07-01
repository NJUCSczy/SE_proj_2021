import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { Descriptions, Collapse,message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewTestReport.css'
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

function ViewTestReport(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件测试报告': null })
    const { Option } = Select;
    const { TextArea } = Input;
    const { Panel } = Collapse;

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
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData["formData"] = data
                            newData['软件测试报告'] = data['软件测试报告']
                            return newData
                        })
                    }
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
                    if (res.status != 200) {
                        alert('查询软件测试报告失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData["formData"] = data
                            newData['报价单'] = data['offerTableUnion']
                            return newData
                        })
                    }
                })
        }
    }
    useEffect(() => {
        if (focusedData === undefined)
            updateInfo();
        else{
            setEntrustData(prev => {
                const newData = _.cloneDeep(prev)
                newData['软件测试报告'] = focusedData
                return newData
            })
        }  
    }, []
    )


    return (
        entrustData['软件测试报告'] === null ? null : (
            <Form
                name="软件测试报告"
                style={{padding:"10px 10px 10px 10px"}}
            >
                <h1 style={{ textAlign: 'center', fontSize: 40 }}>软件测试报告</h1>
                                   
                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="报告编号" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['报告编号']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="软件名称" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['软件名称']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="版本号" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['版本号']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="总委托单位" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['总委托单位']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="测试类别" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['测试类别']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="报告日期" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["报告日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                    


                </Descriptions>

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>声明</Title>

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

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={3}>测试报告正文</Title>


                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    
                    <Descriptions.Item label="委托单位" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['委托单位']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="样品名称" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['样品名称']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="版本/型号" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['版本/型号']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="来样日期" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["来样日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                    <Descriptions.Item label="测试类型" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['测试类型']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="测试开始时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["测试开始时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                    <Descriptions.Item label="测试结束时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["测试结束时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                    <Descriptions.Item label="样品状态" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['样品状态']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="总测试依据" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['总测试依据']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="样品清单" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['样品清单']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="测试结论" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['测试结论']}</h4>
                    </Descriptions.Item>

                    
                
                </Descriptions>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    
                    <Descriptions.Item label="主测人" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['主测人']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="主测人日期" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["主测人日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                </Descriptions>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="审核人" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['审核人']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="审核人日期" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["审核人日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                </Descriptions>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="批准人" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['批准人']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="批准人日期" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试报告']["批准人日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                    </Descriptions.Item>

                </Descriptions>

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>委托单位联系方式</Title>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="电话" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['电话']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="传真" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['传真']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="地址" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['地址']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="邮编" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['邮编']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="联系人" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['联系人']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="E-mail" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['E-mail']}</h4>
                    </Descriptions.Item>                  

                </Descriptions>

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>一、测试环境</Title>
                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>硬件环境</Title>
                <Paragraph>
                本次测试中使用到的硬件环境如下：
                </Paragraph>

                {entrustData['软件测试报告']['硬件环境'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >硬件名称:{index['硬件名称']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="硬件类别" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['硬件类别']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="配置" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['配置']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="数量" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['数量']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>软件环境</Title>
                <Paragraph>
                本次测试中使用到的软件环境如下：
                </Paragraph>

                {entrustData['软件测试报告']['软件环境'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >软件名称:{index['软件名称']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="软件类别" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['软件类别']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="版本" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['版本']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>网络环境</Title>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="网络环境" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['网络环境']}</h4>
                    </Descriptions.Item>
                </Descriptions>
                                        
                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>二、测试依据和参考资料</Title>
                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>测试依据</Title>

                {entrustData['软件测试报告']['测试依据'].map((index)=>
                <div>                          
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试依据分项" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试依据分项']}</h4>
                            </Descriptions.Item>
          
                        </Descriptions>
                                            
                </div>
                 )}      

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>参考资料</Title>    

                {entrustData['软件测试报告']['参考资料'].map((index)=>
                <div>
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="参考资料分项" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['参考资料分项']}</h4>
                            </Descriptions.Item>
          
                        </Descriptions>
                                            
                </div>
                 )}              
   
                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>三、测试内容</Title>
                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>功能性测试</Title>

                {entrustData['软件测试报告']['功能性测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >功能模块:{index['功能模块']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="功能要求" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['功能要求']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}


                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>效率测试</Title>

                {entrustData['软件测试报告']['效率测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >测试特性:{index['测试特性']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试说明']}</h4>
                            </Descriptions.Item>
                        
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>可移植性测试</Title>

                {entrustData['软件测试报告']['可移植性测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >测试特性:{index['测试特性']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试说明']}</h4>
                            </Descriptions.Item>
                        
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>易用性测试</Title>

                {entrustData['软件测试报告']['易用性测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >测试特性:{index['测试特性']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试说明']}</h4>
                            </Descriptions.Item>
                        
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>可靠性测试</Title>

                {entrustData['软件测试报告']['可靠性测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >测试特性:{index['测试特性']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试说明']}</h4>
                            </Descriptions.Item>
                        
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={5}>可维护性测试</Title>

                {entrustData['软件测试报告']['可维护性测试'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >测试特性:{index['测试特性']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试说明']}</h4>
                            </Descriptions.Item>
                        
                            <Descriptions.Item label="测试结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试结果']}</h4>
                            </Descriptions.Item>

                    
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                )}

                <Title style={{ fontWeight: 'bolder', marginTop: 30 }} level={4}>四、测试执行记录</Title>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="测试执行记录" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试报告']['测试执行记录']}</h4>
                    </Descriptions.Item>

                </Descriptions>


            </Form>
        )

    )
}

export default ViewTestReport