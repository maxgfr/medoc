import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {theme} from './src/theme';
import CameraScreen from './pages/Camera';
import MedocScreen from './pages/Medoc';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: theme.colors.background,
    text: theme.colors.text,
  },
};

type RootStackParamList = {
  Médoc: undefined;
  'Recherche par code-barre': undefined;
  Médicament: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Médoc'>;
export type ItemProps = NativeStackScreenProps<
  RootStackParamList,
  'Médicament'
>;
export type CameraProps = NativeStackScreenProps<
  RootStackParamList,
  'Recherche par code-barre'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NativeBaseProvider>
      <StatusBar animated={true} backgroundColor={theme.colors.background} />
      <NavigationContainer theme={NavigationTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Médoc" component={HomeScreen} />
          <Stack.Screen
            name="Recherche par code-barre"
            component={CameraScreen}
          />
          <Stack.Screen name="Médicament" component={MedocScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
