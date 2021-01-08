import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export function Poke ( props ) {

    const [data, setData] = useState([]);

    var baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    var baseTypeUrl = "https://pokeapi.co/api/v2/type/"

    const Stack = createStackNavigator();

    const MyStack = () => {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={props.name}
              component={PokemonDetail}
              options={{ title: props.name.toUpperCase() }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    useEffect (() =>  {
        fetch(baseTypeUrl + props.index)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
    }, [])

    return (
        <TouchableOpacity /** TODO: Navigation onpress*/>
            <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>

            <props.Img url = {baseImageUrl + props.index + ".png"}/>
            
            </View>
            <View style={{ flexDirection: "row", alignItems:"center" }}>
                <View style={{ flexDirection: "column", alignItems:"center", height: 100, width:150 }}>
                    <Text>{props.name}</Text>
                    <Text>{data.name}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
  }