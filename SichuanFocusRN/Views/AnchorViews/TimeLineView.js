//主播动态
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Colors from "./../../Pages/Configs/Colors";
import api from './../../Pages/Configs/api';
import Images from './../../Image/images';
import screen, { scale } from './../../Pages/Configs/screen'
import AlertModal from './../../Pages/Views/AlertModal';
import Video from 'react-native-video'

const PropTypes = require('prop-types')

export default class TimeLineView extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageSetting: false,  //展示照片
            displayUrl: String,
            videoSetting: false,  // 展示视频
        }
    }

renderAlertContent = () =>{
    if (this.state.imageSetting) {
        return (
            <Image style={{width: screen.width, height: screen.height, resizeMode: 'contain', }} source={{uri: this.state.displayUrl}}></Image>
         )
    }
    if (this.state.videoSetting) {
        return (
            <View>
                <Video source={{uri:this.state.displayUrl}}
                    rate={1.0}  //1.0为默认速率
                    volume={1.0}  //声音的放大倍数，0代表没声音，1代表正常音量，更大的数字代表放大的倍数
                    muted={false}  //true代表静音，默认为false
                    paused={false} 
                    resizeMode='contain'
                    repeat={true} //是否重复播放
                    style={{width: screen.width, height: screen.height}}
            ></Video>
            </View>
            
        )
    }
    
}

close = () => {
    this.setState({
        imageSetting: false,
        videoSetting: false,
    })
}

renderImageModal = () => {
    return (<AlertModal
        customerlayout={{justifyContent:'flex-end'}}
        animation="slide"
        close={this.close}
        visible={this.state.imageSetting}
        contentView={this.renderAlertContent()}
    >
    </AlertModal>)
}

renderVideoModal = () => {
    return (
        <AlertModal
            customerlayout={{justifyContent:'flex-end'}}
            animation="slide"
            close={this.close}
            visible={this.state.videoSetting}
            contentView={this.renderAlertContent()}
        ></AlertModal>
    )
}

/**
 * 点击照片
 * @param {*} imageUrl 
 */
imageSetting(imageUrl) {
    this.setState({
        imageSetting:true,
        displayUrl: imageUrl
    })
};


/**
 * 点击视频
 * @param {*} videoUrl 
 */
videoSetting(videoUrl) {
    this.setState({
        videoSetting: true,
        displayUrl: videoUrl
    })
}


    render() {
        
        let {newsItem} = this.props;

        let avatarUrl = api.StaticBaseUrl + newsItem.anchorAvatar;

        //根据发布内容类型以及发布照片个数来添加图片
        let imagesArr = [];

        //照片类型
        if (newsItem.contentVideo === '') {
            let arr = newsItem.contentImage
            for (let i = 0; i < arr.length; i ++) {
                imageUrlObj = arr[i]
                let contentImgUrl = api.StaticBaseUrl + imageUrlObj.imageUrl
                let imageView = (
                    <TouchableOpacity style={{width: (screen.width - 40) / 3, height: (screen.width - 40) / 3}}
                                     onPress={this.imageSetting.bind(this,contentImgUrl)}>
                        <Image style={styles.imagePic} source={{uri: contentImgUrl}} />
                    </TouchableOpacity>
                )
                imagesArr.push(imageView)
            }
        }else {
            let videoUrl = api.StaticBaseUrl + newsItem.contentVideo;
            //视频播放类型
            let videoView = (
            <TouchableOpacity style={{width: 150, height: 200, }} onPress={this.videoSetting.bind(this, videoUrl)}>
                <ImageBackground source={{uri: api.StaticBaseUrl+newsItem.videoImage.imageUrl}}
                                style={{width: 150, height:200,alignItems: 'center', flex: 1, flexDirection:'column', justifyContent:'center'}}
                >
                    <Image source={Images.Submission_play_btn} style={{width: 50, height: 50}}></Image>
                </ImageBackground>
            </TouchableOpacity>
            ) 
            imagesArr.push(videoView)
        }



        return (
            <View>
                <View style={{height:scale(10), backgroundColor: '#efefef'}}></View>
                <View style={styles.container}>
                
                <View style={styles.headerView}>
                    <ImageBackground style={styles.headIconContent} source={Images.Personal_Head_ico}>
                        <Image style={styles.headIcon} source={{uri: avatarUrl}} />
                    </ImageBackground>
                    
                    <View style={styles.nameAndTimeView}>
                        <Text style={styles.nameText}>{newsItem.anchorName}</Text>
                        <Text style={styles.pubTimeText}>{newsItem.pubTime}</Text>
                    </View>
                </View>
                <Text style={styles.contentText}>{newsItem.contentText}</Text>
                <View style={styles.contentView}>
                    {imagesArr}
                </View>

                {this.renderImageModal()}
                {this.renderVideoModal()}
                <View style={{height: 10}}></View>
            </View>

            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },

    //头像和昵称一栏
    headerView: {
        flexDirection: 'row',
        height: 60,
    },

    //头像背景view，设置占位图
    headIconContent: {
        marginTop: 20,
        width: 35,
        height: 35,
        borderRadius: 17,
    },

    //头像
    headIcon: {
        margin: 0,
        width: 35,
        height: 35,
        // borderRadius: 17,
        // opacity: 1
    },

    //昵称和发布时间一栏
    nameAndTimeView: {
        marginLeft: 10,
        flexDirection: 'column'
    },

    //昵称
    nameText: {
      marginTop: 23,
      fontSize: 14,
      color: '#282828',
    },

    //发布时间
    pubTimeText: {
        fontSize: 12,
        color: Colors.gray,
    },

    //展示文字内容
    contentText: {
        color: '#282828',
        marginTop: 10,
        fontSize: 15,
        
    },

    //展示图片和视频
    contentView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },

    imagePic: {
        width: (screen.width - 40) / 3 - 4,
        height: (screen.width - 40) / 3 - 4,
        margin: 2,
    }
})
