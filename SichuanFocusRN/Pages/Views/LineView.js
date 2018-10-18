import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import Colors from "../Configs/Colors";


export default class LineView extends Component{
    render() {
        return (
            <View style={Styles.container}></View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.line,
        height: 1
    }
})