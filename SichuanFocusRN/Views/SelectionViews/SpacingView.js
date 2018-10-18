import React, {Component} from 'react';
import {View} from 'react-native'
import screen from './../../Pages/Configs/screen'

export default class SpacingView extends Component {
    render() {
        return (
            <View style={{width: screen.width, height: 20, backgroundColor: '#eaeaea'}}></View>
        )
    }
}