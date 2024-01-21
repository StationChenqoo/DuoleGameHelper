import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
import App from './App';
import BaohuangWeifang from '@src/screens/BaohuangWeifang';

export type RootStacksParams = {
  App: undefined;
  BaohuangWeifang: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{animation: 'slide_from_right', headerShown: false}}>
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="BaohuangWeifang" component={BaohuangWeifang} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
