/**
 * @format
 */

import {createContext, useEffect, useRef} from 'react';
import {AppRegistry, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useStore} from './useStore';

const StoreContext = createContext();
const Application = () => {
  useEffect(() => {
    return function () {};
  }, []);

  return (
    <StoreContext.Provider value={useStore}>
      <View style={{flex: 1}}>
        <App />
      </View>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Application);
