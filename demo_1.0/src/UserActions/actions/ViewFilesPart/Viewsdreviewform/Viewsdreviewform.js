import React ,{ Fragment }from 'react'
import isMobile from 'is-mobile';

import {Descriptions, DatePicker, message, Divider,Tag,Table, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import {  useEffect, useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';

import FormItem from 'antd/lib/form/FormItem';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
function Viewsdreviewform(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [formData, setFormData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件文档评审表': null })
    const { Option } = Select;
    const { TextArea } = Input;
    const mobile = require('is-mobile');
    var _ = require('lodash');

    const { Column, ColumnGroup } = Table;
    const sharedOnCell = (_, index) => {
    if (index === 0||index === 8||index===10) {
        return {
        colSpan: 0,
        };
    }

    return {};
    };


    const setDataByKey = (key, val) => {
      setFormData(prev => {
        const newFormData = _.cloneDeep(prev)
        newFormData[key] = val;
        console.log(newFormData)
        return newFormData;
      })
  
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
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData["formData"] = data
                            newData['软件文档评审表'] = data['软件文档评审表']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id']+"/test-doc/doc-evaluation", {
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
                        alert('查询软件文档评审表失败！')
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
                            newData['软件文档评审表'] = data['DocEvaluationTableDto']
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
                newData['软件文档评审表'] = focusedData
                return newData
            })
        }  
    }, []
    )


    const columns =[
    {
        title:'评审类别与评审项',
        dataIndex:'sort',
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
        <Form.Item name={'result_'+index} >
            <h5 style={{fontWeight: 'bolder', marginTop: 30}}>{entrustData['软件文档评审表']['result_'+index]}</h5>
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
            <Form.Item name={'description_'+index} >
                <h5 style={{fontWeight: 'bolder', marginTop: 30}}>{entrustData['软件文档评审表']['description_'+index]}</h5>
            </Form.Item>
        ),
        
    },
    ];

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
    
    ];


    return(
        entrustData['软件文档评审表'] === null ? null : (
        <Form
        name="软件文档评审表"
        initialValues={{ remember: true }}
        style={{ padding: mobile()?'20px 5px': '20px 30px' }}
        labelCol={{ span: 10, flex: 'auto' }}
        wrapperCol={{ span: 20 }}
        layout='vertical'
        >
        <Descriptions     
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        layout='vertical'
        title={<h2 style={{ textAlign: 'center',fontWeight: 'bolder', marginTop: 30 }}>软件文档评审表</h2>}
        >
            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['软件文档评审表']['软件名称']}</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['软件文档评审表']['版本号']}</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >高校评审组</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>评审人</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['软件文档评审表']['评审人']}</h4>
            </Descriptions.Item>
        </Descriptions>

        

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>评审完成时间</h3>
        <Form.Item
            name="评审完成时间"
        >
            <DatePicker disabled defaultValue={moment((entrustData['软件文档评审表']["评审完成时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
        </Form.Item>

        <Table columns={columns} dataSource={data} pagination={{pageSize:40}} bordered/>

        <Descriptions    
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>检查人</h3>} >
            <h4 style={{ fontWeight: 'bolder', marginTop: 35}} >{entrustData['软件文档评审表']['检查人']}</h4>
            </Descriptions.Item>
        </Descriptions>

        </Form>
        )
            
    )




}

export default Viewsdreviewform;