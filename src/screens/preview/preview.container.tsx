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
    Alert.alert('Classum', '지금이 몇시지..?\n이제 자야겠다...');
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
