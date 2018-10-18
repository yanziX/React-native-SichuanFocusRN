import {Dimensions, Platform} from 'react-native'

import {Images} from './../../Image/index'
import { px2dpx } from './Tools'


// 通过系统API获得屏幕宽高
let { height, width } = Dimensions.get('window');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 屏幕适配
global.px2dp = px2dpx;
// 图片加载
global.Image = Images;
