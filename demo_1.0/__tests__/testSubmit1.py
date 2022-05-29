import pytest
from time import sleep
from selenium import webdriver

options=webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser=webdriver.Chrome(options=options)

class Test_start:
    browser.get("http://localhost:3000")
    assert(1==1)

class Test_user:
    browser.find_element_by_id("home_headers_user").click()