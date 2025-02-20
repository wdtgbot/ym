'''
new Env('Misty登录')
'''
import time
import random
from requests import post, get
from sendNotify import send
from os import environ
from hashlib import md5
from sys import stdout, exit
#from datetime import datetime


def print_now(content):
    print(content)
    stdout.flush()


account = environ.get('emby_misty') if environ.get('emby_misty') else ''
url = environ.get('emby_misty_url') if environ.get('emby_misty_url') else ''
if account == '':
    print_now('未填写账号密码，退出')
    exit(0)
accountArr = account.split('&')

if url == '':
    print_now('未填写url，使用脚本内置')
    url = 'https://aaa.ax'

def encrypt_md5(s):
    # 创建md5对象
    new_md5 = md5()
    # 这里必须用encode()函数对字符串进行编码，不然会报 TypeError: Unicode-objects must be encoded before hashing
    new_md5.update(s.encode(encoding='utf-8'))
    # 加密
    return new_md5.hexdigest()

def sjs(a, b):
    return random.randint(a, b)



class emby_misty:
    
    def __init__(self, usr, pwd, url):
        self.url = url
        self.usr = usr
        self.pwd = pwd
        self.run = True
        self.headers ={
            'Host': url.replace('http://', '').replace('https://', ''),
            'Proxy-Connection': 'keep-alive',
            'Content-Length': '25',
            'accept': 'application/json',
            'DNT': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': url,
            'Referer': url + '/web/index.html',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        self.deviceid = encrypt_md5(usr)[0:8] + '-' + encrypt_md5(usr)[8:12] + '-' + encrypt_md5(usr)[12:16] + '-' + encrypt_md5(usr)[16:20] + '-' + encrypt_md5(usr)[20:32]
    
    def login(self):
        global url_wrong
        url = self.url + f'/emby/Users/authenticatebyname?X-Emby-Client=Emby+Web&X-Emby-Device-Name=Chrome+Windows&X-Emby-Device-Id={self.deviceid}&X-Emby-Client-Version=4.7.3.0'
        data = {
            'Username': self.usr,
            'Pw': self.pwd
        }
        headers = self.headers
        #print(headers, data, url)
        try:
            req = post(url, data = data, headers = headers, timeout=30)
        except:

            print_now('url访问出错')
            msg.append('url访问出错了!!!')
            url_wrong = 1
            self.run = False     
            return      

        try:
            
            self.token = req.json()['AccessToken']
            self.Id =  req.json()['User']['Id']
            print_now('获取token成功：' + self.token)
            print_now('账号创建日期：' + req.json()['User']['DateCreated'])
            print_now('最后登陆时间：' + req.json()['User']['LastLoginDate'])
            print_now('最后活跃时间：' + req.json()['User']['LastActivityDate'])
            
            msg.append('登陆成功')

        except:
            req.encoding = 'utf-8'
            print_now('登录出错了:' + req.text)
            msg.append('登录出错了!!!')
            if len(req.text) > 150:
                msg.append(req.text[:120])
            else:
                msg.append(req.text)
            self.run = False


    def view(self):
        global url_wrong
        url = self.url + f'/emby/Users/{self.Id}/Views?X-Emby-Client=Emby%20Web&X-Emby-Device-Name=Chrome%20Windows&X-Emby-Device-Id={self.deviceid}&X-Emby-Client-Version=4.7.3.0&X-Emby-Token={self.token}'
        headers = {
            'accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'DNT': '1',
            'Host': self.url.replace('http://', '').replace('https://', ''),
            'Proxy-Connection': 'keep-alive',
            'Referer': url + '/web/index.html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        }
        #print(url,headers)
        try:
            req = get(url,headers = headers, timeout=30)
        except:

            print_now('url访问出错')
            msg.append('url访问出错了!!!')
            url_wrong = 1
            self.run = False     
            return   
        
        #print(req.text)
        try:
            fl = req.json()['TotalRecordCount']
            sj_type = sjs(0, len(req.json()['Items']) - 1)
            self.sjId = req.json()['Items'][sj_type]['Id']
            print_now('获取到总类别数：' + str(fl))
            print_now('获取随机类型 ' + req.json()['Items'][sj_type]["Name"] + '：' + self.sjId)
            msg.append('获取到总类别数：' + str(fl))
        except:
            req.encoding = 'utf-8'
            print_now(req.text)
            msg.append('获取类别出错了!!!')
            if len(req.text) > 150:
                msg.append(req.text[:120])
            else:
                msg.append(req.text)
            self.run = False

    
    def lastest(self):
        global url_wrong
        url = self.url + f'/emby/Users/{self.Id}/Items/Latest?Limit=16&Fields=BasicSyncInfo%2CCanDelete%2CContainer%2CPrimaryImageAspectRatio%2CProductionYear%2CStatus%2CEndDate&ImageTypeLimit=1&EnableImageTypes=Primary%2CBackdrop%2CThumb&ParentId={self.sjId}&X-Emby-Client=Emby%20Web&X-Emby-Device-Name=Google%20Chrome%20Windows&X-Emby-Device-Id={self.deviceid}&X-Emby-Client-Version=4.7.6.0&X-Emby-Token={self.token}'
        headers = {
            'accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'DNT': '1',
            'Host': self.url.replace('http://', '').replace('https://', ''),
            'Proxy-Connection': 'keep-alive',
            'Referer': url + '/web/index.html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        }
        #print(url,headers)
        try:
            req = get(url, headers = headers, timeout=30)
        except:

            print_now('url访问出错')
            msg.append('url访问出错了!!!')
            url_wrong = 1
            self.run = False     
            return   
        
        #print(req.json())
        try:
            jj = req.json()[0]
            print_now('获取到剧集：' + jj['Name'])
            msg.append('获取到剧集：' + jj['Name'])

        except:
            req.encoding = 'utf-8'
            print_now(req.text)
            msg.append('获取剧集出错了!!!')
            if len(req.text) > 150:
                msg.append(req.text[:120])
            else:
                msg.append(req.text)

    def main(self):
        self.login()
        if self.run:
            time.sleep(sjs(5,20))
            self.view()
            if self.run:
                time.sleep(sjs(5,20))
                self.lastest()

            
if __name__  == '__main__':
    msg = []
    url_wrong = 0
    for i in accountArr:
        print_now('\n********开始账号' + str(accountArr.index(i) + 1) + '：' + i.split('@')[0] + '********\n')
        msg.append('\n********账号'  + str(accountArr.index(i) + 1) + '：' + i.split('@')[0] + '********\n')
        emby_misty(i.split('@')[0], i.split('@')[1], url).main()
        if url_wrong:
            print_now('url访问出错，后续账号不再运行')
            msg.append('url访问出错，后续账号不再运行')
            break
        sj = sjs(100,1000)
        print_now('随机等待' + str(sj) + '秒')
        time.sleep(sj)
    msg.append('\n当前访问url：' + url)
    send('Misty登录', '\n'.join(msg))
