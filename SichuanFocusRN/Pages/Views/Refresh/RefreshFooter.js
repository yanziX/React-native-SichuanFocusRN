import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import RefreshState from './RefreshState'
import ProTypes from 'prop-types'

export default class RefreshFooter extends Component {
    static proTypes = {
        onLoadMore: ProTypes.func, //家族更多数据的方法
        onRetryLoading: ProTypes.func, //重新加载的方法
    }

    static defaultProps = {
        footerRefreshingText: '努力加载中',
        footerLoadMoreText: '上拉加载更多',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已经全部加载完毕'
    }

    render() {
        let {state} = this.props;
        let footer = null;
        switch (state) {
            case RefreshState.Idle:
            //Idle情况下为null，不显示尾部组件
                break;
            case RefreshState.Refreshing:
                footer = 
                <View style={styles.loadingView}>
                    <ActivityIndicator size='small'></ActivityIndicator>
                    <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
                </View>
                break;
            case RefreshState.CanLoadMore: 
                footer =
                <View style={styles.loadingView}>
                    <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
                </View>
                break;
            case RefreshState.NoMoreData: 
                footer = 
                <View style={styles.loadingView}>
                    <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
                </View>
                break;
            case RefreshState.Failure:
                footer = 
                <TouchableOpacity style={styles.loadingView} onPress={()=>{
                    this.props.onRetryLoading && this.props.onRetryLoading()
                }}>
                    <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
                </TouchableOpacity>
                break;
        }
        return footer
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },

    refreshingText: {
        fontSize: 12,
        color: '#666666',
        paddingLeft: 10,
    },

    footerText: {
        fontSize: 12,
        color: '#666666'
    }

})