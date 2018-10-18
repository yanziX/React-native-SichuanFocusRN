import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, Platform, View } from 'react-native';
import Colors from "../Configs/Colors";

type Props = {
    icon?: any,
    title?: string,
    leftIcon?: any,
    leftOnPress?: Function,
    rightIcon?: any,
    rightText?: string,
    rightOnPress?: Function
}

let height = Platform.OS == 'ios' ? 64 : 44

export default class NavigationBar extends Component<Props>{
    render() {

        let leftIcon;
         if (this.props.leftIcon) {
           leftIcon = (
               <TouchableOpacity style={styles.leftIcon} onPress={this.props.leftOnPress}>
                    <Image source={this.props.leftIcon}/>
               </TouchableOpacity>
           ) 
         }else {
             leftIcon = (
                 <View style={styles.leftIcon}></View>
             )
         }
        
         let rightPlace;
         if (!this.props.rightIcon && !this.props.rightText) {
            rightPlace = (
                <View style={styles.rightIcon}></View>
            )
         }

        let icon = this.props.icon && <Image style={styles.icon} source={this.props.icon} onPress={this.props.leftOnPress}/>
        let rightIcon = this.props.rightIcon && <Image style={styles.rightIcon} source={this.props.rightIcon} onPress={this.props.rightOnPress}/>
        let rightText = this.props.rightText && <Text style={styles.rightText} onPress={this.props.rightOnPress}>{this.props.rightText}</Text>

        return (
            <View>
                <View style={styles.iconContainer}>
                    {leftIcon}
                    {icon}
                    {rightIcon}
                    {rightText}
                    {rightPlace}
                </View>
                <View style={styles.lineView}></View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height
    },

    leftIcon: {
        // flex: 1,
        marginLeft: 10,
        marginTop: 30,
        width: 20,
        height: 20,
        resizeMode:'contain',
    },

    icon: {
        flex: 1,
        marginTop: 25,
        height:35,
        resizeMode: 'contain',
    },

    rightIcon: {
        // flex: 1,
        marginRight: 10,
        marginTop: 30,
        width: 40,
        height: 40
    },

    rightText: {
        // flex: 1,
        marginRight: 10,
        marginTop: 30,
        color: Colors.pink,
        fontSize: 16,
    },

    lineView: {
        height: 2,
        backgroundColor: Colors.line,
        marginBottom: 0
    }

})