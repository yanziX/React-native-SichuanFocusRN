import React, {Component} from 'react';
import {StyleSheet, Text, SectionList, View, TouchableOpacity, Platform} from 'react-native'
import api from '../Configs/api';
import screen, { scale } from '../Configs/screen'
import AnchorItem from '../../Views/AnchorViews/AnchorItem';
import { Actions } from 'react-native-router-flux';

{
    var timelineArr = []
    var timelinesIndex = 0  //主播推荐索引
    var chengduHostIndex = 0   //川台主持人索引
    var cityHostIndex = 0    //地市州主持人索引
    var isChengdu = true
    var isCity = false
}
export default class Anchor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentData: [],
            chengduAnchorDocs: [],  //主播档案川台数组
            localAnchorDocs: [],    //主播档案地方主持人
            anchorRecommend: [],  //主播推荐
            isHeaderRefresh: false,
            isLoadMore: false,
            timelineFooterInfo: '展开查看更多动态',
            anchorFilesFooterInfo: '展开查看更多主播',
            isFirstLoad: true,  //是第一次加载或下拉刷新
            mo: [],
            isChengduHostNoMore: false,  //川台主持人数据加载完
            isCityHostNoMore: false,     //地方主持人加载完
            // isChengdu : true,
            // isCity : false,
        }
    }

    componentDidMount() {
       
        this.fetContentData();
    }

    //获得所有数据，从中解析主播推荐数据
    loadStaticData() {
        fetch(api.anchor)
        .then((response) => response.json())
        .then((json) => {
            let anchorRecommend = [{"value":json.data.anchorNode}]
            this.setState({
                // anchorRecommend: json.data.anchorNode,
                contentData: this.state.contentData.concat({key:'主播推荐', data: anchorRecommend})
            })

            //主播推荐数据有了再请求主播档案数据
            if(this.state.isFirstLoad) {
                this.loadRadioHostDocs(chengduHostIndex,"0",false)
            }           
        })
        .catch((error) => {
            alert(error);
        })
    }

    //获取主播动态
    async loadTimelines() {
        let formData = new FormData();
        formData.append("capacity","10");
        formData.append("index",timelinesIndex);
        formData.append("requestType","0");
        formData.append("siteNumber","1");
        formData.append("userId","211");
        formData.append("anchorId","")

      await  fetch(api.DynamicBaseUrl + api.getTimelineList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:formData
        }) 
        .then((response) => response.json())
        .then((json) => {
            if(this.state.contentData.length > 0) {
                timelineArr = this.state.contentData[0].data;
                list = json.data.timelineList;
                for (let i = 0; i<list.length;i++){
                    timelineArr.push(list[i]);
                }
                
                this.state.mo = this.state.contentData;
                this.state.mo.splice(0,1,({key: '主播动态', data: timelineArr}))
                this.setState({
                    contentData: this.state.mo    
                })
            }else {
                this.setState({
                    contentData: this.state.contentData.concat({key: '主播动态', data: json.data.timelineList})
                })
            }
           
            //主播动态数据有了再请求主播推荐
            if(this.state.isFirstLoad) {
                this.loadStaticData()
            } 
        })
        .catch((error) => {
            alert(error);
        })
    }

    //获取主播档案
    loadRadioHostDocs(index,requestType,isLoadMore) {
        let formData = new FormData();
        formData.append("count","10");
        formData.append("index",index);
        formData.append("requestType",requestType);
        formData.append("siteNumber","1");

        fetch(api.DynamicBaseUrl+api.getRadioHostDoc, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: formData
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.data.anchorDoc.length < 10) {
                if(isChengdu) {
                    this.setState({
                        isChengduHostNoMore : true,
                    })
                }else {
                    this.setState({
                        isCityHostNoMore : true,
                    })
                }
            }
            if(isLoadMore) {
                let arr = isChengdu ? this.state.chengduAnchorDocs[0].value.concat(json.data.anchorDoc) : this.state.localAnchorDocs[0].value.concat(json.data.anchorDoc)
                let anchorDocs = [{"value": arr}];
                this.state.mo = this.state.contentData;
                this.state.mo.splice(2,1,({key:'主播档案', data: anchorDocs}))
                isChengdu ? this.state.chengduAnchorDocs=anchorDocs : this.state.localAnchorDocs=anchorDocs
                this.setState({
                    contentData: this.state.mo
                })
            }else {
                let anchorDocs = [{"value": json.data.anchorDoc}]
                isChengdu ? this.state.chengduAnchorDocs=anchorDocs : this.state.localAnchorDocs=anchorDocs
                this.state.mo = this.state.contentData;
                this.state.mo.splice(2,1,({key:'主播档案', data: anchorDocs}))
                this.setState({
                //  chengduAnchorDocs: anchorDocs,
                // anchorDocs: json.data.anchorDoc,
                //data必须是数组
                contentData: this.state.mo,
                isFirstLoad: false,  //第一次加载完毕，当下拉刷新时再次置为true，加载另外两个
            })
            }
            
        })
        .catch((error) => {
            alert(error);
        })
    }


    loadMoreTimelines() {
        if(this.state.timelineFooterInfo == '进入主播圈') {
            Actions.TimelinesList()
        }else {
            timelinesIndex = timelinesIndex + 10;
            if(timelinesIndex == 20) {
                this.setState({
                    timelineFooterInfo: '进入主播圈'
                })
            }
            this.loadTimelines()
        }
        
    }

    loadMoreAnchorDocs() {
        isChengdu ? chengduHostIndex = chengduHostIndex + 10 : cityHostIndex = cityHostIndex + 10;
        this.loadRadioHostDocs(isChengdu? chengduHostIndex : cityHostIndex, isChengdu ? "0" : "1", true)
    }

    render() {
        return (
            <SectionList
                renderSectionHeader={this.renderSectionHeader}
                renderSectionFooter={this.renderSectionFooter}
                renderItem={this.renderItem}
                sections={this.state.contentData}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isHeaderRefresh}
                contentContainerStyle={styles.sectionList}
            ></SectionList>
        )
    }

    renderSectionHeader = (info) => {
        let header;

        let chengduTextStyle = {
            color: isChengdu ? 'white' : 'black',
            backgroundColor: isChengdu ? 'red' : 'white',
            fontSize: 15,
            lineHeight: scale(60),
            width: scale(160),

            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            textAlignVertical:'center',
            ...Platform.select({
            ios: {
                lineHeight: scale(60),
            },
            android: {

            }
        })
        }

        let cityTextStyle = {
            color: isCity ? 'white' : 'black',
            backgroundColor: isCity ? 'red' : 'white',
            fontSize: 15,
            lineHeight: scale(60),
            width: scale(160),
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            textAlignVertical:'center',
            ...Platform.select({
            ios: {
                lineHeight: scale(60),
            },
            android: {

            }
        })
        }

        switch(info.section.key) {
            case "主播档案": {
                header = (
                    <View>
                        <Text style={styles.sectionHeader}>{info.section.key}</Text>
                        <View style={styles.switchView}>
                            <Text style={chengduTextStyle} onPress={()=>this.exchangeHostsLocation(true)}>川台主播</Text>
                            <Text style={cityTextStyle} onPress={()=>this.exchangeHostsLocation(false)}>市州主播</Text>
                        </View>
                    </View>
                )
                break;
            }
            default: {
                header = (
                    <View style={{height: 40, justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={styles.sectionHeader}>{info.section.key}</Text>
                    </View>
                )
                break;
            }
        }
        return (
            header
        )
    }

    renderSectionFooter = (info) => {
        let footer;
        switch (info.section.key) {
            case "主播动态": {
                footer = (
                    <TouchableOpacity style={styles.footerContainer} onPress={() => this.loadMoreTimelines()}>
                        <Text style={styles.footerText}>{this.state.timelineFooterInfo}</Text>
                    </TouchableOpacity>
                )
                break;
            }
            case "主播档案": {
                if(isChengdu && !this.state.isChengduHostNoMore) {
                    footer = (
                        <TouchableOpacity style={styles.footerContainer} onPress={()=>this.loadMoreAnchorDocs()}>
                            <Text style={styles.footerText}>{this.state.anchorFilesFooterInfo}</Text>
                        </TouchableOpacity>
                    )
                }
                if(isCity && !this.state.isCityHostNoMore) {
                    footer = (
                        <TouchableOpacity style={styles.footerContainer} onPress={()=>this.loadMoreAnchorDocs()}>
                            <Text style={styles.footerText}>{this.state.anchorFilesFooterInfo}</Text>
                        </TouchableOpacity>
                    )
                }
                break;
                
            }
        }
        return footer;
    }
    
    renderItem = (info) => {
        return (
            <View>
                <AnchorItem infoItem={info.item} itemKey={info.section.key} infoArray={info.section.data}></AnchorItem>
            </View>
        )
    }

    onRefresh = () => {
        if(!this.state.isHeaderRefresh) {

            //重新复位
            isChengdu = true;
            isCity = false;
            timelinesIndex = 0;
            chengduHostIndex = 0;
            cityHostIndex = 0;
            this.state.isFirstLoad = true;
            this.state.isChengduHostNoMore = false;
            this.state.isCityHostNoMore = false;
            this.state.contentData = [];
            this.state.chengduAnchorDocs = [];
            this.state.localAnchorDocs = [];
            this.fetContentData()
        }
    }

    fetContentData() {
        //主播动态
        this.loadTimelines();
        // //主播推荐
        // this.loadStaticData();
        // //主播档案
        // this.loadRadioHostDocs();
    }

    //更换主播档案数据，如果是地方主持人，没有数据时要请求数据（因为川台主持人在界面开始就请求过数据，所以没必要进行判断）
    exchangeHostsLocation(chengduTag) {
        if(chengduTag) {
            isChengdu=true, isCity=false
            let arr = isChengdu ? this.state.chengduAnchorDocs[0].value : this.state.localAnchorDocs[0].value
            let anchorDocs = [{"value": arr}];
            this.state.mo = this.state.contentData;
            this.state.mo.splice(2,1,({key:'主播档案', data: anchorDocs}))
            this.setState({
                contentData: this.state.mo
            })

        }else {
            isChengdu=false, isCity=true
            if(this.state.localAnchorDocs.length == 0) {
                this.loadRadioHostDocs(cityHostIndex, "1", false)
            }else {
                let arr = isChengdu ? this.state.chengduAnchorDocs[0].value : this.state.localAnchorDocs[0].value
                let anchorDocs = [{"value": arr}];
                this.state.mo = this.state.contentData;
                this.state.mo.splice(2,1,({key:'主播档案', data: anchorDocs}))
                this.setState({
                    contentData: this.state.mo
                })
            }
        }
        
    }

}

const styles = StyleSheet.create({
    sectionList: {
        width: screen.width,
    },

    sectionHeader: {
        lineHeight: 40, 
        color: 'red', 
        fontSize: 16, 
        paddingLeft: 10, 
        backgroundColor: 'white', 
        width: screen.width
    },

    footerContainer: {
        height:scale(126), 
        justifyContent:'center', 
        alignItems:'center'
    },

    footerText: {
        color: 'red',
        fontSize: 16,
        width: scale(300),
        lineHeight: scale(70),
        borderRadius: scale(35),
        borderWidth: 1,
        borderColor: 'red',

        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios: {
                lineHeight: scale(70),
            },
            android: {

            }
        })
    },

    switchView: {
        // width: scale(320),
        height: scale(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})