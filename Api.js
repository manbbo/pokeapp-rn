import React, { Component, useEffect, useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, FlatList, SafeAreaView , ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Pokemon from './views/Pokemon.js'

export function Img (props) {
    return (
        <Image style={{width: 140, height: 180}} 
        source = {{ 
                uri: props.url 
            }} />
    )
}

export function getList ({navigation, route}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let enableScrollViewScroll = true

    useEffect (() =>  {
        fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
    }, [])

    const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

     function handleRefresh() {
        setLoading(true)
        fetch("https://pokeapi.co/api/v2/pokemon?limit=200&offset=0")
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
      }

    return (

        <View style={{ padding: 2 }}>
        <StatusBar style="auto" />
          {isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : 
          ( <SafeAreaView  style={{ flexDirection: 'column', paddingTop: 50}}>
              <Text style={{ fontSize: 18, color: 'green', textAlign: 'center', paddingBottom: 20}}>Pokemon List:</Text>
                  <FlatList
                  scrollEnabled={enableScrollViewScroll}
                  onRefresh={
                      handleRefresh
                  }
                  refreshing = {isLoading}
                     onTouchStart={() => {
                        onEnableScroll( false );
                    }}
                    onMomentumScrollEnd={() => {
                        onEnableScroll( true );
                    }}
                    style={{ paddingTop: 20 }}
                    data={data.results}
                    nestedScrollEnabled={true} 
                    marginBottom={50}
                    keyExtractor={({ id }, index) => id}
                    initialNumToRender={100}
                    maxToRenderPerBatch={100}
                    onEndThreshold={0}
                    renderItem={({ item }) => (
                            <TouchableOpacity onPress={() =>
                                navigation.navigate('Details', {url: item.url, Img: Img})
                            }>
                                <View>
                                    <Pokemon.Poke name={item.name.toUpperCase()} 
                                    Img = {Img} 
                                    url = {item.url}/>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                />
            </SafeAreaView>
          )}
        </View>
      )

}
