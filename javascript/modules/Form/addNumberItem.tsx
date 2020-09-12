
/**
*  数字 加减
*/

import React, { useMemo, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';
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
    title: string

    /**
    *  标题样式
    */
    titleStyle?: TextStyle


	/**
	*  传入的数据 
	*/
    value?: number

    /**
    *  最小值
    */
    minValue?: number

    /**
    *  最大值
    */
    maxValue?: number

    /**
    *  选择事件
    */
    numChange?: (value?: number) => void;


}

export default function AddNumberItem(props: Readonly<Props>) {
    const { value = 0, minValue = 0, maxValue = 10000 } = props

    const [result, setResult] = useState(value)

    const [empty, setEmpty] = useState(false)

    let setShowNum = (num: number) => {
        setResult(num)
        setEmpty(false)
    }

    useMemo(() => {
        setShowNum(value)
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



    let add = () => {
        if (result >= maxValue) {
            return;
        }
        setShowNum(result + 1)
    }

    let reduce = () => {
        if (result <= minValue) {
            return;
        }
        setShowNum(result - 1)
    }


    return (
        <View style={{ height: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, ...props.style }} >
            <Text style={{ color: empty ? '#D5544F' : 'rgba(0,0,0,0.6)', fontSize: 16, ...props.titleStyle }}>{props.title}</Text>
            <View style={{ width: 90, height: 30, borderRadius: 2, borderColor: 'rgba(0,0,0,0.15)', borderWidth: 0.5, flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={reduce}>
                    <Icon style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14 }} iconCode={0xe9c8} />
                </TouchableOpacity>
                <View style={{ flex: 1, borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 16 }}>{result}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={add}>
                    <Icon style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14 }} iconCode={0xe9c9} />
                </TouchableOpacity>
            </View>
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
