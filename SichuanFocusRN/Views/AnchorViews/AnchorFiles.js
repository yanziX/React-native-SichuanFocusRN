//主播档案
import React, {Component} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import screen, { scale } from './../../Pages/Configs/screen'
import AnchorFileItem from './AnchorFileItem';

export default class AnchorFiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        let {newsArray} = this.props;
        let infosArr = newsArray[0].value

        let filesItems = infosArr.map(
            (info, i) => (
                <AnchorFileItem 
                    anchorFile={info}    
                />
            )
        )
        let array = []
        //5个一行
        let pageCount = Math.ceil(filesItems.length / 5)
        for (let i = 0; i < pageCount; i++) {
            //分割数组，5个一组
            let items = filesItems.slice(i*5, i*5+5)
            let menuView = (
                <View style={styles.menuContainer}>{items}</View>
            )
            array.push(menuView)
        }
        
        

        return (
            <View style={styles.container}>
                

                {array}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        flexDirection: 'column'
    },

    switchView: {
        // width: scale(320),
        height: scale(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuContainer: {
        flexDirection: 'row',
    },

    cityText: {

    }
})