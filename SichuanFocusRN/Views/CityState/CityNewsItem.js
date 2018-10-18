import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import { scale } from '../../Pages/Configs/screen';
import api from '../../Pages/Configs/api';
import screen from './../../Pages/Configs/screen'

export default class CityNewsItem extends Component {
    render() {
        let {newsItem} = this.props;
        return (
            <View style={styles.container}>
                <Image style={{height: scale(140)}}
                    source={{uri: api.StaticBaseUrl+newsItem.newsImage}}
                ></Image>
                <Text style={styles.contentText} numberOfLines={2}>{newsItem.newsTitle}</Text>
                <View style={{flexDirection: 'row', paddingLeft: scale(10), paddingRight: scale(10), paddingTop: scale(20), justifyContent:'space-between'}}>
                    <Text style={{color: 'red', fontSize: 11}}>{newsItem.lable}</Text>
                    <Text style={{color: '#b1b1b1', fontSize: 11}}>{newsItem.pubTime.substring(5,10)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: (screen.width - scale(180) - scale(20) - scale(30)) / 2,
        height: scale(284),
        flexDirection: 'column',
        margin: scale(10),
        borderWidth: 1,
        borderColor: '#dadada'
    },

    contentText: {
        color: 'black',
        fontSize: 12, 
        paddingLeft: scale(10), 
        paddingRight: scale(10), 
        paddingTop: 5
    },

    timeContent: {
        flexDirection: 'row',
    }

})