import {useStore} from '@root/useStore';
import Colors from '@src/constants/Colors';
import {LayoutRectangle, View} from 'react-native';

interface MyProps {
  progress: number;
  range: LayoutRectangle;
}

const ProgressBar: React.FC<MyProps> = props => {
  let {progress, range} = props;
  const {theme} = useStore();

  return (
    <View style={{position: 'relative', backgroundColor: 'white'}}>
      <View
        style={{
          height: 32,
          width: (range.width - 4 * 2) * Math.max(Math.min(1, progress), 0),
          backgroundColor: new Colors().hex2Rgba(theme, 0.18).toString(),
          borderRadius: 4
        }}
      />
    </View>
  );
};
export default ProgressBar;
