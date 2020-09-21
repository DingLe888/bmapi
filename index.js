

function noop() {
    console.log('空方法 noop')
    return {}
}


class Api {

    /**
    *  当前是否是 web 环境
    */
    static webEnvironment = !!window.document

    /**
    *  当前搭载的平台 ios  android  web
    */
    static platform = 'web'

    /**
    *   本地键值对 存储
    */
    static storage = {
        get: noop,
        set: noop
    }

    /**
     *  定位地图相关
     */
    static location = {
        singleLocation: noop,
        startLocation: noop,
        stopLocation: noop,
    }

    /**
     *  多媒体相关
     */
    static media = {
        scan: noop,
        imagePicker: noop,
        openCamera: noop,
        cerCamera: noop,
        startSpeechRecognition: noop,
        stopSpeechRecognition: noop,
        screenShot: noop,
    }

    /**
     *  工具相关
     */
    static util = {
        openWXMiniProgram: noop,
        openLink: noop,
        openNative: noop,
        liveStreaming: noop,
        saveImageToAlbum: noop,
        getUserInfo: noop,
    }

    /**
     *  支付相关
     */
    static pay = {
        wxPay: noop,
        aliPay: noop,
        applePay: noop
    }

    /**
     *  分享相关
     */
    static share = {
        shareImage: noop,
        shareText: noop,
        shareWebpage: noop,
        shareSP: noop,
    }

    /**
     *  webview相关
     */
    static webPage = {
        setNavBar: noop,
        setTitle: noop,
        setMenu: noop,
        closeWebpage: noop
    }


    /**
    *   原生消息集合
    */
    static nativeCallbacks = {}


    /**
    *   初始化操作
    */
    static initApi() {
        // 检测当前环境
        this.checkPlatform()

        // 组装storage - api接口
        let apiKeys = ["storage", "location", "media", "util", "pay", "share"]
        apiKeys.forEach(apiKey => {
            this.traverse(this[apiKey], apiKey);
        })

        // 注册原生发给JS 的消息
        this.registerNativeToJSMessage()

        // 发送初始化消息
        this.fromJsToNativeMessage({ method: 'initial' })
    }

    /**
    *   组装api接口
    */
    static traverse(object, path) {
        for (let key in object) {
            let currentPath = path === "" ? key : path + "." + key
            let value = object[key]
            if (value !== noop) {
                this.traverse(value, currentPath)
            } else {
                object[key] = (param = {}) => {
                    let method = 'ArenaApi.' + currentPath;
                    return this.fromJsToNativeMessage({ ...param, method })
                }
            }
        }
    }

    /**
     *  检查本地搭载平台
     */
    static checkPlatform() {

        if (this.webEnvironment) {
            let userAgent = global.navigator.userAgent;
            if ((/iPhone|iPad|iPod/i).test(userAgent)) {
                this.platform = 'ios'
            } else if ((/Android/i).test(userAgent)) {
                this.platform = 'android'
            }
        } else {
            try {
                const { Platform } = require('react-native')
                this.platform = Platform.OS
            } catch (error) {
                console.log('未安装RN模块，请检查环节是否为RN环境')
            }
        }
    }

    /**
    *   获取 webviewBridge
    */
    static setupWebViewJavascriptBridge(callback) {
        if (this.platform == 'ios') {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            let WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        } else if (this.platform == 'android') {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    callback(WebViewJavascriptBridge);
                }, false);
            }
        }
    }


    /**
    *   从 JS 端 向 原生端发送消息
    */
    static fromJsToNativeMessage(param = {}) {

        return new Promise((resolve, reject) => {
            if (this.webEnvironment) {
                // H5 环境
                this.setupWebViewJavascriptBridge((bridge) => {

                    if (bridge) {
                        bridge.callHandler('fromJsToNativeMessage', param, (responseData) => {

                            if (this.platform == 'android') {
                                // 安卓返回的是JSON字符串，需要序列化
                                responseData = JSON.parse(responseData)
                            }

                            if (responseData[0] == null) {
                                resolve(responseData[1])
                            } else {
                                reject(responseData[0])
                            }
                        })
                    } else {
                        reject({ code: '404', message: '未能和webview建立链接' })
                    }
                })

            } else {

                // RN 环境
                // import('react-native').then(RN => {
                //     const dlapiModule = RN.NativeModules.DlApi;
                //     if (dlapiModule) {
                //         dlapiModule.callHandler(param, (err, result) => {
                //             if (err == null) {
                //                 resolve(result)
                //             } else {
                //                 reject(err)
                //             }
                //         })
                //     } else {
                //         reject({ code: '404', message: '未能和原生建立链接' })
                //     }
                // })
                const { NativeModules } = require('react-native')
                const dlapiModule = NativeModules.DlApi
                if (!!dlapiModule) {
                    dlapiModule.callHandler(param, (err, result) => {
                        if (err == null) {
                            resolve(result)
                        } else {
                            reject(err)
                        }
                    })
                } else {
                    reject({ code: '404', message: '未能和原生建立链接' })
                }
            }
        })
    }

    /**
    *   注册原生发给JS 的消息
    */
    static registerNativeToJSMessage() {
        if (this.webEnvironment) {

            // 获取 web_bridge ,并监听原生发给web的消息
            this.setupWebViewJavascriptBridge((bridge) => {

                bridge.registerHandler('fromNativeToJsMessage', (data, responseCallback) => {

                    if (this.platform == 'android') {
                        // 安卓返回的是JSON字符串，需要序列化
                        data = JSON.parse(data)
                    }
                    // 成功的回调 
                    const successCallback = (result) => {
                        responseCallback([null, result])
                    }
                    // 失败的回调
                    const faildCallback = (err) => {
                        responseCallback([err, null])
                    }

                    let messageName = data['messageName'];
                    let callback = this.nativeCallbacks[messageName]
                    if (callback) {
                        //  把消息数据以及回调上传
                        callback(data, successCallback, faildCallback)
                    } else {
                        // 如果有回调就 报错
                        console.warn('收到原生发过来的消息,但是没人处理-web  o(╥﹏╥)o', data)
                        faildCallback({ code: '404', message: '收到原生发过来的消息,但是没人处理-web' })
                    }
                })
            })
        } else {
            // RN 环境

            const { Platform, NativeModules, NativeEventEmitter } = require('react-native')
            const dlapiModule = NativeModules.DlApi
            const dlapiEmitter = new NativeEventEmitter(dlapiModule);

            const subscription = dlapiEmitter.addListener('fromNativeToJsMessage', (data) => {
                let messageName = data['messageName'];
                let callback = this.nativeCallbacks[messageName]
                if (callback) {
                    //  把消息数据以及回调上传
                    callback(data)
                } else {
                    // 如果有回调就 报错
                    console.warn('收到原生发过来的消息,但是没人处理 -RN  o(╥﹏╥)o', data)
                }
            });

        }
    }

    /**
     *  原生发过来的消息类型
     */
    static nativeMessage = {
        gotDeviceToken: 'gotDeviceToken',
        menuClick: 'menuClick',
        speechRecognition: 'speechRecognition',
        updateLocation: 'updateLocation',
    }

    /**
    *   注册原生消息
    */
    static registerNativeMsg(messageName, callback) {
        this.nativeCallbacks[messageName] = callback;
    }

    /**
    *   移除原生消息
    */
    static unRegisterNativeMsg(messageName) {
        return delete this.nativeCallbacks[messageName]
    }

    /**
    *   移除所有原生消息
    */
    static removeAllNativeMsg() {
        this.nativeCallbacks = {}
    }


    static PlatformType = {
        UMSocialPlatformType_UnKnown: -2,
        //预定义的平台
        UMSocialPlatformType_Predefine_Begin: -1,
        UMSocialPlatformType_Sina: 0, //新浪
        /**
         *  微信聊天
         */
        UMSocialPlatformType_WechatSession: 1,
        UMSocialPlatformType_WechatTimeLine: 2,//微信朋友圈
        UMSocialPlatformType_WechatFavorite: 3,//微信收藏
        UMSocialPlatformType_QQ: 4,//QQ聊天页面
        UMSocialPlatformType_Qzone: 5,//qq空间
        UMSocialPlatformType_TencentWb: 6,//腾讯微博
        UMSocialPlatformType_APSession: 7,//支付宝聊天页面
        UMSocialPlatformType_YixinSession: 8,//易信聊天页面
        UMSocialPlatformType_YixinTimeLine: 9,//易信朋友圈
        UMSocialPlatformType_YixinFavorite: 10,//易信收藏
        UMSocialPlatformType_LaiWangSession: 11,//点点虫（原来往）聊天页面
        UMSocialPlatformType_LaiWangTimeLine: 12,//点点虫动态
        UMSocialPlatformType_Sms: 13,//短信
        UMSocialPlatformType_Email: 14,//邮件
        UMSocialPlatformType_Renren: 15,//人人
        UMSocialPlatformType_Facebook: 16,//Facebook
        UMSocialPlatformType_Twitter: 17,//Twitter
        UMSocialPlatformType_Douban: 18,//豆瓣
        UMSocialPlatformType_KakaoTalk: 19,//KakaoTalk
        UMSocialPlatformType_Pinterest: 20,//Pinteres
        UMSocialPlatformType_Line: 21,//Line
        UMSocialPlatformType_Linkedin: 22,//领英:
        UMSocialPlatformType_Flickr: 23,//Flickr
        UMSocialPlatformType_Tumblr: 24,//Tumblr
        UMSocialPlatformType_Instagram: 25,//Instagram
        UMSocialPlatformType_Whatsapp: 26,//Whatsapp
        UMSocialPlatformType_DingDing: 27,//钉钉
        UMSocialPlatformType_YouDaoNote: 28,//有道云笔记
        UMSocialPlatformType_EverNote: 29,//印象笔记
        UMSocialPlatformType_GooglePlus: 30,//Google+
        UMSocialPlatformType_Pocket: 31,//Pocket
        UMSocialPlatformType_DropBox: 32,//dropbox
        UMSocialPlatformType_VKontakte: 33,//vkontakte
        UMSocialPlatformType_FaceBookMessenger: 34,//FaceBookMessenger
        UMSocialPlatformType_Tim: 35,// Tencent TIM
        UMSocialPlatformType_Predefine_end: 999,
        //用户自定义的平台
        UMSocialPlatformType_UserDefine_Begin: 1000,
        UMSocialPlatformType_UserDefine_End: 2000,
    }


    static WXMiniProgramType = {
        /**
         *  正式版
         */
        Release: 0,

        /**
         *  开发版
         */
        Test: 1,

        /**
         *  体验版
         */
        Preview: 2,
    }

}

Api.initApi();


export default Api