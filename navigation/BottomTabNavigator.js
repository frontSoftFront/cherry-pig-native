import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TabBarIcon from '../components/TabBarIcon';
// //////////////////////////////////////////////////

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        labelPosition: 'below-icon',
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name='Money'
        component={LinksScreen}
        options={{
          title: 'Money',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-cash' />,
        }}
      />
      <BottomTab.Screen
        name='Feeding'
        component={LinksScreen}
        options={{
          title: 'Feeding',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-beer' />,
        }}
      />
      <BottomTab.Screen
        name='Resources'
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-book' />,
        }}
      />
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-calendar' />,
        }}
      />
      <BottomTab.Screen
        name='Veterinary'
        component={LinksScreen}
        options={{
          title: 'Veterinary',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-medkit' />,
        }}
      />
      <BottomTab.Screen
        name='Settings'
        component={LinksScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-settings' />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
