import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ElectionScreen from './ElectionScreen';
import ResultScreen from './ResultScreen';
import ProfileScreen from './ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeUI = () => {
  return (
    <Tab.Navigator screenOptions={{headerStyle:{backgroundColor: '#6B46C1',}, headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}}}>
        <Tab.Screen name="Election" 
		 component={ElectionScreen} 
		options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="vote" color={color} size={size} />
          )}}
		/>
        <Tab.Screen name="Result" 
		component={ResultScreen} 
		options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="poll" color={color} size={size} />
          )}}
		/>
        <Tab.Screen name="Profile" 
		component={ProfileScreen}
		options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          )}} />
      </Tab.Navigator>
    
  );
};

export default HomeUI;