/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FluxRouter from './Pages/FluxRouter'

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => FluxRouter);
