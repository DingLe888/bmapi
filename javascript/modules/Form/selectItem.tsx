/**
*  选择项
*/

import React, { useMemo, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';
import showPicker from '../bmPicker/bmPicker';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';

interface Props extends FormProps {

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  左侧文字
    */
    labelText: string

    /**
    *  左侧文字样式
    */
    labelTextStyle?: TextStyle

	/**
	*  选中的数据 
	*/
    value?: any[] | any

    /**
     *  分隔符
     */
    spaceStr?: string

    /**
    *  数据源,请参考 https://www.npmjs.com/package/react-native-picker
    */
    dataSource?: any[] | any

	/**
	*  显示文本的样式
	*/
    valueStyle?: TextStyle

    /**
     *  蒙层的颜色
     */
    modalColor?: string

	/**
	*  占位符
	*/
    placeholder?: string

    /**
    *  选择事件
    */
    onSelect?: (value: any[]) => void


}

export default function SelectItem(props: Readonly<Props>) {
    const { spaceStr = ' ', placeholder = '请选择' } = props

    const realValue = (props.value instanceof Array) ? props.value : (!!props.value ? [props.value] : props.value)

    const [result, setResult] = useState(realValue)
    const [empty, setEmpty] = useState(false)

    useMemo(() => {
        setResult(realValue)
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


    // 点击事件 
    let selectClick = () => {
        if (props.dataSource && props.dataSource.length > 0) {
            showPicker({
                pickerTitleText: props.labelText,
                pickerData: props.dataSource,
                selectedValue: result,
                modalColor: props.modalColor,
                onPickerConfirm
            })
        } else {
            // 如果没有数据源
            props.onSelect && props.onSelect([])
        }
    }

    let onPickerConfirm = (data: any[]) => {
        props.onSelect && props.onSelect(data);
        setResult(data)
        setEmpty(false)
    }

    return (
        <TouchableOpacity style={{ height: 55, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, ...props.style }} activeOpacity={1} onPress={selectClick}>
            <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                {
                    props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                }
            </View>
            <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, marginRight: 10, color: empty ? '#D5544F' : (result ? '#000' : 'rgba(0,0,0,0.3)'), ...props.valueStyle }} >{result ? result.join(spaceStr) : placeholder}</Text>
            <Icon iconCode={0xe649} style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)' }} />
            <NoEditableModal editable={props.editable} />
        </TouchableOpacity >
    )

}
