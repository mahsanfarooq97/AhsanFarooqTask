/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Animated',
  'source.uri should not be an empty string',
]);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
