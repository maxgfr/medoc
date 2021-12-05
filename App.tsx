import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import {NativeBaseProvider} from 'native-base';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
