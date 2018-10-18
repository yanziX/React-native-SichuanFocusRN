import React, {Component} from 'react';
import {Text, ImageBackground, Image, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import api from './../../Pages/Configs/api';
import { scale } from '../../Pages/Configs/screen';
import Images from '../../Image/images';

export default class HotVideoItem extends Component {

    static propTypes = {
        infoItem: PropTypes.object,
        clickFunction : PropTypes.Function
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.clickFunction}>
                <ImageBackground style={styles.image} source={{uri: api.StaticBaseUrl + this.props.infoItem.newsImage}}>
                    <Image source={Images.News_play_btn} style={styles.playImage}></Image>
                </ImageBackground>
                {/* <Image style={styles.image} source={{uri: api.StaticBaseUrl + this.props.infoItem.newsImage}}></Image> */}
                <Text style={styles.text} numberOfLines={2}>{this.props.infoItem.newsTitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(316),
        height: scale(246),
        flexDirection: 'column',
        // marginLeft: scale(5),
        marginRight: scale(5)
        // marginRight: 10
    },

    image: {
        width: scale(296),
        height: scale(166),
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    text: {
        width: scale(296),
        height: scale(77),
        paddingLeft: scale(20),
        paddingRight: scale(20),
        paddingTop: scale(10),
        paddingBottom: scale(10),
        color: 'black',
        fontSize: 13,
        backgroundColor: 'white'
    },

    playImage: {
        justifyContent: 'center',
         alignItems:'center',
          flex: 1,
          resizeMode: 'center',
    }
})