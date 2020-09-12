/**
*  选择项
*/

import React, { useEffect, useState } from 'react';
import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';
import request from '../../util/request';
import showPicker from '../bmPicker/bmPicker';
import Icon from '../icon';
import NoEditableModal from './noEditableModal';

interface Props extends FormProps {

    /**
    *  类型 area:省市区  address: 省市区和详细地址 street：只需要填写详细地址
    */
    type?: 'address' | 'area' | 'street',

    /**
    *  样式
    */
    style?: ViewStyle,

    /**
    *  左侧文字
    */
    labelText: string,
    /**
    *  左侧文字样式
    */
    labelTextStyle?: TextStyle,

	/**
	*  显示文本的样式
	*/
    valueStyle?: TextStyle;

    /**
    *  蒙层的颜色
    */
    modalColor?: string

	/**
	*  省市区 数据 
	*/
    areaValue?: string[];

    /**
    *  街道地址 数据
    */
    streetValue?: string

    /**
    *  选择事件
    * area:当前选中的省市区组成的数组,例如:['江苏省','南京市','雨花台区']
    * street:详细地址   例如:'软件谷科创城C1南10楼',只在 address/street 模式下有效
    * datasource: 地址原数据  ,全国的地址JSON数据
    */
    onSelect?: (value: { area?: string[], street?: string, datasource: any[] }) => void;


    /**
     *  外部传入数据源
     * 这样的结构 [
        {
            '江苏省': [
                {
                    '南京市': ['雨花台区', '玄武区', '江宁区',...]
                },
                ...
            ]
        },
        ...
    ]
     */
    datasource?: { [province: string]: { [city: string]: string[] }[] }[]
}

let areaDatasource: any

export default function AddressSelectItem(props: Readonly<Props>) {
    let { type = 'address' } = props

    const [area, setArea] = useState(props.areaValue)
    const [street, setStreet] = useState(props.streetValue)
    const [empty, setEmpty] = useState(false)
    const [datasource, setDatasource] = useState(props.datasource || [])


    useEffect(() => {
        setArea(props.areaValue)
        setEmpty(false)
    }, [props.areaValue])

    useEffect(() => {
        setStreet(props.streetValue)
        setEmpty(false)
    }, [props.streetValue])

    useEffect(() => {
        // 外部传如数据源有第一优先级,本地数据源有第二优先级,网络获取数据源有第三优先级
        if (props.datasource) {
            setDatasource(props.datasource)
        } else {
            if (areaDatasource) {
                setDatasource(areaDatasource)
            } else {
                request.get('http://resource.bm001.com/js/queryContry').then((res: any) => {
                    areaDatasource = res.dataList.map((p: any) => {
                        let cities = p.children.map((city: any) => {
                            let areas = city.children.map((area: any) => {
                                return area.name
                            })
                            let cityData: any = {}
                            cityData[city.name] = areas
                            return cityData
                        })
                        let pri: any = {}
                        pri[p.name] = cities
                        return pri
                    })
                    setDatasource(areaDatasource)
                })
            }
        }
    }, [props.datasource])

    props.getFormRef && props.getFormRef((action) => {
        switch (action) {
            case 'data':
                return (area || street) ? { area, street } : undefined;

            case 'enpty':
                setEmpty(true)
                break;
        }
    })


    // 点击事件 
    let selectClick = () => {

        showPicker({
            pickerTitleText: props.labelText,
            pickerData: datasource || [],
            selectedValue: area,
            modalColor: props.modalColor,
            onPickerConfirm: data => {
                props.onSelect && props.onSelect({ area: data, street, datasource });
                setArea(data)
                setEmpty(false)
            }
        })
    }

    let streetChange = (text: string) => {
        props.onSelect && props.onSelect({ area, street: text, datasource });
        setStreet(text)
        setEmpty(false)
    }

    return (
        <View style={{ ...props.style }}>
            {
                (type == 'area' || type == 'address') && (
                    <TouchableOpacity style={{ height: 55, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }} activeOpacity={1} onPress={selectClick}>
                        <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                            {
                                props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                            }
                        </View>
                        <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, marginRight: 10, color: empty ? '#D5544F' : (area ? '#000' : 'rgba(0,0,0,0.3)'), ...props.valueStyle }} >{area ? area.join(' ') : '请选择省市区'}</Text>

                        <Icon iconCode={0xe649} style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)' }} />
                    </TouchableOpacity >
                )
            }

            {
                (type == 'address' || type == 'street') && (
                    <View style={{ height: type == 'street' ? 55 : 42, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>

                        {
                            type == 'street' && (
                                <View style={{ minWidth: 80, maxWidth: 180, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
                                    {
                                        props.labelText ? <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 16, ...props.labelTextStyle }} numberOfLines={1} ellipsizeMode='middle'>{props.labelText} <Text style={{ color: '#D5544F' }}>{props.require ? ' *' : ''}</Text></Text> : null
                                    }
                                </View>
                            )
                        }
                        <TextInput
                            autoCapitalize='none'
                            style={{ fontSize: 16, marginLeft: 15, color: '#000', textAlign: 'right', textAlignVertical: 'center', padding: 0, flex: 1, ...props.valueStyle }}
                            underlineColorAndroid="transparent"
                            value={street}
                            placeholder={'请输入详细地址'}
                            placeholderTextColor={empty ? '#D5544F' : '#aaa'}
                            autoCorrect={false}
                            clearButtonMode='while-editing'
                            disableFullscreenUI={true}
                            onChangeText={streetChange}
                        />
                    </View >
                )
            }
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
