import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import api from '../Configs/api';
import NavigationItem from './../Views/NavigationBar'
import Images from '../../Image/images';
import { Actions } from 'react-native-router-flux';
import AnchorRecommendHeader from '../../Views/AnchorViews/AnchorRecommendHeader';
import SpecialListItem from './../../Views/SpecialTopic/SpecialListItem'

{
    var pageIndex = 0
    var pageAll = 0
}
export default class AnchorRecommendDetail extends Component {
   
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            contentList: [],  //数据列表
            isHeaderRefresh: false,  //下拉刷新
            isLoadMore: false,    //加载更多
        }
    } 
   
    componentDidMount() {
        let {item} = this.props;
        this.fetchRecommendListData(item.contentUrl)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationItem 
                    leftIcon={Images.Return_btn}
                    icon={Images.Navigator_Img}
                    leftOnPress={this.popFunction.bind(this)}
                />
                <FlatList 
                    style={{flex: 1}}
                    data={this.state.contentList}
                    renderItem={this.renderItem}

                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isHeaderRefresh}

                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onLoadMore()}

                    ListHeaderComponent={() => this.headerComponent()}
                />
            </View>
        )
    }

    popFunction() {
        Actions.pop()
    }

    headerComponent() {
        let {item} = this.props;
        return (
            <AnchorRecommendHeader item={item}></AnchorRecommendHeader>
        )
    }

    renderItem({item}){
        return (
            <TouchableOpacity onPress={() => Actions.NewsDetail({'item':item})}>
                <SpecialListItem newsItem={item}></SpecialListItem>
            </TouchableOpacity>
        )   
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefresh) {
            pageIndex = 0;
            let {item} = this.props;
            this.fetchRecommendListData(item.contentUrl);
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
            pageIndex = pageIndex + 1;
            let {item} = this.props;
            let moreUrl = item.contentUrl.replace('.json', '_'+pageIndex+'.json')
            this.fetchRecommendListData(moreUrl)
        }
    }

    fetchRecommendListData(url) {
        fetch(api.StaticBaseUrl + url)
        .then((response) => response.json())
        .then((json) => {
            if(pageIndex == 0) {
                this.setState({
                    contentList: json.data.list,
                })
            }else {
                this.setState({
                    contentList: this.state.contentList.concat(json.data.list)
                })
            }
            pageAll = json.data.pageAll;
        })
    } 
}