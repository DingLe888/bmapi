

/**
*  九宫格图片多选
*/

import React, { useMemo, useRef, useState } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { defaultStyle } from '../../configs';
import { FormProps } from '../../kit';
import request from '../../util/request';
import ActionSheetModal from '../actionSheet/actionSheetModal';
import Icon from '../icon';
import { ImageViewerHandle, Viewer } from '../imageViewer/viewer';
import Video from '../video/video';
import NoEditableModal from './noEditableModal';

interface Props extends FormProps {

    /**
    *  样式
    */
    style?: ViewStyle

    /**
    *  标题
    */
    title?: string

    /**
    *  添加照片按钮文字
    */
    btnTitle?: string

    /**
    *  描述文字
    */
    descStr?: string

    /**
    *  标题样式
    */
    titleStyle?: TextStyle

	/**
	*  图片url 
	*/
    imgUrls?: string[]

    /**
    *  图片url类型
    */
    urlType?: 'http' | 'file'

    /**
     *  媒体类型  照片,视频,兼有
     */
    mediaType?: 'photo' | 'video'

    /**
     *  视图窗口匹配
     */
    resizeMode?: 'contain' | 'cover' | 'stretch'

    /**
    *  图片选择事件
    */
    onSelectPhoto?: (urls: string[]) => void
    /**
    *  图片最大值
    */
    maxCount?: number

    /**
    *  是否显示放大原图
    */
    showOriginal?: boolean

    /**
    *  是否打开裁剪
    */
    cropping?: boolean,

    /**
    *  裁剪尺寸
    */
    croppingSize?: { width: number, height: number }


}

export default function PhotoPickerItem(props: Readonly<Props>) {

    let { imgUrls = [], title = '照片', btnTitle = '添加照片', descStr = '点击打开相册和相机', urlType = 'http', maxCount = 9, showOriginal = true, mediaType = 'photo', resizeMode = 'cover' } = props

    const [result, setResult] = useState(imgUrls)
    const actionRef = useRef<ActionSheetModal>(null)
    const [empty, setEmpty] = useState(false)
    const [itemWidth, setItemWidth] = useState(100)
    const viewerRef = useRef<ImageViewerHandle>(null)


    useMemo(() => {
        setResult(imgUrls)
    }, [props.imgUrls])


    props.getFormRef && props.getFormRef((action) => {
        switch (action) {
            case 'data':
                return result;

            case 'enpty':
                setEmpty(true)
                break;
        }
    })

    let onLayout = (event: { nativeEvent: { layout: { width: number, height: number } } }) => {
        let fatherWidth = event.nativeEvent.layout.width
        let itemWidth = (fatherWidth - 6 * 2 - 10 * 3 - 3) / 3
        setItemWidth(itemWidth)
    }

    /**
    *  处理图片
    */
    let handleImage = (imgs: { path: string }[]) => {
        console.log('处理图片', imgs);
        const paths = imgs.map(img => img.path)
        if (urlType == 'file') {
            let newResult = [...result, ...paths]
            setResult(newResult)
            props.onSelectPhoto && props.onSelectPhoto(newResult)
        } else {
            console.log('ddd', paths)
            request.upload('http://resource.bm001.com/batchUploadGuard', { paths: paths }, true).then((res: any) => {
                let newResult = [...result, ...res.dataList]
                setResult(newResult)
                props.onSelectPhoto && props.onSelectPhoto(newResult)
            })
        }
    }

    /**
    *  搞到图片
    */
    let showPicker = () => {
        actionRef.current?.showActionSheet(['相机', '从相册选择'], (index: number) => {
            if (index == 0) {
                ImagePicker.openCamera({
                    cropping: props.cropping,
                    ...props.croppingSize,
                    multiple: false,
                    mediaType
                }).then((img: any) => {
                    handleImage([img])
                })
            } else {
                let remnantCount = maxCount - result.length
                ImagePicker.openPicker({
                    cropping: props.cropping,
                    ...props.croppingSize,
                    maxFiles: remnantCount > 9 ? 9 : remnantCount,
                    multiple: true,
                    mediaType
                }).then((imgs: any) => {
                    handleImage(imgs)
                })
            }
        })
    }

    /**
    *  删除图片
    */
    let deleteImage = (url: string) => {
        setResult(result.filter(u => u != url))
    }


    const imageClick = (index: number) => {
        if (showOriginal && mediaType == 'photo') {
            const imageUrl = result.map(url => { return { url } })
            viewerRef.current?.showImageViewer(imageUrl, index)
        }
    }


    return (
        <View style={{ backgroundColor: '#fff', ...props.style }} onLayout={onLayout} >
            {/* 顶部标题和按钮 */}
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <Text style={{ color: empty ? '#D5544F' : 'rgba(0,0,0,0.8)', fontSize: 18, ...props.titleStyle }}>{title}</Text>
                <TouchableOpacity style={{ height: 40, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
                    onPress={showPicker}>
                    <Icon iconCode={0xe7e4} style={{ fontSize: 14, color: defaultStyle.color.mainColor, marginRight: 5, marginTop: 2 }} />
                    <Text style={{ color: defaultStyle.color.mainColor, fontSize: 14 }}>{btnTitle}</Text>
                </TouchableOpacity>
            </View>
            {/* 图片区域 */}
            {
                result.length == 0 ? (
                    <TouchableOpacity style={{ borderTopColor: '#dcdcdc', borderTopWidth: 0.5, flexDirection: 'row', justifyContent: 'center', paddingTop: 41, paddingBottom: 47 }}
                        onPress={showPicker}>
                        <Icon style={{ color: defaultStyle.color.mainColor, fontSize: 50 }} iconCode={0xe6e5} />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={{ color: defaultStyle.color.mainColor, fontSize: 18, lineHeight: 25 }}>{btnTitle}</Text>
                            <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12, lineHeight: 16, marginTop: 4 }}>{descStr}</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View style={{ padding: 6, flexDirection: 'row', flexWrap: 'wrap', borderTopColor: '#dcdcdc', borderTopWidth: 0.5, }}>
                            {
                                result.map((url, index) => {
                                    return (
                                        <View style={{ padding: 5, overflow: 'hidden' }} key={url + index}>
                                            {
                                                mediaType == 'photo' ? (
                                                    <TouchableOpacity activeOpacity={1} onPress={imageClick.bind(undefined, index)}>
                                                        <Image style={{ width: itemWidth, height: itemWidth, overflow: 'hidden' }}
                                                            resizeMode={resizeMode}
                                                            source={{ uri: url + defaultStyle.picSuffix.size.sizepad240x240 }} />
                                                    </TouchableOpacity>
                                                ) : (
                                                        <Video style={{ width: itemWidth, height: itemWidth, overflow: 'hidden' }}
                                                            url={url}
                                                            resizeMode={resizeMode} />
                                                    )
                                            }
                                            <Icon style={{ position: 'absolute', top: 0, right: 0, fontSize: 20, color: defaultStyle.color.mainColor }}
                                                iconCode={0xe6ab}
                                                onPress={() => deleteImage(url)} />
                                        </View>
                                    )
                                })
                            }
                            {
                                result.length < maxCount && (
                                    <View style={{ padding: 5 }} key={'add'}>
                                        <TouchableOpacity style={{ width: itemWidth, height: itemWidth, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderColor: '#dcdcdc', borderWidth: 0.5, borderRadius: 4 }}
                                            onPress={showPicker}>
                                            <Icon style={{ color: '#ccc', fontSize: itemWidth * 0.618 }} iconCode={0xe9c9} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                    )
            }
            <ActionSheetModal ref={actionRef} />
            <Viewer ref={viewerRef} />
            <NoEditableModal editable={props.editable} />
        </View>
    )

}
