import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import PreviewUI from './preview.presenter';
import { IStateProps } from '@redux/reducer/types';

const Preview = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}): JSX.Element => {
  const cards = useSelector((state: IStateProps) => state.cards);

  const handleSubmit = (): void => {
    Alert.alert('', '대회 우승 가즈아!!!!');
  };

  const handleGoBack = (): void => {
    navigation.pop();
  };

  return (
    <PreviewUI
      cards={cards}
      handleSubmit={handleSubmit}
      handleGoBack={handleGoBack}
    />
  );
};

export default Preview;
