

import { default as deepEqual, default as equal } from 'fast-deep-equal';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import BaseComponent from '../../base/baseComponent';
import defaultStyle from '../../configs/defaultStyle';
import ListEmptyView from './listEmptyView';


interface Props {
    /**
    *  样式
    */
    style?: ViewStyle,
    /**
    *  cell 点击事件
    */
    onPressItem?: (item: any, index: number) => void,
    /**
    *  加载每个cell  必填
    */
    renderItem: (item: any, index: number) => React.ReactElement,

    /**
    *  多列布局,默认值1，如大于1，此时组件内元素会从左到右从上到下按 Z 字形排列
    */
    numColumns?: number,

    /**
    *  如果设置了多列布局（即将numColumns值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上。
    */
    columnWrapperStyle?: ViewStyle
    /**
    *  是否显示分割线 默认显示
    */
    showItemSeparator?: boolean,
    /**
    *  空列表显示的组件
    */
    listEmptyComponent?: (emptyType: 'noData' | 'errorData') => (React.ReactElement | undefined),
    /**
    *  列表底部组件
    */
    listFooterComponent?: (dataSource: any[]) => (React.ReactElement | undefined),
    /**
    *  列表头部组件
    */
    listHeaderComponent?: (dataSource: any[]) => (React.ReactElement | undefined),
    /**
    *  其他相关数据
    */
    extraData?: any,
    /**
    *  行高，定行高的时候最好给一下 
    */
    cellHeight?: number
    /**
    *  加载数据 根据pageNum计算当前是上拉加载还是下拉刷新
    */
    loadData?: (pageNum: number) => void,
    /**
    *  是否移除出了屏幕的cell ，默认yes
    */
    removeClippedSubviews?: boolean,
    /**
   *  使用外部数据源
   */
    useExternalSource?: boolean,
    /**
    *  固定数据源
    */
    dataSource?: { data: any[] | null, pageNum: number },

    /**
     *  是否分页加载数据,默认是YES
     */
    paging?: boolean

}

interface State {
    dataSource: any[],
    refreshing: boolean,
    pageNum: number,
    /**
   *  是否没有更多数据
   */
    noMoreData: boolean,
    /**
    *  空列表类型
    */
    emptyType: 'noData' | 'errorData',
    /**
    *  是否正在上拉加载
    */
    loadMoring: boolean
}

export default class DefaultListView extends BaseComponent<Props> {

    static defaultProps = {
        showItemSeparator: true,
        removeClippedSubviews: true,
        numColumns: 1,
        useExternalSource: false,
        paging: true
    }

    refreshingTag = false
    loadMoringTag = false

    state: State = {
        dataSource: (this.props.dataSource || { data: undefined }).data || [],
        refreshing: false,
        pageNum: 0,
        noMoreData: false,
        emptyType: 'noData',
        loadMoring: false
    }

    /**
    *  当前列表控件
    */
    listView: FlatList<any> | null = null

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {

        this.onRefresh()

    }


    componentWillReceiveProps(nextProps: any) {

        if (this.props.useExternalSource) {
            let dataSource = nextProps.dataSource;

            if (dataSource.pageNum == 0) {
                this.refreshingTag = false
                this.setState({
                    dataSource: dataSource.data || [],
                    pageNum: dataSource.pageNum || 0,
                    refreshing: false,
                    noMoreData: dataSource.data ? false : true,
                    emptyType: dataSource.data ? 'noData' : 'errorData',
                    loadMoring: dataSource.data ? false : true,
                });
            } else {
                let isEqual = equal(dataSource.data, this.state.dataSource);

                this.setState({
                    dataSource: dataSource.data || [],
                    pageNum: dataSource.pageNum,
                    noMoreData: isEqual,
                    emptyType: dataSource.data ? 'noData' : 'errorData',
                    loadMoring: isEqual,
                })
            }
        }
    }


    render() {

        return (
            <FlatList ref={lv => this.listView = lv}
                keyboardDismissMode='on-drag'
                style={{ flex: 1, ...this.props.style }}
                numColumns={this.props.numColumns}
                columnWrapperStyle={this.props.columnWrapperStyle}
                renderItem={this.renderItem}
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ItemSeparatorComponent}
                ListEmptyComponent={this.props.listEmptyComponent ? this.props.listEmptyComponent(this.state.emptyType) : <ListEmptyView emptyType={this.state.emptyType} errDataButtons={[{ title: '刷新', action: this.onRefresh, bgColor: defaultStyle.color.mainColor }]} />}
                ListHeaderComponent={this.props.listHeaderComponent && this.props.listHeaderComponent(this.state.dataSource)}
                ListFooterComponent={this.listFooterComponent}
                extraData={this.props.extraData}
                getItemLayout={this.getItemLayoutFunc()}
                onRefresh={this.props.loadData && this.onRefresh}
                refreshing={this.state.refreshing}
                onEndReachedThreshold={0.3}
                onEndReached={this.props.loadData && this.onEndReached}
                removeClippedSubviews={this.props.removeClippedSubviews}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        );
    }

    /**
    *   加载cell
    */
    renderItem = ({ item, index }: { item: any, index: number }) => {
        if (this.props.onPressItem != undefined) {
            return (
                <TouchableOpacity activeOpacity={1} onPress={this.props.onPressItem.bind(this, item, index)}>
                    {this.props.renderItem(item, index)}
                </TouchableOpacity>
            )
        } else {
            return this.props.renderItem(item, index);
        }
    }

    /**
    *  列表底部
    */
    listFooterComponent = () => {
        return (
            <View>
                {this.props.listFooterComponent && this.props.listFooterComponent(this.state.dataSource)}
                {
                    this.state.noMoreData && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ color: '#666', fontSize: 14 }}>没有更多数据了...</Text>
                        </View>
                    )
                }

                {
                    (!this.state.noMoreData && this.state.loadMoring) && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ color: '#666', fontSize: 14 }}>正在加载更多数据...</Text>
                        </View>
                    )
                }
            </View>
        )
    }

    /**
    *  画分割线
    */
    ItemSeparatorComponent = () => {
        return this.props.showItemSeparator ? (<View style={{ height: defaultStyle.px2dp(1), backgroundColor: '#ccc', marginHorizontal: 10 }}></View>) : null
    }

    /**
    *  便捷方法，提高效率
    */
    getItemLayoutFunc = () => {
        if (this.props.cellHeight == undefined) {
            return undefined
        } else {
            return (data: any | null, index: number) => {
                return { length: this.props.cellHeight!, offset: (this.props.cellHeight! + defaultStyle.px2dp(1)) * index, index };
            };
        }
    }

    /**
    *   下拉刷新数据
    */
    onRefresh = () => {
        if (!this.refreshingTag) {
            this.refreshingTag = true;
            this.setState({
                refreshing: true,
            }, () => {
                this.props.loadData && this.props.loadData(0);
            })
        }
    }


    /**
  *  上拉加载数据
  */
    onEndReached = () => {
        if (this.state.loadMoring) { return; }
        if (this.refreshingTag) { return; }
        if (!!!this.props.paging) { return }

        console.log('上拉加载')
        this.setState({
            loadMoring: true
        }, () => {
            this.props.loadData && this.props.loadData(this.state.pageNum + 1)
        })
    }


    /**
    *  设置数据 如实设置数据，没拿到数据就给[] ,网络访问错误就给null , 把请求数据的页码也要传回来。
    */
    setData = (data: any[] | null, pageNum: number) => {

        console.log('列表设置数据', data, pageNum)
        if (pageNum == 0) {
            this.refreshingTag = false
            this.setState({
                dataSource: data ? data : [],
                refreshing: false,
                pageNum: 0,
                noMoreData: data ? false : true,
                emptyType: data ? 'noData' : 'errorData',
                loadMoring: data ? false : true,
            })
        } else {
            this.refreshingTag = false
            this.setState({
                refreshing: false,
                dataSource: data && data.length > 0 ? [...this.state.dataSource, ...data] : this.state.dataSource,
                pageNum: data && data.length > 0 ? pageNum : this.state.pageNum,
                noMoreData: data && data.length == 0 ? true : false,
                emptyType: data ? 'noData' : 'errorData',
                loadMoring: data && data.length == 0 ? true : false
            })
        }
    }


    /**
     *  清空列表
     */
    cleanListView = () => {
        this.refreshingTag = false
        this.setState({
            dataSource: [],
            refreshing: false,
            pageNum: 0,
            noMoreData: false,
            emptyType: 'noData',
            loadMoring: false,
        })
    }

    /**
     *  删除某条数据
     */
    deleteItem = (item: any) => {
        const dataSource = this.state.dataSource.filter(data => !deepEqual(data, item))
        this.setState({ dataSource })
    }

    /**
     *  替换某条数据
     */
    replaceItem = (oldItem: any, newItem: any) => {
        const dataSource = [...this.state.dataSource].map(data => {
            if (deepEqual(data, oldItem)) {
                return newItem
            } else {
                return data
            }
        })
        this.setState({ dataSource })
    }

    /**
    *  更新某一条cell的数据
    */
    reloadData = (data: any, index: number) => {
        let dataSource = [...this.state.dataSource]
        dataSource.splice(index, 1, data);
        this.setState({ dataSource })
    }

    /**
    *  滚动对应位置
    */
    scrollToIndex = (index: number) => {
        this.listView && this.listView.scrollToIndex({ animated: true, index })
    }

    /**
    *  滚动到底部
    */
    scrollToEnd = () => {
        this.listView && this.listView.scrollToEnd()
    }
}



