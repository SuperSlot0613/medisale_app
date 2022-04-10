import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
import { useTailwind } from "tailwind-rn";

const ChatList = () => {
  const [matches, setmatches] = useState([]);
  const tw = useTailwind();
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "messaging"),
          where("usersMatched", "array-contains", user.email)
        ),
        (snapshot) =>
          setmatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  // console.log(matches);

  return matches.length > 0 ? (
    <FlatList
      style={[tw("h-full"), { marginTop: 100 }]}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={[tw("p-5"), { marginTop: 100 }]}>
      <Text style={tw("text-center text-lg")}>No matches at the moment</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
