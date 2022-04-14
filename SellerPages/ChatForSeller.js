import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Block } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectSellerData } from "../feature/SellerSlice";
import { db } from "../firebase";

const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const ChatForSeller = () => {
  const [matches, setmatches] = useState([]);
  const sellerdata = useSelector(selectSellerData);
  console.log(sellerdata);
  const navigation = useNavigation();
  const [matchedUserInfo, setmatchedUserInfo] = useState([]);
  const [lastMessage, setlastMessage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "messaging"),
          where("usersMatched", "array-contains", sellerdata?.email)
        ),
        (snapshot) => {
          if (snapshot) {
            setmatches(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          }
        }
      ),
    [sellerdata]
  );

  // useEffect(() => {
  //   setmatchedUserInfo(getMathchedUserInfo(matchDetails?.users, user.email));
  // }, [matchDetails, user]);

  // useEffect(() => {
  //   onSnapshot(
  //     query(
  //       collection(db, "messaging", matchDetails.id, "message"),
  //       orderBy("timestamp", "desc")
  //     ),
  //     (snapshot) => setlastMessage(snapshot.docs[0]?.data()?.message)
  //   );
  // }, [matchDetails, db]);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
      {/* <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SellerChat", { userName: item.userName })
            }
            style={styles.card}
          >
            <View style={styles.UserInfo}>
              <View style={styles.UserImgWrapper}>
                <Image
                  style={styles.UserImg}
                  source={{ uri: item.userImg }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={styles.UserName}>{item.userName}</Text>
                  <Text style={styles.PostTime}>{item.messageTime}</Text>
                </View>
                <Text style={styles.MessageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Comming Soon</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default ChatForSeller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
  },
  UserInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  UserInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  UserName: {
    fontSize: 14,
    fontWeight: "bold",
    // fontFamily: "Helvetica",
  },
  PostTime: {
    fontSize: 12,
    color: "#666",
    // fontFamily: "Lato",
  },
  MessageText: {
    fontSize: 14,
    color: "#333333",
  },
});
