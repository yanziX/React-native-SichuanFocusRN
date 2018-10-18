import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import screen, { scale } from './../../Pages/Configs/screen'
import PropType from 'prop-types'
import HotVideoItem from './HotVideoItem';
import { Actions } from 'react-native-router-flux';

export default class HotVideoView extends Component {

    static propType = {
        hotVideoUrl: PropType.string
    }

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            videoList: [],
            moreNewsUrl: String,
        }
    }

    renderItems() {
        let items = [];
        let videoArr = this.state.videoList
        for (let i = 0; i < videoArr.length; i++) {
            let videoItem = videoArr[i];
            let item = <HotVideoItem infoItem={videoItem} clickFunction={()=>this.props.onTabBabbarClick(videoItem)}></HotVideoItem>
            items.push(item)
        }
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {items}
            </ScrollView>
        )
    }

    render() {
        if(this.state.loaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.buttonView}>
                        <Text style={[styles.text, {paddingLeft: 10}]}>热门视频</Text>

                        <Text style={[styles.text, {paddingRight: 10}]}
                             onPress={() => Actions.MoreHotVideoList({'moreListUrl':this.state.moreNewsUrl})}>更多</Text>
                    </View>
                    {this.renderItems()}
                 </View>
            )
        }else {
            this.fetchVideoData()
            return (
                <Text>没有数据</Text>
            )
        }
        
    }

    fetchVideoData() {
        if(this.props.hotVideoUrl) {
            fetch(this.props.hotVideoUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loaded: true,
                    videoList: json.data.newsList,
                    moreNewsUrl: json.data.moreList,
                })
            })
            .catch((error) => {
                alert(error)
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: scale(338),
        backgroundColor: '#eaeaea',
        flexDirection: 'column'
    },

    buttonView: {
        height: scale(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        fontSize: 13,
        color: 'red',
    },

    scrollView: {
        width: screen.width,
        paddingLeft: scale(10),
        paddingRight: scale(0),
    }
})