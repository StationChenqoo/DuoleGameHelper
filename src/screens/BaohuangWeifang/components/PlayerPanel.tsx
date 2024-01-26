import {useStore} from '@root/useStore';
import {Player} from '@src/constants/MyTypes';
import {useEffect, useState} from 'react';
import {
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProgressBar from './ProgressBar';
import tinycolor from 'tinycolor2';

interface MyProps {
  player: Player;
  /**
   *
   * @param i 玩家编号
   * @param j 进贡、吃贡、出牌
   * @returns
   */
  onPress: (i: number, j: number) => void;
  activeParent: number;
  activeChild: number;
}

const PlayerPanel: React.FC<MyProps> = props => {
  const {player, onPress, activeParent, activeChild} = props;
  const [unusedCardsGrouper, setUnusedCardsGrouper] = useState('');
  const [count, setCount] = useState(0);
  const {theme} = useStore();
  const [progressBarLayout, setProgressBarLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setUnusedCardsGrouper(
      calcUnusedCardsGrouperCalculator(player.handleCards[2]),
    );
    setCount(
      -player.handleCards[1].length +
        player.handleCards[2].length +
        player.handleCards[0].length,
    );
    return function () {};
  }, [player]);

  /**
   * 算没出过的牌进行分组
   * @param cards
   */
  const calcUnusedCardsGrouperCalculator = (cards: string) => {
    let abcd = '34567890JQKA2';
    let result = '';
    for (let i = 0; i < abcd.length; i++) {
      if (cards.toUpperCase().includes(abcd[i])) {
        // 出过了就不管了
      } else {
        result += abcd[i];
      }
    }
    return result;
  };

  /**
   * 进贡或者吃贡
   * @param name
   * @param value
   * @param index
   * @param color
   * @returns
   */
  const group = (name: string, value: string, index: number, color: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(player.id, index);
        }}
        style={{flex: 1}}>
        <View
          style={[
            styles.viewTabWrapper,
            {
              borderColor:
                player.id == activeParent && activeChild == index
                  ? theme
                  : '#eee',
            },
          ]}>
          <Text
            style={{color, fontSize: 14, flexWrap: 'wrap'}}
            numberOfLines={1}>
            {name}: {value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{padding: 8, borderRadius: 10, backgroundColor: 'white'}}>
      <View style={{}} />
      <View style={styles.viewRows}>
        <Text style={{fontSize: 14, color: '#333'}}>{player.name}</Text>
        <Text style={{fontSize: 14, color: theme}}>{`${unusedCardsGrouper} → ${
          40 - count
        }张`}</Text>
      </View>
      <View style={{height: 5}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            {group('进贡', player.handleCards[0], 0, 'green')}
            <View style={{width: 12}} />
            {group('吃贡', player.handleCards[1], 1, '#ff5252')}
          </View>
          <View style={{height: 8}} />
          <TouchableOpacity
            style={[
              styles.viewTabWrapper,
              {
                borderColor:
                  player.id == activeParent && activeChild == 2
                    ? theme
                    : '#eee',
              },
            ]}
            onPress={() => {
              onPress(player.id, 2);
            }}
            onLayout={e => {
              setProgressBarLayout(e.nativeEvent.layout);
            }}>
            <View style={{position: 'absolute', paddingHorizontal: 4}}>
              <ProgressBar
                progress={(40 - count) / 40}
                range={progressBarLayout}
              />
            </View>
            <Text
              style={{
                // color: tinycolor(theme)
                //   .setAlpha((40 - count) / 41)
                //   .toString(),
                color: '#666',
                fontSize: 14,
              }}
              numberOfLines={1}
              ellipsizeMode={'head'}>
              {player.handleCards[2] ? player.handleCards[2] : '记录出牌 ~'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewRows: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewTabWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: 'row',
    position: 'relative',
  },
});
export default PlayerPanel;
