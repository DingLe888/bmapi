

import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let defaultStyle = {

    // 像素转点
    px2dp: (px: number) => {
        return px / PixelRatio.get()
    },

    device: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    font: {
        size: {
            size8: 8,//弱
            size10: 10,//弱
            size12: 12,//一般
            size14: 14,//一般
            size16: 16,//重要
            size18: 18, //重要
            size24: 24, //
            size28: 28
        },
        color: {
            black: '#000000',
            c333: '#333333',
            c666: '#666666',
            c999: '#999999',
            cccc: '#cccccc',
            cddd: '#ddd',
            caaa: '#aaa',
            color1: '#000000',
            color2: '#333333',
            color3: '#666666',
            color4: '#999999',
            color5: '#cccccc',
            color6: '#ffffff',
            color7: '#f86670',
            color8: '#40b0ff',
            color9: '#ed9c27',
            color10: '#e0e0e0',
            color11: '#FFAC32',
            color12: '#5AA9FA',
            color13: '#FFA61A',
            color14: '#FE3B31',
            color15: '#67d100',
            color16: '#f7e1a9',
            color17: '#323232',
            color18: '#d6b87e',
            color19: '#91aac4',
            color20: '#fde53a',
            color21: '#F19000',
            color22: '#888888',
        }
    },

    border: {
        size: {
            main: 1,
            assit1: 1,
            small: StyleSheet.hairlineWidth, //相当于原来的0.5  这一常量定义了当前平台上的最细的宽度，不是固定值，因为不同的平台和不同的屏幕像素密度会导致不同的结果
        },
        color: {
            main: '#dcdcdc',
            nomal: '#cccccc',
            deep: '#aaa',
            assit1: '#f86670',
            assit2: '#cccccc',
            assit3: '#40b0ff',
            assit4: '#eeeeee',
            assit5: '#5AA9FA',
        },
    },

    color: {
        mainColor: '#5AA9FA',
        /**
         *  页面背景色
         */
        pageBG: '#f7f7f7',
        /**
         *  modal 蒙层颜色
         */
        modalBG: '#99999999'
    },

    /**
    *  图片缩放后缀
    */
    imageSuffix: {
        fit100: '?imageMogr2/thumbnail/100x100',
        size54x54: "?x-oss-process=image/resize,m_lfit,h_54,w_54/quality,q_20",
        size80x80: "?x-oss-process=image/resize,m_lfit,h_80,w_80/quality,q_20",
        sizepad80x80: "?x-oss-process=image/resize,m_pad,h_80,w_80/quality,Q_100",
        sizepad240x240: "?x-oss-process=image/resize,m_lfit,h_240,w_240/quality,Q_100",
        size114x152: "?x-oss-process=image/resize,m_lfit,h_114,w_152/quality,q_20",
        size500x800: "?x-oss-process=image/resize,m_lfit,h_500,w_800",
        size228x304: '?x-oss-process=image/resize,m_lfit,h_228,w_304',
    },

    defaultHeader: {
        defaultAunt: 'http://oss.bm001.com/arena/arenaimg/prod/defaultIcon/defaultAunt.png',
        defaultBoss: 'http://oss.bm001.com/arena/arenaimg/prod/defaultIcon/defaultBoss.png',
        defaultCustomer: 'http://oss.bm001.com/arena/arenaimg/prod/defaultIcon/defaultCustomer.png',
        defaultShop: 'http://oss.bm001.com/arena/arenaimg/prod/defaultIcon/defaultShop.png',
        defaultStaff: 'http://oss.bm001.com/arena/arenaimg/prod/defaultIcon/defaultStaff.png',
    },

    //背景色调
    background: {
        color: {
            /**
             *  主色调
             */
            main: '#5AA9FA',
            /**
             *  页面背景色
             */
            pageBG: '#f7f7f7',
            /**
             *  modal 蒙层颜色
             */
            modalBG: '#99999999'

        }
    },

    picSuffix: {
        size: {
            size54x54: '?x-oss-process=image/resize,m_lfit,h_54,w_54/quality,q_20',
            size80x80: '?x-oss-process=image/resize,m_lfit,h_80,w_80/quality,q_20',
            sizepad80x80: '?x-oss-process=image/resize,m_pad,h_80,w_80/quality,Q_100',
            sizepad240x240: '?x-oss-process=image/resize,m_lfit,h_240,w_240/quality,Q_100',
            size114x152: '?x-oss-process=image/resize,m_lfit,h_114,w_152/quality,q_20',
            size500x800: '?x-oss-process=image/resize,m_lfit,h_500,w_800',
            size228x304: '?x-oss-process=image/resize,m_lfit,h_228,w_304',
        },
    },

    isIphoneX: () => {
        return (
            Platform.OS === 'ios' && (Math.floor(SCREEN_HEIGHT / SCREEN_WIDTH * 100000) === 216533)
        )
    },

    isIphoneXrOrMax: () => {
        return (
            Platform.OS === 'ios' && (Math.floor(SCREEN_HEIGHT / SCREEN_WIDTH * 100000) === 216425)
        )
    },
    isHaveCatHeader: () => {
        return (
            Platform.OS === 'ios' && (Math.floor(SCREEN_HEIGHT / SCREEN_WIDTH * 100) === 216)
        )
    },
    /**
    *	导航栏状态栏之间的距离
    */
    navBarToStatusBar: () => {
        if (Platform.OS == 'ios') {
            if (Math.floor(SCREEN_HEIGHT / SCREEN_WIDTH * 100) === 216) {
                return 44
            } else {
                return 20
            }
        } else {
            return 0
        }
    }

}

export default defaultStyle