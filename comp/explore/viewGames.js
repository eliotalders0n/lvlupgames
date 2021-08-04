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
  let userId = firebase.auth().currentUser.uid
//  let item = useGetGames(data.u_id).docs;
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
 
  function sendInquiry() {
    let inquiry = {
      gameId: data.id,
      createdAt: new Date(Date.now()).toString(),
      userId: userId,
      status: "pending",
      genre: data.genre,
      price: data.downloadSize *6,
      title: data.title,     
    };
    //  limit number of inquiries

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
        flex: 1,
        padding: SIZES.padding * 2,
      }}
    >
      <View style={{justifyCOntent:"center", alignItems:"center", borderRadius:10}}><Image
          style={{
            width: "75%",
            height:SIZES.height/2,
            borderRadius: 10,
            resizeMode: "contain",
          }}
          source={{
            uri: data.poster,
          }}
        /></View>
        <Text
        style={{
          color: COLORS.secondary,
          ...FONTS.h2,
          textAlign: "center",
        }}
      >{data.title}
      </Text>
      <View style={{flexDirection:"row"}}>
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h4, flex:1, textAlign: "center" }}
      >{data.downloadSize} GB
      </Text>
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h4, flex:1, textAlign: "center" }}
      >{data.genre}
      </Text>
      </View>
    
      <Text
        style={{ color: COLORS.darkgray, ...FONTS.h5, textAlign: "center" }}
      >
       ZMW {data.price}
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <TouchableOpacity
          onPress={() => sendInquiry()}
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: COLORS.secondary,
            marginHorizontal: 5,
          }}
        ><Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              padding: SIZES.padding * 2,
              textAlign: "center",
            }}
          >Send Request
          </Text>
          {/* need to make this change depending on whether the current user is the one that uploaded it. */}
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default viewGames;
