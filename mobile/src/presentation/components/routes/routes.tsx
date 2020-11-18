import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from '../../screens/orphanages-map/orphanages-map'
import OrphanageDetails from '../../screens/orphanage-details/orphanage-details'
import Header from '../header/header'

const AppStack = createStackNavigator()

function Routes () {
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
        <AppStack.Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
