import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Descriptions, Collapse, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewQuotation.css'
import { useEffect, useState } from 'react';
import moment from 'moment';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER, REMOTE_SERVER, getStageByInfo, getStatusInfo } from '../../../functions/functions';

var _ = require('lodash');


function ViewQuotation(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, '报价单': null })
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
                            newData['报价单'] = data['报价单']
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
                        alert('查询报价单失败！')
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
                newData['报价单'] = focusedData
                return newData
            })
        }  
    }, []
    )


    return (
        entrustData['报价单'] === null ? null : (
            <Form
                name="报价单"
            >
                <h1 style={{ textAlign: 'center', fontSize: 30 }}>报价单</h1>
                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>户名：南京大学</h4>
                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行：中国工商银行股份有限公司南京汉口路分理处</h4>
                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号:4301011309001041656</h4>
                <Descriptions
                        
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label={<h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h4>} >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 30 }} >{entrustData['报价单']['基本信息']['软件名称']}</h4>
                    </Descriptions.Item>
                </Descriptions>
                
                {entrustData['报价单']['基本信息']['项目列表'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >项目:{index['项目']}</h4>} key="1">
                        <Descriptions
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="分项" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['分项']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="单价" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['单价']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="行合计" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['行合计']}</h4>
                            </Descriptions.Item>
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                        
                    
                </div>
                )}
                <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>以下金额单位： 元</h3>
                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="小计" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['报价单']['基本信息']['小计']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="税率(8%)" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['报价单']['基本信息']['税率(8%)']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="总计">
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['报价单']['基本信息']['总计']}</h4>
                    </Descriptions.Item>
                </Descriptions>

            </Form>
        )

    )
}

export default ViewQuotation

ViewQuotation.propTypes={
    /** 用户状态 */
    _state:PropTypes.object,
    /** 更新用户状态方法 */
    UpdateUserInfo:PropTypes.func,
    /** 切换界面方法 */
    GotoPage:PropTypes.func,
    /** 表单的数据，正常情况下为空。若为空则从后端读取；不为空的情况仅用于测试 */
    focusedData:PropTypes.object,
  }