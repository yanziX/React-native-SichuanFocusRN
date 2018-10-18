import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import RefreshListView from './../Views/Refresh/RefreshListView'
import SubmissionCell from './SubmissionCell';
import RefreshState from './../Views/Refresh/RefreshState';
import api from '../Configs/api';
import NavigationItem from './../Views/NavigationBar'
import Images from "../../Image/images";

{
  var pageIndex = 0
  var pageAll = 0
}

export default class Submission extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
          newsList: [],
          requestUrl: api.submission,
          isHeaderRefresh: false,
          isLoadMore: false,
          isRefresh: false,
        }
      }
    
      

     componentDidMount() {
        this.loadNewsList(api.submission)
    }

   

    render() {
        return (
          <View style={{flex: 1}}>
            <NavigationItem icon={Images.Navigator_Img} />
            <FlatList
            ref={(ref) => {this.listView = ref}}
            data={this.state.newsList}
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isHeaderRefresh}
            ListEmptyComponent={this._renderEmptyView}
            onEndReached={() => this.onLoadMore()}
            onEndReachedThreshold={0.1}
           ></FlatList>
          </View>
          
        )
    }

    renderItem({item}){
        return (
          //点击事件
          //onPress={() => {}}
          <SubmissionCell newsItem={item}></SubmissionCell>
        )
      }
    
    
      ///渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
      _renderEmptyView = (item) => {
        return <View/>
      }
  
      onRefresh = () => {
        if(!this.state.isHeaderRefresh) {
          pageIndex = 0;
          this.loadNewsList(api.submission);
        }
      }

      onLoadMore = () => {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
          pageIndex = pageIndex + 1;
          let moreUrl = api.submission.replace('.json','_'+pageIndex+'.json');
          this.loadNewsList(moreUrl);
        }
      }

      loadNewsList(url) {
        //不加这个也能请求成功
        var opts = {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
        
        fetch(url, opts)
          .then((response) => response.json())
          .then((json) => {
            pageAll = json.data.pageAll;

            if(pageIndex == 0) {
              this.setState({
                newsList: json.data.newsList
              })
            }else {
              this.setState({
                newsList: this.state.newsList.concat(json.data.newsList)
              })
            }
          })
          .catch((error) => {
            console.log("加载失败");
          }).done();
      }
}