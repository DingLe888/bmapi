
/**
*  选择项
*/

import React, { useMemo, useRef, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { defaultStyle } from '../../configs';
import { FormProps } from '../../kit';
import request from '../../util/request';
import ActionSheetModal from '../actionSheet/actionSheetModal';
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
    *  描述
    */
    desc?: string

    /**
    *  描述样式
    */
    descStyle?: TextStyle

	/**
	*  图片url 
	*/
    imgUrl?: string

    /**
    *  图片url类型
    */
    urlType?: 'http' | 'file'

    /**
    *  图片选择事件
    */
    onSelectPhoto?: (url: string) => void

    /**
    *  裁剪尺寸
    */
    croppingSize?: { width: number, height: number }


}

export default function HeadPhotoItem(props: Readonly<Props>) {

    const [result, setResult] = useState(props.imgUrl)
    const actionRef = useRef<ActionSheetModal>(null)
    const [empty, setEmpty] = useState(false)


    useMemo(() => {
        setResult(props.imgUrl)
    }, [props.imgUrl])


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
        if (props.urlType == 'file') {
            setResult(path)
            props.onSelectPhoto && props.onSelectPhoto(path)
        } else {
            request.upload('http://resource.bm001.com/batchUploadGuard', { paths: [path] }, true).then((res: any) => {
                let imagrUrl = res.dataList[0]
                setResult(imagrUrl)
                props.onSelectPhoto && props.onSelectPhoto(imagrUrl)
            })
        }
    }

    let showPicker = () => {
        actionRef.current?.showActionSheet(['相机', '从相册选择'], (index: number) => {
            if (index == 0) {
                ImagePicker.openCamera({
                    cropping: true,
                    ...props.croppingSize,

                    multiple: false,
                    mediaType: 'photo'
                }).then((img: any) => {
                    handleImage(img)
                })
            } else {
                ImagePicker.openPicker({
                    cropping: true,
                    width: 200,
                    height: 200,
                    ...props.croppingSize,
                    multiple: false,
                    mediaType: 'photo'
                }).then((img: any) => {
                    handleImage(img)
                })
            }
        })
    }

    return (
        <View style={{ height: 84, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, ...props.style }} >
            <View style={{ flex: 1 }}>
                <Text style={{ color: empty ? '#D5544F' : 'rgba(0,0,0,0.6)', fontSize: 16, ...props.titleStyle }}>{props.title}</Text>
                {props.desc && (<Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14, marginTop: 5, ...props.descStyle }}>{props.desc}</Text>)}
            </View>

            <TouchableOpacity style={{ width: 50, height: 50, marginLeft: 15, borderRadius: 25, borderWidth: 0.5, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
                onPress={showPicker}>
                {result ?
                    (<Avatar rounded size={50} source={{ uri: result }} title={props.title[0]} activeOpacity={0.7} showAccessory />) :
                    (<Icon style={{ fontSize: 22, color: defaultStyle.color.mainColor }} iconCode={0xe9c3} />)}
            </TouchableOpacity>
            <ActionSheetModal ref={actionRef} />
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
