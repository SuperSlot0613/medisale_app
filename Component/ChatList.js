import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-rn";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";
import useAuth from "../Hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setmatches] = useState([]);
  const { user } = useAuth();

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "matches"),
  //         where("usersMatched", "array-contains", user.uid)
  //       ),
  //       (snapshot) =>
  //         setmatches(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }))
  //         )
  //     ),
  //   [user]
  // );

  return matches.length > 0 ? (
    <FlatList
      style={tw("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw("p-5")}>
      <Text style={tw("text-center text-lg")}>No matches at the moment</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
