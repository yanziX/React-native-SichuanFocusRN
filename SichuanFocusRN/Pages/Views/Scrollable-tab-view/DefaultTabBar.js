import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated} from 'react-native';
import PropTypes from 'prop-types'

const screenW = Dimensions.get('window').width;

export default class DefaultTabBar extends Component {
    static propTypes = {
        tabs: PropTypes.array,
        activeTab: PropTypes.number,  //当前选中的tab
        style: PropTypes.object,
        onTabClick: PropTypes.func,
        containerWidth: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let {containerWidth, tabs, scrollValue}=this.props;
       // 给传来的动画一个插值器
        const left = scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, containerWidth / tabs.length,],
        });
        let tabStyle = {
            width: containerWidth / tabs.length,
            position: 'absolute',
            bottom: 0,
            left,
        }

        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page
                    return this._renderTab(name, page, isTabActive);
                })}
                <Animated.View 
                    style={[styles.tabLineStyle, tabStyle]}
                />
            </View>
        )
    }

    _renderTab(name, page, isTabActive) {
        let tabTextStyle = null
        //如果被选中
        if(isTabActive) {
            tabTextStyle = {
                color: 'red'
            };
        }else {
            tabTextStyle = {
                color: 'black'
            }
        }
        return (
            <TouchableOpacity
                key={name+page}
                style={styles.tabStyle}
                onPress={()=>this.props.onTabClick(page)}
            >
                <Text style={[tabTextStyle]}>{name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLineStyle: {
        height: 2,
        backgroundColor: 'red'
    }
})