import './ViewProjList.css'
import React from 'react';
import { Table, Tag, Space, message, Button, Input, Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { getStageByInfo, getStatusInfo, getStageByDelegationState, getStatusByDelegationState, USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions'
import { getTestStageByDTAState, getTestStageByInfo, getTestStatusInfo, getTestStatusByDelegationState, getTestDescriptionByStage } from '../../../functions/functionTest'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Option } = Select;
var _ = require('lodash');

function ViewProjList(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [formData, setFormData] = useState({ 'formData': null })

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '编号',
      dataIndex: (USE_JSON_SERVER) ? ['市场部审核委托', '测试项目编号'] : 'projectId',//MAYBE PROBLEM
      key: 'id',
      width: 100,
      sorter: (a, b) => (USE_JSON_SERVER) ? a.id - b.id : a.delegationId.localeCompare(b.delegationId),
      sortDirections: ['descend'],
      ...getColumnSearchProps((USE_JSON_SERVER) ? ['市场部审核委托', '测试项目编号'] : 'projectId'),
    },
    {
      title: '用户',
      dataIndex: (USE_JSON_SERVER) ? 'userName' : 'usrId',
      sorter: (a, b) => (USE_JSON_SERVER) ? a.userName - b.userName : a.usrBelonged.localeCompare(b.usrBelonged),
      sortDirections: ['descend'],
      key: 'userName',
      ...getColumnSearchProps((USE_JSON_SERVER) ? 'userName' : 'usrId'),
    },
    {
      title: '软件名称',
      dataIndex: (USE_JSON_SERVER) ? '用户申请表' : '软件名称',
      key: '软件名称',
      render: (userApplication) => USE_JSON_SERVER?(
        <Space size="middle">
          {userApplication === null ? null : userApplication["软件名称"]}
        </Space>
      ):(
        <Space size="middle">
          {userApplication}
        </Space>
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (userApplication) => (
        USE_JSON_SERVER ?
          (
            <Space size="middle">
              {
                getTestStatusInfo(userApplication)
              }
            </Space>) : (//TODO
            <Space size="middle">
              {getTestStatusByDelegationState(userApplication['state'])
              }
            </Space>)
      )
    },
    {
      title: '操作',
      key: 'action',
      textWrap: 'word-break',
      render: (userApplication) => (
        USE_JSON_SERVER ? (
          <Space size="middle">
            <a id='view_proj'
              onClick={() => gotoEntrustPage(userApplication['id'], -1)}
            >查看</a>
          </Space>) : (<Space size="middle">
            <a id='view_proj'
              onClick={() => gotoEntrustPage(userApplication['delegationId'], userApplication['contractId'])}
            >查看</a>
          </Space>)//TODO
      ),
    },
  ];
  const gotoEntrustPage = (id, ContractID) => {
    _state['PageInfo']['id'] = id;
    _state['PageInfo']['ContractID'] = ContractID
    UpdateUserInfo({ PageInfo: { 'id': id,'ContractID':ContractID } }, GotoPage('ViewProject', _state))//TODO
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
            setFormData(prev => {
              const newData = _.cloneDeep(prev)
              const res = { 'formData': [] }
              newData["formData"] = data
              newData["formData"].forEach(element => {
                if (USE_JSON_SERVER) {
                  console.log(getStageByInfo(element))
                  if (getStageByInfo(element) >= 21)
                    res["formData"].push(element);
                } else {
                  if (getStageByDelegationState(element['state']) >= 21)
                    res["formData"].push(element)
                }
              });
              console.log(res)
              return res;
            })
          }
        })
    }
    else {//TODO
      const URL = _state['userRole'][0] === 'ROLE_USER' ? (REMOTE_SERVER + "/test/projects") : (REMOTE_SERVER + "/test/projects/all")
      console.log(URL)
      fetch(URL, {
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
          if (res.status === 200) {
            message.success({ content: "获取项目信息成功", key: "getProjList", duration: 2 })
          }
          else if (res.status === 401) {
            alert("请先登录！")
            GotoPage("Login", _state)
          }
          else {
            message.error({ content: "获取项目信息失败", key: "getProjList", duration: 2 })
          }

          return res.json()
        })
        .then(data => {
          console.log('data:',data)
          if (data != null) {
            if(data['status']!=undefined && data['status']!=200){
              alert("获取项目信息失败！")
              return
            }
            setFormData(prev => {
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

  const FliterDataByState = (State) => {
    switch (State) {
      case '全部': FliterDataByStage(0, 100); break;
      case '未填写测试方案': FliterDataByStage(0, 0); break;
      case '测试方案审核中': FliterDataByStage(1, 2); break;
      case '测试方案已通过': FliterDataByStage(3, 100); break;
      case '实施测试中': FliterDataByStage(3, 7); break;
      case '已生成测试报告': FliterDataByStage(8, 100); break;
      case '测试报告审核中': FliterDataByStage(8, 9); break;
      case '测试报告已通过': FliterDataByStage(10, 100); break;
      case '测试报告已签发': FliterDataByStage(12, 100); break;

    }
  }

  const FliterDataByStage = (minStage, maxStage) => {
    setFormData(prev => {
      const newData = _.cloneDeep(formData)
      const res = { 'formData': [] }
      newData["formData"].forEach(element => {
        if (USE_JSON_SERVER) {
          if (getTestStageByInfo(element) >= minStage && getTestStageByInfo(element) <= maxStage)
            res["formData"].push(element);
        } else {
          if (getTestStageByDTAState(element['state']) >= minStage && getTestStageByDTAState(element['state']) <= maxStage)
            res["formData"].push(element)
        }
      });
      console.log(res)
      return res;
    })
  }

  return (
      <>
        <Select defaultValue="全部" style={{ width: 160, marginLeft: 30, marginTop: 20, marginBottom: 20 }} onChange={FliterDataByState}>
          <Option value="全部">全部</Option>
          <Option value="未填写测试方案">未填写测试方案</Option>
          <Option value="测试方案审核中">测试方案审核中</Option>
          <Option value="测试方案已通过">测试方案已通过</Option>
          <Option value="实施测试中">实施测试中</Option>
          <Option value="已生成测试报告">已生成测试报告</Option>
          <Option value="测试报告审核中">测试报告审核中</Option>
          <Option value="测试报告已通过">测试报告已通过</Option>
          <Option value="测试报告已签发">测试报告已签发</Option>
        </Select>
        <Table
          style={{ marginLeft: 20, marginRight: 20 }}
          pagination={{ pageSize: 7 }}
          columns={columns}
          dataSource={formData['formData']}
          rowKey="id"
        /></>
        )
}

export default ViewProjList