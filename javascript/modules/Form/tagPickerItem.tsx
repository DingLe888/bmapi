
/**
*  标签 选择项
*/

import React, { useMemo, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { defaultStyle } from '../../configs';
import { FormProps } from '../../kit';
import tips from '../../util/tip';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';


interface Props extends FormProps {


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
    dataSource: string[]

	/**
	*  选项样式
	*/
    itemStyle?: ViewStyle;

	/**
	*  占位符
	*/
    itemTextStyle?: TextStyle;

    /**
    *  便签变化事件
    */
    onTagsChange?: (value?: string[]) => void;


}

export default function TagPickerItem(props: Readonly<Props>) {

    const [result, setResult] = useState(props.dataSource)
    const [itemWidth, setItemWidth] = useState(375)
    const [empty, setEmpty] = useState(false)


    useMemo(() => {
        setResult(props.dataSource)
        setEmpty(false)
    }, [props.dataSource])



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

    let refreshResult = (tempResult: string[]) => {
        setResult(tempResult)
        props.onTagsChange && props.onTagsChange(tempResult)
    }

    let addTag = () => {
        tips.showHUDInputTips({
            title: '自定义标签',
            onSubmitText: text => {
                refreshResult([...result, text])
            }
        })
    }

    let deleteTag = (tag: string) => {
        let index = result.indexOf(tag)
        let tempResult = [...result]
        tempResult.splice(index, 1)
        refreshResult(tempResult)
    }

    return (
        <View style={{ ...props.style }} onLayout={onLayout}>
            {/* 标题 */}
            <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <Text style={{ color: empty ? '#D5544F' : 'rgba(0,0,0,0.6)', fontSize: 16, ...props.titleStyle }}>{props.title}</Text>
                <Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14, ...props.describeStyle }}>{props.describe}</Text>
            </View>

            {/* 选择区 */}
            <View style={{ marginTop: 10, marginBottom: 12, paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    result.map(tag => {
                        return (
                            <View key={tag}>
                                <TouchableOpacity style={{ width: itemW, height: 36, marginHorizontal: 5, marginVertical: 4, justifyContent: 'center', alignItems: 'center', borderRadius: 2, borderColor: 'rgba(0,0,0,0.15)', borderWidth: 0.5, ...props.itemStyle }}
                                    activeOpacity={1}>
                                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14, ...props.itemTextStyle }}>{tag}</Text>
                                </TouchableOpacity>
                                <Icon style={{ color: '#D5544F', fontSize: 14, position: 'absolute', top: 0, right: 0 }} iconCode={0xe739} onPress={() => deleteTag(tag)} />
                            </View>
                        )
                    })
                }
                <TouchableOpacity style={{ width: itemW, height: 36, marginHorizontal: 5, marginVertical: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 2, borderColor: 'rgba(0,0,0,0.15)', borderWidth: 0.5, ...props.itemStyle }}
                    activeOpacity={1}
                    key={'add'}
                    onPress={addTag}>
                    <Icon style={{ color: defaultStyle.color.mainColor, fontSize: 12 }} iconCode={0xe7e4} />
                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14, marginLeft: 5, ...props.itemTextStyle }}>添加标签</Text>
                </TouchableOpacity>
            </View>
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
