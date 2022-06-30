#%%
#初始化
from time import sleep
from selenium import webdriver
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

#browser.get('file:///F:/Learning/SE_proj/SE_proj_2021/demo_1.0/build/index.html#')
def Login_as_User():
    browser.find_element_by_id("home_headers_mainpage").click()
    browser.find_element_by_id("home_headers_user").click()
    browser.find_element_by_id("login_input_email").send_keys("lys1223@qq.com")
    browser.find_element_by_id("login_input_username").send_keys("2131")
    browser.find_element_by_id("login_input_password").send_keys("123456")
    
def Quit_browser():
    browser.quit()
def View_entrustList():
    browser.find_element_by_id("home_headers_functions").click()
    sleep(0.5)
    browser.find_element_by_id("home_headers_functions_view_application").click()
    sleep(0.5)
def View_latest_entrust():
    browser.find_element_by_class_name("ant-table-column-sorters").click()
    viewButtons=browser.find_elements_by_id("view_entrust")
    viewButtons[0].click()
        
        

#%%
#登录
Login_as_User()
log(False,'Login List',WARNING,'Page')
flag = browser.find_element_by_id("login_input_email").get_attribute('value') == "lys1223@qq.com"
log(flag,"login_input_email",ERROR,'not right')
flag= browser.find_element_by_id("login_input_username").get_attribute('value') == "2131"
log(flag,"login_input_username",ERROR,'not right')
flag= browser.find_element_by_id("login_input_password").get_attribute('value') == "123456"
log(flag,"login_input_password",ERROR,'not right')
browser.find_element_by_id("login_button").click()
# %%
#跳转到用户申请表界面
#请先登录！
sleep(0.5)
browser.find_element_by_id("home_headers_functions").click()
sleep(0.5)
browser.find_element_by_id("home_headers_functions_submit_application").click()
log(False,'Application List',WARNING,'Page')
#%%
#自动填写用户申请表
sleep(0.5)
browser.find_element_by_id("测试类型_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("测试类型_软件确认测试").click()
browser.find_element_by_id("测试类型_其他").click()
browser.find_element_by_id("测试类型(其他)").send_keys("某个类型")
browser.find_element_by_id("软件名称").send_keys("测试软件(自动)")
browser.find_element_by_id("版本号").send_keys("1.0.0")
browser.find_element_by_id("委托单位(中文)").send_keys("南京大学软件测试中心")
browser.find_element_by_id("委托单位(英文)").send_keys("NJU SE test center")
browser.find_element_by_id("开发单位").send_keys("SE GroupA")
browser.find_element_by_id("单位性质_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("单位性质_科研院校").click()
browser.find_element_by_id("软件用户对象描述").send_keys("一般通过网民")
browser.find_element_by_id("主要功能及用途简介").send_keys("没什么用，这里水个300字")
browser.find_element_by_id("测试依据_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("测试依据_GB/T 25000.51-2010").click()
browser.find_element_by_id("测试依据_NST-03-WI13-2011").click()
browser.find_element_by_id("需要测试的技术指标_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("需要测试的技术指标_功能性").click()
browser.find_element_by_id("需要测试的技术指标_易用性").click()
browser.find_element_by_id("软件规模_功能数").send_keys("114514")
browser.find_element_by_id("软件规模_代码行数").send_keys("1919810")
browser.find_element_by_id("软件类型_下拉栏1").click()
sleep(0.5)
browser.find_element_by_id("软件类型_应用软件").click()
browser.find_element_by_id("软件类型_下拉栏2").click()
sleep(0.5)
browser.find_element_by_id("软件类型_应用软件_办公软件").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows版本").send_keys("11")
browser.find_element_by_id("运行环境_客户端_操作系统_Linux").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Linux版本").send_keys("8")
browser.find_element_by_id("运行环境_客户端_内存要求").send_keys("4096")
browser.find_element_by_id("运行环境_客户端_其他要求").send_keys("没什么其他要求了")
browser.find_element_by_id("运行环境_服务器端_硬件_架构_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("运行环境_服务器端_硬件_架构_PC服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_架构_UNIX/Linux服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_内存要求").send_keys("1024")
browser.find_element_by_id("运行环境_服务器端_硬件_硬盘要求").send_keys("256")
browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").send_keys("通电就行")
browser.find_element_by_id("运行环境_服务器端_软件_操作系统").send_keys("Windows")
browser.find_element_by_id("运行环境_服务器端_软件_版本").send_keys("10")
browser.find_element_by_id("运行环境_服务器端_软件_编程语言").send_keys("JSX")
browser.find_element_by_id("运行环境_服务器端_软件_架构_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("运行环境_服务器端_软件_架构_C/S").click()
browser.find_element_by_id("运行环境_服务器端_软件_架构_其他").click()
browser.find_element_by_id("运行环境_服务器端_软件_数据库").send_keys("SQL")
browser.find_element_by_id("运行环境_服务器端_软件_中间件").send_keys("洒家不知道什么是中间件")
browser.find_element_by_id("运行环境_服务器端_软件_其他支撑软件").send_keys("不需要")
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

flag = browser.find_element_by_id("软件名称").get_attribute('value') == "测试软件(自动)"
log(flag,'Software Name',ERROR,'not right')
flag = browser.find_element_by_id("版本号").get_attribute('value') == "1.0.0"
log(flag,'Build Number',ERROR,'not right')
flag = browser.find_element_by_id("委托单位(中文)").get_attribute('value') == "南京大学软件测试中心"
log(flag,'Trustee(CN)',ERROR,'not right')
flag = browser.find_element_by_id("委托单位(英文)").get_attribute('value') == "NJU SE test center"
log(flag,'Trustee(EN)',ERROR,'not right')
flag = browser.find_element_by_id("开发单位").get_attribute('value') == "SE GroupA"
log(flag,'Development Unit',ERROR,'not right')
flag = browser.find_element_by_id("软件用户对象描述").get_attribute('value') == "一般通过网民"
log(flag,'User Object',ERROR,'not right')
flag = browser.find_element_by_id("主要功能及用途简介").get_attribute('value') == "没什么用，这里水个300字"
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
flag = browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").get_attribute('value') == "通电就行"
log(flag,'Other Requirments of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_操作系统").get_attribute('value') == "Windows"
log(flag,'Runtime Environment Server OS System',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_编程语言").get_attribute('value') == "JSX"
log(flag,'Programming Language of Runtime Environment Server',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_数据库").get_attribute('value') == "SQL"
log(flag,'Runtime Environment Server Database',ERROR,'not right')
flag = browser.find_element_by_id("运行环境_服务器端_软件_中间件").get_attribute('value') == "洒家不知道什么是中间件"
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
sleep(1)
log(False,'Application Form',WARNING,'Page')
#%%
#进入填写软件功能列表界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("填写软件功能列表").click()
sleep(0.5)
log(False,'Software FunctionList',WARNING,'Page')
#%%
#填写软件功能列表
browser.find_element_by_id("软件名称").send_keys('测试软件(自动)')
browser.find_element_by_id("版本号").send_keys('1.0.0')
browser.find_element_by_id("添加新功能").click()
browser.find_element_by_id("软件功能").send_keys('啥都能干')
browser.find_element_by_id("添加新项目").click()
browser.find_element_by_id("软件子功能项目").send_keys('项目1')
browser.find_element_by_id("功能说明").send_keys('也是啥都能干')
flag = browser.find_element_by_id("软件名称").get_attribute('value') == '测试软件(自动)'
log(flag,'Software Name',ERROR,'not right')
flag = browser.find_element_by_id("版本号").get_attribute('value') == '1.0.0'
log(flag,'Software Edition',ERROR,'not right')
#%%
#提交软件功能表
browser.find_element_by_id("提交按钮").click()
sleep(0.5)

#%%
#进入测试部审核界面
log(False,'Test Apartment',WARNING,'Page')
View_entrustList()
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
flag = browser.find_element_by_id("材料检查_其他").get_attribute('value') == '无'
log(flag,'Material Check',ERROR,'not right')
sleep(0.5)

#%%
#测试部提交审核
browser.find_element_by_id("提交").click()
sleep(0.5)

#%%
#进入市场部审核界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部审核").click()
sleep(0.5)

#%%
#市场部审核
log(False,'Market Department Check',WARNING,'Page')
browser.find_element_by_id("市场部受理意见_受理").click()
sleep(0.5)
browser.find_element_by_id("市场部备注").send_keys('审核没问题')
sleep(0.5)
flag = browser.find_element_by_id("市场部备注").get_attribute('value') == '审核没问题'
log(flag,'Market Department Check',ERROR,'not right')
#%%
#市场部提交审核
browser.find_element_by_id("提交").click()
sleep(0.5)

#%%
#进入市场部报价界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("发起议价").click()
sleep(0.5)

#%%
#市场部填写报价单
log(False,'Market Department Quotation',WARNING,'Page')
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

flag = browser.find_element_by_id("软件名称").get_attribute('value') == '测试软件(自动)'
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
sleep(0.5)

#%%
#进入用户回复报价界面
View_entrustList()
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("查看议价").click()
sleep(0.5)

#%%
#用户回复报价单
log(False,'Quotation Reply',WARNING,'Page')
browser.find_element_by_id("用户反馈_接受").click()
browser.find_element_by_id("委托人签字").send_keys("cc")
browser.find_element_by_id("委托人签字日期").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()
flag = browser.find_element_by_id("委托人签字").get_attribute('value') == 'cc'
log(flag,'Sign',ERROR,'not right')
sleep(0.5)

#%%
#提交回复报价单
browser.find_element_by_id("提交").click()
sleep(0.5)

#%%
#进入市场部完成测试申请书界面
View_entrustList()
View_latest_entrust()
log(False,'View Test Application',WARNING,'Page')
sleep(0.5)
browser.find_element_by_id("完成申请表").click()
sleep(0.5)

#%%
#市场部填写测试项目编号
browser.find_element_by_id("测试项目编号").send_keys("123456")
sleep(0.5)

flag = browser.find_element_by_id("测试项目编号").get_attribute('value') == '123456'
log(flag,'Trial Project Number',ERROR,'not right')
#%%
#提交测试项目编号
browser.find_element_by_id("提交").click()
sleep(0.5)
#%%
#进入测试合同委托方填写界面
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("起草测试合同，拟定履行期限").click()
sleep(0.5)

#%%
#填写测试合同
log(False,'Test Contract',WARNING,'Page')
browser.find_element_by_id("受托方(乙方)").send_keys("SE_A")
browser.find_element_by_id("签订地点").send_keys("南京大学软件测试中心")
browser.find_element_by_id("签订日期").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("履行期限").send_keys("90")
browser.find_element_by_id("整改次数上限").send_keys("3")
browser.find_element_by_id("整改时间上限").send_keys("2")

flag = browser.find_element_by_id("受托方(乙方)").get_attribute('value') == 'SE_A'
log(flag,'Trustee Name',ERROR,'not right')
flag = browser.find_element_by_id("签订地点").get_attribute('value') == '南京大学软件测试中心'
log(flag,'Signing Address',ERROR,'not right')
flag = browser.find_element_by_id("履行期限").get_attribute('value') == '90'
log(flag,'Alternation Time',ERROR,'not right')
flag = browser.find_element_by_id("整改次数上限").get_attribute('value') == '3'
log(flag,'Alternation Upper Limit',ERROR,'not right')
flag = browser.find_element_by_id("整改时间上限").get_attribute('value') == '2'
log(flag,'Alternation Time Upper Limit',ERROR,'not right')
browser.find_element_by_id("提交").click()

#%%
# 确认履行期限
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("查看履行日期").click()
sleep(0.5)
log(False,'Time Limit Confirming',WARNING,'Page')
browser.find_element_by_id("意见").send_keys("无")
browser.find_element_by_id("态度_下拉栏").click()
sleep(0.5)
browser.find_element_by_id("态度_下拉栏_接受").click()
flag = browser.find_element_by_id("意见").get_attribute('value') == '无'
log(flag,'Suggestion',ERROR,'not right')
browser.find_element_by_id("提交").click()
#%%
#市场部填写签章
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部填写签章").click()
sleep(0.5)
log(False,'Market Department Signature',WARNING,'Page')
browser.find_element_by_id("单位全称").send_keys("1")
browser.find_element_by_id("授权代表").send_keys("南京大学软件测试中心")
browser.find_element_by_id("联系人").send_keys("刘岩菘")
browser.find_element_by_id("通讯地址").send_keys("lysisgbldad@qq.com")
browser.find_element_by_id("邮编").send_keys("8923800")
browser.find_element_by_id("电话").send_keys("18904033116")
browser.find_element_by_id("传真").send_keys("411092")



flag = browser.find_element_by_id("授权代表").get_attribute('value') == '南京大学软件测试中心'
log(flag,'Deligate',ERROR,'not right')
flag = browser.find_element_by_id("联系人").get_attribute('value') == '刘岩菘'
log(flag,'Liaison Man',ERROR,'not right')
flag = browser.find_element_by_id("通讯地址").get_attribute('value') == 'lysisgbldad@qq.com'
log(flag,'Liaison Address',ERROR,'not right')
flag = browser.find_element_by_id("邮编").get_attribute('value') == '8923800'
log(flag,'Postal Code',ERROR,'not right')
flag = browser.find_element_by_id("电话").get_attribute('value') == '18904033116'
log(flag,'Phone Number',ERROR,'not right')
flag = browser.find_element_by_id("传真").get_attribute('value') == '411092'
log(flag,'Fax',ERROR,'not right')




browser.find_element_by_id("提交").click()
#%%
#客户填写签章
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("客户填写签章").click()
sleep(0.5)
log(False,'Client Signature',WARNING,'Page')
#%%
#填写软件测试委托合同签章（委托方）
browser.find_element_by_id("单位全称").send_keys("南京大学软件测试中心")
browser.find_element_by_id("授权代表").send_keys("cc")
browser.find_element_by_id("联系人").send_keys("刘岩菘")
browser.find_element_by_id("通讯地址").send_keys("lysisgbldad@qq.com")
browser.find_element_by_id("电话").send_keys("18904033116")
browser.find_element_by_id("传真").send_keys("411092")
browser.find_element_by_id("开户银行").send_keys("中国工商银行")
browser.find_element_by_id("账号").send_keys("6222 8009 2313 2839 2398")
browser.find_element_by_id("邮编").send_keys("8923800")

flag = browser.find_element_by_id("单位全称").get_attribute('value') == '南京大学软件测试中心'
log(flag,'Total Name',ERROR,'not right')
flag = browser.find_element_by_id("授权代表").get_attribute('value') == 'cc'
log(flag,'Deligate',ERROR,'not right')
flag = browser.find_element_by_id("联系人").get_attribute('value') == '刘岩菘'
log(flag,'Liaison Man',ERROR,'not right')
flag = browser.find_element_by_id("通讯地址").get_attribute('value') == 'lysisgbldad@qq.com'
log(flag,'Liaison Address',ERROR,'not right')
flag = browser.find_element_by_id("邮编").get_attribute('value') == '8923800'
log(flag,'Postal Code',ERROR,'not right')
flag = browser.find_element_by_id("电话").get_attribute('value') == '18904033116'
log(flag,'Phone Number',ERROR,'not right')
flag = browser.find_element_by_id("传真").get_attribute('value') == '411092'
log(flag,'Fax',ERROR,'not right')
flag = browser.find_element_by_id("开户银行").get_attribute('value') == '中国工商银行'
log(flag,'Bank',ERROR,'not right')
flag = browser.find_element_by_id("账号").get_attribute('value') == '6222 8009 2313 2839 2398'
log(flag,'Account',ERROR,'not right')

browser.find_element_by_id("提交").click()

#%%
#市场部填写保密协议
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("市场部填写保密协议").click()
sleep(0.5)
log(False,'Market Department Non-disclosure Agreement',WARNING,'Page')
browser.find_element_by_id("basic_委托方").send_keys("司马睿")
browser.find_element_by_id("basic_项目名").send_keys("bilibili视频弹幕软件")
browser.find_element_by_id("basic_乙方").send_keys("南京大学软件测试中心")
browser.find_element_by_id("basic_法人代表").send_keys("法人代表")
browser.find_element_by_id("basic_日期").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()

flag = browser.find_element_by_id("basic_委托方").get_attribute('value') == '司马睿'
log(flag,'Client',ERROR,'not right')
flag = browser.find_element_by_id("basic_项目名").get_attribute('value') == 'bilibili视频弹幕软件'
log(flag,'Object Name',ERROR,'not right')
flag = browser.find_element_by_id("basic_乙方").get_attribute('value') == '南京大学软件测试中心'
log(flag,'Trustee',ERROR,'not right')
flag = browser.find_element_by_id("basic_法人代表").get_attribute('value') == '法人代表'
log(flag,'Deligate',ERROR,'not right')

browser.find_element_by_id("提交").click()

#%%
#客户填写保密协议
View_entrustList()
sleep(0.5)
View_latest_entrust()
sleep(0.5)
browser.find_element_by_id("客户填写保密协议").click()
sleep(0.5)
log(False,'Client Non-disclosure Agreement',WARNING,'Page')
browser.find_element_by_id("basic_甲方").send_keys("委托人甲")
browser.find_element_by_id("basic_法人代表").send_keys("法人代表")
browser.find_element_by_id("basic_日期").click()
browser.find_element_by_class_name("ant-picker-today-btn").click()


flag = browser.find_element_by_id("basic_甲方").get_attribute('value') == '委托人甲'
log(flag,'Client',ERROR,'not right')
flag = browser.find_element_by_id("basic_法人代表").get_attribute('value') == '法人代表'
log(flag,'Deligate',ERROR,'not right')

browser.find_element_by_id("提交").click()
#%%
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
