#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/8/10 13:23
# -------------------------------
"""
联通app抽奖 入口:app首页搜索 阅读专区
1. 脚本仅供学习交流使用, 请在下载后24h内删除
2. 需要第三方库 pycryptodome 支持 命令行安装 pip3 install pycryptodome或者根据自己环境自行安装..

    进青龙内部pip3 install pycryptodome

3. 环境变量说明 PHONE_NUM(必需) UNICOM_LOTTER(选填) 自行新建环境变量添加
    PHONE_NUM 为你的手机号
    UNICOM_LOTTER 默认自动抽奖, 若不需要 则添加环境变量值为 False
    推送通知的变量同青龙 只写了tgbot(支持反代api)和pushplus
"""
import base64
import threading
from requests import post, get
from time import sleep, time
from datetime import datetime
from hashlib import md5 as md5Encode
from random import randint, uniform, choice, shuffle
from os import environ
from sys import stdout, exit
from base64 import b64encode
from json import dumps
from tools.encrypt_symmetric import Crypt
from tools.send_msg import push
from tools.tool import get_environ, random_sleep
from sendNotify import send

now = datetime.now()
"""读取环境变量"""
phone_nums = environ.get("PHONE_NUM") if environ.get("PHONE_NUM") else ""


phone_numArr = phone_nums.split('&')
for phone in phone_numArr:
    if not phone:
        phone_numArr.remove(phone)  
    
unicom_lotter = environ.get("UNICOM_LOTTER") if environ.get("UNICOM_LOTTER") else True
pushplus_token = environ.get("PUSH_PLUS_TOKEN") if environ.get("PUSH_PLUS_TOKEN") else ""
tgbot_token = environ.get("TG_BOT_TOKEN") if environ.get("TG_BOT_TOKEN") else ""
tg_userId = environ.get("TG_USER_ID") if environ.get("TG_USER_ID") else ""
tg_push_api = environ.get("TG_API_HOST") if environ.get("TG_API_HOST") else ""
"""主类"""


class China_Unicom:
    def __init__(self, phone_num):
        self.phone_num = phone_num
        default_ua = f"Mozilla/5.0 (Linux; Android {randint(8, 13)}; M2012K11AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/{randint(95, 108)}.0.5359.128 Mobile Safari/537.36; unicom{{version:android@9.0{randint(0,6)}00,desmobile:{self.phone_num}}};devicetype{{deviceBrand:Xiaomi,deviceModel:M2012K11AC}};{{yw_code:}}"
        run_ua = get_environ(key="UNICOM_USERAGENT", default=default_ua, output=False)
        self.headers = {
            "Host": "10010.woread.com.cn",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://10010.woread.com.cn",
            "User-Agent": run_ua,
            "Connection": "keep-alive",
            "Referer": "https://10010.woread.com.cn/ng_woread/",
        }
        self.fail_num = 0

    def timestamp(self):
        return round(time() * 1000)

    def print_now(self, content):
        print(content)
        stdout.flush()

    def md5(self, str):
        m = md5Encode(str.encode(encoding='utf-8'))
        return m.hexdigest()


    def req(self, url, crypt_text, retry_num=5):
        while retry_num > 0:
            body = {
                "sign": b64encode(Crypt(crypt_type="AES", key="update!@#1234567", iv="16-Bytes--String", mode="CBC").encrypt(crypt_text).encode()).decode()
            }
            self.headers["Content-Length"] = str(len(dumps(body).replace(" ", "")))
            try:
                res = post(url, headers=self.headers, json=body)
                data = res.json()
                return data
            except Exception as e:
                print(f"本次请求失败, 正在重新发送请求 剩余次数{retry_num}")
                print(f"本次请求失败原因------{e}")
                retry_num -= 1
                sleep(5)
                return self.req(url, crypt_text, retry_num)
                
    def referer_login(self):
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        timestamp = self.timestamp()
        url = f"https://10010.woread.com.cn/ng_woread_service/rest/app/auth/10000002/{timestamp}/{self.md5(f'100000027k1HcDL8RKvc{timestamp}')}"
        crypt_text = f'{{"timestamp":"{date}"}}'
        body = {
            "sign": b64encode(Crypt(crypt_type="AES", key="1234567890abcdef").encrypt(crypt_text).encode()).decode()
        }
        self.headers["Content-Length"] = str(len(str(body)) - 1)
        data = post(url, headers=self.headers, json=body).json()
        if data["code"] == "0000":
            self.headers["accesstoken"] = data["data"]["accesstoken"]
        else:
            self.print_now(f"设备登录失败,日志为{data}")
            exit(0)

    def get_userinfo(self):
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/account/login"
        crypt_text = f'{{"phone":"{self.phone_num}","timestamp":"{date}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.userinfo = data["data"]
        else:
            self.print_now(f"手机号登录失败, 日志为{data}")
            exit(0)

    def watch_video(self):
        self.print_now("看视频获取积分任务: ")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/obtainScoreByAd"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"value":"947728124","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        for i in range(3):
            data = self.req(url, crypt_text)
            self.print_now(data)
            if self.fail_num == 3:
                self.print_now("当前任务出现异常 且错误次数达到3次 请手动检查")
                send('某通阅读', f"{self.phone_num} 当前任务出现异常 且错误次数达到3次 请手动检查")
                exit(0)
            if data["code"] == "9999":
                self.print_now("当前任务出现异常 正在重新执行")
                self.fail_num += 1
                self.main()
            sleep(uniform(2, 8))


    def read_novel(self, cishu):
        self.get_cardid()
        self.get_cntindex()
        self.get_chapterallindex()
        self.print_now(f"正在执行观看{cishu}次小说, 此过程较久, 最大时长为{cishu} * 8s = {cishu * 8 / 60}min")
        for i in range(cishu):
            date = datetime.today().__format__("%Y%m%d%H%M%S")
            chapterAllIndex = choice(self.chapterallindex_list)
            url = f"https://10010.woread.com.cn/ng_woread_service/rest/cnt/wordsDetail?catid={self.catid}&pageIndex={self.pageIndex}&cardid={randint(10000, 99999)}&cntindex={self.cntindex}&chapterallindex={chapterAllIndex}&chapterseno=3"
            crypt_text = f'{{"chapterAllIndex":{chapterAllIndex},"cntIndex":{self.cntindex},"cntTypeFlag":"1","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
            data = self.req(url, crypt_text)
            if self.fail_num == 3:
                self.print_now("当前任务出现异常 且错误次数达到3次 请手动检查")
                push("某通阅读", "阅读任务出现异常 且错误次数达到3次 请手动检查")
                exit(0)
            if data.get("code") != "0000":
                self.print_now("阅读小说发生异常, 正在重新登录执行, 接口返回")
                self.print_now(data)
                return self.main()
            sleep(uniform(2, 8))

    def query_score(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryUserScore"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        total_score = data["data"]["validScore"]
        self.lotter_num = int(total_score / 50)
        self.print_now(f"你的账号当前有积分{total_score}, 可以抽奖{self.lotter_num}次")

    def get_activetion_id(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryActiveInfo"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.activeIndex = data["data"]["activeindex"]
        else:
            self.print_now(f"活动id获取失败 将影响抽奖和查询积分")
    def get_cardid(self):
        """
        获取cardid
        :return:
        """
        url = "https://10010.woread.com.cn/ng_woread_service/rest/basics/getIntellectRecommend"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"cntsize":8,"recommendsize":5,"recommendid":0,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        # print(data)
        self.pageIndex = data["data"]["recommendindex"] if "recommendindex" in data["data"] else "10725"
        self.cardid = data["data"]["catindex"] if "catindex" in data["data"] else "119056"
    def get_cntindex(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/basics/recommposdetail/12279"
        self.headers.pop("Content-Length", "no")
        data = get(url, headers=self.headers).json()
        booklist = data["data"]["booklist"]["message"]
        book_num = len(booklist)
        self.catid = booklist[0]["catindex"] if "catindex" in booklist[0] else "119411"
        self.cntindex = booklist[randint(0, book_num - 1)]["cntindex"]
    def get_chapterallindex(self):
        url = f"https://10010.woread.com.cn/ng_woread_service/rest/cnt/chalist?catid=119411&pageIndex=10725&cardid=12279&cntindex={self.cntindex}"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"curPage":1,"limit":30,"index":"{self.cntindex}","sort":0,"finishFlag":1,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        chapterallindexlist = data["list"][0]["charptercontent"]
        chapterallindex_num = len(chapterallindexlist)
        self.chapterallindex_list = [0] * chapterallindex_num
        i = 0
        while i < chapterallindex_num:
            self.chapterallindex_list[i] = chapterallindexlist[i]["chapterallindex"]
            i += 1
    def lotter(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/handleDrawLottery"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.print_now(f"抽奖成功, 获得{data['data']['prizename']}")
        else:
            self.print_now(f"抽奖失败, 日志为{data}")


    def watch_ad(self):
        self.print_now("观看广告得话费红包: ")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/userTakeActive"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":6880,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        self.print_now(data)

    def exchange(self):
        # ticketValue activeid来自于https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/getSysConfig get请求
        #{"ticketValue":"300","activeid":"61yd210901","timestamp":"20220816213709","token":"","userId":"","userIndex":,"userAccount":"","verifyCode":""}
        url = "https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/exchange"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"ticketValue":"300","activeid":"61yd210901","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        print(data)

    def query_red(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/queryTicketAccount"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        '''body = {
            "sign": base64.b64encode(PrpCrypt(self.headers["accesstoken"][-16:]).encrypt(crypt_text)).decode()
        }
        self.headers["Content-Length"] = str(len(str(body)) - 1)
        '''
        data = self.req(url, crypt_text)
        phone = self.phone_num
        if data["code"] == "0000":
            can_use_red = data["data"]["usableNum"] / 100
            if can_use_red >= 5:
                self.print_now(f"\n查询成功 账户{phone} 当前有话费红包{can_use_red} 可以去兑换了")
                send('某通阅读', f"账户{phone} \n当前有话费红包{can_use_red} 可以去兑换了 \n 入口：联通app搜索 阅读专区，点击必得10元话费大转盘")
            else:
                self.print_now(f"\n查询成功 账户{phone} 当前有话费红包{can_use_red} 不足设定的最低额度")
                #send('某通阅读', f"账户{phone} \n你当前有话费红包{can_use_red} 不足设定的最低额度")

    def exchangescore(self,gaintype): #领取月度任务奖励
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/exchangeActiveScore"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"gaintype":{gaintype},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text) 
        self.print_now(data) 

    def PrizeList(self): #抽奖转盘情况
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryUserPrizeList"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"year":"","month":"","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text) 
        #self.print_now(data) 
        if data['code'] == '0000':
            data = data['data']
            self.print_now(f'账户 {self.phone_num} 当前转盘情况：') 
            x = 0
            for i in data:
                #self.print_now(i)
                self.print_now(str(i['prizename']) + '：' + str(i['prizecount']) + "/" + str(i['prizeamount']))  
                x += i['prizecount']
            self.print_now('总剩余抽奖次数：' + str(x))
            self.left_lottery = x


    def query_way(self): #查询任务完成情况
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryScoreWay"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)       
        data = data["data"]
        
        for x in data:
            if x['taskname'] == '看一次视频得20幸运值':
                print('\n当前任务：' + x['taskname'])
                if x['daylimit'] == x['gainnum']:
                    print('已完成，获得分数：' + str(x['gainscore']) + '\n')
                else:
                    print('未完成，已获得分数：' + str(x['gainscore']))
                    print('还可以完成' + str(x['daylimit'] - x['gainnum']) + '次')
                    print('去完成。。。')
                    self.watch_video()
                    print('\n')
            elif x['taskname'] == '阅读3章得1幸运值':
                print('当前任务：' + x['taskname'])
                if x['daylimit'] == x['gainnum']:
                    print('已完成，获得分数：' + str(x['gainscore']) + '\n')
                else:
                    print('未完成，已获得分数：' + str(x['gainscore']))
                    print('还可以完成' + str(x['daylimit'] - x['gainnum']) + '次')
                    print('去完成。。。')
                    self.read_novel((x['daylimit'] - x['gainnum']) * 3)
                    print('\n')
            elif x['taskname'] == '抽奖满8次得100幸运值':
                cs = x['mapList'][0]
                print('当前任务：' + x['taskname'])
                #print(cs)
                if x['totalNum'] >= int(cs['bindvalue']):
                    if x['gainscore'] == cs['score']:
                        print('已完成，获得分数：' + str(x['gainscore']) + '\n')
                    else:
                        print('已完成但未领取奖励，准备去领取。。。')
                        self.exchangescore(x['tasktype'])
                        print('\n')
                else:
                    print('未完成，进度：' + str(x['totalNum']) + '/' + str(x['mapList'][0]['bindvalue']) + '\n')
            elif x['taskname'] == '抽奖满2天得100幸运值':
                cs = x['mapList'][0]
                print('当前任务：' + x['taskname'])
                #print(cs)
                if x['totalNum'] >= int(cs['bindvalue']):
                    if x['gainscore'] == cs['score']:
                        print('已完成，获得分数：' + str(x['gainscore']) + '\n')
                    else:
                        print('已完成但未领取奖励，准备去领取。。。')
                        self.exchangescore(x['tasktype'])
                        print('\n')
                else:
                    print('未完成，进度：' + str(x['totalNum']) + '/' + str(x['mapList'][0]['bindvalue']) + '\n')                    
                

    def main(self):

        self.referer_login()
        self.get_userinfo()
        self.get_activetion_id() #获取获得id
        self.query_way() #查询任务完成情况
        #self.watch_video()        
        #self.read_novel()  
             
        self.query_score()       
        self.watch_ad()
        self.PrizeList()
        if unicom_lotter and self.left_lottery > 0:
            for i in range(self.lotter_num):
                self.lotter()
                sleep(2)
            self.query_score()
        self.PrizeList()
        self.query_red()
        
        #exit(0)


if __name__ == "__main__":
    print('共' + str(len(phone_numArr)) + '个账户')
    c = 0
    shuffle(phone_numArr)
    print(phone_numArr)
    u = []

    if int(now.strftime('%H')) < 15:
        for i in phone_numArr:
            c = c + 1
            print('\n账户' + str(c) + '：' + str(i) + '\n')
            China_Unicom(i).main()
    else:
        for i in phone_numArr:
            u.append(
                threading.Thread(target=China_Unicom(i).main)
            ) 
        for thread in u:
            thread.start()
        for thread in u:
            thread.join()
            
    exit(0)
