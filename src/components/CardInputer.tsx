import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CardInput {
  name: string;
  value: string;
  color: string;
}
interface MyProps {
  onCardPress: (value: string) => void;
  datas: CardInput[];
}

const CardInputer: React.FC<MyProps> = props => {
  const {onCardPress, datas} = props;

  return (
    <View style={{}}>
      <View style={styles.views}>
        {datas.map((it, i) => (
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
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CardInputer;
