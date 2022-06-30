import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Breadcrumb, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import "./Home.css";

import UserInfoPage from './register_login/UserInfoPage/UserInfo';
import LoginPage from './register_login/LoginPage/Login';
import RegisterPage from './register_login/RegisterPage/Register';
import RegisterStaffPage from './register_login/RegisterStaffPage/RegisterStaff';

import SubmitApplication from './UserActions/actions/DelegationPart/SubmitApplication/SubmitApplication';
import FunctionList from './UserActions/actions/DelegationPart/FunctionList/FunctionList';
import UserUploadFiles from './UserActions/actions/DelegationPart/UserUploadFiles/UserUploadFiles';
import UserUploadSample from './UserActions/actions/DelegationPart/UserUploadSample/UserUploadSample';
import MktdptApplicationStep1 from './UserActions/actions/DelegationPart/MktdptApplication/mktdept1';
import MktdptApplicationStep2 from './UserActions/actions/DelegationPart/MktdptApplication/mktdept2';
import TadultApplication from './UserActions/actions/DelegationPart/TadultApplication/TadultApplication'
import Quotation from './UserActions/actions/DelegationPart/Quotation/Quotation';
import QuotationFeedback from './UserActions/actions/DelegationPart/QuotationFeedback/QuotationFeedback';

import ConfidentialAgreementPartyB from './UserActions/actions/ContractPart/ConfidentialAgreement/ConfidentialAgreementPartyB';
import ConfidentialAgreementPartyA from './UserActions/actions/ContractPart/ConfidentialAgreement/ConfidentialAgreementPartyA';
import ClientApplication from './UserActions/actions/ContractPart/MktContract/ClientApplication';
import TrusteeApplication from './UserActions/actions/ContractPart/MktContract/TrusteeApplication';
import TestAgreement from './UserActions/actions/ContractPart/TestAgreement/TestAgreement';
import CheckTA from './UserActions/actions/ContractPart/TestAgreement/CheckTA';
import OfflineSignContract from './UserActions/actions/ContractPart/OfflineSignContract/OfflineSignContract'

import CheckList from './UserActions/actions/TestPart/CheckList/CheckList';
import QuestionList from './UserActions/actions/TestPart/QuestionList/QuestionList';
import TestCheckList from './UserActions/actions/TestPart/TestCheckList/TestCheckList';
import TestRecord from './UserActions/actions/TestPart/TestRecord/TestRecord';
import TestScenarioReviewForm from './UserActions/actions/TestPart/TestScenarioReviewForm/TestScenarioReviewForm';
import SoftwareDocumentReviewForm from './UserActions/actions/TestPart/SoftwareDocumentReviewForm/SoftwareDocumentReviewForm';
import TestPlan from './UserActions/actions/TestPart/TestPlan/TestPlan';
import TestReport from './UserActions/actions/TestPart/TestReport/TestReport';
import TestCase from './UserActions/actions/TestPart/TestCase/TestCase';

import ViewEntrust from './UserActions/actions/ViewFilesPart/ViewEntrust/ViewEntrust';
import ViewUserFiles from './UserActions/actions/ViewFilesPart/ViewUserFiles/ViewUserFiles';
import ViewApplication from './UserActions/actions/ViewFilesPart/ViewApplication/ViewApplication';
import ViewEntrustList from './UserActions/actions/ViewFilesPart/ViewEntrustList/ViewEntrustList';
import ViewProjList from './UserActions/actions/ViewFilesPart/ViewProjList/ViewProjList';
import ViewCfdtagreement from './UserActions/actions/ViewFilesPart/ViewCfdtagreement/ViewCfdtagreement';
import ViewContract from './UserActions/actions/ViewFilesPart/ViewContract/ViewContract';
import ViewFunction from './UserActions/actions/ViewFilesPart/ViewFunction/ViewFunction';
import ViewSignature from './UserActions/actions/ViewFilesPart/ViewSignature/ViewSignature';
import ViewQuotation from './UserActions/actions/ViewFilesPart/ViewQuotation/ViewQuotation';
import Viewquestionlist from './UserActions/actions/ViewFilesPart/Viewquestionlist/Viewquestionlist';
import Viewchecklist from './UserActions/actions/ViewFilesPart/Viewchecklist/Viewchecklist';
import Viewtestchecklist from './UserActions/actions/ViewFilesPart/Viewtestchecklist/Viewtestchecklist';
import Viewsdreviewform from './UserActions/actions/ViewFilesPart/Viewsdreviewform/Viewsdreviewform';
import Viewtsreviewform from './UserActions/actions/ViewFilesPart/Viewtsreviewform/Viewtsreviewform';
import ViewProject from './UserActions/actions/ViewFilesPart/ViewProject/ViewProject';

import { USE_JSON_SERVER } from './UserActions/functions/functions';
import ViewTestCase from './UserActions/actions/ViewFilesPart/ViewTestCase/ViewTestCase';
import ViewTestPlan from './UserActions/actions/ViewFilesPart/ViewTestPlan/ViewTestPlan';
import ViewTestRecord from './UserActions/actions/ViewFilesPart/ViewTestRecord/ViewTestRecord';
import ViewTestReport from './UserActions/actions/ViewFilesPart/ViewTestReport/ViewTestReport';


const { Header, Content, Footer, Sider } = Layout;

const mobile = require('is-mobile');

const MainPage = (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>首页</div>);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PageContent: MainPage,
            userID: null,
            userRole: ["ROLE_USER"],
            userName: null,
            accessToken: null,
            tokenType: null,
            HeaderMenuIndex: '1',
            BreadcrumbByIndex: ['0', '0', '0', '0', '0'],
            PageInfo: { 'id': 0, 'ContractID': 0 }
        };
    }

    GotoPage = (PageName, _state) => {
        console.log(PageName);
        console.log(this.state);
        this.setState({
            PageContent: this.GetPageInfo(PageName, _state)
        })

    }

    GetPageInfo = (PageName, _state) => {
        switch (PageName) {
            case 'MainPage':
                this.setState({ HeaderMenuIndex: '1', BreadcrumbByIndex: ['0', '0', '0', '0', '0'] });
                return MainPage;

            case 'UserInfo':
                this.setState({ HeaderMenuIndex: '2', BreadcrumbByIndex: ['首页', '用户信息', '0', '0', '0'] });
                return (<UserInfoPage _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'Login':
                this.setState({ HeaderMenuIndex: '2', BreadcrumbByIndex: ['首页', '登录', '0', '0', '0'] });
                return (<LoginPage UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'Register':
                this.setState({ HeaderMenuIndex: '2', BreadcrumbByIndex: ['首页', '注册', '0', '0', '0'] });
                return (<RegisterPage UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'RegisterStaff':
                this.setState({ HeaderMenuIndex: '2', BreadcrumbByIndex: ['首页', '注册', '0', '0', '0'] });
                return (<RegisterStaffPage _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);


            case 'SubmitApplication':
                if (this.state.accessToken === null) {
                    alert('请先登录！')
                    return this.GetPageInfo('Login', _state);
                }
                else {
                    this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '提交申请', '0', '0', '0'] });
                    return (<SubmitApplication _state={_state} GotoPage={this.GotoPage} />);
                }
            case 'FunctionList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '上传软件功能列表', '0'] });
                return (<FunctionList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></FunctionList>);
            case 'UserUploadFiles':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '上传文档资料', '0'] });
                return (<UserUploadFiles _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></UserUploadFiles>);
            case 'UserUploadSample':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '上传文档资料', '0'] });
                return (<UserUploadSample _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></UserUploadSample>);
            case 'TadultApplication':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '测试部审核委托', '0'] });
                return (<TadultApplication _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TadultApplication>);
            case 'MktdptApplicationStep1':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '市场部审核委托', '0'] });
                return (<MktdptApplicationStep1 _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></MktdptApplicationStep1>);
            case 'Quotation':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '市场部报价', '0'] });
                return (<Quotation _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Quotation>);
            case 'QuotationFeedback':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '回复报价', '0'] });
                return (<QuotationFeedback _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></QuotationFeedback>);
            case 'MktdptApplicationStep2':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '市场部生成项目编号', '0'] });
                return (<MktdptApplicationStep2 _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></MktdptApplicationStep2>);
            case 'TestAgreement':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '起草测试合同', '0'] });
                return (<TestAgreement _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestAgreement>);
            case 'CheckTA':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '确认履行期限', '0'] });
                return (<CheckTA _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></CheckTA>);
            case 'TrusteeApplication':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '签章受托人部分', '0'] });
                return (<TrusteeApplication _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TrusteeApplication>);
            case 'ClientApplication':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '签章委托人部分', '0'] });
                return (<ClientApplication _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ClientApplication>);
            case 'ConfidentialAgreementPartyB':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '受托人保密协议', '0'] });
                return (<ConfidentialAgreementPartyB _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ConfidentialAgreementPartyB>);
            case 'ConfidentialAgreementPartyA':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '委托人保密协议', '0'] });
                return (<ConfidentialAgreementPartyA _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ConfidentialAgreementPartyA>);
            case 'OfflineSignContract':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '下载并完成合同和保密协议', '0'] });
                return (<OfflineSignContract _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></OfflineSignContract>);

            case 'TestPlan':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件测试方案', '0'] });
                return (<TestPlan _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestPlan>);
            case 'CheckList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写测试报告检查表', '0'] });
                return (<CheckList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></CheckList>);
            case 'QuestionList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件测试问题清单', '0'] });
                return (<QuestionList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></QuestionList>);
            case 'SoftwareDocumentReviewForm':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件文档评审表', '0'] });
                return (<SoftwareDocumentReviewForm _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></SoftwareDocumentReviewForm>);
            case 'TestCase':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写测试用例电子记录', '0'] });
                return (<TestCase _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestCase>);
            case 'TestCheckList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件项目委托测试工作检查表', '0'] });
                return (<TestCheckList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestCheckList>);
            case 'TestRecord':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件测试记录电子记录', '0'] });
                return (<TestRecord _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestRecord>);
            case 'TestReport':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写软件测试报告', '0'] });
                return (<TestReport _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestReport>);
            case 'TestScenarioReviewForm':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '填写测试方案评审表', '0'] });
                return (<TestScenarioReviewForm _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestScenarioReviewForm>);




            case 'ViewApplication':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看测试申请书', '0'] });
                return (<ViewApplication _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewApplication>);
            case 'ViewCfdtagreement':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看保密协议', '0'] });
                return (<ViewCfdtagreement _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewCfdtagreement>);
            case 'ViewContract':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看测试申请书', '0'] });
                return (<ViewContract _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewContract>);
            case 'ViewEntrust':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '0', '0'] });
                return (<ViewEntrust _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewEntrust>);
            case 'ViewEntrustList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '0', '0', '0'] });
                return (<ViewEntrustList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewEntrustList>);
            case 'ViewProjList':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '0', '0', '0'] });
                return (<ViewProjList _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewProjList>);
            case 'ViewFunction':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看功能列表', '0'] });
                return (<ViewFunction _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewFunction>);
            case 'ViewUserFiles':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看文档资料', '0'] });
                return (<ViewUserFiles _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewUserFiles>);
            case 'ViewQuotation':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看报价单', '0'] });
                return (<ViewQuotation _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewQuotation>);
            case 'ViewSignature':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看委托列表', '查看委托', '查看测试合同', '0'] });
                return (<ViewSignature _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewSignature>);
            case 'ViewProject':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '0', '0'] });
                return (<ViewProject _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewProject>);

            case 'ViewTestPlan':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件测试方案', '0'] });
                return (<ViewTestPlan _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewTestPlan>);
            case 'Viewchecklist':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看测试报告检查表', '0'] });
                return (<Viewchecklist _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Viewchecklist>);
            case 'Viewquestionlist':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件测试问题清单', '0'] });
                return (<Viewquestionlist _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Viewquestionlist>);
            case 'Viewsdreviewform':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件文档评审表', '0'] });
                return (<Viewsdreviewform _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Viewsdreviewform>);
            case 'ViewTestCase':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看测试用例电子记录', '0'] });
                return (<ViewTestCase _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewTestCase>);
            case 'Viewtestchecklist':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件项目委托测试工作检查表', '0'] });
                return (<Viewtestchecklist _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Viewtestchecklist>);
            case 'ViewTestRecord':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件测试记录电子记录', '0'] });
                return (<ViewTestRecord _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewTestRecord>);
            case 'ViewTestReport':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看软件测试报告', '0'] });
                return (<ViewTestReport _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewTestReport>);
            case 'Viewtsreviewform':
                this.setState({ HeaderMenuIndex: '3', BreadcrumbByIndex: ['首页', '查看项目列表', '查看项目', '查看测试方案评审表', '0'] });
                return (<Viewtsreviewform _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></Viewtsreviewform>);




            case 'Info1':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '机构信息', '0', '0', '0'] });
                return (<ViewProject _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewProject>);
            case 'Info2':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '资质信息', '0', '0', '0'] });
                return (<TestReport></TestReport>);
            case 'Info3':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '政策法规', '0', '0', '0'] });
                return (<TestScenarioReviewForm _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></TestScenarioReviewForm>);
            case 'Info4':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '业务信息', '0', '0', '0'] });
                return (<ViewTestReport _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></ViewTestReport>);
            case 'Info5':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '新闻资讯', '0', '0', '0'] });
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>新闻资讯</div>);
            case 'Info6':
                this.setState({ HeaderMenuIndex: '4', BreadcrumbByIndex: ['首页', '友情链接', '0', '0', '0'] });
                return (<UserUploadSample _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage}></UserUploadSample>);
        }
        return null;
    }

    UpdateUserInfo = (info, callback = null) => {
        this.setState(info, callback);
        console.log(this.state);
    }

    render() {
        const infoMenu = (<div id='home_headers_infos'><Dropdown overlay={<Menu
            items={[
                { label: (<a onClick={() => { this.GotoPage('Info1', this.state) }}>机构信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info2', this.state) }}>资质信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info3', this.state) }}>政策法规</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info4', this.state) }}>业务信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info5', this.state) }}>新闻资讯</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info6', this.state) }}>友情链接</a>), },
            ]} />} placement="bottom">
            <a onClick={e => e.preventDefault()}><Space style={{ color: 'white' }}>信息<DownOutlined /></Space></a>
        </Dropdown></div>)

        const Breadcrumbitems = {
            0: null,
            "首页": <Breadcrumb.Item><a onClick={() => { this.GotoPage('MainPage', this.state) }}>首页</a></Breadcrumb.Item>,
            "用户信息": <Breadcrumb.Item><a onClick={() => { this.GotoPage('UserInfo', this.state) }}>用户信息</a></Breadcrumb.Item>,
            "登录": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Login', this.state) }}>登录</a></Breadcrumb.Item>,
            "注册": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Register', this.state) }}>注册</a></Breadcrumb.Item>,
            "提交申请": <Breadcrumb.Item><a onClick={() => { this.GotoPage('SubmitApplication', this.state) }}>提交申请</a></Breadcrumb.Item>,
            "上传软件功能列表": <Breadcrumb.Item><a onClick={() => { this.GotoPage('FunctionList', this.state) }}>上传软件功能列表</a></Breadcrumb.Item>,
            "上传文档资料": <Breadcrumb.Item><a onClick={() => { this.GotoPage('UserUploadFiles', this.state) }}>上传文档资料</a></Breadcrumb.Item>,
            "测试部审核委托": <Breadcrumb.Item><a onClick={() => { this.GotoPage('TadultApplication', this.state) }}>测试部审核委托</a></Breadcrumb.Item>,
            "市场部审核委托": <Breadcrumb.Item><a onClick={() => { this.GotoPage('MktdptApplicationStep1', this.state) }}>市场部审核委托</a></Breadcrumb.Item>,
            "市场部报价": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Quotation', this.state) }}>市场部报价</a></Breadcrumb.Item>,
            "回复报价": <Breadcrumb.Item><a onClick={() => { this.GotoPage('QuotationFeedback', this.state) }}>回复报价</a></Breadcrumb.Item>,
            "市场部生成项目编号": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewEntrust', this.state) }}>市场部生成项目编号</a></Breadcrumb.Item>,
            "起草测试合同": <Breadcrumb.Item><a onClick={() => { this.GotoPage('TestAgreement', this.state) }}>起草测试合同</a></Breadcrumb.Item>,
            "确认履行期限": <Breadcrumb.Item><a onClick={() => { this.GotoPage('CheckTA', this.state) }}>确认履行期限</a></Breadcrumb.Item>,
            "签章受托人部分": <Breadcrumb.Item><a onClick={() => { this.GotoPage('TrusteeApplication', this.state) }}>签章受托人部分</a></Breadcrumb.Item>,
            "签章委托人部分": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ClientApplication', this.state) }}>签章委托人部分</a></Breadcrumb.Item>,
            "受托人保密协议": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ConfidentialAgreementPartyB', this.state) }}>受托人保密协议</a></Breadcrumb.Item>,
            "委托人保密协议": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ConfidentialAgreementPartyA', this.state) }}>委托人保密协议</a></Breadcrumb.Item>,
            "下载并完成合同和保密协议": <Breadcrumb.Item><a onClick={() => { this.GotoPage('OfflineSignContract', this.state) }}>下载并完成合同和保密协议</a></Breadcrumb.Item>,

            "查看委托列表": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewEntrustList', this.state) }}>查看委托列表</a></Breadcrumb.Item>,
            "查看委托": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewEntrust', this.state) }}>查看委托</a></Breadcrumb.Item>,
            "查看测试申请书": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewApplication', this.state) }}>查看测试申请书</a></Breadcrumb.Item>,
            "查看功能列表": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewFunction', this.state) }}>查看功能列表</a></Breadcrumb.Item>,
            "查看文档资料": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewUserFiles', this.state) }}>查看文档资料</a></Breadcrumb.Item>,
            "查看报价单": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewQuotation', this.state) }}>查看报价单</a></Breadcrumb.Item>,
            "查看测试合同": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewSignature', this.state) }}>查看测试合同</a></Breadcrumb.Item>,
            "查看保密协议": <Breadcrumb.Item><a onClick={() => { this.GotoPage('ViewCfdtagreement', this.state) }}>查看保密协议</a></Breadcrumb.Item>,

            "机构信息": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info1', this.state) }}>机构信息</a></Breadcrumb.Item>,
            "资质信息": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info2', this.state) }}>资质信息</a></Breadcrumb.Item>,
            "政策法规": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info3', this.state) }}>政策法规</a></Breadcrumb.Item>,
            "业务信息": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info4', this.state) }}>业务信息</a></Breadcrumb.Item>,
            "新闻资讯": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info5', this.state) }}>新闻资讯</a></Breadcrumb.Item>,
            "友情链接": <Breadcrumb.Item><a onClick={() => { this.GotoPage('Info6', this.state) }}>友情链接</a></Breadcrumb.Item>,
        };

        const userFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a id="home_headers_functions_submit_application" onClick={() => { this.GotoPage('SubmitApplication', this.state) }}>提交申请</a>), },
                { label: (<a id="home_headers_functions_view_application" onClick={() => { this.GotoPage('ViewEntrustList', this.state) }}>查看委托</a>), },
                { label: (<a id="home_headers_functions_view_test_application" onClick={() => { this.GotoPage('ViewProjList', this.state) }}>查看项目</a>), },
            ]} />} placement="bottom">
            <a id="home_headers_functions" onClick={e => e.preventDefault()}><Space style={{ color: 'white' }}>操作<DownOutlined /></Space></a>
        </Dropdown>)

        const staffFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a id="home_headers_functions_view_application" onClick={() => { this.GotoPage('ViewEntrustList', this.state) }}>查看委托</a>), },
            ]} />} placement="bottom">
            <a id="home_headers_functions" onClick={e => e.preventDefault()}><Space style={{ color: 'white' }}>操作<DownOutlined /></Space></a>
        </Dropdown>)

        const adminFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a id="home_headers_functions_submit_application" onClick={() => { this.GotoPage('SubmitApplication', this.state) }}>提交申请</a>), },
                { label: (<a id="home_headers_functions_view_application" onClick={() => { this.GotoPage('ViewEntrustList', this.state) }}>查看委托</a>), },
            ]} />} placement="bottom">
            <a id="home_headers_functions" onClick={e => e.preventDefault()}><Space style={{ color: 'white' }}>操作<DownOutlined /></Space></a>
        </Dropdown>)

        return (
            <Layout style={{ overflow: 'hidden' }}>
                <Header style={{ position: "fixed", zIndex: 1, paddingLeft: mobile() ? "0px" : "50px", paddingRight: mobile() ? "0px" : "50px", width: "100%", }}>
                    <Menu
                        style={{ margin: 0, paddingInlineStart: 0 }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        selectedKeys={[this.state.HeaderMenuIndex]}
                        items={new Array(4).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: {
                                0: (<a id="home_headers_mainpage" onClick={() => { this.GotoPage('MainPage', this.state) }}><Space style={{ color: 'white' }}>首页</Space></a>),
                                1: (<a id="home_headers_user" onClick={() => { this.state.accessToken === null ? this.GotoPage('Login', this.state) : this.GotoPage('UserInfo', this.state) }}><Space style={{ color: 'white' }}>{this.state.accessToken === null ? "用户" : this.state.userName}</Space></a>),
                                2: (this.state.userRole[0] == "ROLE_ADMIN") ? adminFunctionMenu : ((this.state.userRole[0] == "ROLE_USER") ? userFunctionMenu : staffFunctionMenu),
                                3: infoMenu,
                            }[index],
                        }))}
                    />
                </Header>
                <Layout style={{ overflowY: 'hidden' }}>
                    <Content className="site-layout" style={{ padding: mobile() ? '0 10px' : '0 50px', marginTop: 64, marginBottom: 70 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {Breadcrumbitems[this.state.BreadcrumbByIndex[0]]}
                            {Breadcrumbitems[this.state.BreadcrumbByIndex[1]]}
                            {Breadcrumbitems[this.state.BreadcrumbByIndex[2]]}
                            {Breadcrumbitems[this.state.BreadcrumbByIndex[3]]}
                            {Breadcrumbitems[this.state.BreadcrumbByIndex[4]]}
                        </Breadcrumb>
                        <Layout onChange={() => { document.body.scrollTop = document.documentElement.scrollTop = 0; }} style={{ overflowY: 'scroll', marginBottom: 100, height: '100%' }}>
                            <div className="site-layout-background" style={{ padding: 0, height: 'fit-content' }}>
                                {this.state.PageContent}
                            </div>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}
export default Home;