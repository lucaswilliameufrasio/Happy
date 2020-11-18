import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from '../../screens/orphanages-map/orphanages-map'
import Header from '../header/header'

const AppStack = createStackNavigator()

function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="OrphanagesMap"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F2F3F5' }
        }}
      >
        <AppStack.Screen name="OrphanagesMap" component={OrphanagesMap} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
