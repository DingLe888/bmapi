/**
*  form 父组件
*/

import React, { forwardRef, useImperativeHandle } from 'react';
import { View, ViewStyle } from 'react-native';
import { FormProps } from '../../kit';

interface Props {
    /**
    *  form 样式
    */
    style?: ViewStyle,

    /**
    * 是否需要分割线
    */
    separator?: boolean

    /**
    *  自定义分割线组件
    */
    separatorComponent?: () => Element,

    /**
    *  子组件
    */
    children?: Element[] | Element
}

let itemProps: any[] = []

export interface Handle {
    getFormData: () => string
}


export const Form = forwardRef<Handle, Props>(function Form(props, ref) {

    let renderComponent = () => {
        itemProps = []
        let children = React.Children.map(props.children, (child: any, index) => {
            let tempProps: FormProps = { ...child.props }
            if (!child.props.getFormRef) {
                tempProps.getFormRef = (vf: any) => {
                    tempProps.formFunc = vf
                }
            }
            itemProps.push(tempProps)
            return React.cloneElement(child, tempProps);
        })

        let childElements: any[] = []
        children.forEach((child: any, index: number) => {
            childElements.push(child);
            if (props.separator) {
                if (props.separatorComponent) {
                    childElements.push(props.separatorComponent())
                } else {
                    childElements.push(<View style={{ height: 0.5, backgroundColor: '#eee' }} />)
                }
            }
        });
        return childElements
    }

    useImperativeHandle(ref, () => ({
        getFormData: () => {
            let data: any = {}
            for (let i = 0; i < itemProps.length; i++) {

                let p = itemProps[i];
                if (p.formFunc) {
                    let property = p.property || (i + '没有property属性 ')
                    let value = p.formFunc('data')
                    let require = p.require
                    if (require && ((value == null || value == undefined) || (typeof value == 'string' && value.length == 0) || (typeof value == "object" && value.length == 0))) {
                        p.formFunc('enpty')
                    } else {
                        data[property] = value
                    }
                }
            }
            return data
        }
    }))

    return (
        <View style={{ backgroundColor: '#fff', paddingTop: 10, ...props.style }}>
            {renderComponent()}
        </View>
    )
});