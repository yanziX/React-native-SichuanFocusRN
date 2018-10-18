//主播推荐
import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import screen, { scale } from './../../Pages/Configs/screen'
import api from '../../Pages/Configs/api';
import { Actions } from 'react-native-router-flux';

export default class AnchorRecommend extends Component {
    render() {
        let {newsArray} = this.props;
        let infosArr = newsArray[0].value
        let array = [];
        for(let i=0; i<infosArr.length; i++) {
            let info = infosArr[i]
            let view = (
                <TouchableOpacity style={styles.itemContainer} onPress={() => Actions.AnchorRecommendDetail({'item':info})}>
                    <Image style={styles.image} source={{uri: api.StaticBaseUrl+info.programImage}}></Image>
                    <Text style={styles.title}>{info.programTitle}</Text>
                    <Text style={styles.descText}>简介:{info.programIntro}</Text>
                    <Text style={styles.playBtn}>   总{info.programTotal}期，点击播放</Text>
                </TouchableOpacity>
            )
            array.push(view)
        }
        return (
            <View style={styles.container}>
                {array}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screen.width,
        paddingLeft: scale(20),
        paddingRight: scale(20),
        justifyContent: "space-between",
    },

    itemContainer: {
        flexDirection: 'column',
        width: (screen.width - scale(60)) / 2.,
        height: scale(384),
        borderRadius: 5,
    },

    image: {
        height: scale(194),
        width: (screen.width - scale(60)) / 2.,
        marginBottom: scale(10),
    },

    title: {
        marginTop: scale(10),
        marginBottom: scale(10),
        color: 'black',
        fontSize:14,
        paddingLeft: scale(10),
        paddingRight: scale(10),
    },

    descText: {
        fontSize: 13,
        color: '#666666',
        marginBottom: scale(24),
        paddingLeft: scale(10),
        paddingRight: scale(10),
    },

    playBtn: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'red',
        color: 'white',
        fontSize: 14,
        lineHeight: scale(58),
        width: (screen.width - scale(60)) / 2.
    }
})