import React, {Component} from 'react'
import {StyleSheet, Text, Dimensions, View, TouchableOpacity, Image, Slider} from 'react-native'
import Orientation from 'react-native-orientation'
import Images from '../../Image/images';
import Video from 'react-native-video'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class VideoView extends Component {

    constructor(props) {
        super(props);
        this.player = null
        this.state = {
            rate: 1,
            volume: 0,
            muted: false,
            resizseMode: 'contain',
            duration: 0.0,
            slideValue: 0.00,
            currentTime: 0,
            controls: false,
            paused: false,
            ignoreSilentSwitch: null,
            isBuffering: false,
            flag: true,

        };
        // this.onLoad = this.onLoad.bind(this);
        // this.onProgress = this.onProgress.bind(this);
        // this.onBuffer = this.onBuffer.bind(this);
    }

    // componentWillMount() {
    //     const init = Orientation.getInitialOrientation();
    //     this.setState({
    //         init,
    //         orientation: init,
    //         specificOrientation: init,
    //     });
    // }

    // componentDidMount() {
    //     Orientation.addOrientationListener(this._updateOrientation);
    //     Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
    // }

    // componentWillUnmount() {
    //     Orientation.removeOrientationListener(this._updateOrientation);
    //     Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation);
    // }

    // _getOrientation() {
    //     Orientation.getOrientation((error, orientation) => {
    //         alert('Orientation is ${orientation}');
    //     });
    // }

    // _getSpecificOrientation() {
    //     Orientation.getSpecificOrientation((err, orientation) => {
    //         alert('Specific orientation is ${orientation}');
    //     });
    // }

    // _updateOrientation = (orientation) => this.setState({ orientation });
    // _updateSpecificOrientation = (specificOrientation) => this.setState({specificOrientation})

    // //以上为横向
    // onEnd(data) {
    //     this.player.seek(0)
    // }

    // onLoad(data) {
    //     //视频总长度
    //     this.setState({duration: data.duration});
    // }

    // onProgress(data) {
    //     //播放进度
    //     this.setState({
    //         currentTime: data.currentTime,
    //     });
    // }

    // onBuffer({isBuffering}: {isBuffering: boolean}) {
    //     this.setState({isBuffering})
    // }
    getCurrentTimePercentage() {
        if(this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }else {
            return 0;
        }
    }

    renderNativeSkin() {
        const videoStyle = styles.fullScreen;
        const {init, orientation, specificOrientation} = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.setState({
                            paused: !this.state.paused
                        })}
                        style={{width: '100%', height:this.state.flag?height-40:'90.4%',alignItems:'center',backgroundColor:'#000'}}
                    >
                        <Video
                            ref = {ref => this.player = ref}
                            source={{uri: 'http://fscgc.sctv.com/NewsMedia/2018/09/24/海菜_2018-09-24 17_55_12.mp4'}}
                            style={styles.fullScreen}
                            rate={this.state.rate}
                            paused={this.state.paused}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                            resizseMode='container'
                            // onLoad={this.onLoad}
                            // onBuffer={this.onBuffer}
                            // onProgress={this.onProgress}
                            // onEnd={(data) => this.onEnd(data)}
                            repeat={true}
                            controls={this.state.controls}
                        />
                    </TouchableOpacity>
                    {/* <View style={{width: '100%', backgroundColor:'#898989', height: 40, flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                if(this.state.paused) {
                                    this.setState({
                                        paused: false,
                                    })
                                }else if(!this.state.paused) {
                                    this.setState({
                                        paused: true
                                    })
                                }
                            }}
                        >
                            //播放暂停按钮判断
                            <Image source={this.state.paused?Images.News_play_btn:Images.News_stop_btn}
                                style={{marginLeft: 5, width: 35, height: 35}}
                            />
                        </TouchableOpacity>
                        <View style={{width: 35}}>
                            //播放时间进度
                            <Text style={{color:'#000'}}>{this.state.currentTime.toFixed(0)}S</Text>
                        </View>
                        
                        <Slider
                            style={styles.slider}
                            value={this.state.currentTime}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            minimumTrackTintColor='orange'
                            maximumTrackTintColor='#fff'
                            step={1}
                            onValueChange={value => {
                                console.log(value);
                                this.setState({currentTime: value})
                            }}
                            onSlidingComplete={value => this.player.seek(value)}
                        ></Slider>
                        
                        //视频总时长
                        <View style={{width: 35}}>
                            <Text style={{color: '#000', fontSize: 12}}>{this.state.duration.toFixed(0)}S</Text>
                        </View>
                        
                        <TouchableOpacity
                            onPress={()=>{
                                if(this.state.flag){
                                    this.setState({
                                        flag: false
                                    });
                                    Orientation.lockToLandscapeRight()
                                }else if(!this.state.flag) {
                                    this.setState({
                                        flag: true
                                    })
                                    Orientation.lockToLandscapeRight()
                                }
                            }}
                        >

                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>
        ) 
    }

    render() {
        return this.renderNativeSkin();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    instructions: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },

    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    button: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        backgroundColor: 'grey',
    },

    slider: {
        flex: 1,
        width: '80%',
        height: 20
    }
})