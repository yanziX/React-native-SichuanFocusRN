import React, {Component} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native'
import Protypes from 'prop-types'
import CurrentNewsItem from './CurrentNewsItem';
import api from './../../Pages/Configs/api'
import SpacingView from './SpacingView';
import { Actions } from 'react-native-router-flux';

export default class CurrentNewsView extends Component {

    static propTypes = {
        currentNewsUrl: Protypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            dateNewsArray: [],
            newsList: [],
            loaded: false,
            dateIndex: 0
        }
    }

    render() {
        if(this.state.loaded) {
            let {onTabBabbarClick} = this.props;
            return (
                <FlatList
                    data = {this.state.newsList}
                    renderItem = {this.renderItem}
                    style={styles.container}
                ></FlatList>
            )
        } else {
            this.getCurrentNewsDateArray();
            return (
                <Text>数据还未加载</Text>
            )
        }
    }

    renderItem({item}) {
        // let {viewClick} = this.props;
        return(
            <TouchableOpacity  onPress={() => {Actions.NewsDetail({'item': item})}}>
                <CurrentNewsItem newsItem={item} />
            </TouchableOpacity>
            
        )  
    }

    

    getCurrentNewsDateArray() {
        if (this.props.currentNewsUrl) {
            fetch(this.props.currentNewsUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                 dateNewsArray: json.data.newsArray
                })
                this.requestNewsData();
            })
            .catch((error) => {
             alert(error)
         })
        }
    }


    requestNewsData() {
        let dateObj = this.state.dateNewsArray[this.state.dateIndex];
        let newsListUrl = dateObj.newsListUrl

            fetch(api.StaticBaseUrl + newsListUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loaded: true,
                    newsList: this.state.newsList.concat(json.data.newsList),
                    dateIndex: this.state.dateIndex + 1,
                })
                // this.state.newsList.push(<SpacingView />)
            })
            .catch((error) => {
                alert(error)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }
})