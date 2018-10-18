import React, {Component} from 'react'


const Realm = require('realm')

const HistorySchema = {
    name: 'HistoryList',
    primaryKey: 'id',
    properties: {
        newsId: 'string',
        newsImage: 'string',
        newsMediaLength: 'string',
        newsTitle: 'string',
        newsType: 'string',
        newsUrl: 'string',
        pubTime: 'string',
        skipType: 'string',
    }
}

class DeviceRealm extends Realm.Object{
    // 
    static createHistoryData(item) {
        let realm = new Realm({schema: [HistorySchema]});
        realm.write(() => {
            realm.create('HistoryList',
             {newsId: item.newsId, 
              newsImage: item.newsImage, 
              newsMediaLength: item.newsMediaLength,  
              newsTitle: item.newsTitle,
              newsType: item.newsType,
              newsUrl: item.newsUrl,
              pubTime: item.pubTime,
              skipType: item.skipType,  
            })
        })
    }

    static update(item) {
        let realm = new Realm({schema: [HistorySchema]});
        realm.create(() => {
            realm.create('HistoryList', {
              newsId: item.newsId, 
              newsImage: item.newsImage, 
              newsMediaLength: item.newsMediaLength,  
              newsTitle: item.newsTitle,
              newsType: item.newsType,
              newsUrl: item.newsUrl,
              pubTime: item.pubTime,
              skipType: item.skipType,  
            }, true);
        })
    }

    static selectAll() {
        let realm = new Realm({scheme: [HistorySchema]})
        let arrs = realm.objects('HistoryList');
        return arrs;
    }

    static removeData() {
        let realm = new Realm({schema: [HistorySchema]});
        realm.write(() => {
            let Historys = realm.objects('HistoryList');
            realm.delete(Historys)
        })
    }
}

export default DeviceRealm;