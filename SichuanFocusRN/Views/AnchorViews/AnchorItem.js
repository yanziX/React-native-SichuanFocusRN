import React, {Component} from 'react';
import {View, Text} from 'react-native'
import AnchorRecommend from './AnchorRecommend';
import AnchorFiles from './AnchorFiles'
import TimeLineView from './TimeLineView'

export default class AnchorItem extends Component {
    render() {
        let {infoItem, itemKey, infoArray} = this.props;
        let view;
        switch (itemKey) {
            case "主播动态": {
                view = <TimeLineView newsItem={infoItem}></TimeLineView>
                break;
            }
            case "主播推荐": {
                view = <AnchorRecommend newsArray={infoArray} ></AnchorRecommend>
                break;
            }
            case "主播档案": {
                view = <AnchorFiles newsArray={infoArray}></AnchorFiles>
                break;
            }
            default: {
                view = <Text>lala</Text>
                break;
            }
        }
        return (
            view
        )
    }
}