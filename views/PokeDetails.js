import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, FlatList, SafeAreaView , TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

export default function PokemonDetails ({navigation :{goBack}, route}) {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
    useEffect (() =>  {
      fetch(route.params.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)})
      .done()
    }, [])

    return (
        isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : (
        <View style={{ marginTop: 30 }}>
            <StatusBar style="auto" />
            <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => goBack()} >
                <Ionicons name="md-arrow-back" size={26} color="#000" />
            </TouchableOpacity>
            <View style={{ padding: 2 }}>
                <SafeAreaView  style={{ flexDirection: 'column', paddingTop: 50}}>
                    <Text style={{ fontSize: 25, color: 'green', textAlign: 'center', paddingBottom: 20}}>
                        {data.name.toUpperCase()}
                    </Text>
                    <View style={{ flexDirection: "column", alignItems:"center"}}>
                        <route.params.Img url ={data.sprites.front_default}/>
                        <Text style={{ marginTop: 10,fontSize: 20, color: 'black', textAlign: 'center' }}>Types: {data.types[0].type.name.toUpperCase() + (data.types[1].type.name != null? ", " + data.types[1].type.name.toUpperCase() : null)}</Text>
                        <Text style={{ marginTop: 10,fontSize: 17, color: 'black', textAlign: 'center' }}>Attacks: </Text>
                    </View>
                   </SafeAreaView>
                
            </View>
        </View>)
    )
  }