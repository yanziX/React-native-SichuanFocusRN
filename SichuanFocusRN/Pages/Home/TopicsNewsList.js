import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import NavigationItem from './../Views/NavigationBar'
import Images from '../../Image/images';
import { Actions } from 'react-native-router-flux';
import screen, { scale } from './../Configs/screen'
import api from '../Configs/api';
import SpecialListItem from './../../Views/SpecialTopic/SpecialListItem'

export default class TopicsNewsList extends Component {

    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            contentData: Object,
            newsList: [],
        }
    }

    componentDidMount() {
        let {item} = this.props;
        this.fetchTopicNewsList(api.StaticBaseUrl + item.newsUrl);
    }

    render() {
        if(this.state.newsList) {
            return (
                <View style={{flex: 1}}>
                    <NavigationItem
                        leftIcon={Images.Return_btn}
                        icon={Images.Navigator_Img}
                        leftOnPress={this.functionAlert.bind(this)}
                    ></NavigationItem>
                    <FlatList
                        style={styles.container}
                        data={this.state.newsList}
                        renderItem={this.renderItem}
                        ListHeaderComponent={() => this.headerComponent()}
                    ></FlatList>
                </View>
               
            )   
        }
        
    }

    headerComponent() {
        return (
            <View style={styles.headerView}>
                <Image source={{uri: api.StaticBaseUrl+this.state.contentData.topImage}}
                        style={{height: scale(424)}}
                ></Image>
                <Text style={styles.title}>{this.state.contentData.topTitle}</Text>
                <View style={{height: 1, backgroundColor:'#ebebeb'}}></View>
            </View>
        )
    }

    renderItem({item}) {
        return (
            <TouchableOpacity onPress={() => Actions.NewsDetail({'item':item})}>
                <SpecialListItem newsItem={item}></SpecialListItem>
            </TouchableOpacity>
        )
    }

    jump(item) {
        alert('跳转')
        
    }

    fetchTopicNewsList(url) {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                contentData: json.data,
                newsList: json.data.specialDetailList,
            })
        })
        .catch((error) => {
            alert(error);
        })

    }

    functionAlert() {
        Actions.pop();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView: {
        height: scale(500),
        flexDirection: 'column',
    },

    title: {
        lineHeight: scale(74),
         paddingLeft:scale(30), 
         paddingRight:scale(30),
         fontSize: 17,
         fontWeight: "600",
    }
})