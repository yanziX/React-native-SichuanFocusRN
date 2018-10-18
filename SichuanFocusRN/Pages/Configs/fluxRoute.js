import React, { Component } from 'react'
import {Router, Scene} from 'react-native-router-flux'
import Setting from './../Setting/Setting'
import Login from './../Login/Login'

const fluxRoute = () => {
    return (
        <Router>
            <Scene key="Setting">
                <Scene key="setting"
                       component={Setting}
                       title="Setting"
                       initial
                />
                <Scene key="gray"
                       component={Login}
                       title="Login"
                />
            </Scene>
        </Router>
    )
}

export default fluxRoute;