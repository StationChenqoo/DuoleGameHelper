import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/PageStacks';

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'BaohuangWeifang'>;
}

const BaohuangWeifang: React.FC<MyProps> = props => {
  const {route, navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 4321);
    return function () {};
  }, []);
  
  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <View style={{paddingHorizontal: 32, backgroundColor: 'white'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default BaohuangWeifang;
