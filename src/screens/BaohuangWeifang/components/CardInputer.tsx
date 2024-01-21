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
      {name: '让位', value: 'R', color: '#ff5252'},
      {name: '删除', value: 'Delete', color: '#666'},
    ]);
  return (
    <View
      style={{
        marginHorizontal: 12,
        borderRadius: 10,
      }}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
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
    width: (Dimensions.get('screen').width - 24) / 6,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardInputer;
