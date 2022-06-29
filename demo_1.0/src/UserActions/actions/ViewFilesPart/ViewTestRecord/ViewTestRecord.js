import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { Descriptions, Collapse,message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewTestRecord.css'
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

function ViewTestRecord(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件测试记录电子记录': null })
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
                            newData['软件测试记录电子记录'] = data['软件测试记录电子记录']
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
                        alert('查询软件测试方案失败！')
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
                newData['软件测试记录电子记录'] = focusedData
                return newData
            })
        }  
    }, []
    )


    return (
        entrustData['软件测试记录电子记录'] === null ? null : (
            <Form
                name="软件测试记录电子记录"
            >
                <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试记录(电子记录)</h1>
                
                {entrustData['软件测试记录电子记录']['软件测试记录'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >序号:{index['序号']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试分类" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试分类']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="测试用例设计说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试用例设计说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="与本测试用例有关的规约说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['与本测试用例有关的规约说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="前提条件" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['前提条件']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="测试用例执行过程" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试用例执行过程']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="预期的结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['预期的结果']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="测试用例设计者" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试用例设计者']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="实际结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['实际结果']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="是否与预期结果一致" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['是否与预期结果一致']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="相关的BUG编号" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['相关的BUG编号']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="用例执行者" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['用例执行者']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="确认人" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['确认人']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="执行测试时间" >
                            <DatePicker disabled defaultValue={moment((index["执行测试时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                            </Descriptions.Item>
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}
                        
   
              

            </Form>
        )

    )
}

export default ViewTestRecord