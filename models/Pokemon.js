import React, {useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';

/** This page is a model item for the pokemon list, and can be considered a list item */

 function Thumb (props) {
  return (
      <Image style={{width: 140, height: 180}} 
      source = {{ 
              uri: props.url 
          }} />
  )
}

export function Poke ( props ) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  /** FETCHING DATA FROM POKEMON (DETAILED) **/
    useEffect (() =>  {
      fetch(props.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error)).finally(() => {setLoading(false)}).done()
    }, [])

    return (
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>
              <Thumb url = {data.sprites.front_default}/>
            </View>
            
            {
              /** LOADING SCREEN **/
              isLoading? 
              <View>
                <Text>Loading...</Text>
              </View>  : 
              /** INFO FROM POKEMON (FIRST PAGE) **/
              <View style={{ flexDirection: "row", alignItems:"center" }}>
                  <View style={{ flexDirection: "column", alignItems:"center", height: 100, width:200 }}>
                      <Text style={{ fontSize: 20, color: 'black' }}>{data.id + ". " + data.name}</Text>
                      <Text>Type: {data.types[0].type.name.toUpperCase()}</Text>
                  </View>
              </View>
            }
        </View>
    )
  }