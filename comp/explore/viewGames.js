import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useGetGames from "../crud/useGetGames";

const viewGames = ({ route }) => {
  let data = route.params.item;

  let item = useGetGames(data.u_id).docs;
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("games")
      .doc(data.id)
      .update({
        views: firebase.firestore.FieldValue.increment(1),
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        style={{ flex: 1, height: 220, borderRadius: 10, resizeMode: "cover" }}
        source={{
          uri: item,
        }}
      />
    </TouchableOpacity>
  );

  return (
    // <ScrollView style={{ backgroundColor: COLORS.white }}>
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        padding: SIZES.padding * 2,
      }}
    >
      <View
        style={{
          paddingTop: 10,
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: COLORS.white,
          borderRadius: 10,
        }}
      >
        <Image
          style={{
            marginLeft: "20%",
            marginBottom: 0,
            width: "60%",
            height: "70%",
            borderRadius: 10,
            resizeMode: "contain",
          }}
          source={{
            uri: data.poster,
          }}
        />
      </View>
      <Text
        style={{
          color: COLORS.black,
          ...FONTS.h2,
          textAlign: "center",
          fontWeight: "900",
        }}
      >
        {data.createdAt}
      </Text>
      <Text
        style={{
          color: COLORS.secondary,
          ...FONTS.h4,
          textAlign: "center",
        }}
      >
        {data.title}
      </Text>
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h6, textAlign: "center" }}
      >
        {data.downloadSize}
      </Text>
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h6, textAlign: "center" }}
      >
        {data.genre}
      </Text>
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h6, textAlign: "center" }}
      >
        {data.price}
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("inquire", { data })}
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: COLORS.secondary,
            marginHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h5,
              padding: SIZES.padding * 2,
              textAlign: "center",
            }}
          >
            Inquire
          </Text>
          {/* need to make this change depending on whether the current user is the one that uploaded it. */}
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default viewGames;
