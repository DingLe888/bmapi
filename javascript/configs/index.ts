
import defaultStyle from './defaultStyle';



interface ConfigType {
    /**
    *  基础url
    */
    apiHost: string,

    /**
     *  普通请求头
     */
    defaultReqHeader: object,

    /**
     *  上传文件请求头
     */
    uploadReqHeader: object,

    /**
     *  高德地图webApi的key
     */
    mapApiKey: string
}


let defaultConfig: ConfigType = {

    apiHost: 'https://gatewaytest.bm001.com',

    defaultReqHeader: {},

    uploadReqHeader: {},

    // 高德mapApi的KEY
    mapApiKey: '1dca7e6dff6f89fcd86ed660435c8891'
};

const initialConfig = (config: ConfigType) => {
    defaultConfig = { ...defaultConfig, ...config }
}


export { defaultConfig, defaultStyle, initialConfig };




