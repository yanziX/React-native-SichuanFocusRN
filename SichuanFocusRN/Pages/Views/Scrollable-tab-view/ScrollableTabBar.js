import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView} from 'react-native';
import PropTypes from 'prop-types'

const screenW = Dimensions.get('window').width;

export default class ScrollableTabBar extends Component {

    static propTypes = {
        tabs: PropTypes.array,
        activeTab: PropTypes.number,  //当前选中的tab
        style: PropTypes.object,
        onTabClick: PropTypes.func,
        containerWidth: PropTypes.number,
    }

    constructor(props) {
        super(props);
        //初始状态
        this.state = {
            _leftTabUnderline: new Animated.Value(0),
            _widthTabUnderline: new Animated.Value(0),
        };
    }

    componentDidMount() {
        //监听scrollValue动画
        this.props.scrollValue.addListener(this._updateView);
    }

    render() {

        let {containerWidth, tabs, scrollValue}=this.props;
    //    // 给传来的动画一个插值器
    //     const left = scrollValue.interpolate({
    //         inputRange: [0, 1,], outputRange: [0, containerWidth / tabs.length,],
    //     });
        let tabStyle = {
            width: this.state._widthTabUnderline,
            position: 'absolute',
            bottom: 0,
            left: this.state._leftTabUnderline,
        }

        return (
            <View style={[styles.container, this.props.style]}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    ref={(scrollView) => {
                        this._scrollView = scrollView;
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    directionalLockEnabled={true}
                    bounces={false}
                    scrollsToTop={false}
                >
                    <View style={styles.tabContainer}>
                        {tabs.map((tab, index) => {
                            return this._renderTab(tab, index, index === this.props.activeTab);
                        })}
                        <Animated.View style={[styles.tabLineStyle, tabStyle]} />
                    </View>
                </ScrollView>
            </View>
        )
    }

    _renderTab(name, page, isTabActive) {
        let tabTextStyle = null
        //如果被选中
        if(isTabActive) {
            tabTextStyle = {
                color: 'red'
            };
            lineStyle = {
                opacity: 1
            }
        }else {
            tabTextStyle = {
                color: 'black',
            };
            lineStyle = {
                opacity: 0
            }
        }
        return (
            <TouchableOpacity
                key={name+page}
                style={styles.tabStyle}
                onPress={()=>this.props.onTabClick(page)}
                onLayout={(event)=>this._onMeasureTab(page, event)}
            >
                <Text style={[tabTextStyle]}>{name}</Text>
                <View style={[styles.tabLineStyle, lineStyle]}></View>
            </TouchableOpacity>
        )
    }

    /**
     * 根据scrollview的滑动改变底部线条的宽度跟left
     */
    _updateView = ({value = 0}) => {
        //因为value 的值是[0-1-2-3-4]变换
        const position = Math.floor(value);
        //取小数部分
        const offset = value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;
        //如果没有tab||（有bounce效果）直接return
        if (tabCount === 0 || value < 0 || value > lastTabPosition) {
            return;
        }
        // if (this._necessarilyMeasurementsCompleted(position, position === tabCount - 1)) {
        //     this._updateTabLine(position, offset);
        // }
    }

    /**
     * 判断是否需要跟新的条件是否初始化
     * @param {*} position 
     * @param {*} isLast 是否是最后一个
     */
    _necessarilyMeasurementsCompleted(position, isLast) {
        return (
            this._tabsMeasurements[position] && 
            (isLast || this._tabsMeasurements[position + 1])
        );
    }

    /**
     * 测量tabView
     * @param  page 页面下标
     * @param {*} event 事件
     */
    _onMeasureTab(page, event) {
        let {nativeEvent: {layout:{x, width}}}=event;
        // this._tabsMeasurements[page] = {left: x, right: width + x, width: width};
        this._updateView({value: this.props.scrollValue._value})
    }

    /**
     * 更新底部view的left跟width
     * @param {*} position 
     * @param {*} offset 
     */
    _updateTabLine(position, offset) {
        //当前tab的测量值
        const currMeasure = this._tabsMeasurements[position];
        //position+1的tab的测量值
        const nextMeasure = this._tabsMeasurements[position + 1];
        let width = currMeasure.width * (1 - offset);
        let left= currMeasure.left;
        if (nextMeasure) {
            width += nextMeasure.width * offset;
            left+=nextMeasure.width*offset;
        }
        this.state._leftTabUnderline.setValue(left);
        this.state._widthTabUnderline.setValue(width);
    }

}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        height: 50,
    },

    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabStyle: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    tabLineStyle: {
        height: 1,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        width: 40
    }
})