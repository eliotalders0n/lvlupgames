import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants";
import firebase from "../../firebase";

const AddGames = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [downloadSize, setDownloadSize] = useState("");
  const [price, setPrice] = useState("");

  // function to request for a verification code

  const addGame = () => {
    let add = {
      title: title,
      genre: genre,
      createdAt: new Date(Date.now()).toString(),
      price: price,
      poster: poster,
      downloadSize: downloadSize,
    };
    firebase
      .firestore()
      .collection("games")
      .add(add)
      .then(() => {
        console.log("Item added");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 3,
        flex: 1,
      }}
    >
      <Text style={{ ...FONTS.h2, marginBottom: 30 }}>Lets add some games</Text>
      <View style={styles.miniContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          keyboardType="default"
          placeholder="*Hell Blade Senuas Sacrifice"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          keyboardType="default"
          placeholder="250"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setPrice}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>Genre</Text>
        <TextInput
          keyboardType="default"
          placeholder="Racing | Shooter | Fighting"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setGenre}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>Download Size</Text>
        <TextInput
          keyboardType="default"
          placeholder="72"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setDownloadSize}
        />
      </View>

      <Text style={styles.label}>Poster URL</Text>
      <TextInput
        keyboardType="default"
        placeholder="url link"
        placeholderTextColor="rgb(135, 135, 135)"
        autoCompleteType="tel"
        style={styles.input}
        onChangeText={setPoster}
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={addGame}>
        <Text style={styles.buttonText}>Add Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Just some styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

    padding: SIZES.padding * 2,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    ...FONTS.h5,
    marginVertical: 5,
  },
  buttonLogin: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    ...FONTS.h5,
  },
  buttonLoginText: {
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.h5,
  },
  buttonLogin_: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
});

export default AddGames;
