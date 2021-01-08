import React, { Component, useEffect, useState  } from 'react';
import { View, Image, Text, FlatList, SafeAreaView , ScrollView } from 'react-native';
import * as Pokemon from './views/Pokemon.js'

export var basePokemonUrl = "https://pokeapi.co/api/v2/pokemon"; // list of all pokemons

export function Img (props) {
    return (
        <Image style={{width: 110, height: 110}} 
        source = {{ 
                uri: props.url 
            }} />
    )
}

export function getList (props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let enableScrollViewScroll = true

    console.log(data);

    const finalUrl = (props.pokemon != "")? basePokemonUrl + props.pokemon : basePokemonUrl

    useEffect (() =>  {
        fetch(finalUrl)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
    }, [])

    const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

     function handleRefresh() {
        setLoading(true)
        fetch(finalUrl)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
      }

    return (

        <View style={{ padding: 2 }}>
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
                        <View>
                            <Pokemon.Poke name={item.name.toUpperCase()} 
                            Img = {Img} 
                            index = {item.url.charAt(item.url.length-2)}/>
                        </View>
                        )
                        }
                />
            </SafeAreaView>
          )}
        </View>
      )
}
