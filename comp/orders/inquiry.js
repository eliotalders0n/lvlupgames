import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useGetGames from "../crud/useGetGames";

const Inquiry = ({ route }) => {
  const navigation = useNavigation();
  let data = route.params.data;
  let games = useGetGames(data.u_id).docs;
  console.log(data.id);

  function sendInquiry() {
    let inquiry = {
      gameId: data.id,
      createdAt: new Date(Date.now()).toString(),
      userId: firebase.auth().currentUser.uid,
      status: "pending",
      genre: data.genre,
      price: data.price,
      title: data.title,
    };
    firebase
      .firestore()
      .collection("inquiries")
      .add(inquiry)
      .then(() => {
        console.log("Inquiry sent");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: "100%",
        padding: SIZES.padding,
      }}
    >
      <View style={{ backgroundColor: COLORS.white, flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: COLORS.dark2,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{data.title}</Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>{data.genre}</Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.black,
            marginHorizontal: 5,
            flex: 1,
            padding: SIZES.padding * 2,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {games.title}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h6 }}>
            {games.genre}
          </Text>
        </View>
      </View>
      {/* <View>
                <Text>Am offering to pay K15kwacha for 1 KG, i will need 10 bags of 5KG</Text>
            </View> */}
      <View style={{ padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h4 }}>Game inquiry</Text>
        <Text>
          I want to place an order for {data.title} which is at ZMW {data.price}{" "}
          {"\n"}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          marginTop: 40,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => sendInquiry()}
      >
        <Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
          Submit request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Inquiry;
