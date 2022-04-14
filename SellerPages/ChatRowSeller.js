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
import getMathchedUserInfo from "../Component/getMatchesUserInfo";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { selectSellerData } from "../feature/SellerSlice";
import { useSelector } from "react-redux";

const ChatRowSeller = ({ matchDetails }) => {
  const navigation = useNavigation();
  const sellerdata = useSelector(selectSellerData);
  const [matchedUserInfo, setmatchedUserInfo] = useState([]);
  const [lastMessage, setlastMessage] = useState("");

  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    setmatchedUserInfo(
      getMathchedUserInfo(matchDetails?.users, sellerdata.email)
    );
  }, [matchDetails, sellerdata]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "messaging", matchDetails.id, "message"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setlastMessage(snapshot.docs[0]?.data()?.text)
    );
  }, [matchDetails, db]);
  console.log(lastMessage);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SellerChat", {
          matchDetails,
        })
      }
      style={styles.card}
    >
      <View style={styles.UserInfo}>
        <View style={styles.UserImgWrapper}>
          <Image
            style={styles.UserImg}
            source={{
              uri: `https://avatars.dicebear.com/api/human/${seed}.svg`,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.TextSection}>
          <View style={styles.UserInfoText}>
            <Text style={styles.UserName}>{matchedUserInfo.name}</Text>
            {/* <Text style={styles.PostTime}>{item.messageTime}</Text> */}
          </View>
          <Text style={styles.MessageText}>{lastMessage || "Say Hi!"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRowSeller;

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
