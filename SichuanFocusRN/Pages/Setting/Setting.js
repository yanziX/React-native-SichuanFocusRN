import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, ScrollView, ImageBackground, Dimensions, Text, DeviceEventEmitter, Platform } from 'react-native'
import NavigationItem from './../Views/NavigationBar'
import LineView from './../Views/LineView'
import Colors from "../Configs/Colors";
import SettingHeaderItem from "../Views/SettingHeaderItem";
import SettingCell from "./SettingCell";
import SpacingView from "../Views/SpacingView";
import screen from './../Configs/screen'

import Images from "../../Image/images";
import DeviceStorage from "../Configs/DeviceStorage"
import api from '../Configs/api';
import { black } from 'ansi-colors';
import { Actions } from 'react-native-router-flux';

let width = Dimensions.get('window').width

export default class Home extends Component{

    static navigationOptions = {
        // headerTitle: '我的'
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            rightText: String,
            userData: Object
        }
    }

    componentWillMount() {
        this.readUserData()
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('changeUserData', (value) => {
            this.readUserData();
        })
    }

    componentWillUnmount() {
        DeviceEventEmitter.remove();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        //login界面返回的时候这里会调用
      }

    renderHeader() {
        let img = this.state.userData.avatar==undefined ? Images.Personal_Head_ico : {uri: api.StaticBaseUrl+this.state.userData.avatar};
        let name = this.state.userData.nickName==undefined ? '立即登录/注册' : this.state.userData.nickName;
        return (
            <View style={styles.header}>

                <ImageBackground style={styles.headerBack} source={Images.Personal_Setup_bg}>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginModal')}
                    }>
                        <Image style={styles.avatar} source={img}/>
                        <Text style={styles.userName}>{name}</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <LineView/>
            </View>
        )
    }

    renderItemView() {
        return (
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <TouchableOpacity>
                    <SettingHeaderItem icon={Images.Setup_appointment} title='我的预约'/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <SettingHeaderItem icon={Images.Setup_collection} title='我的收藏'/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <SettingHeaderItem icon={Images.Setup_invitation} title='我的邀请码'/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.HistoryList()}>
                    <SettingHeaderItem icon={Images.Setup_history} title='历史记录'/>
                </TouchableOpacity>
                
            </View>
        )
    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        cells.push(<SpacingView/>)
        for (let i = 0; i < dataList.length; i ++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j ++) {
                let data = sublist[j]
                let cell = <SettingCell title={data.title} image={data.image} subtitle={data.subtitle}/>
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }
        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationItem icon={Images.Navigator_Img}
                                rightText={this.state.rightText}
                                rightOnPress={() => this.quitLogin()}
                            />
                <ScrollView style={{backgroundColor: Colors.bacGray}}>
                    {this.renderHeader()}
                    {this.renderItemView()}
                    {this.renderCells()}
                </ScrollView>
            </View>

        )
    }

    quitLogin() {
        DeviceStorage.delete('userData');
        this.setState({
            rightText: String,
            userData: Object
        })
    }

    readUserData() {
        DeviceStorage.get('userData').then((item) => {
            if(item == null) {
                this.setState({
                    rightText: String,
                    userData: Object
                })
            }else {
                let json = JSON.parse(item);
                this.setState({
                  rightText: '退出',
                  userData: json.data
                })
            }
            
        })
    }

    getDataList() {
        return (
            [
                [
                    {title: '字体大小', image: Images.Setup_font, subtitle:'小'},
                    {title: '接收推送', image: Images.Setup_tuisong},
                    {title: '清理缓存', image: Images.Setup_memory, subtitle:'0 M'},
                    {title: '关于', image: Images.Setup_about}
                ],
                [
                    {title: '客服电话', image: Images.Setup_phone, subtitle: '028-8459411'}
                ]
            ]
        )
    }

    // jumpLoginView() {
    //     navigate('Login', {name:'Jane'})
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        height: 110,
        flexDirection: 'column',
        // alignItems: 'center'
        flex: 1,
    },

    headerBack: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
    },

    avatar: {
        borderRadius: 28,
        left: (screen.width - 56)/2,
        width: 56,
        height: 56,
        marginTop: 20
    },

    userName: {
        marginTop: 5,
        color: 'black',
        fontSize: 16,
        justifyContent: 'center',
        width: screen.width,
        lineHeight: 29,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios: {
                lineHeight: 29,
            },
            android: {

            }
        })
    }
})