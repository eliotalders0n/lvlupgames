import React from "react";
import { Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useGetUser from "../crud/useGetUser";
import useGetnews from "../crud/useGetnews";

function profile() {
  const navigation = useNavigation();
  let user = useGetUser(firebase.auth().currentUser.uid).docs;
  let news = useGetnews().docs

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
      });
  };

  const renderAddGame = () => {
    console.log("this is admin");
    if (user.accType == "admin") {
      return (
         <TouchableOpacity
            onPress={() => navigation.navigate("AddGames", { user })}
            style={{
              flex: 1,
              marginHorizontal: 5,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
             
            }}
          ><Feather name="plus" size={24} color={COLORS.secondary} /></TouchableOpacity>
       
      );
    }
  };

  const renderNews = ({ item }) => (
    <View
       style={{
        paddingVertical: 10,
         borderRadius: 10,
           backgroundColor: COLORS.white,
      }}
    ><View
        style={{
            marginLeft: 0,
            flex:7,
            backgroundColor: COLORS.white,
            justifyContent:"center"
        }}
      ><Text
          style={{...FONTS.h4, color: COLORS.secondary }}
        >{item.title}</Text>
        <View style={{flexDirection:"row"}}>
        <Text
          style={{ ...FONTS.h5, color: COLORS.black }}
        >{item.body}</Text>
         
        </View>
        </View>
    </View>
  );

  return (
    <ScrollView
      style={{        
        backgroundColor: COLORS.white,
        marginBottom: 60,
        
      }}
    >
      <View style={{ padding: SIZES.padding * 3, height: 60, backgroundColor:COLORS.black }}>
        <Text style={{ ...FONTS.h2,  color:COLORS.white, }}>Profile</Text>
      </View>
      <View style={{ padding: SIZES.padding * 3,  backgroundColor:COLORS.black   }}>
        <Text style={{...FONTS.h2, color:COLORS.white,  fontSize:30, fontWeight: "900", textAlign: "left" }}>
          {user.name && user.name}
        </Text><View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              ...FONTS.h5,
              fontWeight: "900", color:COLORS.white,
            }}
          >{user && user.province}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              ...FONTS.h5, color:COLORS.white,
              fontWeight: "900",
            }}
          >{user && user.phone}
          </Text></View>
      </View>
      
      <View style={{flexDirection:"row", paddingBottom:20,  backgroundColor:COLORS.black }}>
      <TouchableOpacity
          onPress={() => navigation.navigate("updateProfile", { user })}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
           
          }}
        ><Feather name="user" size={24} color={COLORS.secondary} />
      </TouchableOpacity>   

      <TouchableOpacity
          onPress={() => navigation.navigate("feedback", { user })}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            
          }}
        ><Feather name="mail" size={24} color={COLORS.secondary}/></TouchableOpacity>

      <TouchableOpacity
        onPress={() => logout()}
        style={{
          flex: 1,
          marginHorizontal: 5,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
         
        }}
      ><Feather name="log-out" size={24} color={COLORS.secondary} /></TouchableOpacity>
       {renderAddGame()}
      </View>
 
      <View style={{padding:SIZES.padding*2}}>
        <Text style={{...FONTS.h4}}>News</Text>
        {news && (
            <FlatList
              data={news}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderNews}
              contentContainerStyle={{}}
            />
          )}

      </View>
    
    </ScrollView>
  );
}

export default profile;
