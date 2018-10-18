import React, {Component} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types'
import api from './../../Pages/Configs/api';
import screen from './../../Pages/Configs/screen'

export default class ScrollViewBanner extends Component {
   
    static propTypes = {
        infoUrl: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            bannerData: [],
            content: Object,
            tips: ''
        }
    }
   
    render() {
        let H = 40;
        if (this.state.loaded) {
            let items = this.state.bannerData
            let tip = this.state.content.newsFlashType == "1" ? '快讯' : '重磅'
            return (
                <View style={styles.container}>
                    <Text style={styles.image}>快讯</Text>
                    <Swiper autoplay={true} height={H} horizontal={false} showsPagination={false}>
                     {
                        items.map((item, index) => {
                            return (
                                <Text style={styles.text} key={index} onPress={()=>this.props.onTabBabbarClick(item)}>{item.newsTitle}</Text>
                            )
                        })
                        }
                    </Swiper>
            </View>
            )
            
        }else {
            this.requestScrollContentData()
            return (
                <Text>还未加载数据</Text>
            )
        }
    }

    requestScrollContentData() {
        if (this.props.infoUrl) {
            fetch(this.props.infoUrl)
            .then((response) => response.json())
            .then((json) => {
                let array = json.data.channel
                this.setState({
                    content: array[0],
                })
                this.requestBannerData()
            })
            .catch((error) => {
                alert(error)
            });
            
        }
    }

    requestBannerData() {
        if(this.state.content) {
            fetch(api.StaticBaseUrl + this.state.content.channelUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loaded: true,
                    bannerData: json.data.newsList,
                })
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        height: 40,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 50,
        height: 40,
        fontSize: 17,
        fontWeight: "600",
        color: 'red',
        paddingTop: 12,
        paddingLeft: 10
    },

    textContent: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    text: {
        color: 'black',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 12
    }
})