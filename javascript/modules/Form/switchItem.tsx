
/**
*  开关项
*/

import React, { useMemo, useState } from 'react';
import { Switch, Text, TextStyle, View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';
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
	*  数据 
	*/
    value?: boolean;
    /**
    *  选择事件
    */
    onSelect?: (value: boolean) => void;

}

export default function SwitchItem(props: Readonly<Props>) {

    const [result, setResult] = useState(props.value || false)
    const [empty, setEmpty] = useState(false)


    useMemo(() => {
        setResult(props.value || false)
        setEmpty(false)
    }, [props.value])

    props.getFormRef && props.getFormRef((action) => {
        switch (action) {
            case 'data':
                return result;
        }
    })


    // 点击事件 
    let onValueChange = (value: boolean) => {
        setResult(value)
        setEmpty(false)
        props.onSelect && props.onSelect(value)
    }


    return (
        <View style={{ height: 55, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, ...props.style }}>
            <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                {
                    props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                }
            </View>

            <Switch value={result} onValueChange={onValueChange} />
            <NoEditableModal editable={props.editable} />

        </View >
    )

}
