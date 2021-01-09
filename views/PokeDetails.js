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
      fetch(route.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)})
      .done()
    }, [])

    return (
        <View style={{ marginTop: 30 }}>
            <StatusBar style="auto" />
            <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => goBack()} >
                <Ionicons name="md-arrow-back" size={26} color="#000" />
            </TouchableOpacity>
            <View style={{ padding: 2 }}>
                
                {isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : 
                ( <SafeAreaView  style={{ flexDirection: 'column', paddingTop: 50}}>
                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center', paddingBottom: 20}}>{data.name}</Text>
                        
                   </SafeAreaView>
                )}
            </View>
        </View>
    )
  }