

import { DefaultResult, ImagePickerOptions, LocationResponse, PlatformType, ResponseImage, UserModel, WXMiniProgramType } from './modal';



/**
 *  语音识别的结果,定位结果
 */
export { LocationResponse, ResponseSpeech } from './modal';



export default class ArenaApi {

    /**
     *  微信类型
     */
    static WXMiniProgramType: WXMiniProgramType

    /**
     *  平台类型
     */
    static PlatformType: PlatformType

    /**
    *  当前是否是 web 环境
    */
    static webEnvironment: boolean

    /**
   *  当前搭载的平台 ios  android  web
   */
    static platform: 'web' | 'android' | 'ios'

    /**
     *  本地键值对村存储
     */
    static storage: {
        /**
         *  从本地取值
         */
        get: (param: { key: string }) => Promise<DefaultResult>
        /**
         *  向本地存值
         */
        set: (param: { key: string, value: string }) => Promise<DefaultResult>
    }

    /**
     *  多媒体相关
     */
    static media: {
        /**
         *  扫码二维码
         */
        scan: () => Promise<DefaultResult>
        /**
         *  从相册获取图片或视频
         */
        imagePicker: (param: ImagePickerOptions) => Promise<DefaultResult<ResponseImage[]>>

        /**
         *  调用摄像头拍照
         */
        openCamera: (param: ImagePickerOptions) => Promise<ResponseImage>

        /**
         *  拍证件照
         * 7(身份证正面)、8(身份证反面)、9(营业执照) 
         * path:图片在本地磁盘的绝对路径
         *  action:其他操作 lookDemo:查看  onlyPhotoLibrary:从相册选择
         */
        cerCamera: (param: { photoType: number }) => Promise<{ path?: string, action?: boolean }>

        /**
         *  开启语音识别，把用户的语音转化成文字的形式。支持普通话。
         * identifying: true 表示开启语音识别  false 表示关闭语音识别
         * 
         * 开启成功之后需要注册"speechRecognition"事件来监听原生的数据回调
         * 监听语音识别回调,回调的数据结构为 ResponseSpeech,请导入这个类型.
         */
        startSpeechRecognition: () => Promise<DefaultResult>

        /**
         *  关闭语音识别
         */
        stopSpeechRecognition: () => Promise<DefaultResult>

        /**
         *  获取当前页面的截图
         */
        screenShot: () => Promise<{ path?: string }>
    }

    /**
     *  定位相关api
     */
    static location: {
        /**
         *  单次定位
         * targetAccuracy:定位精度半径,默认100
         * withReGeocode:是否需要带有逆地理编码信息,默认false
         */
        singleLocation: (param?: { withReGeocode?: boolean }) => Promise<LocationResponse>

        /**
         *  开始持续定位(先不做)
         * targetAccuracy:定位精度半径,默认100
         * withReGeocode:是否需要带有逆地理编码信息,默认false
         * 定位成功之后,定位结果会通过原生消息的形式发回JS,需要监听 "updateLocation"消息
         * 监听地址回调返回的是 LocationResponse 类型,请导入这个类型
         */
        startLocation: (param?: { withReGeocode?: boolean }) => Promise<DefaultResult>

        /**
         *  停止持续定位(先不做)
         */
        stopLocation: () => Promise<DefaultResult>,
    }

    /**
     *  工具相关
     */
    static util: {
        /**
         *  打开小程序 
         * 在同一开放平台账号下的移动应用及小程序无需关联即可完成跳转，
         * 非同一开放平台账号下的小程序需与移动应用（APP）成功关联后才支持跳转。
         * userName:的小程序原始id
         * path:小程序的页面路径,不填默认拉起小程序首页,用 "?foo=bar" 传参 
         * miniProgramType:小程序的类型（默认是0） 0：正式版  1：开发版  2：体验版
         */
        openWXMiniProgram: (param: { userName: string, path?: string, miniProgramType: 0 | 1 | 2 }) => Promise<DefaultResult>

        /**
         *  打开连接
         * remoteUrl:远程url
         * title:标题
         * openExitBtn:是否打开关闭按钮，为了防止微信支付页面的返回键失效
         */
        openLink: (param: { remoteUrl: string, title: string, openExitBtn?: boolean }) => Promise<DefaultResult>

        /**
         *  打开原生页面
         * nativeKey:原生页面的key,原生根据key来区分目标页面,
         * param:打开页面的参数
         */
        openNative: (param: { nativeKey: string, param: object }) => Promise<DefaultResult>

        /**
         *  开启直播
         * AppId:sdk 的id
         * roomId 房间id
         * channelName:频道id
         * publishUrl:推流地址
         * liveStreamingName:直播名称
         * token:声网token
         * nickName:昵称
         * userPhoto: 头像
         * userId: 用户id
         */
        liveStreaming: (param: { AppId: string, roomId: string, channelName: string, publishUrl: string, liveStreamingName: string, token: string, nickName: string, userPhoto: string, userId: string }) => Promise<DefaultResult>

        /**
         *  保存图片到相册
         * imageUri: 图片远程地址 或者  本地路径
         */
        saveImageToAlbum: (param: { imageUri: string }) => Promise<DefaultResult>

        /**
         *  获得用户信息
         */
        getUserInfo: () => Promise<UserModel>
    }

    /**
     *  支付相关
     */
    static pay: {

        /**
         *  微信支付
         * 支付信息
         * 返回:支付结果描述信息
         */
        wxPay: (param: { appid: string, partnerid: string, prepayid: string, package: string, noncestr: string, timestamp: string, sign: string }) => Promise<DefaultResult>,
        /**
         *  支付宝支付
         * 支付信息
         * 返回:支付结果描述信息
         */
        aliPay: (param: { payInfo: string }) => Promise<DefaultResult>,
        /**
         * 苹果内购支付
         * productId:苹果商品ID
         * gatewayNo:支付单号
         * 返回:支付结果描述信息
         */
        applePay: (param: { productId: string }) => Promise<DefaultResult>
    }

    /**
     *  分享相关
     */
    static share: {
        /**
         *  分享图片（本地或网络图）
         * image: 分享的图片路径,如果分享本地图，就传图片的路径，网络图就传图片的url地址
         * platform: 分享平台
         * 返回:结果描述信息
         */
        shareImage: (param: { platformType: number, image: string }) => Promise<DefaultResult>,
        /**
         *  分享文本
         * text: 分享的文本
         * platform: 分享平台
         * 返回:结果描述信息
         */
        shareText: (param: { platformType: number, text: string }) => Promise<DefaultResult>,
        /**
         *  分享链接
         *  title: 分享标题|
         * webpageUrl:分享链接地址
         * icon: 分享缩略图地址|
         * desc: 分享内容|
         * platform: 分享平台
         * 
         * 返回:结果描述信息 
         */
        shareWebpage: (param: { platformType: number, title: string, desc: string, icon: string, webpageUrl: string }) => Promise<DefaultResult>,

        /**
         *  分享小程序
         * title:分享标题
         * desc:分享的描述
         * icon:分享的图片url
         * userName:分享的小程序原始id
         * path:分享的小程序的页面路径
         * hdImage:小程序新版本的预览图
         * platformType:分享平台
         * programType: 分享的小程序的类型（默认是0） 0：正式版  1：开发版  2：体验版
         */
        shareSP: (param: { platformType: number, programType: 0 | 1 | 2, title: string, desc: string, userName: string, path: string, hdImage: string }) => Promise<DefaultResult>,
    }


    /**
     *  webview相关
     */
    static webPage: {
        /**
         *  设置标题
         * title:标题文字
         * textColor:标题颜色 ,如:#ff00ff
         */
        setTitle: (param: { title: string, textColor?: string }) => Promise<DefaultResult>,

        /**
         *  设置导航栏
         * backgroundColor:背景色
         * show:是否显示导航栏, 默认是false
         * promise 成功的回调,type:回调类型,一般是back,lastPage:是否是最后一页,如果是说明没得返回
         */
        setNavBar: (param: { backgroundColor?: string, show: boolean }) => Promise<{ type: string, lastPage: boolean }>,

        /**
         *  设置导航右侧菜单按钮
         * items:按钮们 {id: 按钮id, text: 按钮文字,textColor:按钮颜色,默认白色}
         * promise 成功的回调, menuId: 用户点击的按钮id值
         * menu被点击,会通过原生消息的形式发回JS,需要监听 "menuClick"消息
         * 此消息返回的是 {menuId:number} 类型
         */
        setMenu: (param: { items: { menuId: number, text: string, textColor?: string }[] }) => Promise<{ menuId: number }>,

        /**
         *  关闭当前网页
         */
        closeWebpage: () => Promise<DefaultResult>
    }

    /**
     *  通用的发送JS消息到原生的接口
     *  method:必填,api名称
     */
    static fromJsToNativeMessage: (param: { method: string, [key: string]: any }) => Promise<any>

    /**
     *  接收原生消息,
     * messageName:消息名称
     * callback:收到消息的回调；data 是回调中的数据 （本api规定data中的第一个参数是messageName 用于辨别不同类型的消息），success、failed是回调中向原生逆向回调的函数（web环境可用，RN环境不可用）
     */
    static registerNativeMsg: (messageName: string, callback: (data: any, success?: (result: any) => void, failed?: (err: any) => void) => void) => void

    /**
     *  原生发过来的消息类型
     */
    static nativeMessage: {
        gotDeviceToken: string,
        menuClick: string,
        speechRecognition: string,
        updateLocation: string,
    }

    /**
    *   移除原生消息
    */
    static unRegisterNativeMsg: (messageName: string) => boolean

    /**
    *   移除所有原生消息
    */
    static removeAllNativeMsg: () => void

}