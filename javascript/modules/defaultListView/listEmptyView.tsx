import React from 'react';
import { ColorValue, Image, Text, TouchableOpacity, View } from 'react-native';
import BaseComponent from '../../base/baseComponent';


interface Props {
    /**
    *  空占位页面的类型
    */
    emptyType?: 'noData' | 'errorData'

    /**
     *  空数据提 示文案
     */
    noDataTipText?: string,

    /**
     *  错误数据 提示文案.
     */
    errDataTipText?: string,

    /**
     *  空数据提 按钮部分
     */
    noDataButtons?: { title: string, action: (index: number) => void, bgColor: ColorValue }[]

    /**
     *  错误数据 按钮部分
     */
    errDataButtons?: { title: string, action: (index: number) => void, bgColor: ColorValue }[]

}
export default class ListEmptyView extends BaseComponent<Props> {

    static defaultProps = {
        emptyType: 'noData',
        noDataTipText: '暂无数据\n下拉刷新试试！',
        errDataTipText: '网络连接异常\n别紧张，试试看刷新页面~',
        noDataButtons: [],
        errDataButtons: []
    }


    constructor(props: Props) {
        super(props)
    }
    render() {
        let { emptyType, noDataTipText, errDataTipText, noDataButtons, errDataButtons } = this.props
        let btns = emptyType == 'noData' ? noDataButtons : errDataButtons
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 100 }}>
                <Image style={{ width: 160, height: 150 }}
                    resizeMode='contain'
                    source={emptyType == 'noData' ? require('../../sources/image/empty_nodata.png') : require('../../sources/image/empty_error.png')} />
                <Text style={{ color: '#999', fontSize: 14, marginTop: 28, lineHeight: 22 }}>{emptyType == 'noData' ? noDataTipText : errDataTipText}</Text>
                <View style={{ marginTop: 36, alignItems: 'center' }}>
                    {
                        btns.map((btn, index) => {
                            return (
                                <TouchableOpacity style={{ marginBottom: 15, width: 130, height: 40, backgroundColor: btn.bgColor, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => btn.action(index)}
                                    key={index}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>{btn.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}