import { TextStyle, ViewStyle } from 'react-native';

/**
*  数据
*/
export interface ItemData {

    /**
    *  对外展示文字
    */
    text: string,
    /**
    *  数据
    */
    value?: any,
    /**
     *  其他
     */
    [key: string]: any
}

type FromActionType = 'data' | 'enpty'

/**
*  form 公共的参数
*/
export interface FormProps {

    /**
    *  属性
    */
    property?: string,
    /**
     *  是否是必填
     */
    require?: boolean

    /**
     *  是否可编辑
     */
    editable?: boolean

    /**
    *  获取数据的钩子
    */
    getFormRef?: (func: (type: FromActionType, data?: any) => any) => void
    /**
    *  获取数据方法
    */
    formFunc?: (type: FromActionType, data?: any) => any
}

/**
*  提示框的数据
*/
export interface AlertProps {
    /**
    *  图标的code 值
    */
    iconCode?: number,

    /**
    *  图标样式
    */
    iconStyle?: TextStyle,

    /**
    *  标题
    */
    title?: string,

    /**
    *  标题样式
    */
    titleStyle?: TextStyle,

    /**
    *  描述
    */
    desc?: string,

    /**
    *  按钮数组
    */
    buttons?: {
        /**
        *  按钮文字
        */
        text: string,
        /**
        *  按钮样式
        */
        btnStyle?: ViewStyle
    }[],
    /**
    *  按钮点击事件
    */
    btnClickCallback?: (index: number) => void

}

/**
*  输入型弹框
*/
export interface InputProps {

    /**
    *  标题
    */
    title: string,

    /**
    *  标题样式
    */
    titleStyle?: TextStyle,

    /**
    *  占位符
    */
    placeholder?: string,

    /**
    *  提交输入内容
    */
    onSubmitText: (text: string) => void

}


/**
 *  三方登录返回值
 */
export interface AuthUserInfo {
    uid: string
    openid: string
    accessToken: string
    refreshToken: string
    expiration: string
    name: string
    iconurl: string
    unionGender: string
    originalResponse: string
}




/**
 *  地里编码信息
 */
export interface GeocodeInfo {
    /**
     *  结构化地址信息 省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码
     */
    formatted_address: string
    /**
     *  国家 国内地址默认返回中国
     */
    country: string
    /**
     *  省份
     */
    province: string
    /**
     *  市
     */
    city: string
    /**
     *  城市编码
     */
    citycode: string
    /**
     *  区
     */
    district: string
    /**
     *  街道
     */
    street: string
    /**
     *  门牌号
     */
    number: string
    /**
     *  区域编码
     */
    adcode: string
    /**
     *  经纬度 以，号隔开
     */
    location: string
    /**
     *  匹配等级
     */
    level: string
}

/**
 *  逆理编码信息
 */
export interface DeGeocodeInfo {
    /**
     *  结构化地址信息
     */
    formatted_address: string,
    /**
     *  地址元素
     */
    addressComponent: any,
    /**
     *  道路信息列表
     */
    roads: any[],
    /**
     *  aoi信息列表
     */
    aois: any[],
    /**
     *  poi信息列表
     */
    pois: POIModel[],
    /**
     *  道路交叉口列表
     */
    roadinters: any[]
}


/**
 *  POI模型
 */
interface POIModel {
    /**
     *  地址
     */
    address: string
    /**
     *  区域名称
     */
    adname: string
    /**
     *  深度信息
     */
    biz_ext: any[]
    /**
     *  类型
     */
    biz_type: string
    childtype: string
    /**
     *  城市
     */
    cityname: string
    /**
     *  离中心点距离
     */
    distance: any[]
    /**
     *  唯一ID
     */
    id: string
    importance: any[]
    /**
     *  经纬度 	格式：X,Y
     */
    location: string
    /**
     *  名称
     */
    name: string
    /**
     *  父POI的ID
     */
    parent: string
    photos: any[]
    pname: string
    poiweight: any[]
    shopid: any[]
    shopinfo: string
    /**
     *  POI的电话
     */
    tel: string
    /**
     *  兴趣点类型
     */
    type: string
    /**
     *  兴趣点类型编码
     */
    typecode: string

}

/**
 *  地址提示模型
 */
export interface AddressTipModel {
    /**
     *  返回数据ID
     * 若数据为POI类型，则返回POI ID;若数据为bus类型，则返回bus id;若数据为busline类型，则返回busline id。
     */
    id: string
    /**
     *  tip名称
     */
    name: string
    /**
     *  
        所属区域
    省 + 市 + 区（直辖市为“市 + 区”
     */
    district: string
    /**
     *  区域编码 
     * 六位区县编码
     */
    adcode: string
    /**
     *  tip中心点坐标
     * 当搜索数据为busline类型时，此字段不返回

     */
    location: string
    /**
     *  详细地址
     */
    address: string
}   