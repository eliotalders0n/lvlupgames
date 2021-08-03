import React, {useState, useEffect} from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import firebase from './../../firebase'
import useGetUser from "../crud/useGetUser";

function Search() {

  
  let user_id = firebase.auth().currentUser.uid
  let user = useGetUser(user_id).docs
  const [tkn, setToken] = useState()
      useEffect(() => {
      user.token === null ? regsiterForPush().then(token=>console.log(token)).catch((err)=>console.log(err)) : null
      }, [])
      
          async function regsiterForPush(){
            const{status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
            if(status !='granted'){
              const{status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            }
            if(status !='granted'){
              alert("failed")
              return
            }
            token = (await Notification.getExpoPushTokenAsync()).data
            setToken(token)
            firebase.firestore().collection("users").doc(user_id).update({token:token}).then(()=>console.log("done"))
            return token
          }

      return (
      <View>


      </View>
      );
}

export default Search;
