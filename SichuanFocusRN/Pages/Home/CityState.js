import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView, FlatList, Text} from 'react-native'
import { scale } from '../Configs/screen';
import screen from './../Configs/screen'
import CityItem from '../../Views/CityState/CityItem';
import api from '../Configs/api';
import CityNewsItem from '../../Views/CityState/CityNewsItem';
import { Actions } from 'react-native-router-flux';

{
    var pageIndex=0
    var pageAll=0
}
export default class CityState extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentData: Object,  //所有的市州
            institutionList: [], //单独抓取的市州新闻
            isHeaderRefresh: false,
            isLoadMore: false,
        }
    }

    componentDidMount() {
        //获取市州数据
        this.fetchCityDataList()
    }

    renderCitys() {
        if(this.state.contentData.institutionList) {
            let cells = []
            let cityLists = this.state.contentData.institutionList.sort(this.compare)
            for (let i=0; i< cityLists.length; i++) {
                let subList = cityLists[i]
                let item = <CityItem institutionItem={subList} number={i}/>
                cells.push(item)
            }
            return (
                cells
            )
        } 
    }

    render() {
        return (
            <View style={styles.container}>
                 <ScrollView style={styles.scrollView}>
                    {this.renderCitys()}
                 </ScrollView>
                <FlatList
                    contentContainerStyle={styles.flatlistView}
                    data={this.state.institutionList}
                    numColumns={2}
                    renderItem={this.renderItem}

                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isHeaderRefresh}

                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onLoadMore()}
            ></FlatList>
            </View>
            
        )
    }

    renderItem({item}) {
        return (
            <TouchableOpacity onPress={() => {Actions.NewsDetail({'item':item})}}>
                <CityNewsItem newsItem={item}></CityNewsItem>
            </TouchableOpacity>
        )
    }

    fetchCityDataList() {
        fetch(api.cityState)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                contentData: json.data
            })
            this.fetchDetailCityNews(json.data)
        })
        .catch((error)=> {
            alert(error)
        })
    }

    fetchDetailCityNews(contentData) {
        let url;
        if(pageIndex == 0) {
            url = contentData.institutionDynamicList
        }else {
            url = contentData.institutionDynamicList.replace('.json','_'+pageIndex+'.json')
        }
        fetch(api.StaticBaseUrl+url)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                institutionList: this.state.institutionList.concat(json.data.dynamicList),
                // contentData: contentData
            })
            pageAll = json.data.pageAll
        })
        .catch((error) => {
            alert(error)
        })
    }

    //数组降序排序
    compare = function (obj1, obj2)  {
        var val1 = obj1.hot;
        var val2 = obj2.hot;
        if(parseInt(val1) < parseInt(val2)) {
            return 1;
        } else if(parseInt(val1) > parseInt(val2)) {
            return -1;
        } else {
            return 0;
        }
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefresh) {
            pageIndex = 0
            this.fetchCityDataList()
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
            pageIndex = pageIndex + 1;
            this.fetchDetailCityNews(this.state.contentData)
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screen.width,
    },

    scrollView: {
        width: scale(180),
    },

    flatlistView: {
        width: screen.width - scale(180),
        marginLeft: scale(10),
        marginRight: scale(10),
    }
})