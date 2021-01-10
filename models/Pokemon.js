import React, {useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';

 function Img (props) {
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
  
    useEffect (() =>  {
      fetch(props.url)
        .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => console.error(error)).finally(() => {setLoading(false)}).done()
    }, [])

    var baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    return (
        <View style={{ flexDirection: "row", alignItems:"center"}}>
            <View style={{ flexDirection: "column", alignItems:"center"}}>
              <Img url = {baseImageUrl + data.id + ".png"}/>
            </View>
            
            {
              isLoading? 
              <View>
                <Text>Loading...</Text>
              </View>  : 
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