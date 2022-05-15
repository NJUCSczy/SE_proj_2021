import './ViewEntrustList.css'
import React from 'react';
import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';

var _ = require('lodash');


  function ViewEntrustList(props){
    const { UpdateUserInfo, GotoPage,_state } = props;
    const [entrustData, setEntrustData] = useState({'formData':null})
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width:100,
            render: (id) => (
                <Space >
            {id}
          </Space>
            )
          },
        {
          title: '用户',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '软件名称',
          dataIndex: "用户申请表",
          key: '软件名称',
          render: (userApplication) => (
            <Space size="middle">
            {userApplication["软件名称"]}
          </Space>
          )
        },
        {
          title: '状态',
          key: 'status',
          render: (userApplication) => (
            <Space size="middle">
            {(userApplication['用户申请表'] === undefined ) ? "状态错误":
            userApplication['测试部审核委托'] === undefined ? "等待测试部审核":
            userApplication['测试部审核委托']['确认意见'] != '可以测试' ? '被驳回，理由：'+userApplication['测试部审核委托']['确认意见'] :
            userApplication['市场部审核委托'] === undefined ? '测试部审核通过，等待市场部审核' :
            userApplication['市场部审核委托']['市场部受理意见'] === '受理' ? '市场部确认受理，测试项目编号：'+userApplication['市场部审核委托']['测试项目编号'] :
            '市场部：'+userApplication['市场部审核委托']['市场部受理意见']
            }
          </Space>
          )
        },
        {
          title: '操作',
          key: 'action',
          dataIndex: 'id',
          textWrap: 'word-break',
          render: (id) => (
            <Space size="middle">
              <a 
              onClick={() => gotoEntrustPage(id)}
              >查看</a>
            </Space>
          ),
        },
      ];
    const gotoEntrustPage = (id) => {
        _state['PageInfo']['id']=id;
        UpdateUserInfo({PageInfo:{'id':id}},GotoPage('ViewEntrust',_state))
    }
    const updateInfo = () => {
        fetch("http://localhost:8000/forms", {
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
                return newData
              })
            }
            
          })
      }
      
      useEffect(() =>{
        updateInfo();
      },[]
      )

      return (
        <Table 
        columns={columns} 
        dataSource={entrustData['formData']} 
        rowKey="id"
        />
      )
  }
  
  export default ViewEntrustList
  