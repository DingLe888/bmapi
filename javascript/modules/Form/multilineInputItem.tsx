
/**
*  多行文本输入
*/

import React, { useMemo, useState } from 'react';
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';
import NoEditableModal from './noEditableModal';



interface Props extends FormProps {

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  样式
    */
    inputViewStyle?: ViewStyle

    /**
    *  标题
    */
    title?: string

    /**
    *  标题样式
    */
    titleStyle?: TextStyle

    /**
	*  输入值
	*/
    value?: string;

	/**
	*  输入值的样式
	*/
    valueStyle?: TextStyle

    /**
	*  返回键类型
	*/
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'

	/**
	*  占位符
	*/
    placeholder?: string

    /**
    *  最大文本数量
    */
    maxLength?: number

    /**
    *  描述文字
    */
    notesStr?: string

    /**
    *  描述文字样式
    */
    notesStyle?: TextStyle

	/**
	*  当文本框失去焦点的时候调用此回调函数。
	*/
    onBlur?: () => void

	/**
	*  当文本框获得焦点的时候调用此回调函数
	*/
    onFocus?: () => void

    /**
	*  文档改变
	*/
    onTextChange: (text: string) => void;


}

export default function MultilineInputItem(props: Readonly<Props>) {


    const [result, setResult] = useState(props.value)

    const [empty, setEmpty] = useState(false)

    useMemo(() => {
        setResult(props.value)
    }, [props.value])



    props.getFormRef && props.getFormRef((action) => {
        console.log('事件', action, result)
        switch (action) {
            case 'data':
                return result;

            case 'enpty':
                setEmpty(true)
                break;
        }
    })

    let textChange = (text: string) => {
        setResult(text)
        props.onTextChange(text);
        setEmpty(false)
    }

    return (
        <View   >
            {/* 输入部分 */}
            <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 25, ...props.style }}>
                {props.title ? (<Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, marginBottom: 10, ...props.titleStyle }}>{props.title}</Text>) : null}
                <View style={{ height: 100, padding: 8, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.02)', ...props.inputViewStyle }}>
                    <TextInput
                        autoCapitalize='none'
                        multiline={true}
                        style={{ fontSize: 14, color: 'rgba(0,0,0,0.8)', textAlignVertical: 'top', padding: 0, flex: 1, ...props.valueStyle }}
                        underlineColorAndroid="transparent"
                        value={result}
                        placeholder={props.placeholder || '请输入'}
                        placeholderTextColor={empty ? '#D5544F' : 'rgba(0,0,0,0.3)'}
                        maxLength={props.maxLength}
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        returnKeyType={props.returnKeyType}
                        disableFullscreenUI={true}
                        onBlur={props.onBlur}
                        onChangeText={textChange}
                        onFocus={props.onFocus}
                    />
                    {props.maxLength ? <Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 12, marginBottom: 8, marginRight: 8, alignSelf: 'flex-end' }}>{`${result?.length || 0}/${props.maxLength}`}</Text> : null}
                </View>
            </View>
            {/* 描述文字部分 */}
            {
                props.notesStr ? (
                    <View style={{ backgroundColor: '#f3f4f5', ...props.notesStyle }}>
                        <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12, marginTop: 10, marginBottom: 22, marginHorizontal: 15, lineHeight: 16 }}>{props.notesStr}</Text>
                    </View>
                ) : null
            }
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
