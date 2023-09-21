import Header from '@components/header';
import {
  StackHeaderProps,
  createStackNavigator,
} from '@react-navigation/stack';

import Form from '@screens/form/form.container';
import Preview from '@screens/preview/preview.container';

const Stack = createStackNavigator();

const backgroundColor: string = '#f7eaea';
const MainStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="form"
      screenOptions={{
        cardStyle: { backgroundColor },
      }}>
      <Stack.Screen
        name="form"
        component={Form}
        options={{
          header: (props: StackHeaderProps) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="preview"
        component={Preview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
