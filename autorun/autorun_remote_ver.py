#%%
#初始化
from time import sleep
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import os
options=webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser=webdriver.Chrome(options=options)
browser.maximize_window()
browser.get('http://localhost:3000')
def Login_as_User():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("czy114514")
    browser.find_element_by_id("login_input_password").send_keys("123456")
    browser.find_element_by_id("login_button").click()
def Login_as_mkt():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("mkt1")
    browser.find_element_by_id("login_input_password").send_keys("123456")
    browser.find_element_by_id("login_button").click()
def Login_as_test():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("test1")
    browser.find_element_by_id("login_input_password").send_keys("123456")
    browser.find_element_by_id("login_button").click()
def Login_as_qlty():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("qlty1")
    browser.find_element_by_id("login_input_password").send_keys("123456")
    browser.find_element_by_id("login_button").click()
def Login_as_amin():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("amin")
    browser.find_element_by_id("login_input_password").send_keys("12345678")
    browser.find_element_by_id("login_button").click()
def Logout():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("logout").click()
def Quit_browser():
    browser.quit()
def View_entrustList():
    browser.find_element_by_id("home_headers_functions").click()
    sleep(0.5)
    browser.find_element_by_id("home_headers_functions_view_application").click()
    sleep(0.5)
def View_projectList():
    browser.find_element_by_id("home_headers_functions").click()
    sleep(0.5)
    browser.find_element_by_id("home_headers_functions_view_test_application").click()
    sleep(0.5)
def View_latest_entrust():
    sortButton=browser.find_element_by_class_name("ant-table-column-sorters")
    sortButton.click()
    sleep(0.5)
    viewButtons=browser.find_elements_by_id("view_entrust")
    viewButtons[0].click()
def View_latest_proj():
    sortButton=browser.find_element_by_class_name("ant-table-column-sorters")
    sortButton.click()
    sleep(0.5)
    viewButtons=browser.find_elements_by_id("view_proj")
    viewButtons[0].click()

#%%
#登录
Login_as_User()
sleep(0.5)

# %%
#跳转到用户申请表界面
#请先登录！
browser.find_element_by_id("home_headers_functions").click()
sleep(0.5)
browser.find_element_by_id("home_headers_functions_submit_application").click()

#%%
#自动填写用户申请表
browser.find_element_by_id("测试类型_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("测试类型_软件确认测试").click()
browser.find_element_by_id("测试类型_其他").click()
browser.find_element_by_id("测试类型(其他)").send_keys("某个类型")
browser.find_element_by_id("软件名称").send_keys("测试软件(自动)")
browser.find_element_by_id("版本号").send_keys("1.0.0")
browser.find_element_by_id("委托单位(中文)").send_keys("南京大学软件测试中心")
browser.find_element_by_id("委托单位(英文)").send_keys("NJU SE test center")
browser.find_element_by_id("开发单位").send_keys("SEE GroupA")
browser.find_element_by_id("单位性质_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("单位性质_科研院校").click()
browser.find_element_by_id("软件用户对象描述").send_keys("一般通过网民")
browser.find_element_by_id("主要功能及用途简介").send_keys("没什么用，这里水个300字")
browser.find_element_by_id("测试依据_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("测试依据_GB/T 25000.51-2010").click()
browser.find_element_by_id("测试依据_NST-03-WI13-2011").click()
browser.find_element_by_id("需要测试的技术指标_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("需要测试的技术指标_功能性").click()
browser.find_element_by_id("需要测试的技术指标_易用性").click()
browser.find_element_by_id("软件规模_功能数").send_keys("114514")
browser.find_element_by_id("软件规模_代码行数").send_keys("1919810")
browser.find_element_by_id("软件类型_下拉栏1").click()
sleep(0.1)
browser.find_element_by_id("软件类型_应用软件").click()
browser.find_element_by_id("软件类型_下拉栏2").click()
sleep(0.1)
browser.find_element_by_id("软件类型_应用软件_办公软件").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows版本").send_keys("11")
browser.find_element_by_id("运行环境_客户端_操作系统_Linux").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Linux版本").send_keys("8")
browser.find_element_by_id("运行环境_客户端_内存要求").send_keys("4096")
browser.find_element_by_id("运行环境_客户端_其他要求").send_keys("没什么其他要求了")
browser.find_element_by_id("运行环境_服务器端_硬件_架构_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("运行环境_服务器端_硬件_架构_PC服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_架构_UNIX/Linux服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_内存要求").send_keys("1024")
browser.find_element_by_id("运行环境_服务器端_硬件_硬盘要求").send_keys("256")
browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").send_keys("通电就行")
browser.find_element_by_id("运行环境_服务器端_软件_操作系统").send_keys("Windows")
browser.find_element_by_id("运行环境_服务器端_软件_版本").send_keys("10")
browser.find_element_by_id("运行环境_服务器端_软件_编程语言").send_keys("JSX")
browser.find_element_by_id("运行环境_服务器端_软件_架构_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("运行环境_服务器端_软件_架构_C/S").click()
browser.find_element_by_id("运行环境_服务器端_软件_架构_其他").click()
browser.find_element_by_id("运行环境_服务器端_软件_数据库").send_keys("SQL")
browser.find_element_by_id("运行环境_服务器端_软件_中间件").send_keys("洒家不知道什么是中间件")
browser.find_element_by_id("运行环境_服务器端_软件_其他支撑软件").send_keys("不需要")
browser.find_element_by_id("运行环境_服务器端_软件_版本").send_keys("10")
browser.find_element_by_id("运行环境_网络环境").send_keys("5G")
browser.find_element_by_id("样品和数量_软件介质_在线上传").click()
browser.find_element_by_id("样品和数量_提交的样品_退还给我们").click()
browser.find_element_by_id("希望测试完成时间").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("委托单位信息_电话").send_keys("10086")
browser.find_element_by_id("委托单位信息_传真").send_keys("没有传真")
browser.find_element_by_id("委托单位信息_地址").send_keys("江苏省南京市栖霞区仙林大道163号")
browser.find_element_by_id("委托单位信息_邮编").send_keys("210023")
browser.find_element_by_id("委托单位信息_联系人").send_keys("陈致远")
browser.find_element_by_id("委托单位信息_手机").send_keys("18913936384")
browser.find_element_by_id("委托单位信息_email").send_keys("3067887178@qq.com")
browser.find_element_by_id("委托单位信息_网址").send_keys("https://github.com/NJUCSczy/SE_proj_2021")

#%%
#提交用户申请表
browser.find_element_by_id("提交用户申请表").click()
sleep(2)

#%%
#进入填写软件功能列表界面
View_entrustList()
sleep(2)
View_latest_entrust()
sleep(1)
browser.find_element_by_id("填写软件功能列表").click()
sleep(0.5)

#%%
#填写软件功能列表
browser.find_element_by_id("软件名称").send_keys('测试软件(自动)')
browser.find_element_by_id("版本号").send_keys('1.0.0')
browser.find_element_by_id("添加新功能").click()
browser.find_element_by_id("软件功能").send_keys('啥都能干')
browser.find_element_by_id("添加新项目").click()
browser.find_element_by_id("软件子功能项目").send_keys('项目1')
browser.find_element_by_id("功能说明").send_keys('也是啥都能干')

#%%
#提交软件功能表
browser.find_element_by_id("提交按钮").click()
sleep(2)

#%%
#进入上传软件文档界面
View_entrustList()
sleep(1)
View_latest_entrust()
sleep(1)
browser.find_element_by_id("上传软件文档").click()
sleep(0.5)

#%%
#用户上传软件文档
browser.find_element_by_id("需求文档").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test1.txt")
browser.find_element_by_id("用户文档").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test2.txt")
browser.find_element_by_id("操作文档").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test3.txt")
sleep(0.5)

#%%
#提交软件文档
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#进入提交样品界面
View_entrustList()
sleep(1)
View_latest_entrust()
sleep(1)
browser.find_element_by_id("提交样品").click()
sleep(0.5)

#%%
#用户上传样品文件
browser.find_element_by_id("样品文件").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test4.txt")
browser.find_element_by_id("备注").send_keys('样品的一个备注')
sleep(0.5)

#%%
#提交样品
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#测试部人员登录
Login_as_test()
sleep(1)

#%%
#进入测试部审核界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("测试部审核").click()
sleep(0.5)

#%%
#自动填写测试部审核表
browser.find_element_by_id("密级_机密").click()
browser.find_element_by_id("查杀病毒_已完成").click()
browser.find_element_by_id("材料检查_测试样品_源代码").click()
browser.find_element_by_id("材料检查_测试样品_可执行文件").click()
browser.find_element_by_id("材料检查_需求文档_项目计划任务书").click()
browser.find_element_by_id("材料检查_需求文档_需求分析报告").click()
browser.find_element_by_id("材料检查_需求文档_合同").click()
browser.find_element_by_id("材料检查_用户文档_用户手册").click()
browser.find_element_by_id("材料检查_用户文档_用户指南").click()
browser.find_element_by_id("材料检查_操作文档_操作员手册").click()
browser.find_element_by_id("材料检查_操作文档_安装手册").click()
browser.find_element_by_id("材料检查_操作文档_诊断手册").click()
browser.find_element_by_id("材料检查_操作文档_支持手册").click()
browser.find_element_by_id("材料检查_其他").send_keys('无')
browser.find_element_by_id("确认意见_可以测试").click()
sleep(0.5)

#%%
#测试部提交审核
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#市场部人员登录
Login_as_mkt()
sleep(1)

#%%
#进入市场部审核界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部审核").click()
sleep(0.5)

#%%
#市场部审核
browser.find_element_by_id("市场部受理意见_受理").click()
sleep(0.5)
browser.find_element_by_id("市场部备注").send_keys('审核没问题')
sleep(0.5)

#%%
#市场部提交审核
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#进入市场部报价界面
View_entrustList()
sleep(1)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("发起议价").click()
sleep(0.5)

#%%
#市场部填写报价单
browser.find_element_by_id("添加新项目").click()
browser.find_element_by_id("软件名称").send_keys("测试软件(自动)")
browser.find_element_by_id("项目").send_keys("项目1")
browser.find_element_by_id("分项").send_keys("分项1")
browser.find_element_by_id("单价").send_keys("123")
browser.find_element_by_id("说明").send_keys("说明")
browser.find_element_by_id("行合计").send_keys("123")
browser.find_element_by_id("小计").send_keys("123")
browser.find_element_by_id("税率").send_keys("9")
browser.find_element_by_id("总计").send_keys("142")

#%%
#市场部提交报价单
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#用户登录
Login_as_User()
sleep(1)

#%%
#进入用户回复报价界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("查看议价").click()
sleep(0.5)

#%%
#用户回复报价单
browser.find_element_by_id("用户反馈_接受").click()
browser.find_element_by_id("委托人签字").send_keys("cc")
browser.find_element_by_id("委托人签字日期").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()
sleep(0.5)

#%%
#提交回复报价单
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#市场部人员登录
Login_as_mkt()
sleep(1)

#%%
#进入市场部完成测试申请书界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("完成申请表").click()
sleep(0.5)

#%%
#市场部填写测试项目编号
browser.find_element_by_id("测试项目编号").send_keys("123456")
sleep(0.5)

#%%
#提交测试项目编号
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#进入发起议价界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("起草测试合同，拟定履行期限").click()
sleep(0.5)

#%%
#市场部填写测试合同前半部分以及履行日期
browser.find_element_by_id("受托方(乙方)").send_keys("cc")
browser.find_element_by_id("签订地点").send_keys("南京大学")
browser.find_element_by_id("签订日期").click()
sleep(0.2)
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("履行期限").send_keys("30")
browser.find_element_by_id("整改次数上限").send_keys("5")
browser.find_element_by_id("整改时间上限").send_keys("6")
sleep(0.5)

#%%
#提交测试合同前半部分以及履行日期
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#用户登录
Login_as_User()
sleep(1)

#%%
#进入用户查看履行日期界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("查看履行日期").click()
sleep(0.5)

#%%
#用户接受履行期限
browser.find_element_by_id("意见").send_keys("没毛病")
browser.find_element_by_id("态度_下拉栏").click()
sleep(0.2)
browser.find_element_by_id("态度_下拉栏_接受").click()
sleep(0.5)

#%%
#用户提交接受履行期限
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#市场部人员登录
Login_as_mkt()
sleep(1)

#%%
#进入市场部填写签章界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部填写签章").click()
sleep(0.5)

#%%
#市场部填写合同签章
browser.find_element_by_id("单位全称").send_keys("南京大学软件测试中心")
browser.find_element_by_id("授权代表").send_keys("czy")
browser.find_element_by_id("联系人").send_keys("czy")
browser.find_element_by_id("通讯地址").send_keys("南京大学仙林校区")
browser.find_element_by_id("邮编").send_keys("210046")
browser.find_element_by_id("电话").send_keys("10086")
browser.find_element_by_id("传真").send_keys("62661627")
browser.find_element_by_id("开户银行").send_keys("中国工商银行股份有限公司南京汉口路分理处")
browser.find_element_by_id("户名").send_keys("南京大学")
browser.find_element_by_id("账号").send_keys("4301011309001041656")
sleep(0.5)

#%%
#市场部提交合同签章
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#用户登录
Login_as_User()
sleep(1)

#%%
#进入用户填写合同签章界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("客户填写签章").click()
sleep(0.5)

#%%
#用户填写合同签章
browser.find_element_by_id("单位全称").send_keys("南京大学")
browser.find_element_by_id("授权代表").send_keys("cc")
browser.find_element_by_id("联系人").send_keys("cc")
browser.find_element_by_id("通讯地址").send_keys("南京大学仙林校区")
browser.find_element_by_id("邮编").send_keys("210046")
browser.find_element_by_id("电话").send_keys("10086")
browser.find_element_by_id("传真").send_keys("62661627")
browser.find_element_by_id("开户银行").send_keys("中国招商银行")
browser.find_element_by_id("账号").send_keys("1234567890")
sleep(0.5)

#%%
#用户提交合同签章
browser.find_element_by_id("提交").click()
sleep(12)

#%%
#登出
Logout()
sleep(1)

#%%
#市场部人员登录
Login_as_mkt()
sleep(1)

#%%
#进入市场部下载并完成合同和保密协议界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部下载并完成合同和保密协议").click()
sleep(0.5)

#%%
#市场部上传完成的合同和保密协议
browser.find_element_by_id("签章").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test1.txt")
browser.find_element_by_id("保密协议").send_keys(os.path.split(os.path.realpath(__file__))[0]+"/test_files/test2.txt")

#%%
#市场部提交完成的合同和保密协议
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#测试部人员登录
Login_as_test()
sleep(1)

#%%
#进入测试部填写软件测试方案界面
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件测试方案").click()
sleep(0.5)

#%%
#测试部填写软件测试方案
browser.find_element_by_id("basic_版本号").send_keys(114514)
browser.find_element_by_id("添加新文档修改记录").click()
browser.find_element_by_id("basic_文档修改记录_0_版本号").send_keys(1919810)
browser.find_element_by_id("basic_文档修改记录_0_日期").click()
sleep(0.2)
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("basic_文档修改记录_0_AMD").send_keys('M')
browser.find_element_by_id("basic_文档修改记录_0_修订者").send_keys('czy')
browser.find_element_by_id("basic_文档修改记录_0_说明").send_keys('已完成')
browser.find_element_by_id("basic_标识").send_keys('test1')
browser.find_element_by_id("basic_系统概述").send_keys('此系统仅用于测试')
browser.find_element_by_id("basic_文档概述").send_keys('文档齐全')
browser.find_element_by_id("basic_基线").send_keys('baseline')
browser.find_element_by_id("basic_硬件").send_keys('联想')
browser.find_element_by_id("basic_软件").send_keys('windows11')
browser.find_element_by_id("basic_其他").send_keys('无')
browser.find_element_by_id("basic_参与组织").send_keys('南京大学')
browser.find_element_by_id("basic_人员").send_keys('czy')
browser.find_element_by_id("basic_总体设计").send_keys('没设计')
browser.find_element_by_id("basic_测试级别").send_keys('最低级')
browser.find_element_by_id("basic_测试类别").send_keys('随便测测')
browser.find_element_by_id("basic_一般测试条件").send_keys('没条件')
browser.find_element_by_id("basic_计划执行的测试").send_keys('所有的')
browser.find_element_by_id("basic_测试用例").send_keys('所有')
browser.find_element_by_id("basic_测试进度表_制定测试计划_工作量").send_keys('没计划')
browser.find_element_by_id("basic_测试进度表_制定测试计划_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[1].click()
browser.find_element_by_id("basic_测试进度表_制定测试计划_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[2].click()
browser.find_element_by_id("basic_测试进度表_设计测试_工作量").send_keys('很少')
browser.find_element_by_id("basic_测试进度表_设计测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[3].click()
browser.find_element_by_id("basic_测试进度表_设计测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[4].click()
browser.find_element_by_id("basic_测试进度表_执行测试_工作量").send_keys('不多')
browser.find_element_by_id("basic_测试进度表_执行测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[5].click()
browser.find_element_by_id("basic_测试进度表_执行测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[6].click()
browser.find_element_by_id("basic_测试进度表_评估测试_工作量").send_keys('很少')
browser.find_element_by_id("basic_测试进度表_评估测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[7].click()
browser.find_element_by_id("basic_测试进度表_评估测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[8].click()
browser.find_element_by_id("basic_需求的可追踪性").send_keys('可追踪')

#%%
#测试部提交软件测试方案
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#质检部人员登录
Login_as_qlty()
sleep(1)

#%%
#进入质检部填写测试方案评审表界面
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写测试方案评审表").click()
sleep(0.5)

#%%
#质检部填写测试方案评审表界面
browser.find_element_by_id("测试方案评审表_软件名称").send_keys('测试软件(自动)')
browser.find_element_by_id("测试方案评审表_版本号").send_keys('114514')
browser.find_element_by_id("测试方案评审表_项目编号").send_keys('1919810')
browser.find_element_by_id("测试方案评审表_测试类别").send_keys('随便测试')
browser.find_element_by_id("测试方案评审表_pass_0").click()
browser.find_element_by_id("测试方案评审表_pass_1").click()
browser.find_element_by_id("测试方案评审表_pass_2").click()
browser.find_element_by_id("测试方案评审表_pass_3").click()
browser.find_element_by_id("测试方案评审表_pass_4").click()
browser.find_element_by_id("测试方案评审表_pass_5").click()
browser.find_element_by_id("测试方案评审表_pass_6").click()
browser.find_element_by_id("测试方案评审表_pass_7").click()
browser.find_element_by_id("测试方案评审表_date_0").click()
sleep(0.2)
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("测试方案评审表_date_1").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[1].click()
browser.find_element_by_id("测试方案评审表_date_2").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[2].click()
browser.find_element_by_id("测试方案评审表_date_3").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[3].click()
browser.find_element_by_id("测试方案评审表_date_4").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[4].click()
browser.find_element_by_id("测试方案评审表_opinion_0").send_keys('没问题')
browser.find_element_by_id("测试方案评审表_sign_0").send_keys('czy0')
browser.find_element_by_id("测试方案评审表_opinion_1").send_keys('没问题')
browser.find_element_by_id("测试方案评审表_sign_1").send_keys('czy1')
browser.find_element_by_id("测试方案评审表_opinion_2").send_keys('没问题')
browser.find_element_by_id("测试方案评审表_sign_2").send_keys('czy2')
browser.find_element_by_id("测试方案评审表_opinion_3").send_keys('没问题')
browser.find_element_by_id("测试方案评审表_sign_3").send_keys('czy3')
browser.find_element_by_id("测试方案评审表_opinion_4").send_keys('没问题')
browser.find_element_by_id("测试方案评审表_sign_4").send_keys('czy4')

#%%
#质检部提交测试方案评审表
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)

#%%
#测试部人员登录
Login_as_test()
sleep(1)

#%%
#进入测试部填写测试用例界面
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写测试用例").click()
sleep(0.5)

#%%
#测试部填写测试用例
browser.find_element_by_id("添加新测试用例").click()
browser.find_element_by_id("basic_测试用例_0_测试分类").send_keys('不知道什么分类')
browser.find_element_by_id("basic_测试用例_0_ID").send_keys('1')
browser.find_element_by_id("basic_测试用例_0_测试用例设计说明").send_keys('无')
browser.find_element_by_id("basic_测试用例_0_与本测试用例有关的规约说明").send_keys('说明')
browser.find_element_by_id("basic_测试用例_0_预期的结果").send_keys('正常结果')
browser.find_element_by_id("basic_测试用例_0_测试用例设计者").send_keys('瓦塔西')
browser.find_element_by_id("basic_测试用例_0_测试时间").click()
sleep(0.2)
browser.find_element_by_class_name("ant-picker-today-btn").click()

#%%
#测试部提交测试用例
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#进入测试部填写测试用例记录界面
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件测试记录").click()
sleep(0.5)


#%%
# 填写软件测试记录(电子记录)
browser.find_element_by_id("添加新软件测试记录").click()
browser.find_element_by_id("测试分类_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("测试分类_可靠性测试").click()
browser.find_element_by_id("basic_软件测试记录_0_序号").send_keys("1")
browser.find_element_by_id("basic_软件测试记录_0_测试特性").send_keys("无")
browser.find_element_by_id("basic_软件测试记录_0_测试用例设计说明").send_keys("提高泛用性")
browser.find_element_by_id("basic_软件测试记录_0_与本测试用例有关的规约说明").send_keys("1e9")
browser.find_element_by_id("basic_软件测试记录_0_前提条件").send_keys("24h通电")
browser.find_element_by_id("basic_软件测试记录_0_测试用例执行过程").send_keys("多组分次执行")
sleep(0.5)
browser.find_element_by_id("basic_软件测试记录_0_预期的结果").send_keys("预期通过90%")
browser.find_element_by_id("basic_软件测试记录_0_测试用例设计者").send_keys("lys")
browser.find_element_by_id("basic_软件测试记录_0_实际结果").send_keys("通过97%")
browser.find_element_by_id("basic_软件测试记录_0_是否与预期结果一致").send_keys("基本一致")
browser.find_element_by_id("basic_软件测试记录_0_相关的BUG编号").send_keys("1154")
browser.find_element_by_id("basic_软件测试记录_0_用例执行者").send_keys("czy")
browser.find_element_by_id("basic_软件测试记录_0_执行测试时间").click()
browser.find_element_by_id("basic_软件测试记录_0_执行测试时间").send_keys("2022-09-23\n")
browser.find_element_by_id("basic_软件测试记录_0_确认人").send_keys("czy")


#%%
#提交软件测试记录
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#进入填写软件测试问题清单界面
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件测试问题清单").click()
sleep(0.5)

#%%
#填写软件测试问题清单
browser.find_element_by_id("添加新项目").click()
browser.find_element_by_id("软件测试问题清单_项目列表_0_问题(缺陷)简要描述").send_keys("无法承载1e8级压力")
browser.find_element_by_id("软件测试问题清单_项目列表_0_对应需求条目").send_keys("压力测试")
browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷的初始条件").send_keys("高压力测试")
browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷用例及具体操作路径（要具体）").send_keys("通过搭载1e8级模拟用户")
browser.find_element_by_id("软件测试问题清单_项目列表_0_关联用例").send_keys("无")
browser.find_element_by_id("软件测试问题清单_项目列表_0_时间").click()
sleep(0.5)
browser.find_element_by_id("软件测试问题清单_项目列表_0_时间").send_keys("2022-09-23 19:00:03\n")
browser.find_element_by_id("软件测试问题清单_项目列表_0_责任人").send_keys("czy")
browser.find_element_by_id("软件测试问题清单_项目列表_0_修改建议").send_keys("提高测试压力")

#%%
# 提交软件测试问题清单
browser.find_element_by_id("提交").click()
sleep(2)

#%%
# 进入填写软件文档评审表
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件文档评审表").click()
sleep(0.5)

#%%
# 填写软件文档评审表
browser.find_element_by_id("软件文档评审表_软件名称").send_keys("kuguo音乐")
browser.find_element_by_id("软件文档评审表_版本号").send_keys("10.0.03")
browser.find_element_by_id("软件文档评审表_评审人").send_keys("czy")
browser.find_element_by_id("软件文档评审表_软件名称").send_keys("kuguo音乐")
browser.find_element_by_id("软件文档评审表_评审完成时间").send_keys("2022-09-22\n")
sleep(0.5)
browser.find_element_by_id("软件文档评审表_result_1").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_1").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_2").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_2").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_3").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_3").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_4").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_4").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_5").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_5").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_6").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_6").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_7").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_7").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_8").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_8").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_9").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_9").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_10").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_10").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_11").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_11").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_12").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_12").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_13").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_13").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_14").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_14").send_keys("无")

sleep(0.5)
browser.find_element_by_id("软件文档评审表_result_16").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_16").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_17").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_17").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_18").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_18").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_19").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_19").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_20").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_20").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_21").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_21").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_22").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_22").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_23").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_23").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_24").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_24").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_25").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_25").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_26").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_26").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_27").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_27").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_28").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_28").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_29").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_29").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_30").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_30").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_31").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_31").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_32").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_32").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_33").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_33").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_34").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_34").send_keys("无")
browser.find_element_by_id("软件文档评审表_result_35").send_keys("合格")
browser.find_element_by_id("软件文档评审表_description_35").send_keys("无")


browser.find_element_by_id("软件文档评审表_检查人").send_keys("lys")
#%%
# 提交软件文档评审表
browser.find_element_by_id("提交").click()
sleep(2)

# %%
#关闭网页
Quit_browser()
# %%
#测试记录
# browser.find_element_by_id("添加新软件测试记录").click()
# browser.find_element_by_id("测试分类").send_keys("安全测试1")
# browser.find_element_by_id("序号").send_keys("1")
# browser.find_element_by_id("测试用例设计说明").send_keys("安全测试2")
# browser.find_element_by_id("与本测试用例有关的规约说明").send_keys("安全测试3")
# browser.find_element_by_id("前提条件").send_keys("安全测试4")
# browser.find_element_by_id("测试用例执行过程").send_keys("安全测试5")
# browser.find_element_by_id("预期的结果").send_keys("正常")
# browser.find_element_by_id("测试用例设计者").send_keys("徐林")
# browser.find_element_by_id("实际结果").send_keys("不正常")
# browser.find_element_by_id("是否与预期结果一致").send_keys("否")
# browser.find_element_by_id("相关的BUG编号").send_keys("2")
# browser.find_element_by_id("用例执行者").send_keys("徐林")
# browser.find_element_by_id("执行测试时间").click()
# sleep(0.5)
# browser.find_element_by_class_name("ant-picker-today-btn").click()
# browser.find_element_by_id("确认人").send_keys("徐林")

# %%
