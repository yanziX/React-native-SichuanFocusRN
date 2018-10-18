import React, {Component} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import ScrollableTab from './../Views/Scrollable-tab-view/ScrollableTab';
import Selection from './../Home/Selections'
import CurrentEvents from './../Home/CurrentEvents'
import Live from './../Home/Live'
import SpecialTopic from './../Home/SpecialTopic'
import Anchor from './Anchor';
import CityState from './CityState';

const screenW = Dimensions.get('window').width;

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTab 
                    
                >
                    {['精选', '时讯', '直播', '主播', '市州', '专题', ].map((item, index) => {
                    let view = null;
                    switch (item) {
                        case '精选': {
                            view = <Selection tabLabel={item}/>
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
                        case '主播': {
                            view = <Anchor tabLabel={item}/>
                            break;
                        }
                        case '市州': {
                            view = <CityState tabLabel={item}/>
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
        marginTop: 0
    },
})