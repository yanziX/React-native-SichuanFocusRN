import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native'
import screen from "../Configs/screen";
import Colors from "../Configs/Colors";

type Props = {
    icon: any,
    title: string
}

export default class SettingHeaderItem extends Component<Props>{
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.icon} style={styles.icon}></Image>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: screen.width / 4,
        height:70
    },

    icon: {
        marginTop: 10,
        width: screen.width / 4,
        height: 25,
        resizeMode: 'contain'
    },

    title: {
        marginTop: 5,
        color: Colors.contentText,
        fontSize: 16
    }
})