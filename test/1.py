#%%
#初始化
from time import sleep
from selenium import webdriver
options=webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser=webdriver.Chrome(options=options)
browser.get('http://localhost:3000')

#%%
#登录
browser.find_element_by_id("home_headers_user").click()



# %%
browser.find_element_by_id("home_headers_mainpage").click()
# %%
