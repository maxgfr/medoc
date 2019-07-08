import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import CameraScreen from '../screens/CameraScreen';
import SearchScreen from '../screens/SearchScreen';
import MedocScreen from '../screens/MedocScreen';

export default createAppContainer(
  createStackNavigator({
    Search: SearchScreen,
    Camera: CameraScreen,
    Medoc: MedocScreen
  })
);
