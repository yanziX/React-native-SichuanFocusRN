import React, {Component} from 'react'
import {StyleSheet, FlatList, View} from 'react-native'
import { Actions } from 'react-native-router-flux';
import NavigationBar from '../Views/NavigationBar';
import Images from '../../Image/images'
// import DeviceRealm from '../Configs/DeviceRealm'

export default class HistoryList extends Component {
    
    static navigationOptions = {
        header: null
    }

    render() {
        // let arrs = DeviceRealm.selectAll;
        return (
            <View style={{flex: 1}}>
                <NavigationBar 
                    leftIcon={Images.Return_btn}
                    icon={Images.Navigator_Img}
                    leftOnPress={() => Actions.pop()}
                    rightText='清空'
                    rightOnPress={() => alert('清空')}
                ></NavigationBar>
                <FlatList></FlatList>
            </View>
            
        )
    }
}