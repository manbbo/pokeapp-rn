
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetails from './views/PokeDetails.js'
import * as API  from './views/PokeList.js'

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pokemon List">
        <Stack.Screen
          name="Pokemon List"
          component={API.getList}
          options={{
                  headerShown: false,
                }}
        />
        <Stack.Screen name="Details" 
        component={PokemonDetails}
        options={{
                  headerShown: false,
                }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
