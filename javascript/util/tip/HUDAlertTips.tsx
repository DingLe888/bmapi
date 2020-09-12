import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { defaultStyle } from '../../configs';
import { AlertProps, InputProps } from '../../kit';
import Icon from '../../modules/icon';

let alertTipsView: RootSiblings | null = null;

export function showHUDAlertTips(props: AlertProps) {

    const { iconCode, iconStyle, title, titleStyle, desc, buttons = [{ text: '返回' }], btnClickCallback } = props;

    let callBack = (index: number) => {
        hideHUDAlertTips()
        btnClickCallback && btnClickCallback(index)
    }

    const hud = (
        <View style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
        }}>

            <View style={{ width: 300, borderRadius: 4, paddingTop: 40, backgroundColor: defaultStyle.color.mainColor, alignItems: "center" }}>
                {/* 图标 */}
                {iconCode ? <Icon iconCode={iconCode} style={{ fontSize: 75, color: "#fff", marginTop: 10, marginBottom: 15, ...iconStyle }} /> : null}
                {/* 标题 */}
                {title ? <Text style={{ fontSize: 22, color: "#fff", textAlign: "center", fontWeight: 'bold', ...titleStyle }}>{title}</Text> : null}
                {/* 描述 */}
                {desc ? <Text style={{ marginTop: 15, fontSize: 14, textAlign: "center", paddingRight: 54, paddingLeft: 54, color: 'rgba(255,255,255,0.6)', lineHeight: 20, marginBottom: 30 }}>{desc}</Text> : null}
                {/* 按钮 */}
                <View style={{ height: 50, flexDirection: "row" }}>
                    {
                        buttons.map((btn, index) => {
                            return (
                                <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.1)", ...btn.btnStyle }}
                                    onPress={() => callBack(index)}
                                    key={btn.text}>
                                    <Text style={{ fontSize: 18, color: '#fff' }}>{btn.text}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

        </View>
    );

    alertTipsView && alertTipsView.destroy()
    alertTipsView = null;
    alertTipsView = new RootSiblings(hud, () => {
        console.log('efefe')
    });
};



/**
*  输入型弹框
*/
export function showHUDInputTips(props: InputProps) {

    const { title, titleStyle } = props;

    let textValue = ''

    let callBack = (index: number) => {
        hideHUDAlertTips()
        if (index == 1) {
            props.onSubmitText(textValue);
        }
    }

    const hud = (
        <View style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
        }}>

            <View style={{ width: 300, borderRadius: 4, backgroundColor: defaultStyle.color.mainColor, alignItems: "center" }}>

                {/* 标题 */}
                {title ? <Text style={{ fontSize: 22, color: "#fff", marginTop: 40, textAlign: "center", fontWeight: 'bold', ...titleStyle }}>{title}</Text> : null}

                {/* 输入框 */}
                <View style={{ marginTop: 18, width: 252, height: 40, borderRadius: 4, paddingHorizontal: 15, justifyContent: 'center', backgroundColor: '#fff' }}>
                    <TextInput
                        autoCapitalize='none'
                        style={{ fontSize: 16, color: '#000', textAlignVertical: 'center', padding: 0, flex: 1 }}
                        underlineColorAndroid="transparent"
                        placeholder={props.placeholder || '请输入'}
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        disableFullscreenUI={true}
                        onChangeText={t => textValue = t}
                    />
                </View>

                {/* 按钮 */}
                <View style={{ height: 50, flexDirection: "row", marginTop: 33 }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.1)" }}
                        onPress={() => callBack(0)}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.1)", marginLeft: 1 }}
                        onPress={() => callBack(1)}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );

    alertTipsView && alertTipsView.destroy()
    alertTipsView = null;
    alertTipsView = new RootSiblings(hud);

}

/**
 * 隐藏HUD
 */
export function hideHUDAlertTips() {
    if (alertTipsView) {
        alertTipsView.destroy();
        alertTipsView = null;
    }
};

