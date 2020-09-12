
/**
*  选择项
*/
import React from 'react';
import { Modal, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import defaultStyle from '../../configs/defaultStyle';
import Icon from '../icon';

interface IconModal { icon: number, iconBGColor: string, title: string }

interface Props {

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  文字描述
    */
    titleText?: string

    /**
     *  是否展示
     */
    visible: boolean

    /**
    *  单选框🔘
    */
    checkBox?: { check: boolean, content: string }

    /**
    *  数据源,请参考
    */
    source?: IconModal[]

    /**
    *  选择事件
    */
    onSelect: (icon: IconModal) => void

    /**
     *  单选框状态发生改变
     */
    onChecked?: () => void

    /**
     *  取消事件
     */
    onCancle?: () => void

    /**
     *  分享空白区域的元素,注意分享排版 justifyContent: 'flex-end'
     */
    children?: React.ReactNode
}


export default function Form(props: Props) {

    let customSource = [{ icon: 0xe63d, title: '微信', iconBGColor: '#2ECC71' }, { icon: 0xe6b4, title: '朋友圈', iconBGColor: '#69D400' }]
    let iconSource: IconModal[] = !!props.source ? props.source : customSource;
    let itemWidth = defaultStyle.device.width / 3 - 1


    return (
        <Modal visible={props.visible}
            transparent={true}
            animationType='none'>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
                {
                    props.children || <TouchableOpacity style={{ flex: 1 }} onPress={props.onCancle} />
                }
                <View style={{ borderBottomColor: '#eee', borderBottomWidth: 0.5, backgroundColor: '#fff' }}>
                    {
                        (!!props.titleText || !!props.checkBox) && (
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                {
                                    !!props.titleText && <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 12, lineHeight: 16 }} >{props.titleText}</Text>
                                }
                                {
                                    !!props.checkBox && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                            <Icon style={{ color: props.checkBox.check ? defaultStyle.color.mainColor : 'rgba(0,0,0,0.3)', fontSize: 14, marginTop: 1 }}
                                                onPress={props.onChecked}
                                                iconCode={props.checkBox.check ? 0xe850 : 0xe84e} />
                                            <Text style={{ color: 'rgba(0,0,0,0.7)', fontSize: 14, marginLeft: 6, flex: 1, lineHeight: 16 }} >{props.checkBox.content}</Text>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 22 }}>
                        {
                            iconSource.map((icon, index) => {
                                return (
                                    <TouchableOpacity style={{ marginTop: 24, width: itemWidth, alignItems: 'center' }}
                                        key={icon.title}
                                        onPress={() => props.onSelect(icon)}>
                                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: icon.iconBGColor, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon style={{ color: '#fff', fontSize: 30 }} iconCode={icon.icon} />
                                        </View>
                                        <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12, marginTop: 7, lineHeight: 17 }}>{icon.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <TouchableOpacity style={{ height: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}
                    activeOpacity={0.8}
                    onPress={props.onCancle}>
                    <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 16 }}>取消</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}


