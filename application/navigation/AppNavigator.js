import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import CameraScreen from '../screens/CameraScreen';
import SearchScreen from '../screens/SearchScreen';
import MedocScreen from '../screens/MedocScreen';

const Stack = createStackNavigator(
  {
    Search: SearchScreen,
    Camera: CameraScreen,
    Medoc: MedocScreen
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.ModalPresentationIOS,
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
  }
);

export default createAppContainer(Stack);
