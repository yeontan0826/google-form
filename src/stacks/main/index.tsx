import { createStackNavigator } from '@react-navigation/stack';

import Form from '@screens/form/form.container';
import Preview from '@screens/preview/preview.container';

const Stack = createStackNavigator();

const backgroundColor: string = '#f0ebf8';
const MainStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="form"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor },
      }}>
      <Stack.Screen name="form" component={Form} />
      <Stack.Screen name="preview" component={Preview} />
    </Stack.Navigator>
  );
};

export default MainStack;
