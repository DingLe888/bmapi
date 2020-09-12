import React from 'react';
import { Modal, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import BaseComponent from '../../base/baseComponent';


interface Props {
  /**
  *  样式
  */
  style?: ViewStyle,
}

interface State {
  /**
  *  展示与否
  */
  visible: boolean,
  /**
  *  内容加载函数
  */
  items: string[]
}

export default class ActionSheetModal extends BaseComponent<Props> {

  state: State = {
    visible: false,
    items: [],
  }

  onClickItemCallback?: ((index: number) => void) = undefined;

  constructor(props: Props) {
    super(props)

  }

  render() {

    return (
      <Modal visible={this.state.visible}
        transparent={true}
        animationType='none'>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end', ...this.props.style }} activeOpacity={1} onPress={this.hiddenActionSheet}>
          {this.loadBtnsView()}

          <TouchableOpacity style={{ marginHorizontal: 10, height: 56, marginBottom: 5, borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={1}
            onPress={this.hiddenActionSheet}>
            <Text style={{ color: '#F71129', fontSize: 18 }}>取消</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  loadBtnsView = () => {
    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', marginHorizontal: 10, marginBottom: 5 }}>
        {
          this.state.items.map((item, index) => {
            let isfirst = index == 0
            return (
              <TouchableOpacity style={{ height: 56, borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderTopColor: '#eee', borderTopWidth: isfirst ? 0 : 1 }}
                activeOpacity={1}
                key={item}
                onPress={this.onBtnClick.bind(this, item, index)}>
                <Text style={{ color: '#000', fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }


  onBtnClick = (item: string, index: number) => {
    this.setState({
      visible: false
    }, () => {
      setTimeout(() => {
        this.onClickItemCallback && this.onClickItemCallback(index)
      }, 100)
    })
  }

  /**
  *  显示
  */
  showActionSheet = (items: string[], onClickItemCallback: (index: number) => void) => {
    this.onClickItemCallback = onClickItemCallback;
    this.setState({
      visible: true,
      items
    })
  }

  /**
  *  隐藏
  */
  hiddenActionSheet = () => {
    this.setState({
      visible: false
    })
  }
}