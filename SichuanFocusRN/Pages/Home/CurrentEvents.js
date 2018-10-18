import React, {Component} from 'react'
import {StyleSheet, Text, FlatList, View, TouchableOpacity} from 'react-native'
import api from '../Configs/api';
import CurrentNewsItem from './../../Views/SelectionViews/CurrentNewsItem';
import Proptypes from 'prop-types'
import screen from './../Configs/screen'
import { Actions } from 'react-native-router-flux';

{
    var dateIndex = 0
}

export default class CurrentEvents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateNewsArray: [], //所有天数的数组
            newsListArray: [], //新闻数组
            loaded: false,     //是否加载完毕,
            isHeaderrefresh: false, //下拉刷新
            isLoadMore: false,  //加载更多
        }
    }

    componentDidMount() {
        this.fetchDateArrayData();
    }

    render() {
            return (
                <FlatList
                    data={this.state.newsListArray}
                    renderItem={this.renderItem}
                    //空布局
                    ListEmptyComponent={this.createEmptyView}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isHeaderrefresh}

                    onEndReached={() => this.onLoadMore()}
                    onEndReachedThreshold={0.1}

                    contentContainerStyle = {styles.container}
                ></FlatList>
            )
    }

    renderItem({item}) {
        return(
            <TouchableOpacity onPress={() => {Actions.NewsDetail({'item': item})}}>
                <CurrentNewsItem newsItem={item}/>
            </TouchableOpacity>
            
        )
    }

    createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无列表数据，下拉刷新
                </Text>
            </View>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderrefresh) {
            dateIndex = 0
            this.fetchDateNewsData(dateIndex)
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && this.state.newsListArray.length > 0){
            dateIndex = dateIndex + 1;
            this.fetchDateNewsData(dateIndex)
        }
    }

    fetchDateArrayData() {
        fetch(api.currentNews)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                dateNewsArray: json.data.newsArray
            })
            this.fetchDateNewsData(0)
        })
        .catch((error) => {
            alert(error)
        })
    }

    fetchDateNewsData(index) {
        let dateObj = this.state.dateNewsArray[index];
        let newsListUrl = dateObj.newsListUrl;
        fetch(api.StaticBaseUrl + newsListUrl)
        .then((response) => response.json())
        .then((json) => {
            if(index == 0) {
                this.setState({
                    newsListArray: json.data.newsList,
                })
                
            }else {
                this.setState({
                    newsListArray: this.state.newsListArray.concat(json.data.newsList),
                    isLoadMore: false
                })
            }
        })
        .catch((error) => {
            alert(error)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        // flex: 1  //这个布局会导致不能滑动
    }
})