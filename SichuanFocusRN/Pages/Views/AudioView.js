import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import screen, { scale } from './../Configs/screen'
import Video from 'react-native-video'

export default class AudioView extends Component {
    render() {
        return (
            // <View style={styles.container}>
                <Video style={styles.container}
                        source={{uri: 'http://scgctvshow.sctv.com/SRTRADIO/live/xinwenpl/1.m3u8'}}
                        rate={1.0}  //1.0为默认速率
                        volume={1.0}  //声音的放大倍数，0代表没声音，1代表正常音量，更大的数字代表放大的倍数
                        muted={false}  //true代表静音，默认为false
                        paused={false}                           
                        resizeMode='contain'
                        repeat={true} //是否重复播放
                >
                    <Text style={styles.timeView}>00:00</Text>
                </Video>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: scale(127),
        flexDirection: 'row'
    },

    timeView: {
        color: 'black',
        fontSize: 16,
        marginVertical: 0
    }
})
