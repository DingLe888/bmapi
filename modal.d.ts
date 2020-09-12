/**
 *  图片选择器参数
 */
export interface ImagePickerOptions {
    /**
     *  启用或禁用裁剪
     * bool（默认为false）
     */
    cropping?: boolean

    /**
     *  与cropping选项一起使用时结果图像的宽度
     */
    width?: number

    /**
     *  与cropping选项一起使用时结果图像的高度
     */
    height?: number

    /**
     *  启用或禁用多图选择
     * bool（默认为false）
     */
    multiple?: boolean

    /**
     *  设置为true时，图像文件内容将在data属性中以base64编码的字符串形式提供。
     * 提示：要将此字符串用作图像源，请按以下方式使用它：
     * <Image source={{uri: `data:${image.mime};base64,${image.data}`}} />
     */
    includeBase64?: boolean

    /**
     * bool（默认为false）
     *  在响应中包含图像exif数据
     */
    includeExif?: boolean

    /**
     *  裁剪框宽度占比 ，比如裁剪框宽高比是3：1，则此值传3
     * 字符串（默认Edit Photo）
     * 裁剪图像时，工具栏的标题。
     */
    cropperToolbarTitle?: string

    /**
     * 启用或禁用圆形裁剪蒙版。
     *  bool（默认为false）
     */
    cropperCircleOverlay?: boolean

    /**
     *  	打开时是否默认使用前置/“自拍”相机。请注意，并非所有的Android设备都可以处理此参数，
     * bool（默认为false）
     */
    useFrontCamera?: boolean

    /**
     *  以最大宽度压缩图像
     */
    compressImageMaxWidth?: number

    /**
     *  以最大高度压缩图像
     */
    compressImageMaxHeight?: number

    /**
     *  以质量压缩图像（从0到1，其中1为最佳质量）。在iOS上，大于0.8的值在大多数图像中不会产生明显的质量提高。
     */
    compressImageQuality?: number

    /**
     *  接受的用于图像选择的mediaType可以是“照片”，“视频”或“任何”之一
     */
    mediaType?: 'photo' | 'video' | 'any'

    /**
     * （仅限iOS）
     *  bool（默认为true）
     * 设置为true时，图像将始终填充蒙版空间。
     */
    preventEmptySpaceAroundImage?: boolean

    /**
     *  仅适用于Android）
     * 字符串（默认"#424242"）
     * 裁剪图像时，确定ActiveWidget的颜色。
     */
    cropperActiveWidgetColor?: string

    /**
     *  （仅适用于Android）
     * 裁剪图像时，确定StatusBar的颜色。
     * 字符串（默认#424242）	
     */
    cropperStatusBarColor?: string

    /**
     *  （仅适用于Android）
     * 字符串（默认#424242）
     * 裁剪图像时，确定工具栏的颜色。	
     */
    cropperToolbarColor?: string


    /**
     *  仅适用于Android）
     * 字符串（默认darker orange）
     * 裁剪图像时，确定工具栏文本和按钮的颜色。
     */
    cropperToolbarWidgetColor?: string

    /**
     *  仅适用于Android）
     * 允许用户应用自定义矩形区域进行裁剪
     * bool（默认为false）
     */
    freeStyleCropEnabled?: string


    /**
     * bool（默认为false）	
     *  仅适用于Android）
     * 裁剪图像时，禁用裁剪库的颜色设置器。
     */
    disableCropperColorSetters?: boolean


    /**
     *  仅适用于ios）
     * 默认为1）
     * 使用multiple选项时要选择的最小文件数
     */
    minFiles?: number

    /**
     *  仅适用于ios）
     * 默认为5）
     * 使用multiple选项时要选择的最大文件数
     */
    maxFiles?: number

    /**
     *  （仅限iOS）	
     * bool（默认为true）	
     * 	一旦completion调用ViewController 块，Promise就会解决/拒绝
     */
    waitAnimationEnd?: boolean

    /**
     * 仅限iOS
     *  数组（支持的值）（默认为['UserLibrary'，'PhotoStream'，'Panoramas'，'Videos'，'Bursts']）
     * 可供选择的智能相册列表
     */
    smartAlbums?: string[]

    /**
     *  仅限iOS
     * 默认 Processing assets...
     * 在选择器中加载照片时显示的文本
     */
    loadingLabelText?: string

    /**
     *  仅限iOS
     * 字符串（默认为“ none”，支持的值：“ asc”，“ desc”，“ none”）
     * 在创建日期上应用排序顺序，以了解打开图像选择器时在相册/详细照片视图中如何显示媒体
     */
    showsSelectedCount?: 'asc' | 'desc' | 'none'

    /**
     *  仅限iOS
     * bool（默认为false）
     * 是否将照片转换为JPG。这还将把任何实时照片转换为JPG表示形式
     */
    forceJpg?: boolean

    /**
     *  仅适用于Android）
     * bool（默认为true）	
     * 裁切期间是否在图像顶部显示3x3网格
     */
    showCropGuidelines?: boolean

    /**
     *   仅适用于Android）
     * bool（默认为true）
     * 裁剪时是否显示裁剪框
     */
    showCropFrame?: boolean

    /**
     *   仅适用于Android）
     * bool（默认为false）
     * 是否显示底部控件
     */
    hideBottomControls?: boolean

    /**
     *   仅适用于Android）
     * bool（默认为false）
     * 是否启用手势旋转图像
     */
    enableRotationGesture?: boolean

    /**
     *  仅限iOS
     * 字符串（默认"choose"）   
     * 选择按钮文字     	
     */
    cropperChooseText?: string


    /**
     *  仅限iOS
     * 字符串（默认"cancle"）   
     * 取消按钮文字     	
     */
    cropperCancelText?: string
}


/**
 *  图片选择器结果
 */
export interface ResponseImage {

    /**
     *  选定的图像位置。
     */
    path: string

    /**
     *  选定的图像宽度
     */
    width: number

    /**
     *  所选影像高度
     */
    height: number

    /**
     *  所选的图像MIME类型（image / jpeg，image / png）
     */
    mime: string

    /**
     *  所选图像大小（以字节为单位）
     */
    size: number

    /**
     *  视频持续时间（以毫秒为单位）
     */
    duration: number

    /**
     *  可选的base64所选文件表示形式
     */
    data: string

    /**
     *  从图像中提取exif数据。响应格式是特定于平台的
     */
    exif: object

    /**
     *  裁剪的图像矩形（宽度，高度，x，y）
     */
    cropRect: { width: number, height: number, x: number, y: number }

    /**
     *  上次修改映像的UNIX时间戳
     */
    modificationDate: string
}

/**
 *  语音识别回调
 */
export interface ResponseSpeech {
    /**
     *  当前说的这几个字,需要你自己去拼接
     */
    text: string
    /**
     *  本次语音识别的完整文本,都是拼接好了的
     */
    resultText: string
    /**
     *  语音识别是否结束
     */
    end: boolean
    /**
     *  录音文件地址,但是iOS的格式比较怪,很难使用
     */
    audioPath: string

    /**
     *  错误消息  ,发送错误时出现
     */
    errMsg?: string
}


/**
 *  定位响应参数
 */
export interface LocationResponse {
    // 全量地址字符串
    formattedAddress?: string
    // 国家
    country?: string
    // 省
    province?: string
    // 市
    city?: string
    // 区
    district?: string
    // 街道
    street?: string
    // 门牌号
    number?: string
    // poi 名称
    POIName?: string
    // 经度
    latitude: number
    // 纬度
    longitude: number
}

/**
 *  小程序类型
 */

export interface WXMiniProgramType {
    /**
     *  正式版
     */
    Release: 0

    /**
     *  开发版
     */
    Test: 1

    /**
     *  体验版
     */
    Preview: 2
}

export interface PlatformType {
    UMSocialPlatformType_UnKnown: -2,
    //预定义的平台
    UMSocialPlatformType_Predefine_Begin: -1,
    UMSocialPlatformType_Sina: 0, //新浪
    /**
     *  微信聊天
     */
    UMSocialPlatformType_WechatSession: 1,
    /**
     *  //微信朋友圈
     */
    UMSocialPlatformType_WechatTimeLine: 2,
    /**
     *  //微信收藏
     */
    UMSocialPlatformType_WechatFavorite: 3,
    /**
     *  QQ聊天页面
     */
    UMSocialPlatformType_QQ: 4,
    /**
     *  qq空间
     */
    UMSocialPlatformType_Qzone: 5,//qq空间
    /**
     *  腾讯微博
     */
    UMSocialPlatformType_TencentWb: 6,
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


/**
 *  普通返回
 */
export interface DefaultResult<T = string> {
    result: T
}

/**
 *  普通报错
 */
export interface DefaultError {
    message: string
}

