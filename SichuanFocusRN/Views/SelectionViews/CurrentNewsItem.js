import React, {Component} from 'react';
import {StyleSheet, Image, Text, ImageBackground, View} from 'react-native'
import screen, { scale } from './../../Pages/Configs/screen'
import api from './../../Pages/Configs/api';
import PropTypes from 'prop-types'
import Images from '../../Image/images';

export default class CurrentNewsItem extends Component {

    static propTypes = {
        clickFunction: PropTypes.Function,
    }


    render() {

        let {newsItem} = this.props
        let imageName;
        switch(newsItem.newsType) {
            case "2": {
                imageName = Images.News_voice_icon;
                break;
            }
            case "3": {
                imageName = Images.News_video_icon;
                break;
            }
        }
        return (
            <View style={styles.item}>
              <View style={styles.container}>
                <View style={styles.lineContentView}>
                    <View style={{width: 1, height: 20, backgroundColor: 'red'}}></View>
                    <Text style={{width: 8, height: 8, color: 'white', backgroundColor: 'red', borderRadius: 4}}></Text>
                    <View style={{width: 1, height: 72, backgroundColor: 'red'}}></View>
                </View>
                <View style={styles.textContentView}>
                    <Text numberOfLines={2} style={{color: 'black', fontSize: 13}}>{newsItem.newsTitle}</Text>
                    <Text style={{color: 'gray', fontSize: 11, marginTop: 20}}>{newsItem.pubTime}</Text>
                    
                </View>
                <ImageBackground style={styles.imageContentView} source={{uri: api.StaticBaseUrl + newsItem.newsImage}}
                                resizeMode='center'
                >
                    {/* <Image style={{flex: 1}} source={{uri: api.StaticBaseUrl + newsItem.newsImage}}></Image> */}
                    <Image source={imageName} style={styles.playView}></Image>
                </ImageBackground>
                
              </View>
              <View style={{width: screen.width, height: 1, backgroundColor: '#eaeaea', marginLeft: 50}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    item: {
        height: 100,
        flexDirection: 'column'
    },

    container: {
        height: 99,
        flexDirection: 'row',
    },

    lineContentView: {
        flexDirection: 'column',
        width: scale(80),
        alignItems: 'center'
    },

    textContentView: {
        flexDirection: 'column',
        width: screen.width - scale(80) - scale(327),
        // paddingLeft: 10,
        // paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20
    },

    imageContentView: {
        width: scale(287),
        marginLeft: scale(10),
        marginTop: scale(10),
        marginBottom: scale(10),
        marginRight: scale(10),
        flex: 1,
        alignItems: 'center',
        // marginRight: 10,
    },

    playView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: 'center',
    }
})