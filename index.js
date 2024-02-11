/**
 * @format
 */

import {createContext, useEffect, useRef, useState} from 'react';
import {
  AppRegistry,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useStore} from './useStore';
import Stacks from './PageStacks';
import Config from 'react-native-config';

const StoreContext = createContext();

const SlantedBadge = ({text, backgroundColor}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const Application = () => {
  const [badge, setBadge] = useState('');

  useEffect(() => {
    // console.log('Config.APP_PACKAGE_NAME: ', Config.APP_PACKAGE_NAME);
    if (Platform.OS == 'android') {
      let constants = NativeModules.SystemModule.getConstants();
      console.log('NativeModules.SystemModule.getConstants(): ', constants);
      console.log('react-native-config: ', Config);
    }
    return function () {};
  }, []);
  
  return (
    <StoreContext.Provider value={useStore}>
      <View style={{flex: 1}}>
        <StatusBar translucent={false} />
        <View style={{flex: 1, position: 'relative'}}>
          <Stacks />
          {badge ? (
            <SlantedBadge text={badge} backgroundColor={'#ff5252'} />
          ) : null}
        </View>
      </View>
    </StoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 4,
    top: 4,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
});

AppRegistry.registerComponent(appName, () => Application);
