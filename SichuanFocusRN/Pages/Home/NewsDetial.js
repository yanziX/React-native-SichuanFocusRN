import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, WebView, ScrollView} from 'react-native'
import Video from "react-native-video";
import screen, { scale } from './../Configs/screen'
import NavigationItem from '../Views/NavigationBar'
import Images from '../../Image/images';
import { Actions } from 'react-native-router-flux';
import api from '../Configs/api';
import AudioView from '../Views/AudioView';
import VideoPlayView from '../Views/VideoPlayView';
// import DeviceRealm from '../Configs/DeviceRealm'

const BaseScript = ` 
    (function () { 
        var height = null; 
        function changeHeight() {
             if (document.body.scrollHeight != height) {
                  height = document.body.scrollHeight; 
                  if (window.postMessage) {
                       window.postMessage(JSON.stringify({ type: 'setHeight', height: height, })) 
                    } 
                } 
            } setInterval(changeHeight, 100); 
        } ()
        ) `

export default class NewsDetail extends Component {
    
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            content: Object,
            height: 0
        }
    }

    onMessage(event) {
        try {
            const action = JSON.parse(event.nativeEvent.data)
            if (action.type === 'setHeight' && action.height > 0) {
                this.setState({
                    height: action.height
                })
            }
        }catch(error) {

        }
    }
    componentDidMount() {
        let {item} = this.props;
        // DeviceRealm.createHistoryData(item);
        this.fetchContentData(api.StaticBaseUrl + item.newsUrl)
    }

    render() {
        let {item} = this.props;
            return (
                <View style={{flex: 1}}>
                    <NavigationItem
                      leftIcon={Images.Return_btn}
                      icon={Images.Navigator_Img}
                      leftOnPress={this.functionAlert.bind(this)}
                     ></NavigationItem>
    
                     <ScrollView style={styles.headerView}>
                        {this.renderImageView()}
                        <Text style={styles.titleStyle} numberOfLines={4}>{this.state.content.newsTitle}</Text>
                        <Text style={styles.timelabelStyle}>{this.state.content.pubTime}</Text>
                        <Text style={styles.timelabelStyle}>{this.state.content.newsSource}</Text>
                        <View style={{marginLeft: scale(20), marginRight: scale(20), marginTop:scale(10), height: 1, backgroundColor: '#f0f0f0'}}></View>
                        {this.renderWebView()}
                     </ScrollView>
                </View>
               
            )
        
    }

    renderImageView = () => {
        if(this.state.content.newsContentH5) {
            let view = null;
            switch (this.state.content.newsType) {
                 case "1": {
                    view = <Image style={{height: scale(380),width: screen.width}} 
                              source={{uri: api.StaticBaseUrl+this.state.content.newsImage}} />
                              break;
                }
                case "2": {
                    view = <AudioView/>
                    break;
                }
                case "3": {
                    view=<VideoPlayView style={{width: screen.width, height: scale(280)}} videoItem={this.state.content}></VideoPlayView>
                }

            }
            return view;
        }
        
    }

    renderWebView = () => {
        if(this.state.content.newsContentH5) {
            return (
                <WebView style={{
                    width: screen.width,
                    height: this.state.height
                }}
                         source={{uri: api.StaticBaseUrl + this.state.content.newsContentH5}}
                         injectedJavaScript={BaseScript}
                         automaticallyAdjustContentInsets
                         decelerationRate='normal'
                         scalesPageToFit
                         javaScriptEnabled //仅限于安卓平台，iOS平台javascript是默认开启的
                         domStorageEnabled //适用于安卓
                         scrollEnabled={false}
                         onMessage={this.onMessage.bind(this)}
                         />
            )
        }
    }

    fetchContentData(url) {
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                content: json.data
            })
        })
        .catch((error) => {
            alert(error)
        })
    }
    

    functionAlert() {
        Actions.pop();
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },

    headerView: {
        flexDirection: 'column',
    },

    titleStyle: {
        color: 'black',
        fontSize: 20,
        margin: scale(40),
    },
    timelabelStyle: {
        color: '#898989',
        fontSize: 13,
        marginLeft: scale(40),
        marginBottom: scale(10)
    },
    authorStyle: {
        color: '#898989',
        fontSize: 13,
    },
    webViewStyle: {
         marginTop: 20,
         width: screen.width,
         height: screen.height
    }
  });