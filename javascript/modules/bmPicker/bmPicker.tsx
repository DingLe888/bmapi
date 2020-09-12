
/**
*  选择项
*/

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker';
import RootSiblings from 'react-native-root-siblings';
import { FormProps } from '../../kit';


interface Props extends FormProps {

    /**
    *  标题
    */
    pickerTitleText?: string,

    /**
    *  数据源
    */
    pickerData?: any[],

    /**
    *  当前选中数据
    */
    selectedValue?: any,

    /**
     *  蒙层的颜色
     */
    modalColor?: string

    /**
    *  确认选择事件
    */
    onPickerConfirm?: (value: any[],) => void;

    /**
     *  取消选择事件
     */
    onPickerCancel?: (value: any[],) => void;

    /**
     *  选择中事件
     */
    onPickerSelect?: (value: any[],) => void;

}

export default function showPicker(props: Props) {

    /**
     *  隐藏picker
     */
    let hiddenPicker = () => {
        Picker.hide()
        modalView.destroy();
    }

    /**
     *  蒙层
     */
    let modalView = new RootSiblings(<TouchableOpacity style={{ backgroundColor: props.modalColor || '#cccccccc', left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }} onPress={hiddenPicker} />);

    /**
     *  显示picker
     */
    // 如果有数据源 弹出pick选择器
    Picker.init({
        pickerTitleText: props.pickerTitleText || '选择',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnText: '确认',
        pickerData: props.pickerData,
        selectedValue: props.selectedValue,
        pickerConfirmBtnColor: [90, 169, 250, 1],
        pickerCancelBtnColor: [153, 153, 153, 1],
        pickerTitleColor: [51, 51, 51, 1],
        pickerToolBarBg: [255, 255, 255, 1],
        pickerBg: [255, 255, 255, 1],
        onPickerConfirm: (data) => {
            modalView.destroy();
            props.onPickerConfirm && props.onPickerConfirm(data)
        },
        onPickerCancel: (data) => {
            modalView.destroy();
            props.onPickerCancel && props.onPickerCancel(data)
        },
        onPickerSelect: (data) => {
            props.onPickerSelect && props.onPickerSelect(data)
        },
    });

    Picker.show();
}
