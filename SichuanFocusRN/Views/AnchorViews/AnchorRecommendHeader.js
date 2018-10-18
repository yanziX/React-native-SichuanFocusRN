import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, Platform, TouchableOpacity} from 'react-native'
import screen, { scale } from '../../Pages/Configs/screen';
import api from '../../Pages/Configs/api';
import { white } from 'ansi-colors';
import { Actions } from 'react-native-router-flux';


export default class AnchorRecommendHeader extends Component {
    
    render() {
        let {item} = this.props;
        return (
            <View style={{height: scale(360)}}>
                {/* <View style={styles.cornerContent}></View> */}
                <View style={styles.contentView}>
                    <Image style={styles.image} source={{uri: api.StaticBaseUrl+item.programImage}}></Image>
                    <View style={styles.textContent}>
                        <Text style={{marginTop: scale(20), fontSize: 15}}>{item.programTitle}</Text>
                        <Text style={styles.smallText}>总{item.programTotal}期</Text>
                        <Text style={styles.smallText}>简介：{item.programIntro}</Text>
                        <Text style={{marginTop: scale(20), color: 'red', fontSize: 11}}>更新至：{item.updateInfo}</Text>
                        <TouchableOpacity onPress={() => Actions.NewsDetail({'item':item.programme})}>
                             <Text style={styles.playView}>播放最新一期</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={styles.lineView}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: scale(360),
        flexDirection: 'column',
    },

    cornerContent: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#f1f1f1',
        paddingLeft: scale(20),
        flex: 1,
        width: screen.width,
        height: scale(360),
        backgroundColor: 'red'
    },

    contentView: {
        flexDirection: 'row',
        marginLeft: scale(40),
        marginTop: scale(40),
    },

    image: {
        width: scale(180),
        height: scale(278),
        
    },

    textContent: {
        flexDirection: 'column',
        marginLeft: scale(20),
    },

    smallText: {
        marginTop: scale(20), 
        color: '#5d5d5d', 
        fontSize: 11
    },

    playView: {
        width: scale(254),
        height: scale(60),
        backgroundColor: '#eb0006',
        color: 'white',
        fontSize:12,
        marginTop: scale(20),
        borderRadius: 3,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios: {
                lineHeight: scale(60),
            },
            android: {

            }
        })
    },

    lineView: {
        height: 2, 
        backgroundColor: '#dcdcdc', 
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
    }

})