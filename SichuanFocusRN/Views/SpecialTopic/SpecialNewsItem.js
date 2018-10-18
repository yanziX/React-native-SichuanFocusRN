import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native'
import screen, { scale } from './../../Pages/Configs/screen'
import api from './../../Pages/Configs/api';

export default class SpecialNewsItem extends Component {

    render() {

        let {newsItem} = this.props 

        return (
            <View style={styles.container}>
                <Image style={{height: scale(200)}} source={{uri: api.StaticBaseUrl + newsItem.newsImage}}></Image>
                <Text style={{color: 'black', fontSize: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}>{newsItem.newsTitle}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(365),
        height: scale(320),
        flexDirection: 'column',
        paddingLeft: scale(5),
        paddingRight: scale(5)
    },

    

    
})