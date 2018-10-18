import React, {Component} from 'react'

class Tools extends Component{

    /**
     * 将输入的秒数
     */
    static format(ms) {
        let fmt = '';
        let minute = parseInt(ms, 10);
        let second = 0;

        if(minute <= 60) {
            fmt = minute < 10 ? `00:0${minute}` : `00:${minute}`;
        }else {
            second = Math.floor(minute / 60);
            second = second < 10 ? `0${second}` : second;
            minute = Math.floor(minute % 60);
            minute = minute < 10 ? `0${minute}` : minute;
            fmt = `${second}:${minute}`;
        }
        return fmt;
    }
}

export default Tools;