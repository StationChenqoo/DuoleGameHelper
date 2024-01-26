import {useStore} from '@root/useStore';
import {LayoutRectangle, View} from 'react-native';
import tinycolor from 'tinycolor2';

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
          height: 24,
          width: (range.width - 4 * 2) * progress,
          backgroundColor: tinycolor(theme)
            .setAlpha(1 - progress)
            .toString(),
          borderRadius: 4,
        }}
      />
    </View>
  );
};
export default ProgressBar;
