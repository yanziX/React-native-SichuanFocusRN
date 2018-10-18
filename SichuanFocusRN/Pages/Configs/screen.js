import { Dimensions, Platform, PixelRatio } from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0),

}

// 设计图上的比例，宽度
let basePx = Platform.OS === 'ios' ? 750 : 720;

let widdowWidth = Dimensions.get('window').width

P2px = function px2dp(px: number): number {
    return px / basePx * SCREEN_WIDTH;
};

export const scale = (uiElemPx) => {
    return uiElemPx * widdowWidth / basePx
}