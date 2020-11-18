import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { OrphanagesMap, OrphanageDetails, CreateOrphanageOnMapPosition, CreateOrphanageFormStepOne, CreateOrphanageFormStepTwo } from '../../screens'
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
        <AppStack.Screen
          name="CreateOrphanage"
          component={CreateOrphanageOnMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />
        <AppStack.Screen
          name="CreateOrphanageFormStepOne"
          component={CreateOrphanageFormStepOne}
          options={{
            headerShown: true,
            header: () => <Header title="Adicione os dados" />
          }}
        />
        <AppStack.Screen
          name="CreateOrphanageFormStepTwo"
          component={CreateOrphanageFormStepTwo}
          options={{
            headerShown: true,
            header: () => <Header title="Adicione os dados" />
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
