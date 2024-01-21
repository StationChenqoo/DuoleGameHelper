import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Game} from '@src/constants/MyTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from './PageStacks';
import {useStore} from './useStore';

interface MyProps {
  navigation?: RootStacksProp;
}

const App: React.FC<MyProps> = props => {
  const {theme, setTheme} = useStore();
  const {navigation} = props;
  const [datas, setDatas] = useState<Game[]>([]);

  useEffect(() => {
    setDatas([
      {
        src: require('@src/assets/games/wfbh.jpg'),
        title: '潍坊保皇',
        message: '4副牌潍坊保皇（炸弹场、进贡场）',
        page: 'BaohuangWeifang',
      },
    ]);
    return function () {};
  }, []);

  const renderItem = (it: Game, i: number) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => {
          navigation.navigate(it.page);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={it.src}
            style={{height: 50, width: 50, borderRadius: 12}}
          />
          <View style={{width: 12}} />
          <View
            style={{
              flex: 1,
              height: 48,
              justifyContent: 'space-around',
            }}>
            <Text style={{color: '#333', fontSize: 16}}>{it.title}</Text>
            <Text style={{color: '#666', fontSize: 14}} numberOfLines={1}>
              {it.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <ScrollView>
          <View style={{height: 6}} />
          <View style={styles.viewGrouper}>
            <Text style={{fontSize: 16, color: '#333'}}>游戏列表</Text>
            <View style={{height: 6}} />
            {datas.map((it, i) => renderItem(it, i))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          height: useSafeAreaInsets().bottom + 5,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewGrouper: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

export default App;
