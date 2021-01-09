import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function PokemonDetails ({navigation :{goBack}, route}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect (() =>  {
        fetch(route.url)
        .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)).done()
    }, [])

    return (
        <View style={{ marginTop: 30 }}>
            <StatusBar style="auto" />
            
            <Button title={"CHANGE"} onPress={() => goBack()}/>
            
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
                                        navigation.navigate('Details', {url: item.url})
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
        </View>
    )
  }