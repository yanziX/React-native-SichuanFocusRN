import React, {Component} from 'react';
import {View,
        FlatList,
        TouchableOpacity
} from 'react-native'
import Proptypes from 'prop-types'
import api from '../Configs/api';
import { Actions } from 'react-native-router-flux';
import SpecialListItem from './../../Views/SpecialTopic/SpecialListItem'
import NavigationItem from './../Views/NavigationBar'
import Images from './../../Image/images'

{
    var pageIndex = 0
    var pageAll = 0
}

export default class MoreHotVideoList extends Component {

    static navigationOptions = {
        header: null
    }

    static proptypes = {
        moreListUrl: Proptypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            newsListArray: [],      //新闻数据
            isHeaderrefresh: false, //下拉刷新
            isLoadMore: false,     //加载更多
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.fetchNewsListData(api.StaticBaseUrl + this.props.moreListUrl);
    }

    render() {
        return (
            <View>
                <NavigationItem
                      leftIcon={Images.Return_btn}
                      icon={Images.Navigator_Img}
                      leftOnPress={() => Actions.pop()}
                     ></NavigationItem>
                <FlatList
                data={this.state.newsListArray}
                renderItem={this.renderItem}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isHeaderrefresh}
                onEndReached={() => this.onLoadMore()}
                onEndReachedThreshold={0.1}
            ></FlatList>
            </View>
            
        )
        
    }

    renderItem({item}) {
        return (
            <TouchableOpacity onPress={() => {Actions.NewsDetail({'item':item})}}>
                <SpecialListItem newsItem={item} onPress={() => Actions.NewsDetail({'item': item})}></SpecialListItem>
            </TouchableOpacity>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderrefresh) {
            pageIndex = 0;
            this.fetchNewsListData(api.StaticBaseUrl + this.props.moreListUrl)
        }
    }

    onLoadMore = () => {
        if(!this.state.isLoadMore && this.state.newsListArray.length > 0 && pageIndex <= pageAll) {
            pageIndex = pageIndex + 1;
            let url = api.StaticBaseUrl + this.props.moreListUrl.replace('.json', '_'+pageIndex+'.json');
            this.fetchNewsListData(url)
        }
    }

    fetchNewsListData(url) {
       if(url) {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if(pageIndex == 0) {
                this.setState({
                    newsListArray: json.data.newsList,
                });
            }else {
                this.setState({
                    newsListArray: this.state.newsListArray.concat(json.data.newsList)
                })
            } 
            pageAll = json.data.pageAll;
        })
        .catch((error) => {
            alert(error);
        })
       }
        
    }
}