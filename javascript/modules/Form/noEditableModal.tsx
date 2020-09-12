/**
*  选择项
*/

import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
    editable?: boolean
}

export default function NoEditableModal(props: Readonly<Props>) {

    let { editable = true } = props
    if (!editable) {
        return (
            <TouchableOpacity style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />
        )
    } else {
        return null
    }
}
