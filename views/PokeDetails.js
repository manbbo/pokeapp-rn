import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, FlatList, SafeAreaView , TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

export default function PokemonDetails ({navigation :{goBack}, route}) {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let enableScrollViewScroll = true

    const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

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
        <View style={{ marginTop: 30}}>
            <StatusBar style="auto" />
            <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => goBack()} >
                <Ionicons name="md-arrow-back" size={26} color="#000" />
            </TouchableOpacity>
            <View >
                <View  style={{ flexDirection: 'column', paddingTop: 50}}>
                    <Text style={{ fontSize: 35, color: 'green', textAlign: 'center', fontWeight: "bold", paddingBottom: 20}}>
                        {data.name.toUpperCase()}
                    </Text>
                    <View style={{ flexDirection: "column", alignItems:"center", alignSelf: 'center'}}>
                        <route.params.Img url ={data.sprites.front_default}/>
                        <Text style={{ marginTop: 10,fontSize: 20, color: 'black', textAlign: 'center' }}>Types: {data.types[0].type.name.toUpperCase() + (data.types.length > 1 ? ", " + data.types[1].type.name.toUpperCase() : "")}</Text>
                        <Text style={{ marginTop: 30,fontSize: 17, color: 'black', textAlign: 'center' }}>List of Attacks: </Text>
                        <SafeAreaView  style={{ marginTop: 20, flexDirection: 'column', width: 200, height: 250, borderColor:'black', borderWidth:1, borderTopWidth:1,  borderBottomRight:1, borderTopLeft:1}}>
                            <FlatList
                                scrollEnabled={enableScrollViewScroll}
                                refreshing = {isLoading}
                                    onTouchStart={() => {
                                        onEnableScroll( false );
                                    }}
                                    onMomentumScrollEnd={() => {
                                        onEnableScroll( true );
                                    }}
                                    data={data.moves}
                                    nestedScrollEnabled={true} 
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                            
                                                <View>
                                                    <Text style={{ marginTop: 10,fontSize: 17, color: 'black', textAlign: 'center'}}> {item.move.name.toUpperCase()} </Text>
                                                </View>
                                        )}
                                />
                                
                        </SafeAreaView>
                    </View>
                
                   </View>
            </View>
        </View>)
    )
  }