import React, {Component} from 'react';
import {StyleSheet, Text, SectionList, View, RefreshControl, TouchableOpacity} from 'react-native';
import api from '../Configs/api';
import LiveItem from './../../Views/LiveViews/LiveItem';
import screen from './../Configs/screen'
import {Actions} from 'react-native-router-flux'

{
    var pageIndex = 0
    var pageAll = 0  //直播回顾的总页数
}

export default class Live extends Component {

    constructor(props) {
        super(props)
        this.state = {
            channelArr: [],
            liveSectionArr: [],
            isHeaderRefresh: false,  //下拉刷新
            isLoadMore: false,  //加载更多     
        }
    }

    componentDidMount() {
        this.fetchLiveData();
    }

    render() {
        return (
            <SectionList
                // refreshControl={
                //     <RefreshControl 
                //         refreshing={this.state.isHeaderRefresh}
                //         onRefresh={this.onRefresh.bind(this)}
                //         colors={['red','#ffd500','#0080ff','#99e600']}
                //         tintColor={theme.themeColor}
                //         title="Loading..."
                //         titleColor={theme.themeColor}
                //     ></RefreshControl>
                // }
                renderSectionHeader={this.renderSectionHeader}
                renderItem={this.renderItem}
                sections={this.state.liveSectionArr}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isHeaderRefresh}
                // contentContainerStyle={styles.container}
                // numColumns={2}
                onEndReached={() => this.onLoadMore()}
                onEndReachedThreshold={0.1}
                contentContainerStyle={styles.sectionList}
            ></SectionList>
        )
    }

    renderItem = (info) => {
        return (
            <TouchableOpacity onPress={() => {Actions.NewsDetail({'item':info.item})}}>
                <LiveItem videoItem={info.item}></LiveItem>
            </TouchableOpacity>    
        )
    }

    _jump(info) {
        Actions.NewsDetail({'item': info})
        // alert('跳转')
        // () => this.props.navigation.navigate('NewsDetail')
    }

    renderSectionHeader = (info) => {
        return (
            <View style={{height: 40,justifyContent: 'center', flexDirection: 'column'}}>
                <View style={{height: 1, backgroundColor: '#eaeaea'}}></View>
                <View style={{height: 39, justifyContent: 'center'}}>
                <Text style={{paddingLeft: 10, color: 'red', fontSize: 16}}>{info.section.key}</Text>
                </View>
            </View>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefresh) {
            pageIndex = 0
            this.fetchLiveData()
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
            let obj = this.state.channelArr[2]
            pageIndex ++;
            let moreUrl = obj.channelUrl.replace('.json', '_'+pageIndex+'.json')
            this.contactLiveReviewData(obj.channelName, moreUrl);
        }
    }

    fetchLiveData() {
        fetch(api.live)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                channelArr: json.data.channel
            })
            this.fetchDetailLiveData()
        })
        .catch((error) => {
            alert(error)
        })
    }

    fetchDetailLiveData() {
        for(let idx = 0; idx < this.state.channelArr.length; idx ++) {
            let obj = this.state.channelArr[idx]
            switch (obj.channelId){
                case "2": {
                    this.fetchSectionDataArrWithKey(obj.channelName, obj.channelUrl);
                    break;
                }
                case "3": {
                    this.fetchSectionDataArrWithKey(obj.channelName, obj.channelUrl);
                    break;
                }
            }
        }
    }

    fetchSectionDataArrWithKey(key, channelUrl) {
        fetch(api.StaticBaseUrl + channelUrl)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                liveSectionArr: this.state.liveSectionArr.concat({key: key,
                    data: json.data.liveList,
                })
            })
            if(key == "直播回顾") {
                pageAll = json.data.pageAll
            }
        })
        .catch((error) => {
            alert(error)
        })
    }

    contactLiveReviewData(key, channelUrl) {
        fetch(api.StaticBaseUrl + channelUrl)
        .then((response) => response.json())
        .then((json) => {
           let reviewData = this.state.liveSectionArr[1].data.concat(json.data.liveList)
            this.state.liveSectionArr.pop()
            this.setState({
                liveSectionArr: this.state.liveSectionArr.concat({key: key, data: reviewData})
            })
            // alert(this.state.liveSectionArr)
        })
        .catch((error) => {
            alert(error)
        })

    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    sectionList: {
        width: screen.width,
    }
    
})