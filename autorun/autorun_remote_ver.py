#%%
#初始化
from time import sleep
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import os
import logging
import datetime
INFO = 1
DEBUG = 2
WARNING = 3
ERROR = 4
CRITICAL = 5
curr_time = datetime.datetime.now()
time_str = datetime.datetime.strftime(curr_time,'%Y%m%d-%H%M%S')
logname = 'log/test' + time_str + '.log'
logging.basicConfig(filename=logname,level=logging.INFO)
options=webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser=webdriver.Chrome(options=options)
browser.maximize_window()
browser.get('http://localhost:3000')
flag = (browser == None)
if flag:
    logging.critical('404 NOT FOUND')
else:
    logging.info('Website FOUND.')
def log(flag,name,mode,alert):
    _passname = name + ' PASS'
    _alert = name + ' ' + alert
    if flag:
        logging.info(_passname)
    elif mode == DEBUG:# 事实上这里是不会显示的，原因在于selenium的debug信息过多设置的消息等级为info
        logging.debug(_alert)
    elif mode == WARNING:
        logging.warning(_alert)
    elif mode == ERROR:
        logging.error(_alert)
    elif mode == CRITICAL:
        logging.critical(_alert)
def Login_as_User():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_username").send_keys("yk1111")
    browser.find_element_by_id("login_input_password").send_keys("yk1111")
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
browser.find_element_by_id("测试类型(其他)").send_keys("压力测试")
browser.find_element_by_id("软件名称").send_keys("shuaigou音乐")
browser.find_element_by_id("版本号").send_keys("1.0.0")
browser.find_element_by_id("委托单位(中文)").send_keys("南京大学软件测试中心")
browser.find_element_by_id("委托单位(英文)").send_keys("NJU SE test center")
browser.find_element_by_id("开发单位").send_keys("SE GroupA")
browser.find_element_by_id("单位性质_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("单位性质_科研院校").click()
browser.find_element_by_id("软件用户对象描述").send_keys("手机、电脑等客户端分享、制作、热爱音乐的用户")
browser.find_element_by_id("主要功能及用途简介").send_keys("播放音乐")
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
browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").send_keys("4GB内存以上")
browser.find_element_by_id("运行环境_服务器端_软件_操作系统").send_keys("Windows")
browser.find_element_by_id("运行环境_服务器端_软件_编程语言").send_keys("JSX")
browser.find_element_by_id("运行环境_服务器端_软件_架构_下拉栏").click()
sleep(0.1)
browser.find_element_by_id("运行环境_服务器端_软件_架构_C/S").click()
browser.find_element_by_id("运行环境_服务器端_软件_架构_其他").click()
browser.find_element_by_id("运行环境_服务器端_软件_数据库").send_keys("SQL")
browser.find_element_by_id("运行环境_服务器端_软件_中间件").send_keys("无中间件")
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

flag = browser.find_element_by_id("软件名称").get_attribute('value') == "shuaigou音乐"
log(flag,'Software Name',ERROR,'not right')
flag = browser.find_element_by_id("版本号").get_attribute('value') == "1.0.0"
log(flag,'Build Number',ERROR,'not right')
flag = browser.find_element_by_id("委托单位(中文)").get_attribute('value') == "南京大学软件测试中心"
log(flag,'Trustee(CN)',ERROR,'not right')
flag = browser.find_element_by_id("委托单位(英文)").get_attribute('value') == "NJU SE test center"
log(flag,'Trustee(EN)',ERROR,'not right')
flag = browser.find_element_by_id("开发单位").get_attribute('value') == "SE GroupA"
log(flag,'Development Unit',ERROR,'not right')
flag = browser.find_element_by_id("软件用户对象描述").get_attribute('value') == "手机、电脑等客户端分享、制作、热爱音乐的用户"
log(flag,'User Object',ERROR,'not right')
flag = browser.find_element_by_id("主要功能及用途简介").get_attribute('value') == "播放音乐"
log(flag,'Main Function',ERROR,'not right')
flag = browser.find_element_by_id("软件规模_功能数").get_attribute('value') == "114514"
log(flag,'Function Number',ERROR,'not right')
flag = browser.find_element_by_id("软件规模_代码行数").get_attribute('value') == "1919810"
log(flag,'Code Number',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_客户端_操作系统_Windows版本").get_attribute('value') == "11"
log(flag,'Edition of Runtime Environment Client Windows System',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_客户端_操作系统_Linux版本").get_attribute('value') == "8"
log(flag,'Edition of Runtime Environment Client Linux System',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_客户端_内存要求").get_attribute('value') == "4096"
log(flag,'Memory Requirments of Runtime Environment Client ',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_客户端_其他要求").get_attribute('value') == "没什么其他要求了"
log(flag,'Other Requirments of Runtime Environment Client ',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_硬件_内存要求").get_attribute('value') == "1024"
log(flag,'Memory Requirments of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_硬件_硬盘要求").get_attribute('value') == "256"
log(flag,'HDD Requirments of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").get_attribute('value') == "4GB内存以上"
log(flag,'Other Requirments of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_操作系统").get_attribute('value') == "Windows"
log(flag,'Runtime Environment Server OS System',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_编程语言").get_attribute('value') == "JSX"
log(flag,'Programming Language of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_数据库").get_attribute('value') == "SQL"
log(flag,'Runtime Environment Server Database',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_中间件").get_attribute('value') == "无中间件"
log(flag,'Runtime Environment Server Middlepart',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_其他支撑软件").get_attribute('value') == "不需要"
log(flag,'Runtime Environment Server Other Supporting Software',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_版本").get_attribute('value') == "10"
log(flag,'Edition of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_网络环境").get_attribute('value') == "5G"
log(flag,'Runtime Network Environment',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_电话").get_attribute('value') == "10086"
log(flag,'Trustee Telephone',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_传真").get_attribute('value') == "没有传真"
log(flag,'Trustee Fax',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_地址").get_attribute('value') == "江苏省南京市栖霞区仙林大道163号"
log(flag,'Trustee Address',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_邮编").get_attribute('value') == "210023"
log(flag,'Trustee Post Code',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_联系人").get_attribute('value') == "陈致远"
log(flag,'Trustee Liaison Man',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_手机").get_attribute('value') == "18913936384"
log(flag,'Trustee Liaison Man Phone Number',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_email").get_attribute('value') == "3067887178@qq.com"
log(flag,'Trustee Email',ERROR,'not right')
flag = browser.find_element_by_id("委托单位信息_网址").get_attribute('value') == "https://github.com/NJUCSczy/SE_proj_2021"
log(flag,'Trustee Web Address',ERROR,'not right')


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
browser.find_element_by_id("软件名称").send_keys('shuaigou音乐')
browser.find_element_by_id("版本号").send_keys('1.0.0')
browser.find_element_by_id("添加新功能").click()
browser.find_element_by_id("软件功能").send_keys('播放音乐')
browser.find_element_by_id("添加新项目").click()
browser.find_element_by_id("软件子功能项目").send_keys('项目1')
browser.find_element_by_id("功能说明").send_keys('保护客户信息')
flag = browser.find_element_by_id("软件名称").get_attribute('value') == 'shuaigou音乐'
log(flag,'Software Name',ERROR,'not right')
flag = browser.find_element_by_id("版本号").get_attribute('value') == '1.0.0'
log(flag,'Software Edition',ERROR,'not right')
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
browser.find_element_by_id("备注").send_keys('第四版样本文件')
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
browser.find_element_by_id("添加新样品").click()
browser.find_element_by_id("样品名称").send_keys('样本1')
browser.find_element_by_id("样品检查_样品状态").send_keys('检查中')
browser.find_element_by_id("样品检查_来样日期").click()
sleep(0.5)
browser.find_element_by_id("样品检查_来样日期").send_keys('2022-03-29\n')
browser.find_element_by_id("确认意见_可以测试").click()
sleep(0.5)
flag = browser.find_element_by_id("材料检查_其他").get_attribute('value') == '无'
log(flag,'Material Check',ERROR,'not right')
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
flag = browser.find_element_by_id("市场部备注").get_attribute('value') == '审核没问题'
log(flag,'Market Department Check',ERROR,'not right')

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
browser.find_element_by_id("软件名称").send_keys("shuaigou音乐")
browser.find_element_by_id("项目").send_keys("项目1")
browser.find_element_by_id("分项").send_keys("分项1")
browser.find_element_by_id("单价").send_keys("123")
browser.find_element_by_id("说明").send_keys("说明")
browser.find_element_by_id("行合计").send_keys("123")
browser.find_element_by_id("小计").send_keys("123")
browser.find_element_by_id("税率").send_keys("9")
browser.find_element_by_id("总计").send_keys("142")
flag = browser.find_element_by_id("软件名称").get_attribute('value') == 'shuaigou音乐'
log(flag,'Software Name',ERROR,'not right')
flag = browser.find_element_by_id("项目").get_attribute('value') == '项目1'
log(flag,'Subject',ERROR,'not right')
flag = browser.find_element_by_id("分项").get_attribute('value') == '分项1'
log(flag,'Subitem',ERROR,'not right')
flag = browser.find_element_by_id("单价").get_attribute('value') == '123'
log(flag,'Price',ERROR,'not right')
flag = browser.find_element_by_id("说明").get_attribute('value') == '说明'
log(flag,'Explain',ERROR,'not right')
flag = browser.find_element_by_id("行合计").get_attribute('value') == '123'
log(flag,'Line Total',ERROR,'not right')
flag = browser.find_element_by_id("小计").get_attribute('value') == '123'
log(flag,'Subtotal',ERROR,'not right')
flag = browser.find_element_by_id("税率").get_attribute('value') == '9'
log(flag,'Tax Rate',ERROR,'not right')
flag = browser.find_element_by_id("总计").get_attribute('value') == '142'
log(flag,'Total',ERROR,'not right')
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
flag = browser.find_element_by_id("委托人签字").get_attribute('value') == 'cc'
log(flag,'Sign',ERROR,'not right')
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
curr_time = datetime.datetime.now()
pronum = datetime.datetime.strftime(curr_time,'%Y%m%d%H%M%S')
browser.find_element_by_id("测试项目编号").send_keys(pronum)
sleep(0.5)
flag = browser.find_element_by_id("测试项目编号").get_attribute('value') == pronum
log(flag,'Trial Project Number',ERROR,'not right')

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

flag = browser.find_element_by_id("受托方(乙方)").get_attribute('value') == "cc"
log(flag,'Trustee Name',ERROR,'not right')

flag = browser.find_element_by_id("签订地点").get_attribute('value') == '南京大学'
log(flag,'Signing Address',ERROR,'not right')

flag = browser.find_element_by_id("履行期限").get_attribute('value') == '30'
log(flag,'Alternation Time',ERROR,'not right')

flag = browser.find_element_by_id("整改次数上限").get_attribute('value') == '5'
log(flag,'Alternation Upper Limit',ERROR,'not right')

flag = browser.find_element_by_id("整改时间上限").get_attribute('value') == '6'
log(flag,'Alternation Time Upper Limit',ERROR,'not right')

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
browser.find_element_by_id("意见").send_keys("同意")

flag = browser.find_element_by_id("意见").get_attribute('value') == '同意'
log(flag,'Suggestion',ERROR,'not right')

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

flag = browser.find_element_by_id("单位全称").get_attribute('value') == '南京大学软件测试中心'
log(flag,'Total Name',ERROR,'not right')
flag = browser.find_element_by_id("授权代表").get_attribute('value') == 'czy'
log(flag,'Deligate',ERROR,'not right')
flag = browser.find_element_by_id("联系人").get_attribute('value') == 'czy'
log(flag,'Liaison Man',ERROR,'not right')
flag = browser.find_element_by_id("通讯地址").get_attribute('value') == '南京大学仙林校区'
log(flag,'Liaison Address',ERROR,'not right')
flag = browser.find_element_by_id("邮编").get_attribute('value') == '210046'
log(flag,'Postal Code',ERROR,'not right')
flag = browser.find_element_by_id("电话").get_attribute('value') == '10086'
log(flag,'Phone Number',ERROR,'not right')
flag = browser.find_element_by_id("传真").get_attribute('value') == '62661627'
log(flag,'Fax',ERROR,'not right')
flag = browser.find_element_by_id("开户银行").get_attribute('value') == '中国工商银行股份有限公司南京汉口路分理处'
log(flag,'Bank',ERROR,'not right')
flag = browser.find_element_by_id("户名").get_attribute('value') == '南京大学'
log(flag,'Account',ERROR,'not right')
flag = browser.find_element_by_id("账号").get_attribute('value') == '4301011309001041656'
log(flag,'Account',ERROR,'not right')

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

flag = browser.find_element_by_id("单位全称").get_attribute('value') == '南京大学'
log(flag,'Total Name',ERROR,'not right')
flag = browser.find_element_by_id("授权代表").get_attribute('value') == 'cc'
log(flag,'Deligate',ERROR,'not right')
flag = browser.find_element_by_id("联系人").get_attribute('value') == 'cc'
log(flag,'Liaison Man',ERROR,'not right')
flag = browser.find_element_by_id("通讯地址").get_attribute('value') == '南京大学仙林校区'
log(flag,'Liaison Address',ERROR,'not right')
flag = browser.find_element_by_id("邮编").get_attribute('value') == '210046'
log(flag,'Postal Code',ERROR,'not right')
flag = browser.find_element_by_id("电话").get_attribute('value') == '10086'
log(flag,'Phone Number',ERROR,'not right')
flag = browser.find_element_by_id("传真").get_attribute('value') == '62661627'
log(flag,'Fax',ERROR,'not right')
flag = browser.find_element_by_id("开户银行").get_attribute('value') == '中国招商银行'
log(flag,'Bank',ERROR,'not right')
flag = browser.find_element_by_id("账号").get_attribute('value') == '1234567890'
log(flag,'Account',ERROR,'not right')

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
browser.find_element_by_id("basic_版本号").send_keys('114514')
flag = browser.find_element_by_id("basic_版本号").get_attribute('value') == '114514'
log(flag,'basic_version_number',ERROR,'not right')

browser.find_element_by_id("添加新文档修改记录").click()

browser.find_element_by_id("basic_文档修改记录_0_版本号").send_keys('1919810')
flag = browser.find_element_by_id("basic_文档修改记录_0_版本号").get_attribute('value') == '1919810'
log(flag,'basic_document_modification_record_0_version_number',ERROR,'not right')

browser.find_element_by_id("basic_文档修改记录_0_日期").click()
sleep(0.2)
browser.find_element_by_class_name("ant-picker-today-btn").click()

browser.find_element_by_id("basic_文档修改记录_0_AMD").send_keys('M')
flag = browser.find_element_by_id("basic_文档修改记录_0_AMD").get_attribute('value') == 'M'
log(flag,'basic_document_modification_record_0_AMD',ERROR,'not right')

browser.find_element_by_id("basic_文档修改记录_0_修订者").send_keys('czy')
flag = browser.find_element_by_id("basic_文档修改记录_0_修订者").get_attribute('value') == 'czy'
log(flag,'basic_document_modification_record_0_riviser',ERROR,'not right')

browser.find_element_by_id("basic_文档修改记录_0_说明").send_keys('已完成')
flag = browser.find_element_by_id("basic_文档修改记录_0_说明").get_attribute('value') == '已完成'
log(flag,'basic_document_modification_record_0_illustration',ERROR,'not right')

browser.find_element_by_id("basic_标识").send_keys('test1')
flag = browser.find_element_by_id("basic_标识").get_attribute('value') == 'test1'
log(flag,'basic_identification',ERROR,'not right')

browser.find_element_by_id("basic_系统概述").send_keys('此系统仅用于测试')
flag = browser.find_element_by_id("basic_系统概述").get_attribute('value') == '此系统仅用于测试'
log(flag,'basic_system_overview',ERROR,'not right')

browser.find_element_by_id("basic_文档概述").send_keys('文档齐全')
flag = browser.find_element_by_id("basic_文档概述").get_attribute('value') == '文档齐全'
log(flag,'basic_document_overview',ERROR,'not right')

browser.find_element_by_id("basic_基线").send_keys('baseline')
flag = browser.find_element_by_id("basic_基线").get_attribute('value') == 'baseline'
log(flag,'basic_baseline',ERROR,'not right')

browser.find_element_by_id("basic_硬件").send_keys('联想')
flag = browser.find_element_by_id("basic_硬件").get_attribute('value') == '联想'
log(flag,'basic_hardware',ERROR,'not right')

browser.find_element_by_id("basic_软件").send_keys('windows11')
flag = browser.find_element_by_id("basic_软件").get_attribute('value') == 'windows11'
log(flag,'basic_software',ERROR,'not right')

browser.find_element_by_id("basic_其他").send_keys('无')
flag = browser.find_element_by_id("basic_其他").get_attribute('value') == '无'
log(flag,'basic_others',ERROR,'not right')

browser.find_element_by_id("basic_参与组织").send_keys('南京大学')
flag = browser.find_element_by_id("basic_参与组织").get_attribute('value') == '南京大学'
log(flag,'basic_participating_organizations',ERROR,'not right')

browser.find_element_by_id("basic_人员").send_keys('czy')
flag = browser.find_element_by_id("basic_人员").get_attribute('value') == 'czy'
log(flag,'basic_personnel',ERROR,'not right')

browser.find_element_by_id("basic_总体设计").send_keys('基础级')
flag = browser.find_element_by_id("basic_总体设计").get_attribute('value') == '基础级'
log(flag,'basic_overall_design',ERROR,'not right')

browser.find_element_by_id("basic_测试级别").send_keys('最低级')
flag = browser.find_element_by_id("basic_测试级别").get_attribute('value') == '最低级'
log(flag,'basic_test_level',ERROR,'not right')

browser.find_element_by_id("basic_测试类别").send_keys('压力测试')
flag = browser.find_element_by_id("basic_测试类别").get_attribute('value') == '压力测试'
log(flag,'basic_test_category',ERROR,'not right')

browser.find_element_by_id("basic_一般测试条件").send_keys('基础条件')
flag = browser.find_element_by_id("basic_一般测试条件").get_attribute('value') == '基础条件'
log(flag,'basic_general_test_conditions',ERROR,'not right')

browser.find_element_by_id("basic_计划执行的测试").send_keys('所有的')
flag = browser.find_element_by_id("basic_计划执行的测试").get_attribute('value') == '所有的'
log(flag,'basic_planned_tests',ERROR,'not right')

browser.find_element_by_id("basic_测试用例").send_keys('所有')
flag = browser.find_element_by_id("basic_测试用例").get_attribute('value') == '所有'
log(flag,'basic_test_cases',ERROR,'not right')

browser.find_element_by_id("basic_测试进度表_制定测试计划_工作量").send_keys('500样本组')
flag = browser.find_element_by_id("basic_测试进度表_制定测试计划_工作量").get_attribute('value') == '500样本组'
log(flag,'basic_test_schedule_develop_test_plan_ workload',ERROR,'not right')

browser.find_element_by_id("basic_测试进度表_制定测试计划_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[1].click()
browser.find_element_by_id("basic_测试进度表_制定测试计划_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[2].click()

browser.find_element_by_id("basic_测试进度表_设计测试_工作量").send_keys('100样本组')
flag = browser.find_element_by_id("basic_测试进度表_设计测试_工作量").get_attribute('value') == '100样本组'
log(flag,'basic_test_schedule_design_test_workload',ERROR,'not right')

browser.find_element_by_id("basic_测试进度表_设计测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[3].click()
browser.find_element_by_id("basic_测试进度表_设计测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[4].click()

browser.find_element_by_id("basic_测试进度表_执行测试_工作量").send_keys('200样本组')
flag = browser.find_element_by_id("basic_测试进度表_执行测试_工作量").get_attribute('value') == '200样本组'
log(flag,'basic_test_schedule_perform_tests_workload',ERROR,'not right')

browser.find_element_by_id("basic_测试进度表_执行测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[5].click()
browser.find_element_by_id("basic_测试进度表_执行测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[6].click()

browser.find_element_by_id("basic_测试进度表_评估测试_工作量").send_keys('100样本组')
flag = browser.find_element_by_id("basic_测试进度表_评估测试_工作量").get_attribute('value') == '100样本组'
log(flag,'basic_test_schedule_assessment_tests_workload',ERROR,'not right')

browser.find_element_by_id("basic_测试进度表_评估测试_开始时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[7].click()
browser.find_element_by_id("basic_测试进度表_评估测试_结束时间").click()
sleep(0.2)
browser.find_elements_by_class_name("ant-picker-today-btn")[8].click()

browser.find_element_by_id("basic_需求的可追踪性").send_keys('可追踪')
flag = browser.find_element_by_id("basic_需求的可追踪性").get_attribute('value') == '可追踪'
log(flag,'basic_traceability_of_requirements',ERROR,'not right')

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
browser.find_element_by_id("测试方案评审表_软件名称").send_keys('shuaigou音乐')
flag = browser.find_element_by_id("测试方案评审表_软件名称").get_attribute('value') == 'shuaigou音乐'
log(flag,'Test_plan_review_form_Software_name',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_版本号").send_keys('114514')
flag = browser.find_element_by_id("测试方案评审表_版本号").get_attribute('value') == '114514'
log(flag,'Test_plan_review_form_Version_number',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_项目编号").send_keys('1919810')
flag = browser.find_element_by_id("测试方案评审表_项目编号").get_attribute('value') == '1919810'
log(flag,'Test_plan_review_form_Project_number',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_测试类别").send_keys('压力测试')
flag = browser.find_element_by_id("测试方案评审表_测试类别").get_attribute('value') == '压力测试'
log(flag,'Test_plan_review_form_Test_category',ERROR,'not right')

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
flag = browser.find_element_by_id("测试方案评审表_opinion_0").get_attribute('value') == '没问题'
log(flag,'Test_plan_review_form_opinion_0',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_sign_0").send_keys('czy0')
flag = browser.find_element_by_id("测试方案评审表_sign_0").get_attribute('value') == 'czy0'
log(flag,'Test_plan_review_form_sign_0',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_opinion_1").send_keys('没问题')
flag = browser.find_element_by_id("测试方案评审表_opinion_1").get_attribute('value') == '没问题'
log(flag,'Test_plan_review_form_opinion_1',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_sign_1").send_keys('czy1')
flag = browser.find_element_by_id("测试方案评审表_sign_1").get_attribute('value') == 'czy1'
log(flag,'Test_plan_review_form_sign_1',ERROR,'not right')


browser.find_element_by_id("测试方案评审表_opinion_2").send_keys('没问题')
flag = browser.find_element_by_id("测试方案评审表_opinion_2").get_attribute('value') == '没问题'
log(flag,'Test_plan_review_form_opinion_2',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_sign_2").send_keys('czy2')
flag = browser.find_element_by_id("测试方案评审表_sign_2").get_attribute('value') == 'czy2'
log(flag,'Test_plan_review_form_sign_2',ERROR,'not right')


browser.find_element_by_id("测试方案评审表_opinion_3").send_keys('没问题')
flag = browser.find_element_by_id("测试方案评审表_opinion_3").get_attribute('value') == '没问题'
log(flag,'Test_plan_review_form_opinion_3',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_sign_3").send_keys('czy3')
flag = browser.find_element_by_id("测试方案评审表_sign_3").get_attribute('value') == 'czy3'
log(flag,'Test_plan_review_form_sign_3',ERROR,'not right')


browser.find_element_by_id("测试方案评审表_opinion_4").send_keys('没问题')
flag = browser.find_element_by_id("测试方案评审表_opinion_4").get_attribute('value') == '没问题'
log(flag,'Test_plan_review_form_opinion_4',ERROR,'not right')

browser.find_element_by_id("测试方案评审表_sign_4").send_keys('czy4')
flag = browser.find_element_by_id("测试方案评审表_sign_4").get_attribute('value') == 'czy4'
log(flag,'Test_plan_review_form_sign_4',ERROR,'not right')


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
browser.find_element_by_id("basic_测试用例_0_测试分类").send_keys('压力测试')
flag = browser.find_element_by_id("basic_测试用例_0_测试分类").get_attribute('value') == '压力测试'
log(flag,'basic_Test_case_0_Test_classification',ERROR,'not right')

browser.find_element_by_id("basic_测试用例_0_ID").send_keys('1')
flag = browser.find_element_by_id("basic_测试用例_0_ID").get_attribute('value') == '1'
log(flag,'basic_Test_case_0_ID',ERROR,'not right')

browser.find_element_by_id("basic_测试用例_0_测试用例设计说明").send_keys('无')
flag = browser.find_element_by_id("basic_测试用例_0_测试用例设计说明").get_attribute('value') == '无'
log(flag,'basic_Test_case_0_Test_case_design_description',ERROR,'not right')

browser.find_element_by_id("basic_测试用例_0_与本测试用例有关的规约说明").send_keys('说明')
flag = browser.find_element_by_id("basic_测试用例_0_与本测试用例有关的规约说明").get_attribute('value') == '说明'
log(flag,'basic_Test_case_0_Specification_related_to_this_test_case',ERROR,'not right')

browser.find_element_by_id("basic_测试用例_0_预期的结果").send_keys('正常结果')
flag = browser.find_element_by_id("basic_测试用例_0_预期的结果").get_attribute('value') == '正常结果'
log(flag,'basic_Test_case_0_Expected_results',ERROR,'not right')

browser.find_element_by_id("basic_测试用例_0_测试用例设计者").send_keys('陈致远')
flag = browser.find_element_by_id("basic_测试用例_0_测试用例设计者").get_attribute('value') == '陈致远'
log(flag,'basic_Test_case_0_Test_case_Designer',ERROR,'not right')

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
browser.find_element_by_id("测试分类_功能性测试").click()

browser.find_element_by_id("basic_软件测试记录_0_序号").send_keys("1")
flag = browser.find_element_by_id("basic_软件测试记录_0_序号").get_attribute('value') == '1'
log(flag,'basic_Test_case_0_Serial_number',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_测试特性").send_keys("无")
flag = browser.find_element_by_id("basic_软件测试记录_0_测试特性").get_attribute('value') == '无'
log(flag,'basic_Test_case_0_Test_characteristics',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_测试用例设计说明").send_keys("提高泛用性")
flag = browser.find_element_by_id("basic_软件测试记录_0_测试用例设计说明").get_attribute('value') == '提高泛用性'
log(flag,'basic_Test_case_0_Test_case_design_description',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_与本测试用例有关的规约说明").send_keys("1e9")
flag = browser.find_element_by_id("basic_软件测试记录_0_与本测试用例有关的规约说明").get_attribute('value') == '1e9'
log(flag,'basic_Test_case_0_Specification_related_to_this_test_case',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_前提条件").send_keys("24h通电")
flag = browser.find_element_by_id("basic_软件测试记录_0_前提条件").get_attribute('value') == '24h通电'
log(flag,'basic_Test_case_0_prerequisite',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_测试用例执行过程").send_keys("多组分次执行")
flag = browser.find_element_by_id("basic_软件测试记录_0_测试用例执行过程").get_attribute('value') == '多组分次执行'
log(flag,'basic_Test_case_0_Test_case_execution_process',ERROR,'not right')

sleep(0.5)
browser.find_element_by_id("basic_软件测试记录_0_预期的结果").send_keys("预期通过90%")
flag = browser.find_element_by_id("basic_软件测试记录_0_预期的结果").get_attribute('value') == '预期通过90%'
log(flag,'basic_Test_case_0_Expected_results',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_测试用例设计者").send_keys("lys")
flag = browser.find_element_by_id("basic_软件测试记录_0_测试用例设计者").get_attribute('value') == 'lys'
log(flag,'basic_Test_case_0_Expected_results',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_实际结果").send_keys("通过97%")
flag = browser.find_element_by_id("basic_软件测试记录_0_实际结果").get_attribute('value') == '通过97%'
log(flag,'basic_Test_case_0_Actual_results',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_是否与预期结果一致").send_keys("基本一致")
flag = browser.find_element_by_id("basic_软件测试记录_0_是否与预期结果一致").get_attribute('value') == '基本一致'
log(flag,'basic_Test_case_0_consistent_with_the_expected_results',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_相关的BUG编号").send_keys("1154")
flag = browser.find_element_by_id("basic_软件测试记录_0_相关的BUG编号").get_attribute('value') == '1154'
log(flag,'basic_Test_case_0_Relevant_bug_number',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_用例执行者").send_keys("czy")
flag = browser.find_element_by_id("basic_软件测试记录_0_用例执行者").get_attribute('value') == 'czy'
log(flag,'basic_Test_case_0_Use_case_performer',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_执行测试时间").click()
browser.find_element_by_id("basic_软件测试记录_0_执行测试时间").send_keys("2022-09-23\n")
flag = browser.find_element_by_id("basic_软件测试记录_0_执行测试时间").get_attribute('value') == '2022-09-23'
log(flag,'basic_Test_case_0_Test_execution_time',ERROR,'not right')

browser.find_element_by_id("basic_软件测试记录_0_确认人").send_keys("czy")
flag = browser.find_element_by_id("basic_软件测试记录_0_确认人").get_attribute('value') == 'czy'
log(flag,'basic_Test_case_0_Identify_Person',ERROR,'not right')

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
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_问题(缺陷)简要描述").get_attribute('value') == "无法承载1e8级压力"
log(flag,'Software_testing_problem_list_List_of_items_0_Brief_description_of_the_problem(defect)',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_对应需求条目").send_keys("压力测试")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_对应需求条目").get_attribute('value') == "压力测试"
log(flag,'Software_testing_problem_list_List_of_items_0_Corresponding_requirement_items',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷的初始条件").send_keys("高压力测试")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷的初始条件").get_attribute('value') == "高压力测试"
log(flag,'Software_testing_problem_list_List_of_items_0_Initial_conditions_for_finding_defects',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷用例及具体操作路径(要具体)").send_keys("通过搭载1e8级模拟用户")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_发现缺陷用例及具体操作路径(要具体)").get_attribute('value') == "通过搭载1e8级模拟用户"
log(flag,'Software_testing_problem_list_List_of_items_0_paths_to_find_Defect_use_cases_and_specific_operations',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_关联用例").send_keys("无")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_关联用例").get_attribute('value') == "无"
log(flag,'Software_testing_problem_list_List_of_items_0_Associated_use_case',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_时间").click()
sleep(0.5)

browser.find_element_by_id("软件测试问题清单_项目列表_0_时间").send_keys("2022-09-23 19:00:03\n")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_时间").get_attribute('value') == "2022-09-23 19:00:03"
log(flag,'Software_testing_problem_list_List_of_items_0_time',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_责任人").send_keys("czy")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_责任人").get_attribute('value') == "czy"
log(flag,'Software_testing_problem_list_List_of_items_0_person_liable',ERROR,'not right')

browser.find_element_by_id("软件测试问题清单_项目列表_0_修改建议").send_keys("提高测试压力")
flag = browser.find_element_by_id("软件测试问题清单_项目列表_0_修改建议").get_attribute('value') == "提高测试压力"
log(flag,'Software_testing_problem_list_List_of_items_0_Modification_suggestions',ERROR,'not right')

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
browser.find_element_by_id("软件文档评审表_软件名称").send_keys("shuaigou音乐")
flag = browser.find_element_by_id("软件文档评审表_软件名称").get_attribute('value') == "shuaigou音乐"
log(flag,'Software_document_review_form_Software_name',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_版本号").send_keys("10.0.03")
flag = browser.find_element_by_id("软件文档评审表_版本号").get_attribute('value') == "10.0.03"
log(flag,'Software_document_review_form_Version_number',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_评审人").send_keys("czy")
flag = browser.find_element_by_id("软件文档评审表_评审人").get_attribute('value') == "czy"
log(flag,'Software_document_review_form_Reviewer',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_评审完成时间").send_keys("2022-09-22\n")
flag = browser.find_element_by_id("软件文档评审表_评审完成时间").get_attribute('value') == "2022-09-22"
log(flag,'Software_document_review_form_Review_completion_time',ERROR,'not right')

sleep(0.5)
browser.find_element_by_id("软件文档评审表_result_1").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_1").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_1',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_1").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_1").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_1',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_2").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_2").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_2',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_2").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_2").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_2',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_3").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_3").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_3',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_3").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_3").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_3',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_4").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_4").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_4',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_4").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_4").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_4',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_5").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_5").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_5',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_5").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_5").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_5',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_6").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_6").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_6',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_6").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_6").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_6',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_7").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_7").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_7',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_7").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_7").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_7',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_8").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_8").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_8',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_8").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_8").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_8',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_9").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_9").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_9',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_9").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_9").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_9',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_10").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_10").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_10',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_10").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_10").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_10',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_11").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_11").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_11',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_11").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_11").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_11',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_12").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_12").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_12',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_12").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_12").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_12',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_13").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_13").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_13',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_13").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_13").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_13',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_14").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_14").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_14',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_14").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_14").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_14',ERROR,'not right')

sleep(0.5)
browser.find_element_by_id("软件文档评审表_result_16").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_16").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_16',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_16").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_16").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_16',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_17").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_17").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_17',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_17").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_17").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_17',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_18").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_18").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_18',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_18").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_18").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_18',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_19").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_19").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_19',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_19").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_19").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_19',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_20").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_20").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_20',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_20").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_20").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_20',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_21").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_21").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_21',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_21").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_21").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_21',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_22").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_22").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_22',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_22").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_22").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_22',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_23").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_23").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_23',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_23").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_23").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_23',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_24").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_24").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_24',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_24").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_24").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_24',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_25").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_25").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_25',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_25").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_25").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_25',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_26").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_26").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_26',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_26").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_26").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_26',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_27").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_27").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_27',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_27").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_27").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_27',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_28").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_28").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_28',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_28").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_28").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_28',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_29").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_29").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_29',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_29").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_29").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_29',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_30").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_30").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_30',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_30").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_30").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_30',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_31").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_31").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_31',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_31").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_31").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_31',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_32").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_32").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_32',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_32").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_32").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_32',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_33").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_33").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_33',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_33").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_33").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_33',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_34").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_34").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_34',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_34").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_34").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_34',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_result_35").send_keys("合格")
flag = browser.find_element_by_id("软件文档评审表_result_35").get_attribute('value') == "合格"
log(flag,'Software_document_review_form_result_35',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_description_35").send_keys("无")
flag = browser.find_element_by_id("软件文档评审表_description_35").get_attribute('value') == "无"
log(flag,'Software_document_review_form_description_35',ERROR,'not right')

browser.find_element_by_id("软件文档评审表_检查人").send_keys("lys")
#%%
# 提交软件文档评审表
browser.find_element_by_id("提交").click()
sleep(2)

#%%
# 进入填写软件测试报告
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件测试报告").click()
sleep(0.5)

#%%
# 填写软件测试报告
browser.find_element_by_id("basic_报告编号").send_keys("10992")
flag = browser.find_element_by_id("basic_报告编号").get_attribute('value') == "10992"
log(flag,'basic_Report_number',ERROR,'not right')

browser.find_element_by_id("basic_测试类别").send_keys("可靠性测试")
flag = browser.find_element_by_id("basic_测试类别").get_attribute('value') == "可靠性测试"
log(flag,'basic_Test_category',ERROR,'not right')

browser.find_element_by_id("basic_报告日期").send_keys("2022/08/23\n")
flag = browser.find_element_by_id("basic_报告日期").get_attribute('value') == "2022/08/23"
log(flag,'basic_Report_date',ERROR,'not right')

browser.find_element_by_id("basic_版本/型号").send_keys("10.0.12")
flag = browser.find_element_by_id("basic_版本/型号").get_attribute('value') == "10.0.12"
log(flag,'basic_Version/model',ERROR,'not right')

browser.find_element_by_id("basic_测试开始时间").click()
sleep(0.5)

browser.find_element_by_id("basic_测试开始时间").send_keys("2022/07/24\n")
flag = browser.find_element_by_id("basic_测试开始时间").get_attribute('value') == "2022/07/24"
log(flag,'basic_Test_start_time',ERROR,'not right')

browser.find_element_by_id("basic_测试结束时间").click()
sleep(0.5)

browser.find_element_by_id("basic_测试结束时间").send_keys("2022/07/24\n")
flag = browser.find_element_by_id("basic_测试结束时间").get_attribute('value') == "2022/07/24"
log(flag,'basic_Test_end_time',ERROR,'not right')

browser.find_element_by_id("basic_测试结论").send_keys("合格")
flag = browser.find_element_by_id("basic_测试结论").get_attribute('value') == "合格"
log(flag,'basic_Test_conclusion',ERROR,'not right')

browser.find_element_by_id("basic_主测人").send_keys("lys")
flag = browser.find_element_by_id("basic_主测人").get_attribute('value') == "lys"
log(flag,'basic_Main_tester',ERROR,'not right')

browser.find_element_by_id("basic_主测人日期").click()
sleep(0.5)

browser.find_element_by_id("basic_主测人日期").send_keys("2022/07/24\n")
flag = browser.find_element_by_id("basic_主测人日期").get_attribute('value') == "2022/07/24"
log(flag,'basic_Main_tester_date',ERROR,'not right')

browser.find_element_by_id("basic_审核人").send_keys("czy")
flag = browser.find_element_by_id("basic_审核人").get_attribute('value') == "czy"
log(flag,'basic_Reviewer',ERROR,'not right')

browser.find_element_by_id("basic_审核人日期").click()
sleep(0.5)

browser.find_element_by_id("basic_审核人日期").send_keys("2022/07/24\n")
flag = browser.find_element_by_id("basic_审核人日期").get_attribute('value') == "2022/07/24"
log(flag,'basic_Reviewed_by_date',ERROR,'not right')

browser.find_element_by_id("basic_批准人").send_keys("gbl")
flag = browser.find_element_by_id("basic_批准人").get_attribute('value') == "gbl"
log(flag,'basic_certifier',ERROR,'not right')

browser.find_element_by_id("basic_批准人日期").click()
sleep(0.5)

browser.find_element_by_id("basic_批准人日期").send_keys("2022/07/24\n")
flag = browser.find_element_by_id("basic_批准人日期").get_attribute('value') == "2022/07/24"
log(flag,'basic_Approved_by_date',ERROR,'not right')

browser.find_element_by_id("basic_测试单位网址").send_keys("www.ceshidanwei.com")
flag = browser.find_element_by_id("basic_测试单位网址").get_attribute('value') == "www.ceshidanwei.com"
log(flag,'basic_website_of_testing_unit',ERROR,'not right')

browser.find_element_by_id("basic_测试单位Email").send_keys("1921680025@qq.com")
flag = browser.find_element_by_id("basic_测试单位Email").get_attribute('value') == "1921680025@qq.com"
log(flag,'basic_Email_of_testing_unit',ERROR,'not right')

browser.find_element_by_id("添加新硬件环境").click()

browser.find_element_by_id("basic_硬件环境_0_硬件类别").send_keys("普通计算机")
flag = browser.find_element_by_id("basic_硬件环境_0_硬件类别").get_attribute('value') == "普通计算机"
log(flag,'basic_Hardware_environment_0_hardware_category',ERROR,'not right')

browser.find_element_by_id("basic_硬件环境_0_硬件名称").send_keys("机器")
flag = browser.find_element_by_id("basic_硬件环境_0_硬件名称").get_attribute('value') == "机器"
log(flag,'basic_Hardware_environment_0_hardware_name',ERROR,'not right')

browser.find_element_by_id("basic_硬件环境_0_配置").send_keys("普通")
flag = browser.find_element_by_id("basic_硬件环境_0_配置").get_attribute('value') == "普通"
log(flag,'basic_Hardware_environment_0_collocation',ERROR,'not right')

browser.find_element_by_id("basic_硬件环境_0_数量").send_keys("1")
flag = browser.find_element_by_id("basic_硬件环境_0_数量").get_attribute('value') == "1"
log(flag,'basic_Hardware_environment_0_numbers',ERROR,'not right')

browser.find_element_by_id("添加新软件环境").click()

browser.find_element_by_id("basic_软件环境_0_软件名称").send_keys("南大测试体系")
flag = browser.find_element_by_id("basic_软件环境_0_软件名称").get_attribute('value') == "南大测试体系"
log(flag,'basic_Software_environment_0_software_name',ERROR,'not right')

browser.find_element_by_id("basic_软件环境_0_版本").send_keys("7.09")
flag = browser.find_element_by_id("basic_软件环境_0_版本").get_attribute('value') == "7.09"
log(flag,'basic_Software_environment_0_edition',ERROR,'not right')


browser.find_element_by_id("软件环境_软件类别_软件").click()
browser.find_element_by_id("添加新参考资料分项").click()

browser.find_element_by_id("basic_参考资料_0_参考资料分项").send_keys("无")
flag = browser.find_element_by_id("basic_参考资料_0_参考资料分项").get_attribute('value') == "无"
log(flag,'basic_References_0_Reference_sub_item',ERROR,'not right')


browser.find_element_by_id("basic_测试执行记录").send_keys("2022/05/30执行样例001-200")
flag = browser.find_element_by_id("basic_测试执行记录").get_attribute('value') == "2022/05/30执行样例001-200"
log(flag,'basic_Test_execution_record',ERROR,'not right')

#%%
# 提交 软件测试报告
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)
#%%
# 质量部登录
Login_as_qlty()
sleep(2)

#%%
# 进入填写测试报告检查表
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写测试报告检查表").click()
sleep(0.5)

#%%
#质量部填写测试报告检查表
browser.find_element_by_id("测试报告检查表_软件名称").send_keys("shuaigou音乐")
flag = browser.find_element_by_id("测试报告检查表_软件名称").get_attribute('value') == "shuaigou音乐"
log(flag,'Test_report_checklist_software_name',ERROR,'not right')

browser.find_element_by_id("测试报告检查表_委托单位").send_keys("某公司")
flag = browser.find_element_by_id("测试报告检查表_委托单位").get_attribute('value') == "某公司"
log(flag,'Test_report_checklist_Entrusting_unit',ERROR,'not right')

browser.find_element_by_id("测试报告检查表_tableItem_0").click()
browser.find_element_by_id("测试报告检查表_tableItem_1").click()
browser.find_element_by_id("测试报告检查表_tableItem_2").click()
browser.find_element_by_id("测试报告检查表_tableItem_3").click()
browser.find_element_by_id("测试报告检查表_tableItem_4").click()
browser.find_element_by_id("测试报告检查表_tableItem_5").click()
browser.find_element_by_id("测试报告检查表_tableItem_6").click()
browser.find_element_by_id("测试报告检查表_tableItem_7").click()
browser.find_element_by_id("测试报告检查表_tableItem_8").click()
browser.find_element_by_id("测试报告检查表_tableItem_9").click()
browser.find_element_by_id("测试报告检查表_tableItem_10").click()
browser.find_element_by_id("测试报告检查表_tableItem_11").click()
browser.find_element_by_id("测试报告检查表_tableItem_12").click()
browser.find_element_by_id("测试报告检查表_tableItem_13").click()

browser.find_element_by_id("测试报告检查表_检查人").send_keys("czy")
flag = browser.find_element_by_id("测试报告检查表_检查人").get_attribute('value') == "czy"
log(flag,'Test_report_checklist_Inspector',ERROR,'not right')

browser.find_element_by_id("测试报告检查表_日期").send_keys("2022-07-23\n")
flag = browser.find_element_by_id("测试报告检查表_日期").get_attribute('value') == "2022-07-23"
log(flag,'Test_report_checklist_date',ERROR,'not right')

#%%
#质检部 提交测试报告检查表
browser.find_element_by_id("提交").click()
sleep(2)

#%%
#登出
Logout()
sleep(1)
#%%
# 市场部登录
Login_as_mkt()
sleep(2)

#%%
# 进入填写测试报告检查表
View_projectList()
View_latest_proj()
sleep(0.5)
browser.find_element_by_id("填写软件项目委托测试工作检查表").click()
sleep(0.5)

#%%
# 填写测试报告检查表
browser.find_element_by_id("软件项目委托测试工作检查表_软件名称").send_keys("酷狗音乐")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_软件名称").get_attribute('value') == "酷狗音乐"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Software_name',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_版本号").send_keys("10.0.1")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_版本号").get_attribute('value') == "10.0.1"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Version_number',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_申报单位").send_keys("公司")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_申报单位").get_attribute('value') == "公司"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Applicant',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_起始时间").send_keys("2022-07-06\n")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_起始时间").get_attribute('value') == "2022-07-06"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_start_time',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_预计完成时间").send_keys("2022-07-23\n")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_预计完成时间").get_attribute('value') == "2022-07-23"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Estimated_completion_time',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_主测人").send_keys("czy")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_主测人").get_attribute('value') == "czy"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Main_tester',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_实际完成时间").send_keys("2022-09-13\n")
flag = browser.find_element_by_id("软件项目委托测试工作检查表_实际完成时间").get_attribute('value') == "2022-09-13"
log(flag,'Checklist_for_entrusted_testing_of_software_projects_Actual_completion_time',ERROR,'not right')

browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_1").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_2").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_3").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_4").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_5").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_6").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_7").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_9").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_11").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_12").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_13").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_14").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_15").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_16").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_17").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_18").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_19").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_20").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_21").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_22").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_23").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_24").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_25").click()
browser.find_element_by_id("软件项目委托测试工作检查表_tableItem_26").click()


#%%
#市场部 提交软件项目委托测试工作检查表
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