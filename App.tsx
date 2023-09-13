import 'react-native-gesture-handler';

import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@styles/theme';
import store from '@redux/store';
import MainStack from '@stacks/main';

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <NavigationContainer>
                <MainStack />
              </NavigationContainer>
            </Provider>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
