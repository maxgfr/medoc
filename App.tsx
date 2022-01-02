import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/theme';
import CameraScreen from './pages/Camera';
import MedocScreen from './pages/Medoc';

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: theme.colors.background,
    text: theme.colors.text,
  },
};
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
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
