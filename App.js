import React, { Component } from 'react';
import Navigator from './src/config/navigation';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers/index';
import config from "./src/config";
import logger from 'redux-logger';
import { Permissions, Notifications } from 'expo';

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

const PUSH_REGISTRATION_ENDPOINT = 'http://albanianskills.leetodev.me';

export default class App extends Component {
  state = {
    notification: null,
    messageText: ''
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      return;
    }
  
    let token = await Notifications.getExpoPushTokenAsync();
    
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'warly',
          name: 'Dan Ward'
        },
      }),
    });
  }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }
  
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle={config.BAR_STYLE}/>
          <Navigator/>
        </View>
      </Provider>
    );
  }
}