import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import api from '../Configs/api';
import SpecialNewsItem from './../../Views/SpecialTopic/SpecialNewsItem'
import { scale } from '../Configs/screen';
import { Actions } from 'react-native-router-flux';

{
    var pageIndex = 0
    var pageAll = 0
}

export default class SpecialTopic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            specialListArr: [], //新闻数组
            isHeaderRefresh: false,  //下拉刷新
            isLoadMore: false,    //加载更多
        }
    }
   
    componentDidMount() {
        this.fetchSpecialNewsData(api.specialTopic, 0)
    }

    render() {
        return (
            <FlatList
                data={this.state.specialListArr}
                renderItem={this.renderItem}

                contentContainerStyle={styles.container}
                numColumns={2}

                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isHeaderRefresh}

                onEndReached={() => this.onLoadMore()}
                onEndReachedThreshold={0.1}
             ></FlatList>
        )
    }

    renderItem({item}) {
        return(
            <TouchableOpacity onPress={() => Actions.TopicsNewsList({'item':item})}>
                <SpecialNewsItem newsItem={item}></SpecialNewsItem>
            </TouchableOpacity>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefresh) {
            pageIndex = 0
            this.fetchSpecialNewsData(api.specialTopic, pageIndex)
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
            pageIndex = pageIndex + 1;
            let url = api.specialTopic.replace('.json', '_'+pageIndex+'.json')
            this.fetchSpecialNewsData(url, pageIndex)
        }
    }

    fetchSpecialNewsData(url, index) {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if(index == 0) {
                this.setState({
                    specialListArr: json.data.specialList,
                })
                
            }else {
                this.setState({
                    specialListArr: this.state.specialListArr.concat(json.data.specialList),
                })
            }
            pageAll = json.data.pageAll
        })
        .catch((error) => {
            alert(error)
        })
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: scale(10),
        marginRight: scale(10)

    },

    
})