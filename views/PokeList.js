import React, { useEffect, useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Button, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Pokemon from '../models/Pokemon.js'

export function getList ({navigation, route}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let enableScrollViewScroll = true
    const [offset, setOffset] = useState(0)

    const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

    {/** JUST SETS THE OFFSET FOR PAGINATION **/}
    const handleOffset = (value) => {
        setOffset(value)
        setLoading(true)
    }

    {/** FETCHING CODE FOR API CALL **/}
    const getFetching = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+offset)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
    }

    useEffect (() =>  {
        if (isLoading) {
            getFetching()
        }
    })

     function handleRefresh() {
        setLoading(true)
        getFetching()
      }

    return (
        <View style={{ paddingBottom: 105 }}>
            <StatusBar style="auto" />
            {
                /** LOADING SCREEN **/
                isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : 
                /** FINISHED SCREEN **/
            ( <SafeAreaView  style={{ flexDirection: 'column', paddingTop: 50, alignSelf: 'center'}}>
                <Text style={{ fontSize: 30, color: 'green', fontWeight: "bold",textAlign: 'center'}}>Pokemon List</Text>
                <Text style={{ textAlign: 'center', paddingBottom: 10 }}>Page: {(offset/20) + 1}</Text>
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
                        marginBottom={20}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={21}
                        maxToRenderPerBatch={21}
                        renderItem={({ item }) => (
                            // touchable item that leads to pokeDetails and shows firsthand info about 
                            // the pokemon on the list
                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('Details', {url: item.url})
                                }>
                                    <View>
                                        <Pokemon.Poke 
                                        url = {item.url}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    />
                </SafeAreaView>
            )}
          {/** buttons of next and previouss to move between pages **/}
            <View style={{ flexDirection:'row', alignSelf: 'center', paddingTop: 10 }}>
                <Button title={"Previous"} disabled={offset<=0? true : false} onPress={() => {
                    handleOffset(offset-20)
                }}/><Button title={"Next"} disabled={offset>=data.count? true : false} onPress={() => {
                    handleOffset(offset+20)
                }}/>
            </View>
        </View>
      )

}
