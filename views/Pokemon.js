import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export function Poke ( props ) {

    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect (() =>  {
      fetch(props.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
        setTypes(json.types)
      })
      .catch((error) => console.error(error)).done()
    }, [])

    var baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    return (
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>
              <props.Img url = {baseImageUrl + data.id + ".png"}/>
            </View>
            
            <View style={{ flexDirection: "row", alignItems:"center" }}>
                <View style={{ flexDirection: "column", alignItems:"center", height: 100, width:150 }}>
                    <Text>{data.id + ". " + props.name}</Text>
                    
                    <Text>Type: {types[0].type.name.toUpperCase()}</Text>
                </View>
            </View>
        </View>
    )
  }