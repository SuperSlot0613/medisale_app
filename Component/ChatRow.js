import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useAuth from "../Hooks/useAuth";
import { useTailwind } from "tailwind-rn";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import getMathchedUserInfo from "./getMatchesUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setmatchedUserInfo] = useState([]);
  const tw = useTailwind();
  const [lastMessage, setlastMessage] = useState("");

  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    setmatchedUserInfo(getMathchedUserInfo(matchDetails?.users, user.email));
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "messaging", matchDetails.id, "message"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setlastMessage(snapshot.docs[0]?.data()?.message)
    );
  }, [matchDetails, db]);

  return (
    <TouchableOpacity
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"),
        styles.cardShadow,
        styles.shadowOpacity,
        { backgroundColor: "#E0F7FA" },
      ]}
      onPress={() =>
        navigation.navigate("Messages", {
          matchDetails,
        })
      }
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: `https://avatars.dicebear.com/api/human/${seed}.svg` }}
      />
      <View style={tw("text-lg font-semibold")}>
        <Text>{matchedUserInfo?.displayName}</Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
