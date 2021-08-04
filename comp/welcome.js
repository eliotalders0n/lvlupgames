import React from "react";

import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("./../assets/logo.png")} style={styles.image} />
      <Text style={styles.txth2}>
        {" "}
        Game your way, drop off your console or storage device and pick it up
        with a game of your choice.
      </Text>
       <View style={styles.miniContainer}>
       <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          marginBottom: 10,
          marginTop: 40,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => navigation.navigate("Register")}
      ><Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
         Register
        </Text>
      </TouchableOpacity>
       
        <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          marginBottom: 0,
          marginTop: 0,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => navigation.navigate("Login")}
      ><Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
         Login
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    flex:1,
    backgroundColor:COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "right",
  },
  miniContainer: {
    padding: SIZES.padding * 2,
    position: "absolute",
      bottom: 0,
    left: 0,
    right: 0,
  },
  button1: {
    flex: 0.5,
    textAlign: "left",
    backgroundColor: "rgb(240,240,240)",
    padding: SIZES.padding * 2,
  },
  button2: {
    flex: 0.5,
    textAlign: "right",
    backgroundColor: "rgb(240,240,240)",
    padding: SIZES.padding * 2,
  },
  image: {
    marginTop: "20%",
    width: 220,
    height: 220,
    borderRadius: 100,
  },
  txth1: {
    marginTop: "5%",
    ...FONTS.h2,
    textAlign:"center"
  },
  txth2: {
    ...FONTS.h4,
    width: "60%",
    textAlign: "center",
    marginBottom: "30%",
    marginTop: "5%",
  },
  bgimage: {},
});

export default Welcome;
