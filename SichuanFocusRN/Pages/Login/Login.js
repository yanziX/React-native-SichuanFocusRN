import React, { Component } from 'react';
import {Image, StyleSheet, View, TextInput, Button, Alert, DeviceEventEmitter, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Images from "../../Image/images";
import screen from './../Configs/screen'
import Colors from "../Configs/Colors";
import api from "../Configs/api";
import DeviceStorage from '../Configs/DeviceStorage';

export default class Login extends Component{

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            inputedNum:'',
            inputedPW:'',
            userData: Object
        };
        // this.updatePhoneNum = this.updatePhoneNum(this);
        // this.updatePW = this.updatePW(this);
    }

    //更新电话号码
    updatePhoneNum(phone) {
        this.setState(() => {
            return {
                inputedNum: phone
            };
        });
    }

    updatePW(pw) {
        this.setState(() => {
            return {
                inputedPW: pw
            };
        });
    }

    back() {
        Actions.pop({refresh:({'isRefresh': true})})
        DeviceEventEmitter.emit('changeUserData', {'isRefresh': true})
    }

    alert =() => {
        alert(this.state.inputedPW);
    }

    getCode(url, value) {

        let formData = new FormData();
        formData.append("phoneNumber",value);
        console.log('电话号码是' + value)
        var opts = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json',
            },
            body: formData
        }
        this.PostRequest(url, opts)
    }

    login(url, phone, code) {
        let formData = new FormData();
        formData.append("authCode",code);
        formData.append("isOpenLogin",false);
        formData.append("openAvatar","");
        formData.append("openId","");
        formData.append("openName","");
        formData.append("openType","");
        formData.append("phoneNumber",phone)
        var opts = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json',
            },
            body: formData
        }
        this.PostRequest(url, opts)
    }

    PostRequest = (url, opts) => {

        fetch(url, opts)
            .then((response) => {
                return response.text();
             })
            .then((responseText) => {
                let value = JSON.parse(responseText);
                if(value.rs === 200) {
                    if(url === api.login) {
                        DeviceStorage.save('userData', responseText);
                        this.back();
                    }
                    
                }else {
                    alert(value.error);
                   
                }
            }).catch((error) => {
                alert(error)
        })
    }


    render() {
        return (

            <View style={styles.container}>


                <TouchableOpacity onPress={this.back}>
                    <Image style={styles.backBtn} source={Images.Loginback_btn} />
                </TouchableOpacity>


                <Image source={Images.Login_logo} style={{marginTop: 84, width:screen.width, resizeMode:'contain'}}/>

                <TextInput placeholder="请输入手机号" style={styles.phoneTextInput}
                           onChangeText={(text) => this.updatePhoneNum(text)}/>

                <View style={styles.codeView}>
                    <TextInput placeholder="请输入验证码" style={styles.codeTextInput}
                               onChangeText={(text) => this.updatePW(text)}/>

                    <TouchableOpacity style={styles.codeBtn}>
                        <Button title='获取验证码' color='white' fontSize={13}
                                onPress={this.getCode.bind(this,api.getCode, this.state.inputedNum)}></Button>
                    </TouchableOpacity>
                </View>


                <View style={styles.loginBtn}>
                    <Button title='登录' color='white' fontSize={13}
                            onPress={this.login.bind(this,api.login,this.state.inputedNum, this.state.inputedPW)}></Button>
                </View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },

    backBtn: {
        marginTop: 30,
        marginLeft: 10,
        width: 30,
        resizeMode: 'contain'
    },

    phoneTextInput: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 5
    },

    codeView: {
        flexDirection: 'row',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 40,

    },

    codeTextInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        width:screen.width - 200
    },

    codeBtn: {
        backgroundColor: Colors.pink,
        borderRadius: 5,
        marginLeft: 20,
        // marginTop: 20,
        height:40,
        width: 100
    },

    loginBtn: {
        marginLeft: 40,
        marginRight: 40,
        height: 40,
        marginTop: 20,
        backgroundColor: Colors.pink,
        borderRadius: 5
    }


})