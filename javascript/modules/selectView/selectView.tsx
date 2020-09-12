/**
*  选择项
*/

import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import defaultStyle from '../../configs/defaultStyle';
import { ItemData } from '../../kit';
import Icon from '../icon';

interface Props {

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  lattice 格子选择器   list 列表选择器
    */
    type?: 'list' | 'lattice'

    // ===========   列表模式   ==============   
    /**
    *  列表 数据源
    */
    listSource?: ItemData[]

    /**
    *  列表当前选择
    */
    lsIndex?: ItemData

    /**
    *  列表选择事件
    */
    onListSelect?: (index: ItemData) => void

    // ===========   九宫格模式   ==============   
    /**
    *  格子 数据源
    * 传一个数组,每个元素是一个组格子数组
    * 每组数据有  标题/元素集合/是否多选
    */
    latticeSource?: { title?: string, items: ItemData[], multiple?: boolean }[]

    /**
    *  格子列表当前选择
    * 双重数组,第一层数组,第二层是该组选中的元素集合
    */
    laIndex?: ItemData[][]

    /**
    *  格子 选择确定事件
    */
    onLatticeSelect?: (selectIndexs: ItemData[][]) => void

}

export default function SelectView(props: Readonly<Props>) {

    const { type = 'list', listSource = [], lsIndex, latticeSource = [], laIndex = [] } = props


    const [fatherWidth, setFatherWidth] = useState(defaultStyle.device.width)


    let onLayout = (event: { nativeEvent: { layout: { width: number, height: number } } }) => {
        setFatherWidth(event.nativeEvent.layout.width)
    }

    let latticeSelect = (aIndex: number, bIndex: number, item: ItemData, select: boolean) => {

        let group = laIndex[aIndex] || []
        if (select) {
            group = group.filter(v => v.text != item.text)
        } else {
            let groupSource = latticeSource[aIndex]
            if (groupSource.multiple) {
                group.push(item)
            } else {
                group = [item]
            }
        }
        let newIndex = [...laIndex]
        newIndex[aIndex] = group;
        props.onLatticeSelect && props.onLatticeSelect(newIndex)
    }

    let itemWidth = (fatherWidth - 10 * 3 - 10 * 2) / 3 - 1

    return (
        <View style={{ backgroundColor: '#fff', paddingVertical: 10, maxHeight: type == 'list' ? 250 : 400, ...props.style }} onLayout={onLayout}>
            <ScrollView>
                {
                    type == 'list' ? (
                        listSource.map((item, index) => {
                            let select = item.text == lsIndex?.text
                            return (
                                <TouchableOpacity style={{ height: 40, paddingHorizontal: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                    onPress={() => props.onListSelect && props.onListSelect(item)} key={item.text}>
                                    <Text style={{ color: select ? defaultStyle.color.mainColor : '#333', fontSize: 14 }} >{item.text}</Text>
                                    <Icon style={{ color: select ? defaultStyle.color.mainColor : '#00000000', fontSize: 12 }} iconCode={0xe646} />
                                </TouchableOpacity>
                            )
                        })
                    ) : (
                            latticeSource.map((source, aIndex) => {
                                return (
                                    <View style={{ paddingHorizontal: 10 }} key={aIndex} >
                                        {source.title && (<Text style={{ marginTop: 15, marginBottom: 4, color: '#999', fontSize: 12, marginLeft: 5 }} >{source.title}</Text>)}
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {
                                                source.items.map((item, bIndex) => {
                                                    let select = laIndex && laIndex[aIndex] && laIndex[aIndex].includes(item);
                                                    return (
                                                        <TouchableOpacity style={{ width: itemWidth, height: 36, marginTop: 10, marginHorizontal: 5, borderRadius: 2, backgroundColor: select ? 'rgba(90, 169, 250, 0.1)' : '#f3f3f3', justifyContent: 'center', alignItems: 'center' }}
                                                            onPress={() => latticeSelect(aIndex, bIndex, item, select)} key={item.text}>
                                                            <Text style={{ color: select ? defaultStyle.color.mainColor : '#666', fontSize: 14 }}>{item.text}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        )
                }
            </ScrollView>
        </View >
    )

}
