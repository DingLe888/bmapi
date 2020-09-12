
/**
*  九宫格 选择项
*/

import React, { useMemo, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { defaultStyle } from '../../configs';
import { FormProps, ItemData } from '../../kit';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';



interface Props extends FormProps {

    /**
    *  类型  single单选  multiple多选 默认多选
    */
    type?: 'single' | 'multiple'

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  标题
    */
    title?: string

    /**
    *  标题样式
    */
    titleStyle?: TextStyle
    /**
    *  描述
    */
    describe?: string
    /**
    *  描述样式
    */
    describeStyle?: TextStyle

    /**
    *  数据源,请参考
    */
    dataSource: ItemData[]

	/**
	*  选中的数据 
	*/
    value?: ItemData[];

	/**
	*  选项样式
	*/
    itemStyle?: ViewStyle;

	/**
	*  占位符
	*/
    itemTextStyle?: TextStyle;

    /**
    *  选择事件
    */
    onSelect?: (value: ItemData[]) => void;


}

export default function LatticePickerItem(props: Readonly<Props>) {

    const [result, setResult] = useState(props.value)
    const [itemWidth, setItemWidth] = useState(375)
    const [empty, setEmpty] = useState(false)
    const [opening, setOpening] = useState(false)


    useMemo(() => {
        setResult(props.value)
        setEmpty(false)
    }, [props.value])



    props.getFormRef && props.getFormRef((action) => {
        switch (action) {
            case 'data':
                return result;

            case 'enpty':
                setEmpty(true)
                break;
        }
    })


    let onLayout = (event: { nativeEvent: { layout: { width: number, height: number } } }) => {
        setItemWidth(event.nativeEvent.layout.width)
    }

    let itemW = (itemWidth - 10 * 2 - 10 * 3) / 3 - 1

    let onSelectItem = (item: ItemData, select: boolean) => {

        let tempResult = [...(result || [])]
        if (props.type == 'single') {
            tempResult = [item]
        } else {
            if (select) {
                tempResult = tempResult.filter(v => v.text != item.text)
            } else {
                tempResult.push(item)
            }
        }

        setResult(tempResult)
        setEmpty(false)
        props.onSelect && props.onSelect(tempResult)
    }

    let allSelectClick = () => {
        if (result && result.length == props.dataSource.length) {
            setResult([])
            props.onSelect && props.onSelect([])
        } else {
            setResult(props.dataSource)
            props.onSelect && props.onSelect(props.dataSource)

        }
    }

    const foldable = props.dataSource.length > 9

    return (
        <View style={{ paddingBottom: 10, overflow: 'hidden', ...props.style, }} onLayout={onLayout}>
            {/* 标题 */}
            {
                !!props.title && (
                    <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                        <Text style={{ color: empty ? '#D5544F' : 'rgba(0,0,0,0.6)', fontSize: 16, ...props.titleStyle }}>{props.title}   <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text> </Text>
                        {
                            props.type == 'single' ? (
                                <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 14, ...props.describeStyle }}>{props.describe}</Text>
                            ) : (
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={allSelectClick}>
                                        <Icon style={{ color: (result && result.length == props.dataSource.length) ? defaultStyle.color.mainColor : 'rgba(0,0,0,0.6)', fontSize: 14 }} iconCode={0xe850} />
                                        <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 14, marginLeft: 5, ...props.describeStyle }}>全选</Text>
                                    </TouchableOpacity>
                                )
                        }
                    </View>
                )
            }

            {/* 选择区 */}
            <View style={{ marginTop: 10, paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    props.dataSource.map((d, index) => {

                        let select = (result || []).map(v => v.text).includes(d.text)
                        if (!opening && index >= 9) {
                            return null;
                        }
                        return (
                            <TouchableOpacity style={{ width: itemW, height: 36, marginHorizontal: 5, marginVertical: 4, justifyContent: 'center', alignItems: 'center', borderRadius: 2, borderColor: select ? defaultStyle.color.mainColor : 'rgba(0,0,0,0.15)', borderWidth: 0.5, ...props.itemStyle }}
                                activeOpacity={1}
                                key={d.text}
                                onPress={() => onSelectItem(d, select)}>
                                <Text style={{ color: select ? defaultStyle.color.mainColor : 'rgba(0,0,0,0.8)', fontSize: 14, ...props.itemTextStyle }}>{d.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {
                foldable && (
                    <View style={{ height: 35, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 20, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => setOpening(!opening)}>
                            <Text style={{ fontSize: 14, color: '#5AA9FA', marginRight: 5 }}>{opening ? '收起' : '展开更多选项'}</Text>
                            <Icon style={{ fontSize: 14, color: '#5AA9FA' }} iconCode={opening ? '0xe680' : '0xe67f'} />
                        </TouchableOpacity>
                    </View>
                )
            }
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
