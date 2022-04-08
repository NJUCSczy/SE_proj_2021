# -*- coding: utf-8 -*-
# filename: main.py
import web
from handle import Handle

urls = (
    '/wx', 'Handle', # /wx是要匹配的正则表达式，Handle表示接受请求的类的名称
)



if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()