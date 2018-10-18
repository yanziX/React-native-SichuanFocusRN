import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Banner from "./../../Views/SelectionViews/Banner";
import api from './../Configs/api'
import ScrollViewBanner from './../../Views/SelectionViews/ScrollViewBanner';
import HotVideoView from './../../Views/SelectionViews/HotVideoView';
import CurrentNewsView from './../../Views/SelectionViews/CurrentNewsView';
import screen from './../Configs/screen'
import {Actions} from 'react-native-router-flux'

export default class Selection extends Component{

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            bannerUrl: '', //轮播图
            scrollUrl: '', //滚动资讯栏
            hotvideourl: '', //热门视频
            dateNewsArray: [], //时讯新闻数组,
            currentEventUrl: '', //时讯新闻
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1, width: screen.width}}>
                <ScrollView>
                    <Banner item={this.state.bannerUrl} defaultText='待验证' onTabBabbarClick={(item) => this.onTabBabbarClick(item)}/>
                    <ScrollViewBanner infoUrl={this.state.scrollUrl} onTabBabbarClick={(item) => this.onTabBabbarClick(item)} />
                    <HotVideoView hotVideoUrl={this.state.hotvideourl} onTabBabbarClick={(item)=> this.onTabBabbarClick(item)} ></HotVideoView>
                    <CurrentNewsView currentNewsUrl={this.state.currentEventUrl} onTabBabbarClick={(item) => this.onTabBabbarClick(item)}></CurrentNewsView>
                </ScrollView>
                
            </View>

        )
    }

    fetchData () {
        fetch(api.selection)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let status = json.rs;
                this.setState({
                    channels : json.data.channel
                });
                this.analyzeChannelsData()
            })
            .catch((error) => {
                alert(error);
            });
    }

    //解析首页数据
    analyzeChannelsData() {

        let bannerUrl = '';
        let scrollurl = '';
        let liveurl = '';
        let hotvideourl = '';
        let newsurl = '';

        for(let idx in this.state.channels) {
            let channel = this.state.channels[idx];
            switch (channel.subChannelType){
                case "1": {
                    bannerUrl = api.StaticBaseUrl + channel.channelUrl;
                    break;
                }
                case "2": {
                    scrollurl = api.StaticBaseUrl + channel.channelUrl;
                    break;
                }
                case "3": {}
                case "4": {
                    hotvideourl = api.StaticBaseUrl + channel.channelUrl;
                    break;
                }
                case "5": {
                    newsurl = api.StaticBaseUrl + channel.channelUrl;
                    break;
                }
            }
        }
        this.setState({
            bannerUrl: bannerUrl,
            scrollUrl: scrollurl,
            hotvideourl: hotvideourl,
            currentEventUrl: newsurl
        })
    }

    getCurrentNewsDateArray(url) {
        fetch(api.StaticBaseUrl + url)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                dateNewsArray: json.data.newsArray
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    getBannerData() {
        var item;
        var itemsArr = [];
        for (let i = 0; i < 3; i++) {
            switch (i){
                case 0:{
                    item = 'http://blogdailyherald.com/wp-content/uploads/2013/04/382065_560557460633306_930109857_n.jpg'
                    break;
                }
                case 1:{
                    item = 'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'
                    break;
                }
                case 2: {
                    item = 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3812b31bb051f819dc048662dbb44aed2e73e7f1.jpg';
                    break;
                }

            }
            itemsArr.push(item);
        }
        return itemsArr;
    }

    /**
     * 点击轮播图进行跳转
     * @param {*} item 
     */
    onTabBabbarClick(item) {
        switch (item.newsType) {
            case "1": {
                break;
            }
            case "3": {
                Actions.NewsDetail({'item': item});
                break;
            }
            case "4": {
                Actions.TopicsNewsList({'item': item});
                break;
            }
        }
        
    }

}