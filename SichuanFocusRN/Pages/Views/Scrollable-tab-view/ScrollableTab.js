import React, {Component} from 'react';
import {View, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native'
import DefaultTabBar from './DefaultTabBar';
import PropTypes from 'prop-types'
import ScrollableTabBar from './ScrollableTabBar'

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTab extends Component {

    static propTypes = {
        prerenderingSiblingsNumber: PropTypes.number, //预加载页面
    }

    static defaultProps = {
        prerenderingSiblingsNumber: 1,  //0为不需要预加载，1为预加载1个
    }

    //构造
    constructor(props) {
        super(props);
        this.state = {
            containerWidth: screenW,
            currentPage: 0, //当前页面
            scrollXAnim: new Animated.Value(0),
            scrollValue: new Animated.Value(0),

            //每一个加载过的和需要加载的页面用一个对应的集合sceneKeys对应起来
            sceneKeys: this._newSceneKeys({currentPage: 0}),
        };
    }

    componentDidMount() {
        //设置scroll动画监听
        this.state.scrollXAnim.addListener(({value}) => {
            let offset = value / this.state.containerWidth;
            this.state.scrollValue.setValue(offset);
        })
    }

    componentWillMount() {
        this.state.scrollXAnim.removeAllListeners();
        this.state.scrollValue.removeAllListeners();
    }

    render() {
        return (
            <View style={styles.container}
                onLayout={this._onLayout}
            >
            {this._renderTabView()}
            {this._renderScrollableContent()}
            </View>
        )
    }


    _renderTabView() {
        let tabParams = {
            tabs: this._children().map((child)=>child.props.tabLabel),
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth
        };
        return (
            <ScrollableTabBar
                {...tabParams}
                style={[{width: this.state.containerWidth}]}
                onTabClick={(page) => this.gotoPage(page)}
            />
        );
    }

    /**
     * 渲染主体内容
     */
    _renderScrollableContent() {
        return (
            <Animated.ScrollView

                ref={(ref) => {
                    this._scrollView = ref;
                }}

                style={{flex: 1}}
                pagingEnabled={true}
                horizontal={true}
                onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
                onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
                scrollEventThrottle={15}
                onScroll={Animated.event([{
                    nativeEvent: {contentOffset: {x: this.state.scrollXAnim}}
                }], {
                    useNativeDriver: true,
                })}
                bounces={false}
                scrollToTop={false}
            >
                {/* {this.props.children} */}
                {this._renderContentView()}
            </Animated.ScrollView>
        )
    }

    /**
     * 渲染子view
     */
    _renderContentView() {
        let scenes = [];
        this._children().forEach((child, index) => {
            const sceneKey = this._makeSceneKey(child, index);
            let scene = null;
            if (this._keyExists(this.state.sceneKeys, sceneKey)) {
                scene=(child);
            } else {
                scene = (<View tabLabel={child.tabLabel}></View>)
            }
            scenes.push(
                <View
                    key={child.key}
                    style={{width: this.state.containerWidth}}
                >
                    {scene}
                </View>
            )
        });
        return scenes;
    }

    _children(children = this.props.children) {
        return React.Children.map(children, (child)=>child);
    }

    /**
     * 获取控件宽度
     */
    _onLayout = (e) => {
        let {width} = e.nativeEvent.layout;
        if (this.state.containerWidth !== width) {
            this.setState({
                containerWidth: width
            })
        }
    }

    /**
     * scrollview开始跟结束滑动回调
     */
    _onMomentumScrollBeginAndEnd = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x;
        let page = Math.round(offsetX / this.state.containerWidth);
        if(this.state.currentPage !== page) {
            console.log('dangq页面-->'+page);
            // this.setState({
            //     currentPage: page
            // })
            this._updateKeyScenes(page);
        }
    }

    /**
     * 更新scenekey和当前页面
     * @param {*} nextPage 
     */
    _updateKeyScenes(nextPage) {
        let sceneKeys = this._newSceneKeys({previousKeys: this.state.sceneKeys, currentPage: nextPage})
        this.setState({
            currentPage: nextPage,
            sceneKeys: sceneKeys
        })
    }

    /**
     * 滑动到指定位置
     * @param pageNum page下标
     * @param scrollAnimation 是否需要动画
     */
    gotoPage(pageNum, scrollAnimation = true) {
        if (this._scrollView && this._scrollView._component && this._scrollView._component.scrollTo) {
            this._scrollView._component.scrollTo({x: pageNum * this.state.containerWidth, scrollAnimation});
            // this.setState({
            //     currentPage: pageNum,
            // });
            this._updateKeyScenes(pageNum);
        }
    }

    /**
     * 生成需要渲染的页面跟渲染过的页面集合
     * @param  previousKeys 之前的集合
     * @param  currentPage 当前页面
     * @param children  子控件
     */
    _newSceneKeys({previousKeys = [], currentPage = 0, children = this.props.children,}) {
        let newKeys = [];
        this._children().forEach((child, index) => {
            const key = this._makeSceneKey(child, index);
            //页面是否渲染过||是否需要预加载
            if(this._keyExists(previousKeys, key) || this._shouldSceneRender(index, currentPage)) {
                newKeys.push(key)
            }
        });
        return newKeys;
    }

    /**
     * 生成唯一的key
     * @param child 子控件
     * @param index 下标
     */
    _makeSceneKey(child, index) {
        return (child.props.tabLabel + '_' + index);
    }

    /**
     * 判断key是否存在
     * @param {*} previousKeys key集合
     * @param {*} key 当前key
     */
    _keyExists(previousKeys, key) {
        return (previousKeys.find((sceneKey) => sceneKey === key));
    }

    /**
     * 是否需要预加载
     * @param {*} index 
     * @param {*} currentPage 
     */
    _shouldSceneRender(index, currentPage) {
        const siblingsNumber = this.props.prerenderingSiblingsNumber;
        //比如当前页面为1，预加载1个，也就是我们需要显示0、1、2三个页面，所以[-1<x<3]
        return (index < currentPage + siblingsNumber + 1) && index > (currentPage - siblingsNumber - 1);
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        marginTop: 0
    },

    tabContainer: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },

    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})