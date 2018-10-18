import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Slider, Text, Platform} from 'react-native'
import Video from 'react-native-video'
import { scale } from '../Configs/screen';
import Images from '../../Image/images';
import screen from './../Configs/screen'
import Tools from '../Configs/Tools';
import  Orientation from 'react-native-orientation' 

export default class VideoPlayView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            silence: true,
            volume: 0,
            paused: false,
            currentTime: 0,
            duration: 0.0,
            slideValue: 0.00,
            isBuffering: false,
            flag: true,
        }
    }

    onEnd = () => {
        this.setState({paused: true});
        this.player.seek(0)
    }

    onLoad = (data) => {
        //视频总长度
        this.setState({duration: data.duration});
    }

    onProgress = (data) => {
        //播放进度
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({isBuffering}: {isBuffering: boolean}) {
        this.setState({isBuffering})
    }

    getCurrentTimePercentage() {
        if(this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    }
    render() {
        let {videoItem} = this.props;
        if (videoItem.newsMediaUrl) {
            return (
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={{width:'100%', height:'100%'}}
                        >
                            <Video
                                ref={ref => this.player = ref}
                                source={{uri: videoItem.newsMediaUrl}}
                                rate={1.0}
                                volume={this.state.volume}  //声音的放大倍数，0代表没声音，1代表正常音量，更大的数字代表放大的倍数
                                muted={false}  //true代表静音，默认为false
                                paused={this.state.paused}                           
                                resizeMode='center'
                                repeat={true} //是否重复播放
                                style={styles.videoView}
                                onLoad={this.onLoad}
                                onBuffer={() => this.onBuffer}
                                onProgress={this.onProgress}
                                onEnd={this.onEnd} 
                            ></Video>
                        </TouchableOpacity>
                        <View style={styles.topView}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(this.state.silence) {
                                        this.setState({
                                            silence: false,
                                            volume: 1,
                                        })
                                    }else {
                                        this.setState({
                                            silence: true,
                                            volume: 0,
                                        })
                                    }
                                }}
                            >
                                <Image source={this.state.silence ? Images.News_voice_silence : Images.News_voice_big}
                                       style={{position: 'absolute', right: 0, top: 6}}
                                ></Image>
                            </TouchableOpacity>
                            
                        </View>
    
                        <View style={styles.bottomView}>
                            <TouchableOpacity
                                onPress={()=>{
                                    if(this.state.paused) {
                                        this.setState({
                                            paused: false
                                        })
                                    }else {
                                        this.setState({
                                            paused: true
                                        })
                                    }
                                }}
                            >
                                <Image source={this.state.paused?Images.News_bottom_play_btn: Images.News_bottom_stop_btn} 
                                       style={styles.stopOrPlayButton}
                                       resizeMode='center'></Image>   
                            </TouchableOpacity>
                            <Text style={styles.currentTimeView}>{Tools.format(this.state.currentTime.toFixed(0))}s</Text>
                                 <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    minimumTrackTintColor='orange'
                                    maximumTrackTintColor='white'
                                    step={1}
                                    onValueChange={(value => {
                                        this.setState({currentTime: value})
                                    })}
                                    onSlidingComplete={value => this.player.seek(value)}
                                ></Slider>
                                <Text style={styles.durationTime}>{Tools.format(this.state.duration.toFixed(0))}s</Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        if(this.state.flag) {
                                            this.setState({
                                                flag: false
                                            });
                                            Orientation.lockToLandscapeRight()
                                        }else if(!this.state.flag) {
                                            this.setState({
                                                flag: true
                                            });
                                            Orientation.lockToPortrait();
                                        }
                                    }}
                                >
                                    <Text style={styles.fullScreenView}>全屏</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: scale(420),
    },
    videoView: {
        flex: 1,
        width: screen.width,
        height:scale(420),
    },
    topView: {
        width: '100%',
        height: scale(90),
        backgroundColor:'black',
        opacity:0.5,
        top: 0,
        position: 'absolute',
    },
    bottomView: {
        position:'absolute',
        justifyContent:'space-between',
        alignItems:'center',
        bottom: 0, 
        width: screen.width,
        height: scale(90), 
        backgroundColor:'black', 
        opacity:0.5,
        flexDirection: 'row',
    },

    stopOrPlayButton: {
        width: 40,
        height: scale(90),
        flex: 1,
        padding: 5,
    },

    slider: {
        width: scale(347),
        flex: 1,
        height: 20
    },

    currentTimeView: {
        color: 'white',
        fontSize: 12,
        width: scale(90),
        marginLeft: 5
    },

    durationTime: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
        width: scale(90)
    },

    fullScreenView: {
        width: scale(84),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        color: 'white',
        fontSize: 12,
        marginRight: 10,

        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios: {
                lineHeight: scale(40),
            },
            android: {

            }
        })

        
        
        // position: 'absolute',
        // right: 10,
    }
})