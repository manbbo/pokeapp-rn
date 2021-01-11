import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, FlatList, SafeAreaView , TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function Thumb (props) {
    return (
        <Image style={{width: 140, height: 200}} 
        source = {{ 
                uri: props.url 
            }} />
    )
  }

export default function PokemonDetails ({navigation :{goBack}, route}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let enableScrollViewScroll = true

  // for scrolling purposes
  const onEnableScroll = (value) => {
        enableScrollViewScroll: value
      };

      {/** Fetch info from API **/}
      useEffect (() =>  {
        fetch(route.params.url)
            .then((response) => response.json())
        .then((json) => {
            setData(json) // SET DATA FROM SPECIFIC POKEMON
        })
        .catch((error) => console.error(error))
        .finally(() => {setLoading(false)})
        .done()
    }, [])

    return (
        isLoading ? <Text style={{ padding: 20 }}>Loading...</Text> : (
        <View style={{ marginTop: 30}}>
            <StatusBar style="auto" />
            {/** Just for the back button */}
            <View style={{ flexDirection:'row',paddingLeft: 10, paddingTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => goBack()} >
                        <Ionicons name="md-arrow-back" size={26} color="#000" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 35, color: 'green', textAlign: 'center', fontWeight: "bold", width:300}}>
                                {
                                    // HEADER (pokemon's name)
                                    data.name.toUpperCase()
                                }
                    </Text>
            </View>
            
            <View >
                <View  style={{ flexDirection: 'column', paddingTop: 20}}>
                    
                    <View style={{ flexDirection: "column", alignItems:"center", alignSelf: 'center'}}>
                        {/** IMAGE (pokemon front image) **/}
                        <Thumb url ={data.sprites.front_default}/>

                        {/** TYPEs (all two types) **/}
                        <Text style={{ marginTop: 10,fontSize: 20, color: 'black', textAlign: 'center' }}>Types: {data.types[0].type.name.toUpperCase() + (data.types.length > 1 ? ", " + data.types[1].type.name.toUpperCase() : "")}</Text>
                        <Text style={{ marginTop: 20,fontSize: 17, color: 'black', textAlign: 'center' }}>List of Attacks: </Text>
                        <SafeAreaView  style={{ marginTop: 10, flexDirection: 'column', width: 200, height: 250, borderColor:'black', borderWidth:1, borderTopWidth:1,  borderBottomRight:1, borderTopLeft:1}}>
                            {/** ATTACKS LIST (all attacks) **/}
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
                                                <Text style={{ marginTop: 10,fontSize: 17, color: 'black', textAlign: 'center'}}> 
                                                    {item.move.name.toUpperCase()} 
                                                </Text>
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