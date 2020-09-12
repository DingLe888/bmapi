/**
*  文本输入框
*/
import React, { useMemo, useRef, useState } from 'react';
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import defaultStyle from '../../configs/defaultStyle';
import { FormProps } from '../../kit';
import { insertStr } from '../../util/extention/publicFunc';
import request from '../../util/request';
import ActionSheetModal from '../actionSheet/actionSheetModal';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';

interface Props extends FormProps {
    /**
    *  类型 default 普通类型，idCard 身份证类型 ， bankCard 银行卡类型
    */
    inputType?: 'default' | 'idCard' | 'bankCard'
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
	*  输入值
	*/
    value?: string | number;

	/**
	*  输入值的样式
	*/
    valueStyle?: TextStyle;

	/**
	*  单位
	*/
    unit?: string;
	/**
	*  单位样式
	*/
    unitStyle?: TextStyle;

	/**
	*  是否可以编辑
	*/
    editable?: boolean;

	/**
	*  如果为true，在componentDidMount后会获得焦点。默认值为false。
	*/
    autoFocus?: boolean,

	/**
	*  占位符
	*/
    placeholder?: string;

	/**
	*  返回键类型
	*/
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'

	/**
	*  最大文本输入数量
	*/
    maxLength?: number;

	/**
	*  键盘类型
	*/
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad";

	/**
	*  文档改变
	*/
    onTextChange?: (text: string) => void;

	/**
	*  右侧小图标
	*/
    rightIconRender?: Element;

	/**
	*  当文本框失去焦点的时候调用此回调函数。
	*/
    onBlur?: () => void,

	/**
	*  当文本框获得焦点的时候调用此回调函数
	*/
    onFocus?: () => void

	/**
	*  此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
	*/
    onSubmitEditing?: (result: string | undefined) => void

}

export default function InputItem(props: Readonly<Props>) {

    const [result, setResult] = useState(`${props.value || ''}`)
    const [empty, setEmpty] = useState(false)
    const actionRef = useRef<ActionSheetModal>(null)

    let pretreatmentText = (text: string) => {
        if (props.inputType == 'idCard') {
            text = insertStr(text, 6, ' ')
            text = insertStr(text, 15, ' ')
            setResult(text)
        } else if (props.inputType == 'bankCard') {
            text = insertStr(text, 4, ' ')
            text = insertStr(text, 9, ' ')
            text = insertStr(text, 14, ' ')
            setResult(text)
        } else {
            setResult(text)
        }
        setEmpty(false)
    }

    useMemo(() => {
        pretreatmentText(`${props.value || ''}`)
    }, [props.value])


    let textChange = (text: string) => {
        pretreatmentText(text);
        props.onTextChange && props.onTextChange(text);
    }

    props.getFormRef && props.getFormRef((action) => {
        switch (action) {
            case 'data':
                return result;

            case 'enpty':
                setEmpty(true)
                break;
        }
    })

    /**
    *  处理图片
    */
    let handleImage = (img: { path: string }) => {
        const path = img.path
        request.upload('/beetle/idcard/geIdCardFullInfo', { paths: [path] }, true, 'code').then((res: any) => {
            pretreatmentText(res.cardNo)
        })
    }

    let showPicker = () => {
        actionRef.current?.showActionSheet(['相机', '从相册选择'], (index: number) => {
            if (index == 0) {
                ImagePicker.openCamera({
                    multiple: false,
                    mediaType: 'photo'
                }).then((img: any) => {
                    handleImage(img)
                })
            } else {
                ImagePicker.openPicker({
                    multiple: false,
                    mediaType: 'photo'
                }).then((img: any) => {
                    handleImage(img)
                })
            }
        })
    }


    return (
        <View style={{ height: 55, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, ...props.style }}>
            <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                {
                    props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                }
            </View>
            <TextInput
                autoCapitalize='none'
                style={{ fontSize: 16, marginLeft: 15, color: '#000', textAlign: 'right', textAlignVertical: 'center', padding: 0, flex: 1, ...props.valueStyle }}
                underlineColorAndroid="transparent"
                value={result}
                placeholder={props.placeholder || '请输入'}
                placeholderTextColor={empty ? '#D5544F' : '#aaa'}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType}
                editable={props.editable}
                autoCorrect={false}
                autoFocus={props.autoFocus}
                clearButtonMode='while-editing'
                returnKeyType={props.returnKeyType}
                disableFullscreenUI={true}
                onBlur={props.onBlur}
                onChangeText={textChange}
                onFocus={props.onFocus}
                onSubmitEditing={() => props.onSubmitEditing && props.onSubmitEditing(result)}
            />

            {/* 单位 */}
            {props.unit && (
                <Text style={{ marginLeft: 4, fontSize: 14, color: '#333', fontFamily: 'PingFang-SC-Regular', ...props.unitStyle }}>
                    {props.unit}
                </Text>
            )}

            {/* 身份证识别 */}
            {
                props.inputType == 'idCard' && (
                    <Icon style={{ marginLeft: 6, fontSize: 14, color: defaultStyle.color.mainColor }}
                        iconCode={0xe9c3}
                        onPress={showPicker} />
                )
            }

            {/* 最右侧图标 */}
            {props.rightIconRender && props.rightIconRender}

            <ActionSheetModal ref={actionRef} />
            <NoEditableModal editable={props.editable} />

        </View>
    )



}
