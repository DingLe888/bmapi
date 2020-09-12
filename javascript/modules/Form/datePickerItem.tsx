/**
*  时间 选择项
*/

import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FormProps } from '../../kit';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';



interface Props extends FormProps {

    /**
    *  样式
    */
    style?: ViewStyle,

    /**
    *  左侧文字
    */
    labelText?: string,
    /**
    *  左侧文字样式
    */
    labelTextStyle?: TextStyle,

	/**
	*  选中的数据 
	*/
    value?: string;

	/**
	*  显示文本的样式
	*/
    valueStyle?: TextStyle;

	/**
	*  占位符
	*/
    placeholder?: string;

    /**
    *  模式 date:年月日  dateTime:月日时分 time:时分
    */
    mode?: 'date' | 'datetime' | 'time'

    /**
    *  最小可选
    */
    minDate?: string

    /**
    *  最大可选时间
    */
    maxDate?: string

    /**
    *  时间格式 YYY-MM-DD 
    */
    format?: string

    /**
    *  选择事件
    */
    onSelect?: (value: string) => void;


}

export default function DatePickerItem(props: Readonly<Props>) {
    const { mode = 'date', minDate = '1990-01-01', maxDate = '2030-01-01' } = props;
    const myFormat = props.format || (mode == 'date' ? 'YYYY-MM-DD' : (mode == 'datetime' ? 'YYYY-MM-DD HH:mm' : 'HH:mm'))
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [result, setResult] = useState(props.value)
    const [empty, setEmpty] = useState(false)


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

    return (
        <TouchableOpacity style={{ height: 55, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, ...props.style }}
            activeOpacity={1}
            onPress={() => setDatePickerVisibility(true)}>
            <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                {
                    props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                }
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                customCancelButtonIOS={() => null}
                confirmTextIOS='确定'
                date={dayjs(result).isValid() ? dayjs(result).toDate() : undefined}
                headerTextIOS={props.labelText || '选择时间'}
                mode={mode}
                minimumDate={dayjs(minDate).isValid() ? dayjs(minDate).toDate() : undefined}
                maximumDate={dayjs(maxDate).isValid() ? dayjs(maxDate).toDate() : undefined}
                onConfirm={(t) => {
                    setDatePickerVisibility(false)
                    let res = dayjs(t).format(myFormat)
                    setResult(res)
                    props.onSelect && props.onSelect(res)
                    setEmpty(false)
                }}
                onCancel={(t) => {
                    setDatePickerVisibility(false)
                }}
            />

            <Text style={{ flex: 1, textAlign: 'right', marginRight: 10, color: empty ? '#D5544F' : (result ? '#000' : 'rgba(0,0,0,0.3)'), fontSize: 16, ...props.labelTextStyle }}>{result ? result : (props.placeholder || '请选择')}</Text>

            <Icon iconCode={0xe649} style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)', }} />
            <NoEditableModal editable={props.editable} />

        </TouchableOpacity >
    )

}
