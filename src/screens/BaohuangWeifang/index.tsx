import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/PageStacks';

import React, {useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {CardInputer, PlayerPanel} from './components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Player} from '@src/constants/MyTypes';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'BaohuangWeifang'>;
}

const BaohuangWeifang: React.FC<MyProps> = props => {
  const {route, navigation} = props;
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeParent, setActiveParent] = useState(-1);
  const [activeChild, setActiveChild] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

  /** 重置数据 */
  const buildDefaultPlayers = () => {
    const names = ['上联', '上家', '下家', '下联'];
    return Array.from(names, (_, i) => ({
      id: i,
      name: _,
      handleCards: Array(3).fill(''),
    }));
  };

  useEffect(() => {
    setPlayers([...buildDefaultPlayers()]);
    return function () {};
  }, []);

  /**
   * 激活当前玩家的行为
   * @param parent
   * @param child
   */
  const onPlayerPanelPress = (i: number, j: number) => {
    setActiveParent(i);
    setActiveChild(j);
  };

  /**
   * 虚拟键盘点击事件
   * @param value
   */
  const onCardPress = (value: string) => {
    if (activeChild == -1 || activeParent == -1) {
      // 没选中任何玩家
    } else {
      let _players = [...players];
      let currentPlayer: Player = {...players[activeParent]};
      let s = currentPlayer.handleCards[activeChild];
      if (value == 'Delete') {
        s = s.slice(0, -1);
      } else {
        s = s + value;
      }
      currentPlayer.handleCards[activeChild] = s;
      _players[activeParent] = currentPlayer;
      setPlayers(_players);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    Alert.alert(
      '确认重置所有记录？',
      '重置完了无法恢复，豆子输光光了可不包赔哦 =.=',
      [
        {
          text: '确认',
          onPress: () => {
            setPlayers([...buildDefaultPlayers()]);
            setActiveParent(-1);
            setActiveChild(-1);
            setRefreshing(false);
          },
        },
        {
          text: '取消',
          onPress: () => {
            setRefreshing(false);
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        {Array.from(players, (it, i) => (
          <View key={i} style={{marginHorizontal: 12, marginVertical: 5}}>
            <PlayerPanel
              player={it}
              onPress={onPlayerPanelPress}
              activeParent={activeParent}
              activeChild={activeChild}
            />
          </View>
        ))}
        <CardInputer onCardPress={onCardPress} />
      </ScrollView>
      <View
        style={{height: useSafeAreaInsets().bottom, backgroundColor: 'white'}}
      />
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
