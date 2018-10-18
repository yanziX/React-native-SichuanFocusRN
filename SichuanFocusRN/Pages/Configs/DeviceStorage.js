import React, {Component} from 'react';
import {AsyncStorage} from 'react-native'

class DeviceStorage {

    /**
     * 获取
     * @param {*} key 
     * 示例:  DeviceStorage.save('userData', responseText);
                    DeviceStorage.get('userData').then((item) => {
                        let json = JSON.parse(item);
                        alert(item);
                    });
     */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }

    /**
     * 保存
     * @param {*} key 
     * @param {*} value 
     */
    static save(key, value) {
        return AsyncStorage.setItem(key,JSON.stringify(value));
    }

    /**
     * 更新
     * @param {*} key 
     * @param {*} value 
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        })
    }

    /**
     * 删除某项
     * @param {*} key 
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}

export default DeviceStorage;