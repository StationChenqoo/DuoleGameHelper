import {useStore} from '@root/useStore';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

interface MyProps {
  active: number;
}

const TwinkleDots: React.FC<MyProps> = props => {
  const {active} = props;
  const [index, setIndex] = useState(-1);
  const {theme} = useStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(t => t + 1);
    }, 361);
    return function () {
      timer && clearInterval(timer);
    };
  }, [active]);
  
  useEffect(() => {
    setIndex([-1, active][seconds % 2]);
    return function () {};
  }, [seconds]);

  const renderDot = (i: number) => {
    return (
      <View style={styles.viewDotContainer}>
        <View
          style={[
            {height: 8, width: 8, borderRadius: 4},
            {backgroundColor: index == i ? theme : '#ddd'},
          ]}
        />
      </View>
    );
  };

  return (
    <View style={{flexWrap: 'wrap'}}>
      <View style={{flexDirection: 'row'}}>
        {renderDot(0)}
        {renderDot(3)}
      </View>
      <View style={{flexDirection: 'row'}}>
        {renderDot(1)}
        {renderDot(2)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewDotContainer: {
    height: 12,
    width: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TwinkleDots;
