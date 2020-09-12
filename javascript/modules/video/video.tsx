
/**
*   视频播放器
*/

import React, { useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import Video from 'react-native-video';

interface Props {

    /**
     *  设置视频源  
     */
    url: string

    /**
     *  视频view的样式
     */
    style: ViewStyle

    /**
     *  播放速率 默认是1
     */
    rate?: number

    /**
     *  是否暂停 默认false
     */
    paused?: boolean

    /**
     *  调节音量 默认是1
     */
    volume?: number

    /**
     *  控制是否静音 默认是false
     */
    muted?: boolean

    /**
     * 确定当帧与原始视频尺寸不匹配时如何调整视频的大小。默认 contain
     *  none:不应用调整大小 
     *  contain:保持纵横比 显示全 有黑边
     * cover：保持纵横比 显示不全 没黑边
     * stretch：强行填满，不保持纵横比
     */
    resizeMode?: 'none' | 'contain' | 'cover' | 'stretch'

    /**
     *  确定在到达结尾时是否重复播放视频。默认是false
     */
    repeat?: boolean
}

export default function VideoView(props: Readonly<Props>) {

    let { rate = 1, volume = 1, muted = false, resizeMode = 'contain', repeat = false, paused = true } = props

    const videoRef = useRef<Video>(null)


    /**
     *  加载数据
     */
    let onLoad = (data: any) => {
        // setDuration(data.duration)
    }

    /**
     *  视频播放过程中的回调
     */
    let onProgress = (timeData: { currentTime: number, playableDuration: number, seekableDuration: number }) => {
        // setCurrentTime(timeData.currentTime)
    }

    /**
     *  视频播放结束
     */
    let onEnd = () => {
    };

    return (
        <View style={{ backgroundColor: '#000', ...props.style }}>
            <Video
                ref={videoRef}
                source={{ uri: props.url }}//设置视频源  
                style={{ flex: 1 }}//组件样式
                rate={rate}//播放速率
                paused={paused}//暂停
                volume={volume}//调节音量
                muted={muted}//控制音频是否静音
                resizeMode={resizeMode}//缩放模式
                onLoad={onLoad}//加载媒体并准备播放时调用的回调函数。
                onProgress={onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                onEnd={onEnd}//视频播放结束时的回调函数
                repeat={repeat}//确定在到达结尾时是否重复播放视频。
                controls={true}
            />
        </View>
    );

}
