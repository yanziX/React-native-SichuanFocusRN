import React from 'react';
import { StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter } from 'react-native';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    Tabs,
    Modal,
    Stack,
} from 'react-native-router-flux';

import TabIcon from './Views/TabIcon'
import HomeScene from './Home/Home'
import SubmissionScene from './Submission/Submission'
import SettingScene from './Setting/Setting'

import Login from './Login/Login'
import Images from '../Image/images'
import color from './Configs/Colors'
import NewsDetail from './Home/NewsDetial'
import TopicsNewsList from './Home/TopicsNewsList'
import MoreHotVideoList from './Home/MoreHotVideoList'
import CityStateDetail from './Home/CityStateDetail'
import AnchorRecommendDetail from './Home/AnchorRecommendDetail'
import TimelinesList from './Home/TimelinesList'
import HistoryList from './Setting/HistoryList'

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        // console.log('ACTION:',action,Actions.currentScene)
        // console.log('Actions:', Actions);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: 'white',
    // shadowOpacity: 1,
    // shadowRadius: 3,
});

const onBackPress = () => {
    console.log(Actions.state);
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}

const frouter = (...props) => (
    <Router createReducer={reducerCreate}
            getSceneStyle={getSceneStyle}
            backAndroidHandler={onBackPress}
    >
        <Scene
            hideNavBar
        >
            <Stack hideNavBar headerMode='screen' key="root">
                <Tabs
                    key="tabbar"        // 唯一标识
                    wrap={true}         // 自动使用自己的导航栏包装每个场景
                    showLabel={false}   // 显示文字
                    tabBarStyle={styles.tabBarStyle} // tabBar的样式
                    swipeEnabled={false}// 是否可以滑动
                    headerMode='screen' // 页面切换方式
                    icon={TabIcon}      // 自定义Icon显示方式
                    lazy={true}         // 是否默认渲染tabbar
                    tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                    activeBackgroundColor='white'   // 选中tabbar的背景色
                    inactiveBackgroundColor='white' // 未选中tabbar的背景色
                    activeTintColor= {color.pink}     // 选中tabbar图标的颜色
                    inactiveTintColor= {color.gray}        // 未选中tabbar图标的颜色
                >
                    <Stack key="Home"
                           title={'首页'}
                           image={Images.HOMETAB_NORMAL}
                           selectedImage={Images.HOMETAB_SELECTED}
                    >
                        <Scene component={HomeScene} key="Home_key"/>
                    </Stack>
                    <Stack key='Submission'
                           title='投稿'
                           image={Images.SUBMISSIONTAB_NORMAL}
                           selectedImage={Images.SUBMISSIONTAB_SELECTED}
                    >
                        <Scene component={SubmissionScene} key="Submission_key"/>
                    </Stack>
                    <Stack key="Mine"
                           title='设置'
                           image={Images.SETTINGTAB_NORMAL}
                           selectedImage={Images.SETTINGTAB_SELECTED}
                    >
                        <Scene component={SettingScene} key="Mine_key"/>
                    </Stack>
                </Tabs>
                {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.Test3_key*/}
                <Scene component={SettingScene} key="Mine_key"/>

            </Stack>
            <Stack gesturesEnabled={false}  key="LoginL">
                <Scene
                    title='登录'
                    key="LoginModal"
                    component={Login}
                    gesturesEnabled={true}
                    onExit={() => console.log('onExit')}
                    onLeft={Actions.pop}
                    modal={true}
                />
                {/*<Scene*/}
                    {/*key="LoginPublic"*/}
                    {/*component={LoginPublic}*/}
                    {/*gesturesEnabled={false}*/}
                    {/*hideNavBar*/}
                    {/*onExit={() => console.log('onExit')}*/}
                    {/*onLeft={Actions.pop}*/}
                {/*/>*/}
            </Stack>
            <Stack gesturesEnabled={true} key="newsDetail">
                <Scene
                    title='新闻详情'
                    key="NewsDetail"
                    component={NewsDetail}
                    gesturesEnabled={true}
                    onExit={() => console.log('onExit')}
                    onLeft={Actions.pop}
                />  
            </Stack>
            
            <Stack gesturesEnabled={true} key="topicNewsList">
                <Scene 
                    title='专题列表'
                    key="TopicsNewsList"
                    component={TopicsNewsList}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出专题列表')}
                />
            </Stack>

            <Stack gesturesEnabled={true} key="moreHotVideoList">
                <Scene 
                    title='更多热门视频'
                    key="MoreHotVideoList"
                    component={MoreHotVideoList}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出更多热门视频界面')}
                ></Scene>
            </Stack>

            <Stack gesturesEnabled={true} key="cityStateDetail">
                <Scene
                    key="CityStateDetail"
                    component={CityStateDetail}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出市州列表')}
                ></Scene>
            </Stack>

            <Stack gesturesEnabled={true} key="anchorRecommendDetail">
                <Scene
                    key="AnchorRecommendDetail"
                    component={AnchorRecommendDetail}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出主持人推荐列表')}
                ></Scene>
            </Stack>

            <Stack gesturesEnabled={true} key="timelinesList">
                <Scene
                    key="TimelinesList"
                    component={TimelinesList}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出主播动态列表')}
                ></Scene>
            </Stack>

            <Stack gesturesEnabled={true} key="historyList">
                <Scene
                    key="HistoryList"
                    component={HistoryList}
                    gesturesEnabled={true}
                    onLeft={Actions.pop}
                    onExit={() => console.log('退出历史记录')}
                ></Scene>
            </Stack>
        </Scene>
    </Router>
);

export default frouter;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height:49,
    },
});