import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/PageStacks';

import {useStore} from '@root/useStore';
import {CardInputer, PlayerPanel} from '@src/components';
import {CardInputerKeyevent, Player} from '@src/constants/MyTypes';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'BaohuangWeifang'>;
}

const abcd = '34567890JQKA2';
const handleCardsCount = 40;

const cardPanelProps = {
  abcd,
  handleCardsCount,
};

const BaohuangWeifang: React.FC<MyProps> = props => {
  /** 重置数据 */
  const buildDefaultPlayers = () => {
    const names = ['上联', '下联', '上家', '下家'];
    return Array.from(names, (_, i) => ({
      id: i,
      name: _,
      handleCards: Array(3).fill(''),
    }));
  };

  const {route, navigation} = props;
  const [players, setPlayers] = useState<Player[]>([...buildDefaultPlayers()]);
  const [activeParent, setActiveParent] = useState(-1);
  const [activeChild, setActiveChild] = useState(-1);
  const {theme} = useStore();
  const [height, setHeight] = useState(0);

  const safe = useSafeAreaInsets().right;
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
    if (value == CardInputerKeyevent.RESET) {
      Alert.alert('useSafeAreaInsets', `${safe}`);
      onReset();
    } else if (value == CardInputerKeyevent.POP) {
      Alert.alert('确认退出？', '再问一遍你确认退出？', [
        {
          text: '确认',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: '取消',
          onPress: () => {},
        },
      ]);
    } else if (activeChild == -1 || activeParent == -1) {
    } else {
      let _players = [...players];
      let currentPlayer: Player = {...players[activeParent]};
      let s = currentPlayer.handleCards[activeChild];
      if (value == CardInputerKeyevent.DELETE) {
        s = s.slice(0, -1);
      } else {
        s = s + value;
      }
      currentPlayer.handleCards[activeChild] = s;
      _players[activeParent] = currentPlayer;
      setPlayers(_players);
    }
  };

  const onReset = () => {
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
          },
        },
        {
          text: '取消',
          onPress: () => {},
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginLeft: useSafeAreaInsets().left,
          marginRight: useSafeAreaInsets().right,
          alignItems: 'center',
        }}
        onLayout={event => {
          setHeight(event.nativeEvent.layout.height);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onLayout={event => {
            setHeight(event.nativeEvent.layout.height);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <PlayerPanel
                player={players[0]}
                onPress={onPlayerPanelPress}
                activeParent={activeParent}
                activeChild={activeChild}
                {...cardPanelProps}
              />
            </View>
            <View style={{width: 12}} />
            <View style={{flex: 1}}>
              <PlayerPanel
                player={players[1]}
                onPress={onPlayerPanelPress}
                activeParent={activeParent}
                activeChild={activeChild}
                {...cardPanelProps}
              />
            </View>
          </View>
          <View style={{height: 12}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <PlayerPanel
                player={players[2]}
                onPress={onPlayerPanelPress}
                activeParent={activeParent}
                activeChild={activeChild}
                {...cardPanelProps}
              />
            </View>
            <View style={{width: 12}} />
            <View style={{flex: 1}}>
              <PlayerPanel
                player={players[3]}
                onPress={onPlayerPanelPress}
                activeParent={activeParent}
                activeChild={activeChild}
                {...cardPanelProps}
              />
            </View>
          </View>
        </View>
        <View style={{width: 12}} />
        <View style={{paddingVertical: 12}}>
          <CardInputer
            onCardPress={onCardPress}
            datas={'4567890JQKA23'
              .split('')
              .reverse()
              .map(it => ({name: it, value: it, color: '#333'}))
              .concat([
                {name: '大王', value: 'D', color: 'orange'},
                {name: '小王', value: 'X', color: 'orange'},
                {name: '让位', value: 'R', color: 'blue'},
                {name: '落贡', value: 'L', color: 'blue'},
                {name: '闷贡', value: 'M', color: 'blue'},
                {
                  name: '删除',
                  value: CardInputerKeyevent.DELETE,
                  color: '#666',
                },
                {
                  name: '重置',
                  value: CardInputerKeyevent.RESET,
                  color: '#ff5252',
                },
                {
                  name: '返回',
                  value: CardInputerKeyevent.POP,
                  color: '#ff5252',
                },
              ])}
          />
          {/* <View style={{height: 24}} /> */}
          {/* <TouchableOpacity
            style={{
              height: 36,
              backgroundColor: theme,
              marginHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}
            onPress={onReset}>
            <Text style={{color: 'white'}}>返回游戏列表</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

// {
//   name: '返回',
//   value: CardInputerKeyevent.POP,
//   color: '#ff5252',
// },

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
