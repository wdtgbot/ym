/*
安卓：中青看点听歌
请勿外传，发现立马失效

不需要捉body，只需要用到zqkdCookie
本脚本没有设置重写，请自己复制zq_cookie到青龙环境下使用，多账号用@隔开
例子： export zqkdCookie='uid=xxx&zqkey=yyy&zqkey_id=zzz@uid=aaa&zqkey=bbb&zqkey_id=ccc@uid=qqq&zqkey=sss&zqkey_id=ttt'

可以自己设定要刷的最终目标时长和每次刷的时长，以及需要领的宝箱个数(前几个)，请在下面更改

只支持青龙上使用，需要依赖crypto-js，报错找不到依赖的自行安装
docker exec -it qinglong bash -c "npm install -g crypto-js"
*/

//以下时长单位都是秒
let targetTime = 12853 //要刷的目标时长
let step = 340 //每次更新的时长
let taskNum = 10 //要领的宝箱个数

const _0x51fd64=_0x4cae;(function(_0x53dde2,_0x57c92d){const _0x1d1337=_0x4cae,_0x4c40fc=_0x53dde2();while(!![]){try{const _0x4d8c5e=parseInt(_0x1d1337(0x129))/0x1+parseInt(_0x1d1337(0x151))/0x2+parseInt(_0x1d1337(0x146))/0x3+parseInt(_0x1d1337(0x125))/0x4+-parseInt(_0x1d1337(0x17c))/0x5+-parseInt(_0x1d1337(0x164))/0x6*(-parseInt(_0x1d1337(0x1c1))/0x7)+-parseInt(_0x1d1337(0x11a))/0x8*(parseInt(_0x1d1337(0x1ba))/0x9);if(_0x4d8c5e===_0x57c92d)break;else _0x4c40fc['push'](_0x4c40fc['shift']());}catch(_0x261dfd){_0x4c40fc['push'](_0x4c40fc['shift']());}}}(_0x2ef1,0xc376b));const jsname=_0x51fd64(0x15c),$=Env(jsname),notifyFlag=0x1,logDebug=0x0;let notifyStr='',rndtime='',httpResult,CryptoJS=require(_0x51fd64(0x113)),userCookie=($[_0x51fd64(0x198)]()?process[_0x51fd64(0x156)][_0x51fd64(0x180)]:$[_0x51fd64(0x1c0)](_0x51fd64(0x180)))||'',userCookieArr=[],bodyArr=[],userIdx=0x0,codeName=_0x51fd64(0x1b1),validCode=![],rewardCount=[],timeRecord=[],preBody=_0x51fd64(0x152),bodyTemplate=_0x51fd64(0x10c),fakeSign=_0x51fd64(0x1d7),rewardList=[],doubleList=[],a=_0x51fd64(0x197),b='jS',c=_0x51fd64(0x1a9),key=a+b+c,d=_0x51fd64(0x112),e=_0x51fd64(0x170),f=_0x51fd64(0x128),fixStr=d+e+f;!(async()=>{const _0x3fbafd=_0x51fd64;if(typeof $request!==_0x3fbafd(0x1af))$[_0x3fbafd(0x16a)](jsname+_0x3fbafd(0x123));else{await isValidCode();if(validCode==![])return;if(!await checkEnv())return;await initAccountInfo();let _0x2ddec5=Math[_0x3fbafd(0x194)](targetTime/step),_0x3c5e37=userCookieArr[_0x3fbafd(0x111)],_0x2f01ef=0x0;console[_0x3fbafd(0x114)](_0x3fbafd(0x1bd)+targetTime+_0x3fbafd(0x147)+step+_0x3fbafd(0x17a)+_0x2ddec5+'次\x0a');for(let _0x5d6982=0x0;_0x5d6982<_0x2ddec5;_0x5d6982++){for(userIdx=0x0;userIdx<_0x3c5e37&&_0x2f01ef<_0x3c5e37;userIdx++){if(timeRecord[userIdx]<targetTime){await SetCompleteSec(step);if(timeRecord[userIdx]>=targetTime)_0x2f01ef++;}}}console[_0x3fbafd(0x114)](_0x3fbafd(0x107));for(let _0xcfbcd4=0x0;_0xcfbcd4<taskNum;_0xcfbcd4++){rewardItem={'name':_0x3fbafd(0x171),'task':''+(_0xcfbcd4+0x1),'type':_0x3fbafd(0x18d)};for(userIdx=0x0;userIdx<userCookieArr[_0x3fbafd(0x111)];userIdx++){let _0x2cd48c=await encodeUserBody(userIdx,rewardItem);await GetReward(_0x2cd48c,_0xcfbcd4);}rewardItem={'name':_0x3fbafd(0x14c),'task':''+(_0xcfbcd4+0x1),'type':_0x3fbafd(0x192)};for(userIdx=0x0;userIdx<userCookieArr[_0x3fbafd(0x111)];userIdx++){let _0x350223=await encodeUserBody(userIdx,rewardItem);await GetDouble(_0x350223,_0xcfbcd4);}}await getStat();}})()[_0x51fd64(0x106)](_0x4ca04e=>$[_0x51fd64(0x131)](_0x4ca04e))[_0x51fd64(0x140)](()=>$[_0x51fd64(0x1a6)]());async function showmsg(){const _0x3a187f=_0x51fd64;notifyBody=jsname+_0x3a187f(0x199)+notifyStr,notifyFlag!=0x1&&console[_0x3a187f(0x114)](notifyBody),notifyFlag==0x1&&$[_0x3a187f(0x16a)](notifyBody);}async function checkEnv(){const _0x1ecb06=_0x51fd64;if(userCookie){if(userCookie[_0x1ecb06(0x1c4)]('@')>-0x1){let _0x81b01d=userCookie[_0x1ecb06(0x1a2)]('@');for(let _0x2c2ed2=0x0;_0x2c2ed2<_0x81b01d[_0x1ecb06(0x111)];_0x2c2ed2++){userCookieArr[_0x1ecb06(0x157)](replaceCookie(_0x81b01d[_0x2c2ed2]));}}else userCookieArr[_0x1ecb06(0x157)](replaceCookie(userCookie));}else return console[_0x1ecb06(0x114)](_0x1ecb06(0x174)),![];if(userCookieArr[_0x1ecb06(0x111)]==0x0)return console[_0x1ecb06(0x114)](_0x1ecb06(0x1b3)),![];return console[_0x1ecb06(0x114)](_0x1ecb06(0x1b2)+userCookieArr[_0x1ecb06(0x111)]+_0x1ecb06(0x196)),!![];}function replaceCookie(_0x17fc0c){const _0x4245cc=_0x51fd64;let _0x291b50='',_0x4d74c5='',_0x59b8c2='';if(_0x17fc0c[_0x4245cc(0x1c4)](_0x4245cc(0x1a8))>-0x1)_0x4d74c5=_0x17fc0c['match'](/zqkey=([\w-]+)/)[0x1];else _0x17fc0c[_0x4245cc(0x1c4)](_0x4245cc(0x1b9))>-0x1&&(_0x4d74c5=_0x17fc0c[_0x4245cc(0x1ab)](/cookie=([\w-]+)/)[0x1]);if(_0x17fc0c[_0x4245cc(0x1c4)](_0x4245cc(0x183))>-0x1)_0x59b8c2=_0x17fc0c[_0x4245cc(0x1ab)](/zqkey_id=([\w-]+)/)[0x1];else _0x17fc0c[_0x4245cc(0x1c4)](_0x4245cc(0x12d))>-0x1&&(_0x59b8c2=_0x17fc0c[_0x4245cc(0x1ab)](/cookie_id=([\w-]+)/)[0x1]);return _0x17fc0c[_0x4245cc(0x1c4)](_0x4245cc(0x16d))>-0x1&&(uid=_0x17fc0c[_0x4245cc(0x1ab)](/uid=([\w-]+)/)[0x1]),_0x291b50=_0x4245cc(0x16d)+uid+_0x4245cc(0x134)+_0x4d74c5+_0x4245cc(0x16e)+_0x59b8c2,_0x291b50;}async function isValidCode(){const _0x2e9b02=_0x51fd64;let _0x30399e=printCaller(),_0x584bf3={'url':_0x2e9b02(0x13e),'headers':''};return new Promise(_0x2452d6=>{const _0x11a987=_0x2e9b02;$[_0x11a987(0x188)](_0x584bf3,async(_0x2ade9a,_0x25e7f1,_0x3a16f1)=>{const _0x41f6f9=_0x11a987;try{if(_0x2ade9a)console['log'](_0x30399e+_0x41f6f9(0x1c2)),console[_0x41f6f9(0x114)](JSON[_0x41f6f9(0x10a)](_0x2ade9a)),$[_0x41f6f9(0x131)](_0x2ade9a);else try{let _0x2b1b6f=JSON[_0x41f6f9(0x18a)](_0x3a16f1);if(logDebug)console[_0x41f6f9(0x114)](_0x2b1b6f);_0x2b1b6f[''+codeName]&&_0x2b1b6f[''+codeName]==0x1?(validCode=!![],console[_0x41f6f9(0x114)](_0x2b1b6f[_0x41f6f9(0x16a)])):console[_0x41f6f9(0x114)](_0x2b1b6f['errorMsg']);}catch(_0x462646){$[_0x41f6f9(0x131)](_0x462646,_0x25e7f1);}finally{_0x2452d6();}}catch(_0x3527af){$[_0x41f6f9(0x131)](_0x3527af,_0x25e7f1);}finally{_0x2452d6();}});});}async function initAccountInfo(){const _0x5b931a=_0x51fd64;for(userIdx=0x0;userIdx<userCookieArr[_0x5b931a(0x111)];userIdx++){rewardCount['push'](0x0),timeRecord[_0x5b931a(0x157)](0x0);}}async function getStat(){const _0x409255=_0x51fd64;console[_0x409255(0x114)](_0x409255(0x18e));for(userIdx=0x0;userIdx<userCookieArr[_0x409255(0x111)];userIdx++){console[_0x409255(0x114)]('账号'+(userIdx+0x1)+_0x409255(0x10b)+rewardCount[userIdx]+'金币');}}async function encodeUserBody(_0x385284,_0x7bc717){const _0x4dde24=_0x51fd64;let _0x5e8fce='',_0x4fe895='',_0x4443ff=_0x4dde24(0x1cf)+_0x7bc717[_0x4dde24(0x1ce)];if(_0x7bc717[_0x4dde24(0x182)]){if(_0x7bc717[_0x4dde24(0x12c)]==_0x4dde24(0x18d))_0x4fe895=_0x4dde24(0x163)+_0x7bc717[_0x4dde24(0x182)]+'&';else _0x7bc717[_0x4dde24(0x12c)]==_0x4dde24(0x192)&&(_0x4fe895=_0x4dde24(0x16f)+_0x7bc717[_0x4dde24(0x182)]+'&');}return _0x5e8fce=bodyTemplate[_0x4dde24(0x181)](/action=[\w_]+/g,_0x4443ff),_0x5e8fce=_0x5e8fce[_0x4dde24(0x181)](/param=[\w_]+\&/g,_0x4fe895),_0x5e8fce=_0x5e8fce+userCookieArr[_0x385284]+fakeSign,encodeBody=EncFunc(_0x5e8fce),hexBody=CryptoJS[_0x4dde24(0x1b7)][_0x4dde24(0x154)][_0x4dde24(0x18a)](encodeBody),base64Body=CryptoJS[_0x4dde24(0x1b7)][_0x4dde24(0x177)][_0x4dde24(0x10a)](hexBody),replaceBody3=base64Body[_0x4dde24(0x181)](/\+/g,'-'),replaceBody4=replaceBody3[_0x4dde24(0x181)](/\//g,'_'),finalBody=encodeURIComponent(replaceBody4),finalBody=preBody+finalBody+'==',finalBody;}async function SetCompleteSec(_0x366901){const _0x28bb7c=_0x51fd64;let _0xb6b65d=printCaller(),_0x172d10=Math[_0x28bb7c(0x19b)](new Date()[_0x28bb7c(0x15f)]()/0x3e8),_0x58b491=userCookieArr[userIdx][_0x28bb7c(0x1a2)]('&'),_0xd11cf3=_0x28bb7c(0x155)+_0x366901+'&'+userCookieArr[userIdx],_0x26c740=_0x28bb7c(0x118),_0x4112b6=populatePostUrl(_0x26c740,_0xd11cf3);await httpPost(_0x4112b6,_0xb6b65d);let _0xecca99=httpResult;if(!_0xecca99)return;_0xecca99[_0x28bb7c(0x10d)]==!![]?_0xecca99[_0x28bb7c(0x160)]&&(console[_0x28bb7c(0x114)]('账号'+(userIdx+0x1)+_0x28bb7c(0x173)+_0xecca99[_0x28bb7c(0x160)]+'秒'),timeRecord[userIdx]=parseInt(_0xecca99[_0x28bb7c(0x160)])):console[_0x28bb7c(0x114)]('账号'+(userIdx+0x1)+_0x28bb7c(0x122)+_0xecca99[_0x28bb7c(0x139)]);}async function GetReward(_0x359d78,_0xb3b16){const _0x39bc70=_0x51fd64;let _0x101b06=printCaller(),_0x5568f9=_0x39bc70(0x1cd),_0x2c84cb=populatePostUrl(_0x5568f9,_0x359d78);await httpPost(_0x2c84cb,_0x101b06);let _0x3072f7=httpResult;if(!_0x3072f7)return;_0x3072f7[_0x39bc70(0x10d)]==!![]?(console[_0x39bc70(0x114)]('用户'+(userIdx+0x1)+_0x39bc70(0x14f)+(_0xb3b16+0x1)+_0x39bc70(0x1b6)+_0x3072f7[_0x39bc70(0x160)][_0x39bc70(0x10f)]+'金币'),rewardCount[userIdx]+=parseInt(_0x3072f7[_0x39bc70(0x160)][_0x39bc70(0x10f)])):console['log']('用户'+(userIdx+0x1)+_0x39bc70(0x14f)+(_0xb3b16+0x1)+_0x39bc70(0x18b)+_0x3072f7['message']);}async function GetDouble(_0x42e24e,_0x3e62c2){const _0x66f716=_0x51fd64;let _0x4b55cd=printCaller(),_0x1c6234='https://kandian.wkandian.com/v5/CommonReward/toDouble.json',_0x26f96a=populatePostUrl(_0x1c6234,_0x42e24e);await httpPost(_0x26f96a,_0x4b55cd);let _0x14aa47=httpResult;if(!_0x14aa47)return;_0x14aa47[_0x66f716(0x10d)]==!![]?(console[_0x66f716(0x114)]('用户'+(userIdx+0x1)+'领取听歌任务'+(_0x3e62c2+0x1)+_0x66f716(0x102)+_0x14aa47['items'][_0x66f716(0x10f)]+'金币'),rewardCount[userIdx]+=parseInt(_0x14aa47[_0x66f716(0x160)][_0x66f716(0x10f)])):console[_0x66f716(0x114)]('用户'+(userIdx+0x1)+_0x66f716(0x14f)+(_0x3e62c2+0x1)+_0x66f716(0x19d)+_0x14aa47[_0x66f716(0x139)]);}function populatePostUrl(_0x47c78b,_0x16de0c){const _0x27bdee=_0x51fd64;let _0x1dc854=Math[_0x27bdee(0x19b)](new Date()[_0x27bdee(0x15f)]()/0x3e8),_0x2edef0={'url':_0x47c78b,'headers':{'request_time':_0x1dc854,'Host':_0x27bdee(0x159),'device-model':_0x27bdee(0x126),'device-platform':_0x27bdee(0x1d1),'Connection':_0x27bdee(0x1d2)},'body':_0x16de0c};return _0x2edef0;}function populateGetUrl(_0x3b2458){const _0x4b1f79=_0x51fd64;let _0x577c58=Math[_0x4b1f79(0x19b)](new Date()[_0x4b1f79(0x15f)]()/0x3e8),_0x11e94d={'url':_0x3b2458,'headers':{'request_time':_0x577c58,'Host':_0x4b1f79(0x159),'device-model':_0x4b1f79(0x126),'device-platform':_0x4b1f79(0x1d1),'Connection':_0x4b1f79(0x1d2)}};return _0x11e94d;}async function httpPost(_0x5aeca1,_0x21e7e7){return httpResult=null,new Promise(_0x194811=>{const _0x1a85e9=_0x4cae;$[_0x1a85e9(0x158)](_0x5aeca1,async(_0x1ea7e9,_0x35208b,_0x3cc709)=>{const _0x2f7c67=_0x1a85e9;try{if(_0x1ea7e9)console[_0x2f7c67(0x114)](_0x21e7e7+_0x2f7c67(0x1c2)),console[_0x2f7c67(0x114)](JSON[_0x2f7c67(0x10a)](_0x1ea7e9)),$[_0x2f7c67(0x131)](_0x1ea7e9);else{if(safeGet(_0x3cc709)){httpResult=JSON[_0x2f7c67(0x18a)](_0x3cc709);if(logDebug)console[_0x2f7c67(0x114)](httpResult);}}}catch(_0x5182a4){$[_0x2f7c67(0x131)](_0x5182a4,_0x35208b);}finally{_0x194811();}});});}async function httpGet(_0x39bb4e,_0x13e3b7){return httpResult=null,new Promise(_0x5d7aa5=>{const _0x2c9bef=_0x4cae;$[_0x2c9bef(0x188)](_0x39bb4e,async(_0x4e0e44,_0x24780d,_0x13b29e)=>{const _0x382365=_0x2c9bef;try{if(_0x4e0e44)console[_0x382365(0x114)](_0x13e3b7+_0x382365(0x120)),console[_0x382365(0x114)](JSON[_0x382365(0x10a)](_0x4e0e44)),$[_0x382365(0x131)](_0x4e0e44);else{if(safeGet(_0x13b29e,_0x13e3b7)){httpResult=JSON[_0x382365(0x18a)](_0x13b29e);if(logDebug)console[_0x382365(0x114)](httpResult);}}}catch(_0x2ef4ed){$[_0x382365(0x131)](_0x2ef4ed,_0x24780d);}finally{_0x5d7aa5();}});});}function safeGet(_0x25f21b,_0xbc2f13){const _0xee9ce4=_0x51fd64;try{if(typeof JSON[_0xee9ce4(0x18a)](_0x25f21b)==_0xee9ce4(0x1a0))return!![];else console[_0xee9ce4(0x114)](_0xee9ce4(0x15a)+_0xbc2f13+_0xee9ce4(0x108)),console[_0xee9ce4(0x114)](_0x25f21b);}catch(_0x23e780){return console[_0xee9ce4(0x114)](_0x23e780),console[_0xee9ce4(0x114)](_0xee9ce4(0x15a)+_0xbc2f13+_0xee9ce4(0x162)),![];}}function getMin(_0x4fcb60,_0x4e42f8){return _0x4fcb60<_0x4e42f8?_0x4fcb60:_0x4e42f8;}function _0x2ef1(){const _0x1db34f=['setValueForKey','isArray','object','writedata','split','fetch','url','trim','done','dataFile','zqkey=','ZFH','body','match','CookieJar','open-url','slice','undefined','encrypt','zqkd_audio_pro','共找到','未找到有效的userCookie','*/*','getSeconds','奖励成功，获得','enc','existsSync','cookie=','32076162Laqwmd','set-cookie','logs','\x0a开始刷听歌时长，目标时间为','getFullYear','media-url','getdata','9817108lKJGbR',':\x20post请求失败','resolve','indexOf',',\x20开始!','Utf8','got','application/x-www-form-urlencoded','lodash_set','wait','isLoon','openUrl','https://kandian.wkandian.com/v5/CommonReward/toGetReward.json','name','action=','data','android','keep-alive','concat','loaddata','Pkcs7','status','&sign=01e8102fab93e458542c5155a3b8b734','翻倍奖励成功，获得','exec','redirect','writeFileSync','catch','\x0a开始领取听歌任务奖励\x0a',':\x20未知失败','stack','stringify','本轮共获得了','app_name=zqkd_app&app_version=3.6.0&carrier=%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1&channel=c1031&device_brand=HUAWEI&device_id=55903361&device_model=TAS-AN00&device_platform=android&device_type=android&dpi=480&inner_version=202108181534&language=zh-CN&memory=7&mi=0&mobile_type=1&net_type=1&network_type=WIFI&oaid=9bdf7bff-f3fe-2b18-5fff-3b3f3fd6873d&openudid=f2111c392e056b84&os_api=29&os_version=TAS-AN00+10.0.0.133%28C00E132R5P1%29&param=box_six&request_time=1634562471&resolution=1080x2259&rom_version=TAS-AN00+10.0.0.133%28C00E132R5P1%29&s_ad=jYFg4QJ5A6eY%3Db6-Jhj-LiXHYrVhu-F48x17yWx9eEyD5&sm_device_id=2020031618154539f1a2741679d27a72c6745d9ed13e6801c4b79111353999&storage=109.35&action=task_reward_action&','success','==============📣系统通知📣==============','score','setval','length','jdvylqchJZrf','crypto-js','log','write','getMonth','/v1/scripting/evaluate','https://kandian.wkandian.com/V17/Ximalaya/setCompleteSec.json','getScript','8mzpIin','path','setdata','valueForKey','isSurge','POST',':\x20get请求失败','then','更新听歌时长失败：',':\x20此脚本不做重写，请检查重写设置','http','2510932rEaMJM','VOG-AL10','setCookieSync','smCGUapF1YChc','538533RlGpCi','isMute','cron','type','cookie_id=','opts','CBC','cwd','logErr','getMinutes','@chavy_boxjs_userCfgs.httpapi','&zqkey=',',\x20错误!','cktough','getDate','mode','message','@chavy_boxjs_userCfgs.httpapi_timeout','call','getjson','join','https://leafxcy.coding.net/p/validcode/d/validCode/git/raw/master/code.json','statusCode','finally','getHours','lodash_get',',\x20结束!\x20🕛\x20','null','isQuanX','4187019Imigys','秒，每次刷','assign','initGotEnv','send','Cookie','ximalaya_double','headers','tough-cookie','领取听歌任务','.$1','2335290DFIgID','p=zUJybc31G2V0%3D','decrypt','Hex','access=4G&app_name=zqkd_app&app_version=3.6.0&version_code=67&sec=','env','push','post','kandian.wkandian.com','Function\x20','DES','中青看点听歌','getval','Content-Length','getTime','items','abs',':\x20服务器访问数据为空，请检查自身设备网络情况','param=','6PseBlJ','pad','Content-Type','exports','startTime','cookieJar','msg','logSeparator','substr','uid=','&zqkey_id=','index=','w0o2DgAb','ximalaya','toObj','更新听歌时长成功：今日听歌时长','未找到userCookie','mediaUrl','random','Base64','readFileSync','box.dat','秒，循环','isNeedRewrite','3836955pPDUDC','setjson','ckjar','ciphertext','zqkdCookie','replace','task','zqkey_id=','reduce','test','runScript','getMilliseconds','get','http://','parse','奖励失败：','string','reward','============================','map','qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM','timeout','double','toString','ceil','toStr','个用户','6HP','isNode','运行通知\x0a\x0a','read','floor','time','翻倍奖励失败：'];_0x2ef1=function(){return _0x1db34f;};return _0x2ef1();}function getMax(_0x57542e,_0x4e4000){return _0x57542e<_0x4e4000?_0x4e4000:_0x57542e;}function printCaller(){const _0x4c859c=_0x51fd64;return new Error()[_0x4c859c(0x109)][_0x4c859c(0x1a2)]('\x0a')[0x2][_0x4c859c(0x1a5)]()[_0x4c859c(0x1a2)]('\x20')[0x1];}function EncFunc(_0x27798a){const _0x117809=_0x51fd64;var _0x5349c6=CryptoJS[_0x117809(0x1b7)][_0x117809(0x1c6)][_0x117809(0x18a)](key),_0x3b1e3b=CryptoJS[_0x117809(0x1b7)][_0x117809(0x1c6)][_0x117809(0x18a)](key),_0x52e321=CryptoJS[_0x117809(0x1b7)][_0x117809(0x1c6)][_0x117809(0x18a)](_0x27798a);return encrypted=CryptoJS[_0x117809(0x15b)][_0x117809(0x1b0)](_0x52e321,_0x5349c6,{'iv':_0x3b1e3b,'mode':CryptoJS[_0x117809(0x138)][_0x117809(0x12f)],'padding':CryptoJS[_0x117809(0x165)][_0x117809(0x1d5)]}),encrypted[_0x117809(0x17f)][_0x117809(0x193)]();}function _0x4cae(_0x348761,_0x42a672){const _0x2ef1e6=_0x2ef1();return _0x4cae=function(_0x4caef8,_0x213757){_0x4caef8=_0x4caef8-0x102;let _0x465ef1=_0x2ef1e6[_0x4caef8];return _0x465ef1;},_0x4cae(_0x348761,_0x42a672);}function DecFunc(_0x411cd1){const _0x597cfa=_0x51fd64;var _0x518dca=CryptoJS[_0x597cfa(0x1b7)][_0x597cfa(0x1c6)][_0x597cfa(0x18a)](key),_0xc47072=CryptoJS[_0x597cfa(0x1b7)][_0x597cfa(0x1c6)][_0x597cfa(0x18a)](key),_0x4a33ac=CryptoJS[_0x597cfa(0x15b)][_0x597cfa(0x153)]({'ciphertext':CryptoJS[_0x597cfa(0x1b7)][_0x597cfa(0x177)][_0x597cfa(0x18a)](_0x411cd1)},_0x518dca,{'iv':_0xc47072,'mode':CryptoJS[_0x597cfa(0x138)][_0x597cfa(0x12f)],'padding':CryptoJS[_0x597cfa(0x165)][_0x597cfa(0x1d5)]});return _0x4a33ac[_0x597cfa(0x193)](CryptoJS[_0x597cfa(0x1b7)][_0x597cfa(0x1c6)]);}function randomString(_0x2da222=0xc){const _0x43bd67=_0x51fd64;let _0x22299c=_0x43bd67(0x190),_0x271bd5=_0x22299c[_0x43bd67(0x111)],_0x4b10c0='';for(i=0x0;i<_0x2da222;i++){_0x4b10c0+=_0x22299c['charAt'](Math[_0x43bd67(0x19b)](Math[_0x43bd67(0x176)]()*_0x271bd5));}return _0x4b10c0;}function Env(_0x3ceabd,_0x801c71){const _0x1d5c2d=_0x51fd64;class _0x39813d{constructor(_0x1bdff3){const _0xc47222=_0x4cae;this[_0xc47222(0x156)]=_0x1bdff3;}[_0x1d5c2d(0x14a)](_0x3c9301,_0x3d1f62='GET'){const _0x19aa8e=_0x1d5c2d;_0x3c9301=_0x19aa8e(0x18c)==typeof _0x3c9301?{'url':_0x3c9301}:_0x3c9301;let _0x26d727=this[_0x19aa8e(0x188)];return _0x19aa8e(0x11f)===_0x3d1f62&&(_0x26d727=this[_0x19aa8e(0x158)]),new Promise((_0x11e17f,_0x3d496d)=>{const _0x5e719c=_0x19aa8e;_0x26d727[_0x5e719c(0x13b)](this,_0x3c9301,(_0x1c27de,_0x5a867e,_0xf2b82b)=>{_0x1c27de?_0x3d496d(_0x1c27de):_0x11e17f(_0x5a867e);});});}[_0x1d5c2d(0x188)](_0x3996c0){const _0x138609=_0x1d5c2d;return this[_0x138609(0x14a)][_0x138609(0x13b)](this[_0x138609(0x156)],_0x3996c0);}[_0x1d5c2d(0x158)](_0x509064){const _0x40042b=_0x1d5c2d;return this[_0x40042b(0x14a)][_0x40042b(0x13b)](this[_0x40042b(0x156)],_0x509064,_0x40042b(0x11f));}}return new class{constructor(_0x28223d,_0xf31b39){const _0x3f1d18=_0x1d5c2d;this[_0x3f1d18(0x1ce)]=_0x28223d,this[_0x3f1d18(0x124)]=new _0x39813d(this),this[_0x3f1d18(0x1d0)]=null,this[_0x3f1d18(0x1a7)]=_0x3f1d18(0x179),this[_0x3f1d18(0x1bc)]=[],this[_0x3f1d18(0x12a)]=!0x1,this[_0x3f1d18(0x17b)]=!0x1,this[_0x3f1d18(0x16b)]='\x0a',this[_0x3f1d18(0x168)]=new Date()[_0x3f1d18(0x15f)](),Object[_0x3f1d18(0x148)](this,_0xf31b39),this[_0x3f1d18(0x114)]('','🔔'+this[_0x3f1d18(0x1ce)]+_0x3f1d18(0x1c5));}[_0x1d5c2d(0x198)](){const _0x113be4=_0x1d5c2d;return _0x113be4(0x1af)!=typeof module&&!!module[_0x113be4(0x167)];}[_0x1d5c2d(0x145)](){return'undefined'!=typeof $task;}[_0x1d5c2d(0x11e)](){const _0x1394ac=_0x1d5c2d;return _0x1394ac(0x1af)!=typeof $httpClient&&_0x1394ac(0x1af)==typeof $loon;}[_0x1d5c2d(0x1cb)](){const _0x14196e=_0x1d5c2d;return _0x14196e(0x1af)!=typeof $loon;}[_0x1d5c2d(0x172)](_0x2dc699,_0x5936cf=null){const _0x589892=_0x1d5c2d;try{return JSON[_0x589892(0x18a)](_0x2dc699);}catch{return _0x5936cf;}}[_0x1d5c2d(0x195)](_0x67ff25,_0x4262fd=null){const _0x4db8a5=_0x1d5c2d;try{return JSON[_0x4db8a5(0x10a)](_0x67ff25);}catch{return _0x4262fd;}}[_0x1d5c2d(0x13c)](_0x455c44,_0x142ef6){const _0x510e9c=_0x1d5c2d;let _0x5678ec=_0x142ef6;const _0x1cc573=this[_0x510e9c(0x1c0)](_0x455c44);if(_0x1cc573)try{_0x5678ec=JSON[_0x510e9c(0x18a)](this[_0x510e9c(0x1c0)](_0x455c44));}catch{}return _0x5678ec;}[_0x1d5c2d(0x17d)](_0x1fd7e0,_0x524222){const _0x43a468=_0x1d5c2d;try{return this[_0x43a468(0x11c)](JSON[_0x43a468(0x10a)](_0x1fd7e0),_0x524222);}catch{return!0x1;}}[_0x1d5c2d(0x119)](_0x4377fd){return new Promise(_0x15bb20=>{const _0xd7cf6b=_0x4cae;this[_0xd7cf6b(0x188)]({'url':_0x4377fd},(_0xba83d9,_0x58ed2d,_0x13885f)=>_0x15bb20(_0x13885f));});}[_0x1d5c2d(0x186)](_0x17958a,_0x15a927){const _0x28f089=_0x1d5c2d;return new Promise(_0x5cf25a=>{const _0xe7876c=_0x4cae;let _0x41749a=this[_0xe7876c(0x1c0)](_0xe7876c(0x133));_0x41749a=_0x41749a?_0x41749a[_0xe7876c(0x181)](/\n/g,'')[_0xe7876c(0x1a5)]():_0x41749a;let _0x56ff61=this[_0xe7876c(0x1c0)](_0xe7876c(0x13a));_0x56ff61=_0x56ff61?0x1*_0x56ff61:0x14,_0x56ff61=_0x15a927&&_0x15a927[_0xe7876c(0x191)]?_0x15a927[_0xe7876c(0x191)]:_0x56ff61;const [_0x5c8d9a,_0x5c4322]=_0x41749a[_0xe7876c(0x1a2)]('@'),_0x6183f4={'url':_0xe7876c(0x189)+_0x5c4322+_0xe7876c(0x117),'body':{'script_text':_0x17958a,'mock_type':_0xe7876c(0x12b),'timeout':_0x56ff61},'headers':{'X-Key':_0x5c8d9a,'Accept':_0xe7876c(0x1b4)}};this[_0xe7876c(0x158)](_0x6183f4,(_0x2f9e65,_0x17cc33,_0x8ef69e)=>_0x5cf25a(_0x8ef69e));})[_0x28f089(0x106)](_0x255918=>this[_0x28f089(0x131)](_0x255918));}[_0x1d5c2d(0x1d4)](){const _0x1e28f6=_0x1d5c2d;if(!this[_0x1e28f6(0x198)]())return{};{this['fs']=this['fs']?this['fs']:require('fs'),this[_0x1e28f6(0x11b)]=this[_0x1e28f6(0x11b)]?this[_0x1e28f6(0x11b)]:require(_0x1e28f6(0x11b));const _0x2bda3d=this[_0x1e28f6(0x11b)][_0x1e28f6(0x1c3)](this[_0x1e28f6(0x1a7)]),_0x47965d=this[_0x1e28f6(0x11b)]['resolve'](process[_0x1e28f6(0x130)](),this[_0x1e28f6(0x1a7)]),_0x8de7b9=this['fs'][_0x1e28f6(0x1b8)](_0x2bda3d),_0x53f298=!_0x8de7b9&&this['fs'][_0x1e28f6(0x1b8)](_0x47965d);if(!_0x8de7b9&&!_0x53f298)return{};{const _0x53ee2f=_0x8de7b9?_0x2bda3d:_0x47965d;try{return JSON[_0x1e28f6(0x18a)](this['fs'][_0x1e28f6(0x178)](_0x53ee2f));}catch(_0x1fbd60){return{};}}}}[_0x1d5c2d(0x1a1)](){const _0x361702=_0x1d5c2d;if(this[_0x361702(0x198)]()){this['fs']=this['fs']?this['fs']:require('fs'),this[_0x361702(0x11b)]=this[_0x361702(0x11b)]?this[_0x361702(0x11b)]:require('path');const _0x4b85dc=this[_0x361702(0x11b)][_0x361702(0x1c3)](this[_0x361702(0x1a7)]),_0x5db54c=this[_0x361702(0x11b)][_0x361702(0x1c3)](process[_0x361702(0x130)](),this[_0x361702(0x1a7)]),_0x31fbde=this['fs'][_0x361702(0x1b8)](_0x4b85dc),_0x2a0c03=!_0x31fbde&&this['fs'][_0x361702(0x1b8)](_0x5db54c),_0x1c0acd=JSON[_0x361702(0x10a)](this[_0x361702(0x1d0)]);_0x31fbde?this['fs']['writeFileSync'](_0x4b85dc,_0x1c0acd):_0x2a0c03?this['fs'][_0x361702(0x105)](_0x5db54c,_0x1c0acd):this['fs'][_0x361702(0x105)](_0x4b85dc,_0x1c0acd);}}[_0x1d5c2d(0x142)](_0x5322e6,_0x1f70da,_0x573f82){const _0x35dc4a=_0x1d5c2d,_0x9ccf4=_0x1f70da[_0x35dc4a(0x181)](/\[(\d+)\]/g,_0x35dc4a(0x150))[_0x35dc4a(0x1a2)]('.');let _0x21b7fb=_0x5322e6;for(const _0x35dd80 of _0x9ccf4)if(_0x21b7fb=Object(_0x21b7fb)[_0x35dd80],void 0x0===_0x21b7fb)return _0x573f82;return _0x21b7fb;}[_0x1d5c2d(0x1c9)](_0x27ca58,_0x2c1d76,_0x4c4653){const _0x3f052b=_0x1d5c2d;return Object(_0x27ca58)!==_0x27ca58?_0x27ca58:(Array[_0x3f052b(0x19f)](_0x2c1d76)||(_0x2c1d76=_0x2c1d76[_0x3f052b(0x193)]()[_0x3f052b(0x1ab)](/[^.[\]]+/g)||[]),_0x2c1d76[_0x3f052b(0x1ae)](0x0,-0x1)[_0x3f052b(0x184)]((_0x45c693,_0x550824,_0x17df54)=>Object(_0x45c693[_0x550824])===_0x45c693[_0x550824]?_0x45c693[_0x550824]:_0x45c693[_0x550824]=Math[_0x3f052b(0x161)](_0x2c1d76[_0x17df54+0x1])>>0x0==+_0x2c1d76[_0x17df54+0x1]?[]:{},_0x27ca58)[_0x2c1d76[_0x2c1d76[_0x3f052b(0x111)]-0x1]]=_0x4c4653,_0x27ca58);}[_0x1d5c2d(0x1c0)](_0x27638f){const _0x5081e5=_0x1d5c2d;let _0x3bdb6b=this[_0x5081e5(0x15d)](_0x27638f);if(/^@/[_0x5081e5(0x185)](_0x27638f)){const [,_0x5afb3a,_0x3ac47a]=/^@(.*?)\.(.*?)$/[_0x5081e5(0x103)](_0x27638f),_0x38d78c=_0x5afb3a?this[_0x5081e5(0x15d)](_0x5afb3a):'';if(_0x38d78c)try{const _0x2a6d13=JSON[_0x5081e5(0x18a)](_0x38d78c);_0x3bdb6b=_0x2a6d13?this[_0x5081e5(0x142)](_0x2a6d13,_0x3ac47a,''):_0x3bdb6b;}catch(_0x30e2cd){_0x3bdb6b='';}}return _0x3bdb6b;}[_0x1d5c2d(0x11c)](_0x345f77,_0x40a9de){const _0x21f54e=_0x1d5c2d;let _0x1396fa=!0x1;if(/^@/[_0x21f54e(0x185)](_0x40a9de)){const [,_0x2310d1,_0x488aa9]=/^@(.*?)\.(.*?)$/[_0x21f54e(0x103)](_0x40a9de),_0x2556e7=this[_0x21f54e(0x15d)](_0x2310d1),_0x1625f8=_0x2310d1?_0x21f54e(0x144)===_0x2556e7?null:_0x2556e7||'{}':'{}';try{const _0x568eb5=JSON[_0x21f54e(0x18a)](_0x1625f8);this[_0x21f54e(0x1c9)](_0x568eb5,_0x488aa9,_0x345f77),_0x1396fa=this[_0x21f54e(0x110)](JSON[_0x21f54e(0x10a)](_0x568eb5),_0x2310d1);}catch(_0x3fd5c9){const _0x3b21ff={};this[_0x21f54e(0x1c9)](_0x3b21ff,_0x488aa9,_0x345f77),_0x1396fa=this[_0x21f54e(0x110)](JSON[_0x21f54e(0x10a)](_0x3b21ff),_0x2310d1);}}else _0x1396fa=this['setval'](_0x345f77,_0x40a9de);return _0x1396fa;}['getval'](_0x158d9d){const _0x1fed79=_0x1d5c2d;return this['isSurge']()||this[_0x1fed79(0x1cb)]()?$persistentStore[_0x1fed79(0x19a)](_0x158d9d):this[_0x1fed79(0x145)]()?$prefs[_0x1fed79(0x11d)](_0x158d9d):this[_0x1fed79(0x198)]()?(this[_0x1fed79(0x1d0)]=this[_0x1fed79(0x1d4)](),this[_0x1fed79(0x1d0)][_0x158d9d]):this[_0x1fed79(0x1d0)]&&this[_0x1fed79(0x1d0)][_0x158d9d]||null;}['setval'](_0x221c52,_0x1e43a){const _0x1ac35b=_0x1d5c2d;return this[_0x1ac35b(0x11e)]()||this[_0x1ac35b(0x1cb)]()?$persistentStore[_0x1ac35b(0x115)](_0x221c52,_0x1e43a):this[_0x1ac35b(0x145)]()?$prefs[_0x1ac35b(0x19e)](_0x221c52,_0x1e43a):this[_0x1ac35b(0x198)]()?(this['data']=this[_0x1ac35b(0x1d4)](),this[_0x1ac35b(0x1d0)][_0x1e43a]=_0x221c52,this[_0x1ac35b(0x1a1)](),!0x0):this[_0x1ac35b(0x1d0)]&&this[_0x1ac35b(0x1d0)][_0x1e43a]||null;}[_0x1d5c2d(0x149)](_0x541a3d){const _0x462f1d=_0x1d5c2d;this[_0x462f1d(0x1c7)]=this[_0x462f1d(0x1c7)]?this[_0x462f1d(0x1c7)]:require(_0x462f1d(0x1c7)),this[_0x462f1d(0x136)]=this[_0x462f1d(0x136)]?this[_0x462f1d(0x136)]:require(_0x462f1d(0x14e)),this[_0x462f1d(0x17e)]=this[_0x462f1d(0x17e)]?this[_0x462f1d(0x17e)]:new this[(_0x462f1d(0x136))][(_0x462f1d(0x1ac))](),_0x541a3d&&(_0x541a3d['headers']=_0x541a3d[_0x462f1d(0x14d)]?_0x541a3d[_0x462f1d(0x14d)]:{},void 0x0===_0x541a3d[_0x462f1d(0x14d)][_0x462f1d(0x14b)]&&void 0x0===_0x541a3d[_0x462f1d(0x169)]&&(_0x541a3d[_0x462f1d(0x169)]=this[_0x462f1d(0x17e)]));}[_0x1d5c2d(0x188)](_0x4890e5,_0x2a7eeb=()=>{}){const _0x15a3c9=_0x1d5c2d;_0x4890e5[_0x15a3c9(0x14d)]&&(delete _0x4890e5[_0x15a3c9(0x14d)][_0x15a3c9(0x166)],delete _0x4890e5[_0x15a3c9(0x14d)][_0x15a3c9(0x15e)]),this[_0x15a3c9(0x11e)]()||this[_0x15a3c9(0x1cb)]()?(this[_0x15a3c9(0x11e)]()&&this[_0x15a3c9(0x17b)]&&(_0x4890e5[_0x15a3c9(0x14d)]=_0x4890e5[_0x15a3c9(0x14d)]||{},Object[_0x15a3c9(0x148)](_0x4890e5[_0x15a3c9(0x14d)],{'X-Surge-Skip-Scripting':!0x1})),$httpClient[_0x15a3c9(0x188)](_0x4890e5,(_0x5d41df,_0x2aa456,_0xd44c37)=>{const _0x2f6e98=_0x15a3c9;!_0x5d41df&&_0x2aa456&&(_0x2aa456[_0x2f6e98(0x1aa)]=_0xd44c37,_0x2aa456[_0x2f6e98(0x13f)]=_0x2aa456[_0x2f6e98(0x1d6)]),_0x2a7eeb(_0x5d41df,_0x2aa456,_0xd44c37);})):this[_0x15a3c9(0x145)]()?(this[_0x15a3c9(0x17b)]&&(_0x4890e5[_0x15a3c9(0x12e)]=_0x4890e5[_0x15a3c9(0x12e)]||{},Object[_0x15a3c9(0x148)](_0x4890e5[_0x15a3c9(0x12e)],{'hints':!0x1})),$task[_0x15a3c9(0x1a3)](_0x4890e5)[_0x15a3c9(0x121)](_0x2547fd=>{const {statusCode:_0x4e6080,statusCode:_0x3b8b52,headers:_0x1ae15a,body:_0x462865}=_0x2547fd;_0x2a7eeb(null,{'status':_0x4e6080,'statusCode':_0x3b8b52,'headers':_0x1ae15a,'body':_0x462865},_0x462865);},_0x367dd1=>_0x2a7eeb(_0x367dd1))):this[_0x15a3c9(0x198)]()&&(this[_0x15a3c9(0x149)](_0x4890e5),this[_0x15a3c9(0x1c7)](_0x4890e5)['on'](_0x15a3c9(0x104),(_0x52c555,_0x36e402)=>{const _0x3f45bb=_0x15a3c9;try{if(_0x52c555[_0x3f45bb(0x14d)][_0x3f45bb(0x1bb)]){const _0x13953f=_0x52c555[_0x3f45bb(0x14d)][_0x3f45bb(0x1bb)][_0x3f45bb(0x18f)](this[_0x3f45bb(0x136)][_0x3f45bb(0x14b)][_0x3f45bb(0x18a)])[_0x3f45bb(0x193)]();this[_0x3f45bb(0x17e)][_0x3f45bb(0x127)](_0x13953f,null),_0x36e402[_0x3f45bb(0x169)]=this[_0x3f45bb(0x17e)];}}catch(_0xca1c45){this[_0x3f45bb(0x131)](_0xca1c45);}})[_0x15a3c9(0x121)](_0x7ff72e=>{const {statusCode:_0x4db853,statusCode:_0x1ce807,headers:_0x29f7dc,body:_0x454fc7}=_0x7ff72e;_0x2a7eeb(null,{'status':_0x4db853,'statusCode':_0x1ce807,'headers':_0x29f7dc,'body':_0x454fc7},_0x454fc7);},_0x4ad867=>{const _0x30de5f=_0x15a3c9,{message:_0x1c51a2,response:_0x2e3b89}=_0x4ad867;_0x2a7eeb(_0x1c51a2,_0x2e3b89,_0x2e3b89&&_0x2e3b89[_0x30de5f(0x1aa)]);}));}[_0x1d5c2d(0x158)](_0x562352,_0x4439c4=()=>{}){const _0x59f114=_0x1d5c2d;if(_0x562352[_0x59f114(0x1aa)]&&_0x562352[_0x59f114(0x14d)]&&!_0x562352[_0x59f114(0x14d)]['Content-Type']&&(_0x562352[_0x59f114(0x14d)][_0x59f114(0x166)]=_0x59f114(0x1c8)),_0x562352[_0x59f114(0x14d)]&&delete _0x562352[_0x59f114(0x14d)][_0x59f114(0x15e)],this[_0x59f114(0x11e)]()||this[_0x59f114(0x1cb)]())this[_0x59f114(0x11e)]()&&this[_0x59f114(0x17b)]&&(_0x562352['headers']=_0x562352[_0x59f114(0x14d)]||{},Object[_0x59f114(0x148)](_0x562352[_0x59f114(0x14d)],{'X-Surge-Skip-Scripting':!0x1})),$httpClient[_0x59f114(0x158)](_0x562352,(_0x55d13e,_0x167a74,_0x1f3315)=>{const _0xcaece5=_0x59f114;!_0x55d13e&&_0x167a74&&(_0x167a74[_0xcaece5(0x1aa)]=_0x1f3315,_0x167a74[_0xcaece5(0x13f)]=_0x167a74[_0xcaece5(0x1d6)]),_0x4439c4(_0x55d13e,_0x167a74,_0x1f3315);});else{if(this[_0x59f114(0x145)]())_0x562352['method']=_0x59f114(0x11f),this[_0x59f114(0x17b)]&&(_0x562352[_0x59f114(0x12e)]=_0x562352[_0x59f114(0x12e)]||{},Object[_0x59f114(0x148)](_0x562352[_0x59f114(0x12e)],{'hints':!0x1})),$task[_0x59f114(0x1a3)](_0x562352)[_0x59f114(0x121)](_0xba75f5=>{const {statusCode:_0x13ef48,statusCode:_0x51e5e9,headers:_0x2fc83d,body:_0x3718fc}=_0xba75f5;_0x4439c4(null,{'status':_0x13ef48,'statusCode':_0x51e5e9,'headers':_0x2fc83d,'body':_0x3718fc},_0x3718fc);},_0x56c3fe=>_0x4439c4(_0x56c3fe));else{if(this['isNode']()){this[_0x59f114(0x149)](_0x562352);const {url:_0x4b8e60,..._0x21579e}=_0x562352;this[_0x59f114(0x1c7)][_0x59f114(0x158)](_0x4b8e60,_0x21579e)[_0x59f114(0x121)](_0x3fd4da=>{const {statusCode:_0xf3aa48,statusCode:_0x1e7560,headers:_0x3a576b,body:_0x3bc870}=_0x3fd4da;_0x4439c4(null,{'status':_0xf3aa48,'statusCode':_0x1e7560,'headers':_0x3a576b,'body':_0x3bc870},_0x3bc870);},_0x39487d=>{const _0x1d4f08=_0x59f114,{message:_0x5672eb,response:_0xa9fb85}=_0x39487d;_0x4439c4(_0x5672eb,_0xa9fb85,_0xa9fb85&&_0xa9fb85[_0x1d4f08(0x1aa)]);});}}}}[_0x1d5c2d(0x19c)](_0x31e7c2){const _0xe07f74=_0x1d5c2d;let _0x58794a={'M+':new Date()[_0xe07f74(0x116)]()+0x1,'d+':new Date()[_0xe07f74(0x137)](),'H+':new Date()[_0xe07f74(0x141)](),'m+':new Date()[_0xe07f74(0x132)](),'s+':new Date()[_0xe07f74(0x1b5)](),'q+':Math[_0xe07f74(0x19b)]((new Date()[_0xe07f74(0x116)]()+0x3)/0x3),'S':new Date()[_0xe07f74(0x187)]()};/(y+)/[_0xe07f74(0x185)](_0x31e7c2)&&(_0x31e7c2=_0x31e7c2[_0xe07f74(0x181)](RegExp['$1'],(new Date()[_0xe07f74(0x1be)]()+'')[_0xe07f74(0x16c)](0x4-RegExp['$1'][_0xe07f74(0x111)])));for(let _0x292238 in _0x58794a)new RegExp('('+_0x292238+')')[_0xe07f74(0x185)](_0x31e7c2)&&(_0x31e7c2=_0x31e7c2[_0xe07f74(0x181)](RegExp['$1'],0x1==RegExp['$1'][_0xe07f74(0x111)]?_0x58794a[_0x292238]:('00'+_0x58794a[_0x292238])[_0xe07f74(0x16c)]((''+_0x58794a[_0x292238])['length'])));return _0x31e7c2;}[_0x1d5c2d(0x16a)](_0x444ab2=_0x3ceabd,_0x5ee6c0='',_0x32874a='',_0x2a3b03){const _0x4dc89b=_0x1d5c2d,_0x48fca7=_0xacfa12=>{const _0x36cfd1=_0x4cae;if(!_0xacfa12)return _0xacfa12;if(_0x36cfd1(0x18c)==typeof _0xacfa12)return this[_0x36cfd1(0x1cb)]()?_0xacfa12:this[_0x36cfd1(0x145)]()?{'open-url':_0xacfa12}:this[_0x36cfd1(0x11e)]()?{'url':_0xacfa12}:void 0x0;if(_0x36cfd1(0x1a0)==typeof _0xacfa12){if(this[_0x36cfd1(0x1cb)]()){let _0x2f25be=_0xacfa12[_0x36cfd1(0x1cc)]||_0xacfa12[_0x36cfd1(0x1a4)]||_0xacfa12[_0x36cfd1(0x1ad)],_0x2e76d5=_0xacfa12[_0x36cfd1(0x175)]||_0xacfa12[_0x36cfd1(0x1bf)];return{'openUrl':_0x2f25be,'mediaUrl':_0x2e76d5};}if(this[_0x36cfd1(0x145)]()){let _0x503047=_0xacfa12[_0x36cfd1(0x1ad)]||_0xacfa12['url']||_0xacfa12[_0x36cfd1(0x1cc)],_0x52ce56=_0xacfa12[_0x36cfd1(0x1bf)]||_0xacfa12[_0x36cfd1(0x175)];return{'open-url':_0x503047,'media-url':_0x52ce56};}if(this[_0x36cfd1(0x11e)]()){let _0x5799ff=_0xacfa12[_0x36cfd1(0x1a4)]||_0xacfa12[_0x36cfd1(0x1cc)]||_0xacfa12[_0x36cfd1(0x1ad)];return{'url':_0x5799ff};}}};this['isMute']||(this[_0x4dc89b(0x11e)]()||this[_0x4dc89b(0x1cb)]()?$notification[_0x4dc89b(0x158)](_0x444ab2,_0x5ee6c0,_0x32874a,_0x48fca7(_0x2a3b03)):this[_0x4dc89b(0x145)]()&&$notify(_0x444ab2,_0x5ee6c0,_0x32874a,_0x48fca7(_0x2a3b03)));let _0x321201=['',_0x4dc89b(0x10e)];_0x321201[_0x4dc89b(0x157)](_0x444ab2),_0x5ee6c0&&_0x321201[_0x4dc89b(0x157)](_0x5ee6c0),_0x32874a&&_0x321201[_0x4dc89b(0x157)](_0x32874a),console[_0x4dc89b(0x114)](_0x321201[_0x4dc89b(0x13d)]('\x0a')),this[_0x4dc89b(0x1bc)]=this[_0x4dc89b(0x1bc)][_0x4dc89b(0x1d3)](_0x321201);}[_0x1d5c2d(0x114)](..._0x36035e){const _0x303fb6=_0x1d5c2d;_0x36035e[_0x303fb6(0x111)]>0x0&&(this[_0x303fb6(0x1bc)]=[...this[_0x303fb6(0x1bc)],..._0x36035e]),console[_0x303fb6(0x114)](_0x36035e[_0x303fb6(0x13d)](this[_0x303fb6(0x16b)]));}[_0x1d5c2d(0x131)](_0x31e612,_0x379828){const _0x44db92=_0x1d5c2d,_0x11e4e5=!this[_0x44db92(0x11e)]()&&!this[_0x44db92(0x145)]()&&!this[_0x44db92(0x1cb)]();_0x11e4e5?this[_0x44db92(0x114)]('','❗️'+this['name']+_0x44db92(0x135),_0x31e612[_0x44db92(0x109)]):this[_0x44db92(0x114)]('','❗️'+this[_0x44db92(0x1ce)]+_0x44db92(0x135),_0x31e612);}[_0x1d5c2d(0x1ca)](_0x563731){return new Promise(_0x25f6a1=>setTimeout(_0x25f6a1,_0x563731));}[_0x1d5c2d(0x1a6)](_0x674466={}){const _0x18d757=_0x1d5c2d,_0x832eb8=new Date()[_0x18d757(0x15f)](),_0x3cb75c=(_0x832eb8-this[_0x18d757(0x168)])/0x3e8;this[_0x18d757(0x114)]('','🔔'+this[_0x18d757(0x1ce)]+_0x18d757(0x143)+_0x3cb75c+'\x20秒'),this[_0x18d757(0x114)](),(this[_0x18d757(0x11e)]()||this[_0x18d757(0x145)]()||this[_0x18d757(0x1cb)]())&&$done(_0x674466);}}(_0x3ceabd,_0x801c71);}
