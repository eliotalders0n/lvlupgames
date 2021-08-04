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
import { useNavigation } from "@react-navigation/native";
import useGetGames from "../crud/useGetGames";

function Explore() {
  const navigation = useNavigation();
  let games = useGetGames(1).docs;
  
  const renderCategories = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("viewGames", { item })}
      key={item.id}
      style={{
        paddingVertical: 10,
        height: 280,
        borderRadius: 10,
        margin: 5,
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
          marginTop: -20,
          paddingVertical: 10,
          marginLeft: 0,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
      ><Text
          style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.black }}
        >{item.title}
        </Text>
        <View style={{flexDirection:"row"}}>
        <Text
          style={{ paddingHorizontal: 20, flex:1, ...FONTS.h6, color: COLORS.black }}
        >{item.downloadSize} GB
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            ...FONTS.h6, flex:1, textAlign:"right",
            color: COLORS.secondary,
          }}
        >ZMW {item.price}
        </Text>
        </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View
        style={{
          padding: SIZES.padding * 2,
          height: "100%",
          backgroundColor: COLORS.white,
          marginBottom:90
        }}
      ><Text style={{ ...FONTS.h2, padding: SIZES.padding }}>LVLUP </Text>
        <Text style={{...FONTS.h5, color:COLORS.primary, paddingHorizontal:SIZES.padding}}>What game are you downloading today?</Text>
        <View style={{ marginTop: 30 }}>
            {games && (
            <FlatList
              data={games}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderCategories}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Explore;
