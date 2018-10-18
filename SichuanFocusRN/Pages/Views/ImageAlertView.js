import React, {Component} from 'react';
import {Modal, TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native'
import Colors from '../Configs/Colors';
import { yellow } from 'ansi-colors';
import api from '../Configs/api';
import screen from '../Configs/screen'

const props = require('prop-types')

export default class ImageAlertView extends Component {

    static props = {
        imageUrl: String,
        onPress: Function
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal transparent={true}
                        visible={this.state.modalVisible}>
                        <Image style={{flex: 1, backgroundColor: yellow, resizeMode: 'contain'}}
                           source={{uri: this.props.imageUrl}}>
                
                    </Image>
                </Modal>
            </View>
            // <Modal
            //     visible = {this.props.visibility}
            //     transparent = {false}
            //     animationType = {'fade'}
            //     onRequestClose = {()=> this.setState({visibility: false})}
            // >
            //     <Text>图片弹窗</Text>
            //      <TouchableOpacity style={{backgroundColor: Colors.gray, flex: 1, width: screen.width, height: screen.height}}
            //                          onPress = {this.props.onPress}>
            //         <Image style={{flex: 1, backgroundColor: yellow, resizeMode: 'contain'}}
            //                source={{uri: this.props.imageUrl}} >
            //         </Image>
            //      </TouchableOpacity>
            // </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'gray', 
        width: screen.width, 
        height: screen.height,
        position: 'absolute',
        top: 0
    }
})