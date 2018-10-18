import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Platform, TouchableOpacity} from 'react-native'
import screen, { scale } from './../../Pages/Configs/screen'
import api from '../../Pages/Configs/api';
import { Actions } from 'react-native-router-flux';

export default class CityItem extends Component {
    render() {
        let {institutionItem, number} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.jumpCityStateDetail(institutionItem, number)}>
                    <Image style={styles.image} source={{uri: api.StaticBaseUrl+institutionItem.institutionImage}}></Image>
                    <Text style={styles.location}>{institutionItem.institutionName}</Text>
                </TouchableOpacity>
                <Text style={styles.subscribe}>+订阅</Text>
            </View>
        )
    }

    jumpCityStateDetail(institutionItem, key) {
        if(key == 0) return;
        Actions.CityStateDetail({'item': {institutionItem}})
    }
}

const styles = StyleSheet.create({
    container: {
        // width: scale(180),
        height: scale(260),
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: '#dadada',
        borderWidth: 1,
        borderBottomWidth: 0,
    },

    image: {
        marginLeft: scale(40),
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        resizeMode: 'contain',
        marginTop: scale(20),
    },

    location: {
        color: 'black', 
        fontSize: 13, 
        marginTop: scale(10),
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
    },

    subscribe: {
        color: 'red', 
        fontSize:12,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: scale(40),
        marginTop: scale(10),
        width: scale(100),
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