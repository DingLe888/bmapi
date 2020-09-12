/**
 * Created by chenyunjie on 2017/6/28.
 */

import Toast from 'react-native-root-toast';
import { AlertProps, InputProps } from '../../kit';
import { hidenHUDLoading, showHUDLoading } from './HUD';
import { hideHUDAlertTips, showHUDAlertTips, showHUDInputTips } from './HUDAlertTips';



const tips = {

	showTips: (msg: string, duration: number = Toast.durations.SHORT, callBack?: () => void, position: number = Toast.positions.CENTER) => {

		if (!msg || msg.length == 0) {
			return;
		}
		Toast.show(msg, {
			duration: duration, // toast显示时长
			position: position, // toast位置
			shadow: true, // toast是否出现阴影
			animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
			hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
			delay: 0, // toast显示的延时
			onShow: () => {
				// toast出现回调（动画开始时）
			},
			onShown: () => {
				// toast出现回调（动画结束时）
			},
			onHide: () => {
				// toast隐藏回调（动画开始时）
			},
			onHidden: callBack
		});
	},

	showLoading: (msg?: string, timeOut?: number, type?: 'loading' | 'success' | 'info') => {
		showHUDLoading(type || "loading", msg, timeOut);
	},

	hideLoading: () => hidenHUDLoading(),

	/**
	*  显示提示框
	*/
	showAlertTips: (props: AlertProps) => {
		showHUDAlertTips(props);
	},

	/**
	*  隐藏提示框
	*/
	hideAlertTips: () => {
		hideHUDAlertTips();
	},

	/**
	*  显示输入框形的弹框
	*/
	showHUDInputTips: (props: InputProps) => {
		showHUDInputTips(props);
	}

};


export default tips