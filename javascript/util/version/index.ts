
import { NativeModules, Platform } from 'react-native';
import tips from '../tip';
const CheckVersionModule = NativeModules.CheckVersionModule


/**
 *  安装apk
 * @param apkUrl apk地址
 * @param versionCode 当前build号
 */
const installApk = (apkUrl: string, versionCode: number) => {
    if (Platform.OS == 'android') {
        if (CheckVersionModule) {
            // 安卓直接安装
            CheckVersionModule.updateApk(apkUrl, versionCode);
        } else {
            console.log('=====  版本检查模块不存在  =====')
        }
    } else {
        tips.showTips('苹果设备不能安装APK')
    }
}

export default { installApk }