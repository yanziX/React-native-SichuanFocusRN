import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ImageBackground, TouchableOpacity, Text, Image, Platform} from 'react-native'
import api from '../Configs/api';
import NavigationItem from './../Views/NavigationBar'
import Images from '../../Image/images';
import { Actions } from 'react-native-router-flux';
import { scale } from '../Configs/screen';
import SpecialListItem from './../../Views/SpecialTopic/SpecialListItem'

{
    var pageIndex = 0;
    var pageAll = 0
}

export default class CityStateDetail extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            institutionItem: Object,
            dynamicList: [], //新闻数组
            isHeaderRefresh: false,  //下拉刷新
            isLoadMore: false,  //加载更多
        }
    }

    componentDidMount() {
        let {item} = this.props;
        this.state.institutionItem = item;
        this.fetchInstitutionData(item.institutionItem.institutionUrl);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationItem 
                    leftIcon={Images.Return_btn}
                    icon={Images.Navigator_Img}
                    leftOnPress={this.functionAlert.bind(this)}
                />
                <FlatList 
                    style={{flex: 1}}
                    data={this.state.dynamicList}
                    renderItem={this.renderItem}

                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isHeaderRefresh}

                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onLoadMore()}

                    ListHeaderComponent={() => this.heaederComponent()}
                />
            </View>
        )
    }

    functionAlert() {
        Actions.pop();
    }

    heaederComponent() {
        let {item} = this.props;
        return (
            <View style={styles.header}>
            <ImageBackground source={Images.Personal_Setup_bg} style={styles.headerBac}>
                <Image style={styles.headerImage} source={{uri: api.StaticBaseUrl+item.institutionItem.institutionImage}}></Image>
                <Text style={{fontSize: 14, color: 'black', marginTop: scale(20)}}>{item.institutionItem.institutionName}</Text>
                <Text style={styles.subscribe}>+订阅</Text>
            </ImageBackground>
        </View>
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
            let {item} = this.props
            this.fetchInstitutionData(item.institutionItem.institutionUrl)
        }
    }

    onLoadMore() {
        if(!this.state.isLoadMore && pageIndex < pageAll) {
            pageIndex = pageIndex + 1;
            let {item} = this.props
            let moreUrl = item.institutionItem.institutionUrl.replace('.json', '_'+pageIndex+'.json')
            this.fetchInstitutionData(moreUrl);
        }
    }

    fetchInstitutionData(url) {
        fetch(api.StaticBaseUrl+url)
        .then((response) => response.json())
        .then((json) => {
            if(pageIndex == 0) {
                this.setState({
                    dynamicList: json.data.dynamicList
                })
            }else {
                this.setState({
                    dynamicList: this.state.dynamicList.concat(json.data.dynamicList)
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
    header: {
        height: scale(304),
        flexDirection: 'column',
    },

    headerBac: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

    headerImage: {
        width: scale(74),
        height: scale(74),
        borderRadius: scale(37),
        marginTop: scale(50),
    },

    subscribe: {
        color: 'red', 
        fontSize:14,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        // marginLeft: scale(40),
        marginTop: scale(20),
        width: scale(160),
        height: scale(50),
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios: {
                lineHeight: scale(50),
            },
            android: {

            }
        })
    }

})