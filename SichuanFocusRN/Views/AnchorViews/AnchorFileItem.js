import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import screen, { scale } from './../../Pages/Configs/screen'
import api from '../../Pages/Configs/api';

export default class AnchorFileItem extends Component {
    render() {
        let {anchorFile} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <Image style={styles.icon} source={{uri: api.StaticBaseUrl+anchorFile.anchorAvatar}}></Image>
                <Text numberOfLines={1}>{anchorFile.anchorName}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width / 5,
        height: screen.width / 5+10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: scale(114),
        height: scale(114),
        margin: 5,
        borderRadius: scale(57)
    },
    name: {
        color: 'black',
        fontSize: 14,
        lineHeight: 30,
    }
})