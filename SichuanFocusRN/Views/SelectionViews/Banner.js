import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import screen from './../../Pages/Configs/screen'
import Protypes from 'prop-types'
import api from './../../Pages/Configs/api';

export default class Banner extends Component{

static propTypes = {
        isShow: Protypes.bool,
        item: Protypes.string,
        defaultText: Protypes.string
}

constructor(props) {
    super(props);
    this.state = {
        bannerData: [],
        loaded: false
    }
}


    render() {
        let H = 200;
        if (this.state.loaded) {
            let items = this.state.bannerData
            return (
                <View style={{height: H, alignItems: 'center', backgroundColor: 'white'}}>
                    <Swiper autoplay={true} height={H} showsPagination={true} dotColor='white' activeDotColor='red' horizontal={true}>
                        {
                            items.map((item, index) => {
                                return (
                                    <TouchableOpacity style={styles.container} onPress={()=>this.props.onTabBabbarClick(item)}>
                                        <Image style={styles.imageView} key={index} resizeMode='cover' source={{uri: api.StaticBaseUrl + item.newsImage}}></Image>
                                         <Text style={styles.textView}>{item.newsTitle}</Text>
                                    </TouchableOpacity>
                                
                                )
                            })
                        }
                    </Swiper>
                    
                </View>
            )
        }else {
            this.requestData();
            return (
                <Text>{this.props.defaultText}</Text>
            )
        }
    }

    requestData() {
        if (this.props.item) {
            fetch(this.props.item) 
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.setState({
                    bannerData: this.state.bannerData.concat(json.data.newsList),
                    loaded: true
                })
            })
            .catch((error) => {
                alert(error)
            });
        }      
    }
}


const styles = StyleSheet.create({

    container: {
        width: screen.width,
        height: 200,
        backgroundColor: 'white'
    },

    imageView: {
        width: screen.width,
        height: 200
    },

    textView: {
        width: screen.width,
        height: 40,
        marginBottom: 0,
        // top: 160,
        backgroundColor: 'black',
        color: 'white'
    }
})