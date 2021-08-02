geimport React, {useEffect} from "react";
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

function Search(props) {
useEffect(()=>{
  registerForPushNOtifcations().then(token=>console.log(token).catch((e)=>{
    console.log(e)
  }))
},[])

  async function registerForPushNOtifcations(){
    const{status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if(status!='granted'){
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    if(status!='granted')
    {
      alert("Failed to get access")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    return token

  }

  return <View>


  </View>;
}

export default Search;
