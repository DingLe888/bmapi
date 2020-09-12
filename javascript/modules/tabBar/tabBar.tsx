
/**
*  标签选择
*/

import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import defaultStyle from '../../configs/defaultStyle';
import Icon from '../icon';


interface Props {

    /**
    *  样式
    */
    style?: ViewStyle,

    /**
    *  类型 slider：滑块   icon:图标
    */
    type?: 'slider' | 'icon'

    /**
    *  选择项,表示选择了第几项,传null表示什么都不选
    */
    index?: number

    /**
    *  tab 按钮
    */
    tabItems: { title: string, icon?: number, selectIcon?: number, iconStyle?: TextStyle }[]

    /**
    *  选择事件
    */
    onSelect: (index: number) => void;

    /**
     *  文字颜色
     */
    textColor?: {
        selectColor: string,
        nomalColor: string
    }

}

export default function TabBar(props: Readonly<Props>) {

    const { style, type, index, tabItems, onSelect, textColor = { nomalColor: 'rgba(0,0,0,0.8)', selectColor: defaultStyle.color.mainColor } } = props

    return (
        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#cccccc99', borderBottomWidth: 0.5, ...style }}>
            {
                tabItems.map((tab, i) => {
                    let select = (i == index)
                    if (type == 'slider') {
                        return (
                            <TouchableOpacity style={{ alignSelf: 'stretch', flex: 1 }} key={tab.title}
                                onPress={() => onSelect && onSelect(i)}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: select ? textColor.selectColor : textColor.nomalColor, fontSize: 14, textAlign: 'center' }}>{tab.title}</Text>
                                </View>
                                <View style={{ height: 2, backgroundColor: select ? textColor.selectColor : '#00000000', marginBottom: 2, marginHorizontal: 10 }} />
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', paddingHorizontal: 10 }} key={tab.title}
                                onPress={() => onSelect && onSelect(i)}>
                                <Text style={{ color: select ? textColor.selectColor : textColor.nomalColor, fontSize: 14 }}>{tab.title}</Text>
                                {
                                    tab.icon && <Icon style={{ color: select ? textColor.selectColor : textColor.nomalColor, fontSize: 8, marginLeft: 3, ...tab.iconStyle }}
                                        iconCode={select ? (tab.selectIcon || tab.icon) : tab.icon} />
                                }
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View >
    )

}
