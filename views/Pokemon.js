import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export function Poke ( props ) {

    const [data, setData] = useState([]);

    var baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    var baseTypeUrl = "https://pokeapi.co/api/v2/pokemon/"

    useEffect (() =>  {
      fetch(props.url)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error)).done()
    }, [])

    return (
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>
              <props.Img url = {baseImageUrl + data.id + ".png"}/>
            </View>
            
            <View style={{ flexDirection: "row", alignItems:"center" }}>
                <View style={{ flexDirection: "column", alignItems:"center", height: 100, width:150 }}>
                    <Text>{props.name}</Text>
                    <Text>{data.name}</Text>
                </View>
            </View>
        </View>
    )
  }