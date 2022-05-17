import './ViewEntrustList.css'
import React from 'react';
import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import {getStageByInfo,getStatusInfo} from '../../functions/functions'

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
            {getStatusInfo(userApplication)
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
  