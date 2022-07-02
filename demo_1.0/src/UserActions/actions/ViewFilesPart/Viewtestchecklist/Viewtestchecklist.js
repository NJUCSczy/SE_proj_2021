import React ,{ Fragment }from 'react'
import isMobile from 'is-mobile';

import {Descriptions, DatePicker, message, Divider,Tag,Table, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import {  useEffect, useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
import FormItem from 'antd/lib/form/FormItem';

function Viewtestchecklist(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [formData, setFormData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件项目委托测试工作检查表': null })
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

var _ = require('lodash');
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
                            newData['软件项目委托测试工作检查表'] = data['软件项目委托测试工作检查表']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id']+"/test-doc/work-evaluation", {
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
                        alert('查询软件项目委托测试工作检查表失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            
                            newData['软件项目委托测试工作检查表'] = data['WorkEvaluationTableDto']
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
                newData['软件项目委托测试工作检查表'] = focusedData
                return newData
            })
        }  
    }, []
    )


    const columns =[
        {
          title:'工作(项目)流程',
          dataIndex:'process',
          onCell: (_,index) => {
            if(index===0||index===8||index===10){
              return{
                colSpan:3,
              };
            }
            if(index === 1||index===17||index===24){
              return {
                rowSpan: 3,
              };
            }
            if(index === 11){
              return {
                rowSpan: 5,
              };
            }
            if(index === 27){
              return {
                rowSpan: 8,
              };
            }
            if(index === 20){
              return {
                rowSpan: 4,
              };
            }
            if(index === 4||index === 6){
              return {
                rowSpan: 2,
              };
            }
            if(index === 2||index === 3||index === 5||index === 7||index === 12||index === 13||
              index === 14||index === 15||index === 18||index === 19||index === 22||index === 21||
              index === 23||index===25||index === 26||index>27){
              return {
                rowSpan:0,
              };
            }
            
          },
        },
        {
          title:'可预见问题及注意事项',
          dataIndex:'caution',
          onCell:(_,index) =>{
            if (index === 0||index === 8||index===10) {
              return {
                colSpan: 0,
              };
            }
            if(index>=27){
              return {
                colSpan: 2,
              };
            }
          },
        },
        {
          title:'确认',
          dataIndex:'confirm',
          onCell:(_,index) =>{
            if (index === 0||index === 8||index===10||index>=27) {
              return {
                colSpan: 0,
              };
            }
          },
          render: (_, record,index) => (
    
            <Form.Item name={'tableItem_'+index} initialValue={false} >
              <Switch disabled checkedChildren="是" unCheckedChildren="否" defaultChecked={entrustData['软件项目委托测试工作检查表']['tableItem_'+index]}/>
            </Form.Item>
          ),
        }
      ];

const data = [
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
  {
    key:'20',
    process:'7、实施测试',
    caution:'3、对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单；'
  },
  {
    key:'21',
    process:'8、编制测试报告',
    caution:'1、根据《软件项目委托测试报告编制作业指导书》和测试结果编制测试报告。'
  },
  {
    key:'22',
    process:'8、编制测试报告',
    caution:'2、检查测试报告，并填写《报告检查表》。'
  },
  {
    key:'23',
    process:'8、编制测试报告',
    caution:'3、测试报告的编码请参阅《测试报告编码规则》，'
  },
  {
    key:'24',
    process:'8、编制测试报告',
    caution:'4、报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。'
  },
  {
    key:'25',
    process:'9、评测资料归档',
    caution:'1、委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档，以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，委托方可凭样品接收单取回或由实验室进行销毁。'
  },
  {
    key:'26',
    process:'9、评测资料归档',
    caution:'2、归档资料同时填写《软件项目委托测试资料清单》，打印《软件委托测试资料标签》并编号号码，贴于档案盒制定位置。'
  },
  {
    key:'27',
    process:'9、评测资料归档',
    caution:'3、该检查表与本次软件委托测试归档资料一同归档，与《软件项目委托测试资料目录》、《软件项目委托测试试资料清单》一起，作为软件委托测试测试工作的检查、资料查询的主要依据。'
  },
  {
    key:'28',
    process:'10、附件目录',
    caution:'1、《软件项目委托测试工作流程》'
  },
  {
    key:'29',
    process:'10、附件目录',
    caution:'2、《需提供的书面文档》'
  },
  {
    key:'30',
    process:'10、附件目录',
    caution:'3、《软件项目委托测试报告编制作业指导书》'
  },
  {
    key:'31',
    process:'10、附件目录',
    caution:'4、《报告检查表》'
  },
  {
    key:'32',
    process:'10、附件目录',
    caution:'5、《测试报告编码规则》'
  },
  {
    key:'33',
    process:'10、附件目录',
    caution:'6、《软件委托测试资料清单》'
  },
  {
    key:'34',
    process:'10、附件目录',
    caution:'7、《软件委托测试资料标签》'
  },
  {
    key:'35',
    process:'10、附件目录',
    caution:'8、《软件委托测试资料目录》'
  },

];


    return(
        entrustData['软件项目委托测试工作检查表'] === null ? null : (
            <Form
            name="软件项目委托测试工作检查表"
            initialValues={{ remember: true }}
            style={{ padding: '20px 30px' }}
            autoComplete="false"
          >
            <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试工作检查表</h1>

            <Descriptions     
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h3>} >
                <h3 style={{ fontWeight: 'bolder', marginTop: 30}} >{entrustData['软件项目委托测试工作检查表']['软件名称']}</h3>
                </Descriptions.Item>

                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h3>} >
                <h3 style={{ fontWeight: 'bolder', marginTop: 30}} >{entrustData['软件项目委托测试工作检查表']['版本号']}</h3>
                </Descriptions.Item>

                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>申报单位</h3>} >
                <h3 style={{ fontWeight: 'bolder', marginTop: 30}} >{entrustData['软件项目委托测试工作检查表']['申报单位']}</h3>
                </Descriptions.Item>

                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>主测人</h3>} >
                <h3 style={{ fontWeight: 'bolder', marginTop: 30}} >{entrustData['软件项目委托测试工作检查表']['主测人']}</h3>
                </Descriptions.Item>
            </Descriptions>

            <Descriptions     
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>起始时间</h3>} >
                <DatePicker disabled style={{ fontWeight: 'bolder', marginTop: 30 }} defaultValue={moment((entrustData['软件项目委托测试工作检查表']['起始时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                </Descriptions.Item>

                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>预计完成时间</h3>} >
                <DatePicker disabled style={{ fontWeight: 'bolder', marginTop: 30 }} defaultValue={moment((entrustData['软件项目委托测试工作检查表']['预计完成时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                </Descriptions.Item>

                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>实际完成时间</h3>} >
                <DatePicker disabled style={{ fontWeight: 'bolder', marginTop: 30 }} defaultValue={moment((entrustData['软件项目委托测试工作检查表']['实际完成时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
                </Descriptions.Item>

            </Descriptions>

            <Form.Item name='表项' >
              <Table columns={columns} dataSource={data} pagination={{pageSize:40}} bordered/>
            </Form.Item>

            <Descriptions     
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部受理意见</h3>} >
                <h3 style={{ fontWeight: 'bolder', marginTop: 30}} >{entrustData['软件项目委托测试工作检查表']['市场部审核意见']}</h3>
                </Descriptions.Item>

            </Descriptions>
            
          </Form>
        )
            
    )




}

export default Viewtestchecklist;