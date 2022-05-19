import './ViewEntrustList.css'
import React from 'react';
import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getStageByInfo, getStatusInfo, USE_JSON_SERVER } from '../../functions/functions'

var _ = require('lodash');


function ViewEntrustList(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })
  const columns = [
    {
      title: '编号',
      dataIndex: (USE_JSON_SERVER) ? 'id' : 'delegationId',
      key: 'id',
      width: 100,
      render: (id) => (
        <Space >
          {id}
        </Space>
      )
    },
    {
      title: '用户',
      dataIndex: (USE_JSON_SERVER) ? 'userName' : 'usrBelonged',
      key: 'userName',
    },
    {
      title: '软件名称',
      dataIndex: (USE_JSON_SERVER) ? '用户申请表' : 'applicationTable',
      key: '软件名称',
      render: (userApplication) => (
        <Space size="middle">
          {userApplication === null ? null : userApplication["软件名称"]}
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
      dataIndex: (USE_JSON_SERVER) ? 'id' : 'delegationId',
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
    _state['PageInfo']['id'] = id;
    UpdateUserInfo({ PageInfo: { 'id': id } }, GotoPage('ViewEntrust', _state))
  }
  const updateInfo = () => {
    if (USE_JSON_SERVER) {
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
    else {
      fetch("http://42.192.56.231:8000/delegations", {
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

  return (
    <Table
      columns={columns}
      dataSource={entrustData['formData']}
      rowKey="id"
    />
  )
}

export default ViewEntrustList
