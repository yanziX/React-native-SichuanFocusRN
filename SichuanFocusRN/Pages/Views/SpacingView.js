import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'

export default class SpacingView extends Component{
    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        opacity: 0,
        height: 20
    }
})