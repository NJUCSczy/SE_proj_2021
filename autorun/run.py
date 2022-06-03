#%%
#初始化
from time import sleep
from selenium import webdriver
options=webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser=webdriver.Chrome(options=options)
browser.get('http://localhost:3000')
#browser.get('file:///F:/Learning/SE_proj/SE_proj_2021/demo_1.0/build/index.html#')

#%%
#登录
browser.find_element_by_id("home_headers_user").click()
sleep(0.5)
browser.find_element_by_id("login_input_email").send_keys("czy@qq.com")
browser.find_element_by_id("login_input_username").send_keys("czy114514")
browser.find_element_by_id("login_input_password").send_keys("123456")
sleep(0.5)
browser.find_element_by_id("login_button").click()



# %%
#跳转到用户申请表界面
#请先登录！
browser.find_element_by_id("home_headers_functions").click()
sleep(1.5)
browser.find_element_by_id("home_headers_functions_submit_application").click()

#%%
#自动填写用户申请表
browser.find_element_by_id("测试类型_下拉栏").click()
browser.find_element_by_id("测试类型_软件确认测试").click()
browser.find_element_by_id("测试类型_其他").click()
browser.find_element_by_id("测试类型(其他)").send_keys("某个类型")
browser.find_element_by_id("软件名称").send_keys("测试软件(自动)")
browser.find_element_by_id("版本号").send_keys("1.0.0")
browser.find_element_by_id("委托单位(中文)").send_keys("南京大学软件测试中心")
browser.find_element_by_id("委托单位(英文)").send_keys("NJU SE test center")
browser.find_element_by_id("开发单位").send_keys("SEE GroupA")
browser.find_element_by_id("单位性质_下拉栏").click()
browser.find_element_by_id("单位性质_科研院校").click()
browser.find_element_by_id("软件用户对象描述").send_keys("一般通过网民")
browser.find_element_by_id("主要功能及用途简介").send_keys("没什么用，这里水个300字")
browser.find_element_by_id("测试依据_下拉栏").click()
browser.find_element_by_id("测试依据_GB/T 25000.51-2010").click()
browser.find_element_by_id("测试依据_NST-03-WI13-2011").click()
browser.find_element_by_id("需要测试的技术指标_下拉栏").click()
browser.find_element_by_id("需要测试的技术指标_功能性").click()
browser.find_element_by_id("需要测试的技术指标_易用性").click()
browser.find_element_by_id("软件规模_功能数").send_keys("114514")
browser.find_element_by_id("软件规模_代码行数").send_keys("1919810")
browser.find_element_by_id("软件类型_下拉栏1").click()
browser.find_element_by_id("软件类型_应用软件").click()
#%%
browser.find_element_by_id("软件类型_下拉栏2").click()
browser.find_element_by_id("软件类型_应用软件_办公软件").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Windows版本").send_keys("11")
browser.find_element_by_id("运行环境_客户端_操作系统_Linux").click()
browser.find_element_by_id("运行环境_客户端_操作系统_Linux版本").send_keys("8")
browser.find_element_by_id("运行环境_客户端_内存要求").send_keys("4096")
browser.find_element_by_id("运行环境_客户端_其他要求").send_keys("没什么其他要求了")
browser.find_element_by_id("运行环境_服务器端_硬件_架构_下拉栏").click()
browser.find_element_by_id("运行环境_服务器端_硬件_架构_PC服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_架构_UNIX/Linux服务器").click()
browser.find_element_by_id("运行环境_服务器端_硬件_内存要求").send_keys("1024")
browser.find_element_by_id("运行环境_服务器端_硬件_硬盘要求").send_keys("256")
browser.find_element_by_id("运行环境_服务器端_硬件_其他要求").send_keys("通电就行")
browser.find_element_by_id("运行环境_服务器端_软件_操作系统").send_keys("Windows")
browser.find_element_by_id("运行环境_服务器端_软件_版本").send_keys("10")
browser.find_element_by_id("运行环境_服务器端_软件_编程语言").send_keys("JSX")
browser.find_element_by_id("运行环境_服务器端_软件_架构_下拉栏").click()
browser.find_element_by_id("运行环境_服务器端_软件_架构_C/S").click()
browser.find_element_by_id("运行环境_服务器端_软件_架构_其他").click()
browser.find_element_by_id("运行环境_服务器端_软件_数据库").send_keys("SQL")
browser.find_element_by_id("运行环境_服务器端_软件_中间件").send_keys("洒家不知道什么是中间件")
browser.find_element_by_id("运行环境_服务器端_软件_其他支撑软件").send_keys("不需要")
browser.find_element_by_id("运行环境_服务器端_软件_版本").send_keys("10")
browser.find_element_by_id("运行环境_网络环境").send_keys("5G")
browser.find_element_by_id("样品和数量_软件介质_U盘").click()
browser.find_element_by_id("样品和数量_提交的样品_退还给我们").click()
browser.find_element_by_id("希望测试完成时间").click()
sleep(0.5)
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

# %%
#关闭
browser.quit()
# %%
#测试记录
browser.find_element_by_id("添加新软件测试记录").click()
browser.find_element_by_id("测试分类").send_keys("安全测试1")
browser.find_element_by_id("序号").send_keys("1")
browser.find_element_by_id("测试用例设计说明").send_keys("安全测试2")
browser.find_element_by_id("与本测试用例有关的规约说明").send_keys("安全测试3")
browser.find_element_by_id("前提条件").send_keys("安全测试4")
browser.find_element_by_id("测试用例执行过程").send_keys("安全测试5")
browser.find_element_by_id("预期的结果").send_keys("正常")
browser.find_element_by_id("测试用例设计者").send_keys("徐林")
browser.find_element_by_id("实际结果").send_keys("不正常")
browser.find_element_by_id("是否与预期结果一致").send_keys("否")
browser.find_element_by_id("相关的BUG编号").send_keys("2")
browser.find_element_by_id("用例执行者").send_keys("徐林")
browser.find_element_by_id("执行测试时间").click()
sleep(0.5)
browser.find_element_by_class_name("ant-picker-today-btn").click()
browser.find_element_by_id("确认人").send_keys("徐林")

# %%
