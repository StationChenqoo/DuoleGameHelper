import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  onCardPress: (value: string) => void;
}
const CardInputer: React.FC<MyProps> = props => {
  const {onCardPress} = props;
  const map = '34567890JQKA2'
    .split('')
    .map(it => ({name: it, value: it, color: '#333'}))
    .concat([
      {name: '大王', value: 'D', color: 'orange'},
      {name: '小王', value: 'X', color: 'orange'},
      {name: '落贡', value: 'L', color: 'green'},
      {name: '让位', value: 'R', color: 'blue'},
      {name: '删除', value: 'Delete', color: '#666'},
      {name: '重置', value: 'Reset', color: '#ff5252'},
      {name: '返回', value: 'Return', color: '#ff5252'},
    ]);
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {map.map((it, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              onCardPress(it.value);
            }}>
            <View style={styles.viewButtonWrapper}>
              <View style={styles.viewButton}>
                <Text style={{fontSize: 14, color: it.color}}>{it.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    height: 32,
  },
  viewButtonWrapper: {
    width: 64,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardInputer;
