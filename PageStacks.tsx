import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
import App from './App';
import BaohuangWeifang from '@src/screens/BaohuangWeifang';
import {useFlipper} from '@react-navigation/devtools';

export type RootStacksParams = {
  App: undefined;
  BaohuangWeifang: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  const navigator = useNavigationContainerRef();
  useFlipper(navigator);
  return (
    <NavigationContainer ref={navigator}>
      <RootStack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <RootStack.Screen
          name="App"
          component={App}
          options={{headerTitle: '多乐棋牌助手'}}
        />
        <RootStack.Screen
          name="BaohuangWeifang"
          component={BaohuangWeifang}
          options={{headerTitle: '潍坊保皇'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
