import React, {Component} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import ScrollableTab from './ScrollableTab';
import Home from '../../../Pages/Home/Home'
import CurrentEvents from '../../../Pages/Home/CurrentEvents'
import Live from '../../../Pages/Home/Live'
import SpecialTopic from '../../../Pages/Home/SpecialTopic'

const screenW = Dimensions.get('window').width;

export default class ScrollTabDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTab 
                    
                >
                    {['精选', '时讯', '直播', '专题','精选', '时讯', '直播', '专题','精选', '时讯', '直播', '专题'].map((item, index) => {
                    let view = null;
                    switch (item) {
                        case '精选': {
                            view = <Home tabLabel={item}/>
                            break;
                        }
                        case '时讯': {
                            view = <CurrentEvents tabLabel={item}/>
                            break;
                        }
                        case '直播': {
                            view = <Live tabLabel={item}/>
                            break;
                        }
                        case '专题': {
                            view = <SpecialTopic tabLabel={item}/>
                            break;
                        }
                        default: {
                            view = <SpecialTopic tabLabel={item}/>
                            break;
                        }
                    }
                    return (
                       view
                    )
                })}
                </ScrollableTab>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        marginTop: 22
    },
})