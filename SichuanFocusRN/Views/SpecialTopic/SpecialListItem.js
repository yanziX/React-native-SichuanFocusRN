import React, {Component} from 'react';
import {StyleSheet,
        View,
        TouchableOpacity,
        Text,
        ImageBackground,
        Image,
    } from 'react-native'
import { scale } from '../../Pages/Configs/screen';
import Images from '../../Image/images';
import api from '../../Pages/Configs/api';

export default class SpecialNewsItem extends Component {
    render() {
        let {newsItem} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textContent}>
                    <Text style={styles.titleText} numberOfLines={2}>{newsItem.newsTitle}</Text>
                    <View style={styles.timeAndTypeView}>
                        <Text style={styles.timeText}>{newsItem.pubTime}</Text>
                        <Text style={styles.labelText}>{newsItem.lable}</Text>
                    </View>
                </View>
                <ImageBackground style={styles.imageContent}
                    source={{uri: api.StaticBaseUrl + newsItem.newsImage}}

                >
                    {/* <Image source={{uri: api.StaticBaseUrl + newsItem.newsImage}} style={{flex: 1, backgroundColor: 'red', }}></Image> */}
                    <Image source={Images.News_play_btn} style={styles.playImage}></Image>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: scale(200),
        padding: scale(20),
    },

    textContent: {
        flexDirection: 'column',
        width: scale(446),
        marginRight: 10,
    },

    timeAndTypeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    titleText: {
        color: 'black',
        fontSize: 16,
        height: scale(140),
        width: scale(446),
        // paddingRight: 10,
        paddingTop: 20
    },

    timeText: {
        color: '#a3a3a3',
        fontSize: 13,
    },

    labelText: {
        color: 'red',
        fontSize: 13,
    },

    imageContent: {
        flex: 1,
        flexDirection: 'column',
        width: scale(245),
        height: scale(178),
        alignItems: 'center'
    },

    playImage: {
        justifyContent: 'center',
         alignItems:'center',
          flex: 1,
          resizeMode: 'center',
    }

})