import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native'
import Colors from "../Configs/Colors";
import Images from "../../Image/images";

type Props = {
    title: string,
    image: any,
    subtitle?: string
}

export default class SettingCell extends Component<Props>{
    render() {

        let icon = this.props.image && <Image style={styles.icon} source={this.props.image}/>

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.content}>
                        {icon}
                        <Text style={styles.title}>{this.props.title}</Text>
                        <View style={{flex: 1, backgroundColor: 'blue'}}></View>
                        <Text style={styles.value}>{this.props.subtitle}</Text>
                        <Image style={styles.arrow} source={Images.Arrow_icon}/>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },

    content: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10
    },

    icon: {
        width: 20,
        height: 20,
    },

    title: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10
    },

    arrow: {
        width: 20,
        height: 20,
        marginRight: 0,
        resizeMode: 'contain'
    },

    value: {
        marginRight: 5,
        fontSize:16,
        color: Colors.gray
    }
})
