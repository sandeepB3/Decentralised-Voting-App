import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoterAuthScreen from './screens/VoterAuthScreen';
import Home from './screens/HomeUI';
import OTPScreen from './screens/OTPScreen';
import DetailsElection from './screens/DetailsElection';
import { Provider } from 'react-redux';
import store from './store/store'


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>

        <Stack.Group>
          <Stack.Screen name='Login' component={VoterAuthScreen}/>
          <Stack.Screen name='OTP' component={OTPScreen}/>
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name='DetailsElection' component={DetailsElection}/>
        </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

