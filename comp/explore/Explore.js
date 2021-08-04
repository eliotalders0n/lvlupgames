import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import useGetGames from "../crud/useGetGames";
import useGetTrendingGames from "../crud/useGetTrendingGames";

function Explore() {
  let games = useGetGames(0).docs;
  let trending = useGetTrendingGames().docs
  
  const renderNextgames = ({ item }) => (
    <View
      
      style={{
        paddingVertical: 10,
        height: 300,
        borderRadius: 10,
        margin: 5,
        width:SIZES.width-100,
        backgroundColor: COLORS.white,
      }}
    ><Image
        style={{
          width: "100%",
          height: 220,
          borderRadius: 10,
          resizeMode: "cover",
        }}
        source={{
          uri: item.poster,
        }}
      />
      <View
        style={{
          width: "100%",
          marginTop: -40,
          paddingVertical: 10,
          marginLeft: 0,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
      ><Text
          style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.black }}
        >{item.title}
        </Text>
        <Text
          style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.black }}
        >{item.downloadSize} GB
        </Text>
        
         </View>
    </View>
  );

  const renderTrending = ({ item }) => (
    <View
       style={{
        paddingVertical: 10,
         borderRadius: 10,
        margin: 5,
        flexDirection:"row", 
        backgroundColor: COLORS.white,
      }}
    ><Image
        style={{
          width:45,
          height: 45,
          borderRadius: 10,
          resizeMode: "cover",
           
        }}
        source={{
          uri: item.poster,
        }}
      />
      <View
        style={{
            marginLeft: 0,
            flex:7,
            backgroundColor: COLORS.white,
            justifyContent:"center"
        }}
      ><Text
          style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.black }}
        >{item.title}
        </Text>
        <View style={{flexDirection:"row"}}>
        <Text
          style={{ paddingHorizontal: 20, flex:1, ...FONTS.h6, color: COLORS.black }}
        > {item.downloadSize} GB
        </Text>
        <Text
          style={{ paddingHorizontal: 20, flex:1, textAlign:"right", ...FONTS.h6, color: COLORS.black }}
        >{item.views} Views
        </Text>
        </View>
        </View>
    </View>
  );

  return (
    <ScrollView style={{flex:1, marginBottom:50, backgroundColor:COLORS.white}}>
      <View
        style={{
          padding: SIZES.padding * 2,
          flex:1,
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>Trending</Text>
        <View style={{ marginTop: 10 }}>
           <Text style={{ ...FONTS.h4 }}>Next Games</Text>
          {games && (
            <FlatList
              data={games}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderNextgames}
              contentContainerStyle={{}}
            />
          )}
        </View>
        <View style={{ }}>
        <Text style={{ ...FONTS.h4 }}>Top Viewed</Text>
        {trending && (
            <FlatList
              data={trending}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderTrending}
              contentContainerStyle={{}}
            />
          )}
        </View>

      
      </View>
    </ScrollView>
  );
}

export default Explore;
