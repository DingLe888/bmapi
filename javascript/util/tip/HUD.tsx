/**
 * Created by zhou on 16/5/28.
 */

import React from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

let loadingView: RootSiblings | null = null;
let rotationAnim = new Animated.Value(0);

let _initializeRotationAnimation = () => {
	rotationAnim.setValue(0);

	Animated.timing(rotationAnim, {
		toValue: 1,
		duration: 1000,
		easing: Easing.linear,
		delay: 0,
		useNativeDriver: true
	}).start(() => {
		if (loadingView) {
			_initializeRotationAnimation();
		}
	});
};


/**
*  定时器
*/
let timer: any | null = null

/**
 * 弹出HUDLoading 挡住下面的控件交互
 * style : 文字样式
 */
export function showHUDLoading(type: 'loading' | 'success' | 'info', tip?: string, timeout?: number) {
	const hud = (
		<View style={{ left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center', zIndex: 9999, position: 'absolute' }}>
			<View style={{ width: 128, paddingTop: 30, paddingBottom: 30, backgroundColor: 'rgba(20,20,20,0.9)', borderRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 0, alignItems: 'center' }}>
				{
					type == 'loading' && (
						<Animated.Image
							style={{
								width: 40,
								height: 40,
								tintColor: '#fcfcfc',
								transform: [
									{
										rotate: rotationAnim.interpolate({
											inputRange: [0, 1],
											outputRange: ['0deg', '360deg']
										})
									}
								]
							}}
							source={require('../../sources/image/loading.png')}
						/>
					)
				}

				{
					(type == 'info' || type == 'success') && (
						<Image style={{ width: 40, height: 40 }} source={type == 'info' ? require('../../sources/image/info.png') : require('../../sources/image/success.png')} />
					)
				}

				{
					tip ? (
						<Text style={{ color: '#fff', fontSize: 14, marginTop: 20, fontWeight: '500' }} numberOfLines={1} >{tip || ''}</Text>
					) : null
				}
			</View>
		</View>
	);

	hidenHUDLoading()
	loadingView = new RootSiblings(hud);
	_initializeRotationAnimation();

	let t = timeout || 5000;
	timer = setTimeout(() => {
		hidenHUDLoading();
	}, t);
};

/**
 * 隐藏HUD
 */
export function hidenHUDLoading() {
	if (loadingView) {
		loadingView.destroy();
		loadingView = null;
	}
	if (timer) {
		clearTimeout(timer)
		timer = null
	}
};

