# react-native-bmkit

## 安装

### 1.安装包
`$ npm install react-native-bmkit --save`

`$ react-native link`

### 2.iOS 配置
#### 2.1 安装ios依赖包
`cd ios && pod install`
#### 2.2 配置高德地图key
``` Object-C
  [AMapServices sharedServices].apiKey = @"3193f87ffdedbf5ef545a0831fe4fea4";
```
#### 2.3 配置三方SSO白名单
在info.plist中

```
<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>wechat</string>
		<string>weixin</string>
		<string>weixinULAPI</string>
		<string>sinaweibohd</string>
		<string>sinaweibo</string>
		<string>sinaweibosso</string>
		<string>weibosdk</string>
		<string>weibosdk2.5</string>
		<string>mqqopensdklaunchminiapp</string>
		<string>mqqopensdkminiapp</string>
		<string>mqqapi</string>
		<string>mqq</string>
		<string>mqqOpensdkSSoLogin</string>
		<string>mqqconnect</string>
		<string>mqqopensdkdataline</string>
		<string>mqqopensdkgrouptribeshare</string>
		<string>mqqopensdkfriend</string>
		<string>mqqopensdkapi</string>
		<string>mqqopensdkapiV2</string>
		<string>mqqopensdkapiV3</string>
		<string>mqqopensdkapiV4</string>
		<string>mqzoneopensdk</string>
		<string>wtloginmqq</string>
		<string>wtloginmqq2</string>
		<string>mqqwpa</string>
		<string>mqzone</string>
		<string>mqzonev2</string>
		<string>mqzoneshare</string>
		<string>wtloginqzone</string>
		<string>mqzonewx</string>
		<string>mqzoneopensdkapiV2</string>
		<string>mqzoneopensdkapi19</string>
		<string>mqzoneopensdkapi</string>
		<string>mqqbrowser</string>
		<string>mttbrowser</string>
		<string>tim</string>
		<string>timapi</string>
		<string>timopensdkfriend</string>
		<string>timwpa</string>
		<string>timgamebindinggroup</string>
		<string>timapiwallet</string>
		<string>timOpensdkSSoLogin</string>
		<string>wtlogintim</string>
		<string>timopensdkgrouptribeshare</string>
		<string>timopensdkapiV4</string>
		<string>timgamebindinggroup</string>
		<string>timopensdkdataline</string>
		<string>wtlogintimV1</string>
		<string>timapiV1</string>
		<string>alipay</string>
		<string>alipayshare</string>
		<string>dingtalk</string>
		<string>dingtalk-open</string>
		<string>linkedin</string>
		<string>linkedin-sdk2</string>
		<string>linkedin-sdk</string>
		<string>laiwangsso</string>
		<string>yixin</string>
		<string>yixinopenapi</string>
		<string>instagram</string>
		<string>whatsapp</string>
		<string>line</string>
		<string>fbapi</string>
		<string>fb-messenger-api</string>
		<string>fb-messenger-share-api</string>
		<string>fbauth2</string>
		<string>fbshareextension</string>
		<string>kakaofa63a0b2356e923f3edd6512d531f546</string>
		<string>kakaokompassauth</string>
		<string>storykompassauth</string>
		<string>kakaolink</string>
		<string>kakaotalk-4.5.0</string>
		<string>kakaostory-2.9.0</string>
		<string>pinterestsdk.v1</string>
		<string>tumblr</string>
		<string>evernote</string>
		<string>en</string>
		<string>enx</string>
		<string>evernotecid</string>
		<string>evernotemsg</string>
		<string>youdaonote</string>
		<string>ynotedictfav</string>
		<string>com.youdao.note.todayViewNote</string>
		<string>ynotesharesdk</string>
		<string>gplus</string>
		<string>pocket</string>
		<string>readitlater</string>
		<string>pocket-oauth-v1</string>
		<string>fb131450656879143</string>
		<string>en-readitlater-5776</string>
		<string>com.ideashower.ReadItLaterPro3</string>
		<string>com.ideashower.ReadItLaterPro</string>
		<string>com.ideashower.ReadItLaterProAlpha</string>
		<string>com.ideashower.ReadItLaterProEnterprise</string>
		<string>vk</string>
		<string>vk-share</string>
		<string>vkauthorize</string>
		<string>twitter</string>
		<string>twitterauth</string>
	</array>
```

#### 2.4 配置URL Scheme
添加URL Types可工程设置面板设置
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/11474533850_.pic_hd.jpeg)

#### 2.5 设置系统回调
```

#import "WXPay.h"
#import "AliPay.h"
#import <AMapFoundationKit/AMapFoundationKit.h>
#import <react-native-bmkit/UmShare.h>

/// app跳转 系统回调
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
    //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
    BOOL result = [UmShare handleOpenURL:url options:options];
  
    if (!result) {
        //  =========    其他如支付等SDK的回调    ==========
      
      //  微信支付或者微信登录
      if ([url.scheme isEqualToString:@"wx8b59b491e0e2168c"]) {
        return [WXPay applicationOpenUrl:url];
      }
      
      //  支付宝支付
       if ([url.host isEqualToString:@"safepay"]) {
         return [AliPay applicationOpenUrl:url];
       }
    }
    return result;
}


/// Universal Links系统回调
-(BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
  
  BOOL result = [UmShare handleUniversalLink:userActivity options:nil];
  if (!result) {
    // 其他SDK的回调
  }
  return YES;
}


- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  if (![deviceToken isKindOfClass:[NSData class]]) return;
     const unsigned *tokenBytes = (const unsigned *)[deviceToken bytes];
     NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                           ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                           ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                           ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
     NSLog(@"deviceToken:%@",hexToken);
}

```


### 3.Android 配置
#### 3.1 添加一个微信库
```
dependencies {
	...
	implementation  'com.umeng.umsdk:share-wx:7.0.2'
}
```

#### 3.2 添加WXEntryActivity
```
在包名下面添加wxapi文件夹，并创建WXEntryActivity.java
package com.bm001.arena.wxapi;

import com.reactlibrary.pay.BMWXEntryActivity;
import com.reactlibrary.pay.PayManager;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.umeng.socialize.weixin.view.WXCallbackActivity;

import static com.tencent.mm.opensdk.constants.ConstantsAPI.COMMAND_PAY_BY_WX;

public class WXEntryActivity extends WXCallbackActivity {

    @Override
    public void onResp(BaseResp resp) {
        if (resp.getType() == COMMAND_PAY_BY_WX) {
            //			支付
            PayManager.module.wxPayResuly(resp);
        } else {
            super.onResp(resp);//一定要加super，实现我们的方法，否则不能回调
        }
    }
}

```

#### 3.3 在MainApplication的onCreate方法中初始化友盟

```
//        给友盟传入application
UmCommon.setApp(this);
//        初始化友盟推送 
UmPush.register(this,友盟key,渠道,推送secret);

```

#### 3.4 在MainActivity 的onCreate中给友盟设置activity
```
UmCommon.setActivity(this);
```

#### 3.5 在MainActivity 添加onActivityResult回调
```
// QQ与新浪不需要添加Activity，但需要在使用QQ分享或者授权的Activity中，添加：
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  UmShare.onActivityResult(requestCode, resultCode, data);
}
```
#### 3.6 在Manifest.xml 中添加高德appkey，华为appid，微信activity
```
<meta-data
    android:name="com.huawei.hms.client.appid"
    android:value="100542461"/>

<meta-data
    android:name="com.amap.api.v2.apikey"
    android:value="b1d89a8dd1422ccd761bdf3ccff680b4" />
<!--微信-->
<activity
    android:name="com.bm001.arena.wxapi.WXEntryActivity"
    android:configChanges="keyboardHidden|orientation|screenSize"
    android:exported="true"
    android:theme="@android:style/Theme.Translucent.NoTitleBar" />
```

### 4 RN配置
#### 4.1 初始化kit配置
```
initialConfig({
	// 基础url
    apiHost: 'https://gatewaytest.bm001.com',
    // token
    token: '',
    // json
    jwtJson: { mainShopCode: 'V00888', shopType: '1', userCode: 'B0005088', 						shopCode: 'V00888', userType: '3', userId: 'B0005088' },
    // 高德webApi的KEY
    mapApiKey: '1dca7e6dff6f89fcd86ed660435c8891'
  })
```

#### 4.2 设置友盟key，三方平台的key，以及注册通知
```
common.initWithAppkey('59ee97488f4a9d1b8a000010', 'ios', true, '')

share.initUniversalLink('https://m.bm001.com/')
share.initPlaform({
  type: share.PlatformType.UMSocialPlatformType_WechatSession,
  appkey: 'wx8b59b491e0e2168c',
  appSecret: '93e2b6099292d01eb5bf441db28743c5',
  redirectURL: 'http://mobile.umeng.com/social'
})
push.plainRegister()
```


## 使用
```javascript
import { AddressSelectItem} from 'react-native-dl-bmkit';

```

## 组件
### 1 配置
* defaultConfig ：基础配置 
* defaultStyle ： 默认样式
* initialConfig ：初始化配置函数

### 2 列表组件
 * DefaultListView 普通列表组件
 * DefaultSectionListView 普通分组列表
 * ListEmptyView 空列表视图
 
### 3 彷iOS的sheet，底部弹出按钮列表
* import { ActionSheetModal} from 'react-native-dl-bmkit';

### 4 字体图标icon组件
```
import { ActionSheetModal} from 'react-native-dl-bmkit';

<Icon iconCode={0xe64a} style={{ color: '#fff', fontSize: 20 }} />

```
### 5  SearchBar搜索框
```
import { SearchBar} from 'react-native-dl-bmkit';

<SearchBar leftIcon={0xe9c3} leftText='筛选' rightIcon={0xe7e4} rightText='新增' searchCallback={t => console.log('搜索事件', t)} />

```

### 6 图片浏览器
```
import { ImageViewer} from 'react-native-dl-bmkit';

<ImageViewer
    style={{ flex: 1 }}
    imageUrls={imageViewerImgUrls}
    index={imageViewerImgIndex}
    saveToLocalByLongPress={false}
    onClick={hiddenImageViewer}
    enablePreload={true} />
```

### 7 SelectView选择项
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/SelectView.png)




### 8 ShareModal分享弹层
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/ShareModal.png)


### 9 TabBar横向tab切换按钮
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/TabBar.png)

### 10 AddNumberItem添加数字
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/AddNumberItem.png)

### 11 AddressSelectItem地址输入
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/AddressSelectItem.png)

### 12 DatePickerItem时间选择
### 13 HeadPhotoItem头像选择
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/HeadPhotoItem.png)

### 14 InputItem输入组件
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/InputItem.png)

### 15 九宫格选择组件
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/LatticePickerItem.png)

### 16 MultilineInputItem多行文本输入
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/MultilineInputItem.png)

### 17 PhotoPickerItem 图片选择组件
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/PhotoPickerItem.png)

### 18 SelectItem选择项
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/SelectItem.png)

### 19 SwitchItem开关选项
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/SwitchItem.png)

### 20 TagPickerItem标签选项
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/TagPickerItem.png)

### 21 Form 组件
```
import { Form} from 'react-native-dl-bmkit';

<Form separator={true} getFormData={fd => formData = fd}>
```

### 22 MapApi 高德地图webapi
* geocoding 地理编码
* reGeocoding 逆地理编码
* keyPoi 关键字搜索POI
* inputTips 输入提示


### 23 pay支付模块
* wechatRegister 微信注册 appKey
* wechatPay 微信支付
* aliPay 支付宝支付
* applePay 苹果支付

### 24 request请求
* post  post请求
* get get请求
* upload 上传文件

### 25tips 提示模块
* showTips 显示文本提示
* showLoading 显示loading
* hideLoading 隐藏loading
* showAlertTips 弹出提示框
* hideAlertTips 隐藏提示框
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/showAlertTips.png)

* showHUDInputTips 显示输入框弹窗
![](http://bm-oss.oss-cn-hangzhou.aliyuncs.com/bmkit/showHUDInputTips.png)


### 26 push 推送相关
* plainRegister 普通注册通知
* actionRegister 快捷交互，注册通知
* setAutoAlert 设置是否允许SDK当应用在前台运行收到Push时弹出Alert框（默认开启）
* addBackstageNotificationListener 监听 后台点击通知推送
* addForegroundNotificationListener 监听 前台点击通知推送
* getTags 普通注册通知
* addTags 添加标签
* deleteTags 移除标签

### 27 share 分享相关
* initUniversalLink 设置 universalLink
* isInstall  判断 平台是否安装
* initPlaform  初始化分享平台 微信/QQ/新浪 
* getUserInfoForPlatform 第三方平台 授权
* cancelAuthWithPlatform 第三方平台 取消授权
* shareText 分享文本
* shareImage 分享图片
* shareWebPage 分享网页
* shareMusic 分享音乐
* shareVideo 分享视频
* shareMiniProgram 分享小程序



