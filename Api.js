import React, { Component, useEffect, useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, FlatList, Button, SafeAreaView } from 'react-native';
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
    var offset = 0

    const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

    useEffect (() =>  {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
    }, [])

     function handleRefresh() {
        setLoading(true)
        offset = offset
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset="+offset)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
      }

    return (

        <View style={{ padding: 2, paddingBottom: 80 }}>
        <StatusBar style="auto" />
          {isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : 
          ( <SafeAreaView  style={{ flexDirection: 'column', paddingTop: 50, alignSelf: 'center'}}>
              <Text style={{ fontSize: 30, color: 'green', fontWeight: "bold",textAlign: 'center', paddingBottom: 20}}>Pokemon List:</Text>
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
                    initialNumToRender={50}
                    maxToRenderPerBatch={50}
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
            <View style={{ flexDirection:'row', alignSelf: 'center' }}>
                <Button title={"Previous"} disabled={offset<=0? true : false} onPress={() => {
                    offset = offset-50
                        handleRefresh()
                }}/><Button title={"Next"} disabled={offset>=data.count? true : false} onPress={() => {
                    offset = offset+50
                        handleRefresh()
                }}/>
            </View>
        </View>
      )

}
