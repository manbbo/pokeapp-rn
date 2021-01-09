import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export function Poke ( props ) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
    useEffect (() =>  {
      fetch(props.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error)).finally(() => {setLoading(false)}).done()
    }, [])

    console.log(data)

    var baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    return (
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>
              <props.Img url = {baseImageUrl + data.id + ".png"}/>
            </View>
            
            {
              isLoading? 
              <View>
                <Text>Loading...</Text>
              </View>  : 
              <View style={{ flexDirection: "row", alignItems:"center" }}>
                  <View style={{ flexDirection: "column", alignItems:"center", height: 100, width:150 }}>
                      <Text>{data.id + ". " + props.name}</Text>
                      <Text>Type: {data.types[0].type.name.toUpperCase()}</Text>
                  </View>
              </View>
            }
        </View>
    )
  }