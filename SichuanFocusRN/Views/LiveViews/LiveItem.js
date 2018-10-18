import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native'
import api from './../../Pages/Configs/api';
import screen from './../../Pages/Configs/screen'

export default class LiveItem extends Component {
    render() {

        let {videoItem} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.imageContent}>
                    <Image style={{flex: 1}} source={{uri: api.StaticBaseUrl + videoItem.liveImage}}></Image>
                </View>
                <Text style={styles.text} numberOfLines={2}>{videoItem.liveTitle}</Text>
                <View style={styles.timeAndOriginView}>
                    <Text style={{color: '#868686', fontSize: 13}}>{videoItem.liveTime}</Text>
                    <Text style={{color: '#868686', fontSize: 13}}>{videoItem.liveSource}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        // width: screen.width / 2 - 10,
        flexDirection: 'column',
    },

    imageContent: {
        height: 135,
    },

    text: {
        height: 45,
        paddingTop: 10,
        paddingLeft: 7,
        paddingRight: 7,
        color: 'black',
        fontSize: 14,
    },

    timeAndOriginView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 7,
        paddingRight: 7,
    },



})