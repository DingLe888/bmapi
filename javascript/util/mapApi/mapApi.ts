
import { defaultConfig } from '../../configs'
import { AddressTipModel, DeGeocodeInfo, GeocodeInfo, POIModel } from '../../kit'
import request from '../request'


interface MapData {
    status: '0' | '1',
    info: string,
    [keys: string]: any
}


/**
 *  高德地图的webapi
 * 通过接口和高德数据交互
 * 接口地址：https://lbs.amap.com/api/webservice/guide/api/georegeo
 */
export default class MapApi {
    /**
     * @name 地理编码
     * @description 将详细的结构化地址转换为高德经纬度坐标。
     * @param address 如：北京市朝阳区阜通东大街6号。如果需要解析多个地址的话，请用"|"进行间隔，并且将 batch 参数设置为 true，最多支持 10 个地址进进行"|"分割形式的请求。
     * @param city 指定城市的中文（如北京）、指定城市的中文全拼（beijing）、citycode（010）、adcode（110000），不支持县级市。当指定城市查询内容为空时，会进行全国范围内的地址转换检索。
     * @param batch 批量查询控制 batch 参数设置为 true 时进行批量查询操作，最多支持 10 个地址进行批量查询。batch 参数设置为 false 时进行单点查询，此时即使传入多个地址也只返回第一个地址的解析查询结果。
     */
    static geocoding = (address: string, city?: string, batch: boolean = false) => {

        let params = {
            key: defaultConfig.mapApiKey,
            address,
            city,
            batch
        }
        return request.get<MapData>('https://restapi.amap.com/v3/geocode/geo', params, true, false).then(res => {
            if (res.status == '1') {
                return Promise.resolve(res.geocodes as GeocodeInfo[])
            } else {
                return Promise.reject(res.info)
            }
        })
    }


    /**
     * @name 逆地理编码 
     * @description 将经纬度转换为详细结构化的地址，且返回附近周边的POI、AOI信息。例如：116.480881,39.989410 转换地址描述后：北京市朝阳区阜通东大街6号
     * @param location 经纬度坐标.传入内容规则：经度在前，纬度在后，经纬度间以“,”分割，经纬度小数点后不要超过 6 位。如果需要解析多个经纬度的话，请用"|"进行间隔，并且将 batch 参数设置为 true，最多支持传入 20 对坐标点。每对点坐标之间用"|"分割。
     * @param extensions 返回结果控制.extensions 参数默认取值是 base，也就是返回基本地址信息；extensions 参数取值为 all 时会返回基本地址信息、附近 POI 内容、道路信息以及道路交叉口信息。
     * @param poitype 返回附近POI类型 .以下内容需要 extensions 参数为 all 时才生效。逆地理编码在进行坐标解析之后不仅可以返回地址描述，也可以返回经纬度附近符合限定要求的POI内容（在 extensions 字段值为 all 时才会返回POI内容）。设置 POI 类型参数相当于为上述操作限定要求。参数仅支持传入POI TYPECODE，可以传入多个POI TYPECODE，相互之间用“|”分隔。该参数在 batch 取值为 true 时不生效
     * @param radius 搜索半径. radius取值范围在0~3000，默认是1000。单位：米
     * @param batch 批量查询控制.batch 参数设置为 true 时进行批量查询操作，最多支持 20 个经纬度点进行批量地址查询操作。batch 参数设置为 false 时进行单点查询，此时即使传入多个经纬度也只返回第一个经纬度的地址解析查询结果。
     * @param roadlevel 道路等级 .以下内容需要 extensions 参数为 all 时才生效。可选值：0，1当roadlevel=0时，显示所有道路当roadlevel=1时，过滤非主干道路，仅输出主干道路数据 
     * @param homeorcorp 是否优化POI返回顺序.以下内容需要 extensions 参数为 all 时才生效。homeorcorp 参数的设置可以影响召回 POI 内容的排序策略，目前提供三个可选参数：0：不对召回的排序策略进行干扰。1：综合大数据分析将居家相关的 POI 内容优先返回，即优化返回结果中 pois 字段的poi顺序。2：综合大数据分析将公司相关的 POI 内容优先返回，即优化返回结果中 pois 字段的poi顺序。
     */
    static reGeocoding = (location: string, extensions: 'all' | 'base' = 'base', poitype?: string, radius = '1000', batch = false, roadlevel?: '0' | '1', homeorcorp?: '0' | '1' | '2') => {
        let params = {
            key: defaultConfig.mapApiKey,
            location,
            poitype,
            radius,
            extensions,
            batch,
            roadlevel,
            homeorcorp
        }
        return request.get<MapData>('https://restapi.amap.com/v3/geocode/regeo', params, true, false).then(res => {
            if (res.status == '1') {
                return Promise.resolve(res.regeocode as DeGeocodeInfo)
            } else {
                return Promise.reject(res.info)
            }
        })
    }


    /**
     * @name 关键字搜索POI 
     * @description 关键字搜索：通过用POI的关键字进行条件搜索，例如：肯德基、朝阳公园等；同时支持设置POI类型搜索，例如：银行
     * @param keywords 查询关键字 规则： 多个关键字用“|”分割若不指定city，并且搜索的为泛词（例如“美食”）的情况下，返回的内容为城市列表以及此城市内有多少结果符合要求
     * @param types 查询POI类型. 可选值：分类代码 或 汉字（若用汉字，请严格按照附件之中的汉字填写）
     * @param city 查询城市.可选值：城市中文、中文全拼、citycode、adcode如：北京/beijing/010/110000填入此参数后，会尽量优先返回此城市数据，但是不一定仅局限此城市结果，若仅需要某个城市数据请调用citylimit参数。如：在深圳市搜天安门，返回北京天安门结果。
     * @param citylimit 仅返回指定城市数据.可选值：true/false
     * @param children 是否按照层级展示子POI数据.可选值：children=1当为0的时候，子POI都会显示。当为1的时候，子POI会归类到父POI之中。仅在extensions=all的时候生效
     * @param offset 每页记录数据
     * @param page 当前页数
     * @param extensions 返回结果控制.此项默认返回基本地址信息；取值为all返回地址信息、附近POI、道路以及道路交叉口信息。
     */
    static keyPoi = (keywords: string, types?: string, city?: string, citylimit = false, children?: '0' | '1', offset = 50, page = 1, extensions: 'all' | 'base' = 'base') => {
        let params = {
            key: defaultConfig.mapApiKey,
            keywords,
            types,
            city,
            citylimit,
            children,
            offset,
            page,
            extensions
        }
        return request.get<MapData>('https://restapi.amap.com/v3/place/text', params, true, false).then(res => {
            if (res.status == '1') {
                return Promise.resolve(res.pois as POIModel[])
            } else {
                return Promise.reject(res.info)
            }
        })
    }


    /**
     * @name 输入提示 
     * @description 提供根据用户输入的关键词查询返回建议列表。
     * @param keywords 查询关键字 规则： 多个关键字用“|”分割若不指定city，并且搜索的为泛词（例如“美食”）的情况下，返回的内容为城市列表以及此城市内有多少结果符合要求
     * @param type 查询POI类型. 可选值：分类代码 或 汉字（若用汉字，请严格按照附件之中的汉字填写）
     * @param location “X,Y”（经度,纬度），不可以包含空格建议使用location参数，可在此location附近优先返回搜索关键词信息在请求参数city不为空时生效
     * @param city 查询城市.可选值：城市中文、中文全拼、citycode、adcode如：北京/beijing/010/110000填入此参数后，会尽量优先返回此城市数据，但是不一定仅局限此城市结果，若仅需要某个城市数据请调用citylimit参数。如：在深圳市搜天安门，返回北京天安门结果。
     * @param citylimit 仅返回指定城市数据.可选值：true/false
     */
    static inputTips = (keywords: string, type?: string, location?: string, city?: string, citylimit = false) => {
        let params = {
            key: defaultConfig.mapApiKey,
            keywords,
            type,
            location,
            city,
            citylimit,
        }
        return request.get<MapData>('https://restapi.amap.com/v3/assistant/inputtips', params, true, false).then(res => {
            if (res.status == '1') {
                return Promise.resolve(res.tips as AddressTipModel[])
            } else {
                return Promise.reject(res.info)
            }
        })
    }



}




