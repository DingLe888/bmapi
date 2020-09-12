import React, { useMemo, useRef, useState } from 'react';
import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import defaultStyle from '../../configs/defaultStyle';
import Icon from '../icon';

interface InputProps {

    /**
    *  外部样式
    */
    style?: ViewStyle

    /**
     * 搜索框类型   jump 只做跳转
    */
    type?: 'jump' | 'search'

    /**
    *  数值
    */
    value?: string

    /**
     *  是否自动获取焦点
     */
    autoFocus?: boolean

    /**
    *  数值样式
    */
    valueStyle?: TextStyle

    /**
     * 左边按钮样式
    */
    leftIconStyle?: ViewStyle

    /**
    * 左边icon编码
   */
    leftIcon?: number

    /**
    * 左边按钮文字
   */
    leftText?: string

    /**
     * 左边文字样式
    */
    leftTextStyle?: TextStyle

    /**
     * 右边文字样式
    */
    rightTextStyle?: TextStyle

    /**
     * 右边按钮文字
    */
    rightText?: string

    /**
     * 右边按钮样式
     */
    rightIconStyle?: ViewStyle

    /**
     * 右边icon编码
    */
    rightIcon?: number

    /**
     * 输入框提示文字
    */
    placeholder?: string

    /**
     * 左边按钮回掉
    */
    leftButtonCallBack?: () => void

    /**
     * 右边按钮回掉
    */
    rightButtonCallBack?: () => void

    /**
    * 搜索回掉 用于调用接口等
    */
    searchCallback: (text?: string) => void
}

export default function SearchBar(props: InputProps) {

    const { type = 'search', placeholder = "请输入关键词", autoFocus } = props;
    const [focus, setFocus] = useState(false)
    const [text, setText] = useState(props.value)
    const inputRef = useRef<TextInput>(null)

    useMemo(() => {
        setText(props.value)
    }, [props.value])

    let onSearch = () => {
        inputRef.current?.blur();
        props.searchCallback(text)
    }

    return (
        <View style={{ backgroundColor: defaultStyle.color.mainColor, height: 44, flexDirection: 'row', alignItems: 'center' }}>
            {
                ((props.leftIcon || props.leftText) && !focus) && (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
                        onPress={props.leftButtonCallBack}>
                        {
                            props.leftIcon && (<Icon style={{ color: '#fff', fontSize: 14, marginLeft: 5, ...props.leftIconStyle }} iconCode={props.leftIcon} />)
                        }
                        {
                            props.leftText && (<Text style={{ color: '#fff', fontSize: 14, marginLeft: 5, ...props.leftTextStyle }}>{props.leftText}</Text>)
                        }
                    </TouchableOpacity>
                )
            }
            {
                <View style={{ flex: 1, height: 28, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                    <Icon style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginLeft: 10 }} iconCode={0xe64b} />
                    <TextInput
                        ref={inputRef}
                        autoCapitalize='none'
                        style={{ fontSize: 16, marginLeft: 10, color: '#fff', padding: 0, alignSelf: 'stretch', flex: 1, ...props.valueStyle }}
                        underlineColorAndroid="transparent"
                        value={text}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        returnKeyType='search'
                        disableFullscreenUI={true}
                        onBlur={() => setFocus(false)}
                        onChangeText={text => setText(text)}
                        onFocus={() => setFocus(true)}
                        onSubmitEditing={onSearch}
                    />
                    {
                        type == 'jump' && (
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} activeOpacity={1} onPress={onSearch} />
                        )
                    }
                </View>
            }
            {
                ((props.rightIcon || props.rightText) && !focus) && (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
                        onPress={props.rightButtonCallBack}>
                        {
                            props.rightIcon && (<Icon style={{ color: '#fff', fontSize: 14, marginRight: 5, ...props.rightIconStyle }} iconCode={props.rightIcon} />)
                        }
                        {
                            props.rightText && (<Text style={{ color: '#fff', fontSize: 14, marginRight: 5, ...props.rightTextStyle }}>{props.rightText}</Text>)
                        }
                    </TouchableOpacity>
                )
            }
            {
                focus && (
                    <TouchableOpacity style={{ marginRight: 10, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}
                        onPress={onSearch}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>搜索</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}


