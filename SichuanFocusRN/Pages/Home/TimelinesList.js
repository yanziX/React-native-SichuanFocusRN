import React, {Component} from 'react'
import {FlatList, TouchableOpacity, View} from 'react-native'
import api from '../Configs/api';
import NavigationItem from './../Views/NavigationBar'
import Images from '../../Image/images';
import { Actions } from 'react-native-router-flux';
import TimeLineView from '../../Views/AnchorViews/TimeLineView';
import screen from './../Configs/screen'

{
    var pageIndex = 0
    var pageAll = 0
}
export default class TimelinesList extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state={
            timelineList: [],
            isHeaderRefreshing: false,
            isLoadMore: false,
        }
    }
    
    componentDidMount() {
        this.fetchTimelinesData()
    }

    render() {
        return (
            <View>
                <NavigationItem 
                    leftIcon={Images.Return_btn}
                    icon={Images.Navigator_Img}
                    leftOnPress={() => Actions.pop()}
                />
                <FlatList
                    style={{width: screen.width, height: screen.height-50}}

                    data={this.state.timelineList}
                    renderItem={this.renderItem}

                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isHeaderRefreshing}

                    onEndReached={() => this.onLoadMore()}
                    onEndReachedThreshold={0.1}
                ></FlatList>
            </View>
            
        )
    }

    renderItem({item}) {
        return (
            <TouchableOpacity>
                <TimeLineView newsItem={item}></TimeLineView>
            </TouchableOpacity>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefreshing) {
            pageIndex = 0;
            this.fetchTimelinesData()
        }
    }

    onLoadMore = () => {
        if(!this.state.isLoadMore) {
            pageIndex = pageIndex + 1;
            this.fetchTimelinesData()
        }
    }

    fetchTimelinesData() {
        let fromData = new FormData();
        fromData.append("capacity","10");
        fromData.append("index", pageIndex);
        fromData.append("requestType","0");
        fromData.append("siteNumber","1");
        fromData.append("userId", "211");
        fromData.append("anchorId","")
        
        fetch(api.DynamicBaseUrl+api.getTimelineList, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: fromData
        })
        .then((response) => response.json())
        .then((json) => {
            if(pageIndex == 0) {
                this.setState({
                    timelineList: json.data.timelineList
                })
            }else {
                this.setState({
                    timelineList: this.state.timelineList.concat(json.data.timelineList)
                })
            }
        })
    }
}