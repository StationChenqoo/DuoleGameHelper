import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import BaohuangWeifang from '@src/screens/BaohuangWeifang';
import * as React from 'react';

import App from './App';
import BaohuangFengkuang from '@src/screens/BaohuangFengkuang';

export type RootStacksParams = {
  App: undefined;
  BaohuangWeifang: undefined;
  BaohuangFengkuang: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigator}>
      <RootStack.Navigator
        screenOptions={{animation: 'slide_from_right', headerShown: false}}>
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="BaohuangWeifang" component={BaohuangWeifang} />
        <RootStack.Screen
          name="BaohuangFengkuang"
          component={BaohuangFengkuang}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
